import mongoose from "mongoose";


const ExamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  college:{
    type:String,
    required:true
  },
  examCode:{
    type:String,
    required:true
  },
  questions: [
    {
      question: {
        type: String,
        required: true
      },
      options: [
        {
          type: String,
          required: true
        }
      ],
      correctOptionIndex: {
        type: Number,
        required: true
      },
    }
  ],
  attemptedBy: {
    type: [String],
    default: [],
  },
  createdBy: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Exam = mongoose.model('Exam', ExamSchema);

export default Exam
