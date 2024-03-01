import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema({
  createdBy:{
    type: String,
    required: true
  },
  examId: {
    type: String,
    required: true
  },
  examTitle:{
    type: String,
    required: true
  },
  name:{
    type:String,
    required:true
  },
  rollno:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  maxScore:{
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  attemptedBy:{
    type:Number,
    required:true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  } 
});

const TestResult = mongoose.model('TestResult', testResultSchema);

export default TestResult
 
