import mongoose from "mongoose";

// Define the schema for a quiz
const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
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
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Quiz model
const Quiz = mongoose.model('Quiz', QuizSchema);

export default Quiz

