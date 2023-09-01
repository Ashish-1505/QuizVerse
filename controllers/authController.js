import User from '../models/User.js'
import {StatusCodes} from 'http-status-codes'
import {BadRequestError,UnAuthenticatedError} from '../errors/index.js'
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs';
import Otp from '../models/Otp.js';
var TempUser;
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"ashish113sharma@gmail.com",
        pass:"rviloioucicwoxmn"
    }
})

const register=async (req,res)=>{
    const {name,email,password}=req.body

    if(!name ||!email|| !password){
        throw new BadRequestError('Please provide all values')
    }
    const userAlreadyExists=await User.findOne({email})
    if(userAlreadyExists){
        throw new BadRequestError('User already exists')
    }
    const user=await User.create({name,email,password,verified:false})
    const token=user.createJWT()
    // TempUser=user

    sendOtpVerification(user,token,res)

    //STATUSCODE.OK.CREATED
}
const login=async (req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        throw new BadRequestError('Please provide all values')
    }
    const user=await User.findOne({email}).select('+password')
    if(!user){
        throw new UnAuthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect=await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnAuthenticatedError('Invalid Credentials')
    }
    const token=user.createJWT()
    user.password=undefined
    res.status(StatusCodes.OK).json({user,token,location:user.location})
}
const getAllUsers=async (req,res)=>{
    try {
        const users = await User.find().select('-password');
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
}

const changeRole = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if (user.role === "user") user.role = "admin";
        else user.role = "user"; 
        await user.save();
        res.status(200).json({
            success: true,
            message:"Role Updated",
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const sendOtpVerification=async(user,token,res)=>{
    try {
        const otp=`${Math.floor(1000+Math.random()*9000)}`
        const mailOptions={
            from:"ashish113sharma@gmail.com",
            to:user.email,
            subject:"Verify Your Email",
            html:`<p> Enter <b> ${otp} </b> in the app to verify your email`,
        }
        const salt=10;
        const hashedOTP=await bcrypt.hash(otp,salt);

        const newOtpVerification=await new Otp({
            userId:user._id,
            otp:hashedOTP,
        })

        await newOtpVerification.save()
        await transporter.sendMail(mailOptions)
        res.status(StatusCodes.OK).json({user:{_id:user._id,email:user.email,lastName:user.lastName,location:user.location,name:user.name,verified:user.verified},token,message:"Verification otp email sent"})
        // res.json({
        //     status:"PENDING",
        //     message:"Verification otp email sent",
        //     data:{ 
        //         userId:user._id, 
        //         email:user.email,
        //     }
        // })
    } catch (error) {
        res.json({
            status:"FAILED",
            message:error.message
        })
    }
}

const verifyOTP=async(req,res)=>{
    
    try {
        const {userId,otp}=req.body
        // console.log(userId);
        const data=await User.findById(userId)
        // console.log(data);
        const {email}=data
        if(!userId || !otp){
            throw Error("Empty otp details not valid")
        }else{
            const UserVerification=await Otp.find({
                userId,
            })
            if(UserVerification.length<=0){
                throw new Error(
                    "Account does not exist or user already verified"
                )
            }else{
                const hashedOTP=UserVerification[0].otp;
                const validotp=await bcrypt.compare(otp,hashedOTP);

                if(!validotp){
                    throw new Error("Invalid otp")
                }else{
                    const mailOptions={
                        from:"ashish113sharma@gmail.com",
                        to:email,
                        subject:"Email Verified",
                        html:`Your Email verified successFully`,
                    }
                    await User.updateOne({_id:userId},{verified:true});
                    await Otp.deleteMany({userId})
                    await transporter.sendMail(mailOptions)
                    res.json({
                        status:"Verified",
                        message:"Email verified"
                    })
                }
            }
        }
    } catch (error) {
        res.json({status:"FAILED",
        message:error.message,})
    }
}

export {register,login,getAllUsers,changeRole,verifyOTP}