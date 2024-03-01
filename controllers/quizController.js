import Quiz from "../models/Quiz.js";
import Exam from "../models/Exam.js";
import College from "../models/College.js"; 
import { io } from "../server.js";
import excel from "exceljs";
import TestResult from "../models/testResultSchema.js";
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

const addCollege=async(req,res)=>{
  try {
    const { name, location } = req.body;
    if(!name || !location){
      res.status(500).json({ message: 'All Feilds are required' });
    }
    const newCollege = new College({
      name,
      location
    });
    await newCollege.save();
    res.status(201).json({ message: 'College added successfully', college: newCollege });
  } catch (error) {
    console.error('Error adding college:', error);
    res.status(500).json({ message: 'Failed to add college' });
  }
}

const getColleges=async(req,res)=>{
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({ message: 'Failed to fetch colleges' });
  }
}

const createCollegeExam=async(req,res)=>{
  try {
      const { title, duration,college,examCode, questions,createdBy} = req.body;
  
      if(!title || !duration || !college || !questions || !examCode || !createdBy){
        res.status(500).json({ error: 'All fields are mandatory' });
      }
      // Create a new quiz
      const exam = new Exam({
        title,
        duration,
        college,
        examCode,
        questions,
        createdBy
      });
  
      // Save the quiz to the database
      const savedExam = await exam.save();
  
      res.status(201).json(savedExam);
    } catch (error) {
      console.error('Failed to create Exam', error);
      res.status(500).json({ error: 'Failed to create Exam' });
    }
}

const getExam=async(req,res)=>{
  try {
    const collegeName = req.params.collegeName;
    const quizzes = await Exam.find({ college: collegeName });
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Failed to fetch quizzes' });
  }
}

const getExamById=async(req,res)=>{
  try {
    const examId = req.params.examId;
    // console.log(req.params.examId);
    const exam = await Exam.findById(examId)
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    } 
    res.status(200).json(exam);
  } catch (error) {
    console.error('Error fetching exam:', error);
    res.status(500).json({ message: 'Failed to fetch exam' });
  }
} 

const getAllExamQuestions = async(req,res)=>{
  try {
    const {id}=req.params
    // console.log(id);
    const exam=await Exam.findById(id)
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    const questions = exam.questions;

    res.json(questions);
  } catch (error) {
    console.error('Failed to fetch exam questions', error);
    res.status(500).json({ error: 'Failed to fetch exam questions' });
  }
}

const testResult=async(req,res)=>{
  try {
    const { createdBy,examId,examTitle,name,rollno,email,maxScore,score } = req.body;


    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    if (exam.attemptedBy.includes(email)) {
      return res.status(400).json({ message: 'User has already attempted this exam' });
    }

    exam.attemptedBy.push(email);
    await exam.save();

    const testResult = new TestResult({
      createdBy,
      examId,
      examTitle,
      name,
      rollno,
      email,
      maxScore,
      score,
      attemptedBy:exam.attemptedBy.length,
    });

    await testResult.save();

    res.status(201).json({ message: 'Test result saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const fetchResult=async(req,res)=>{
  const { createdById } = req.params;
  try {
    const results = await TestResult.find({ createdBy: createdById });
    res.status(200).json(results);
  } catch (error) {
    console.error('Failed to fetch results', error);
    res.status(500).json({ message: 'Failed to fetch results' });
  }
}

const viewResult=async(req,res)=>{
  try {
    const examId = req.params.examId;
    const results = await TestResult.find({ examId });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Results');
    worksheet.addRow(['Name', 'Roll Number', 'Email', 'Score', 'Max Score']);
    results.forEach(result => {
      worksheet.addRow([
        result.name,
        result.rollno,
        result.email,
        result.score,
        result.maxScore,
      ]);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=quiz_results.xlsx');
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to generate Excel file');
  }
}

export {createQuiz,getAllQuizes,getAllQuestions,deleteQuiz,updateQuiz,addCollege,getColleges,createCollegeExam,getExam,getAllExamQuestions,getExamById,testResult,fetchResult,viewResult}

