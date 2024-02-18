import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
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
  group:{
    type:String,
  },
  score: {
    type: Number,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const TestResult = mongoose.model('TestResult', testResultSchema);

export default TestResult
 
