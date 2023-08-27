import User from '../models/User.js'
import {StatusCodes} from 'http-status-codes'
import {BadRequestError,UnAuthenticatedError} from '../errors/index.js'

const register=async (req,res)=>{
    const {name,email,password}=req.body

    if(!name ||!email|| !password){
        throw new BadRequestError('Please provide all values')
    }
    const userAlreadyExists=await User.findOne({email})
    if(userAlreadyExists){
        throw new BadRequestError('User already exists')
    }
    const user=await User.create({name,email,password})
    const token=user.createJWT()
    res.status(StatusCodes.OK).json({user:{email:user.email,lastName:user.lastName,location:user.location,name:user.name},token,location:user.location})
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

export {register,login,getAllUsers,changeRole}