import Quiz from "../models/Quiz.js";
import { io } from "../server.js";
const createQuiz=async(req,res)=>{
    try {
        const { title, description, questions, createdBy } = req.body;
    
        // Create a new quiz
        const quiz = new Quiz({
          title,
          description,
          questions,
        });
    
        // Save the quiz to the database
        const savedQuiz = await quiz.save();
    
        res.status(201).json(savedQuiz);
      } catch (error) {
        console.error('Failed to create quiz', error);
        res.status(500).json({ error: 'Failed to create quiz' });
      }
}

const getAllQuizes= async(req,res)=>{
    try {
        const quizes = await Quiz.find();
        res.json(quizes);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

const getAllQuestions = async(req,res)=>{
  try {
    const {id}=req.params
    // console.log(id);
    const quiz=await Quiz.findById(id)
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const questions = quiz.questions;

    res.json(questions);
  } catch (error) {
    console.error('Failed to fetch quiz questions', error);
    res.status(500).json({ error: 'Failed to fetch quiz questions' });
  }
}
const deleteQuiz=async(req,res)=>{
  try {
    const {quizid}=req.params
    const quiz=await Quiz.findByIdAndDelete(quizid);
    io.emit('deletequiz', quizid,{ once: true });
    res.json("success")
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quiz' })
  }
}
const updateQuiz=async(req,res)=>{
  try {
    const { title, description, questions } = req.body;
    const quizId = req.params.quizId;

    // Validate if the request contains required data
    if (!title || !description || !questions) {
      return res.status(400).json({ message: 'Title, description, and questions are required fields.' });
    }

    // Update the quiz in the database
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      { title, description, questions },
      { new: true } // Return the updated quiz after the update
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }

    res.status(200).json({ quiz: updatedQuiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}
export {createQuiz,getAllQuizes,getAllQuestions,deleteQuiz,updateQuiz}

