import mongoose from "mongoose";

const Otp=new mongoose.Schema({
    userId:{type:String},
    otp:{type:String}
}) 


export default mongoose.model('Otp',Otp)