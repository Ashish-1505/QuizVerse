import express from 'express'
const router=express.Router()

import {createQuiz,getAllQuizes,getAllQuestions, deleteQuiz,updateQuiz, addCollege, getColleges, createCollegeExam, getExam, getAllExamQuestions, getExamById, testResult, fetchResult, viewResult} from "../controllers/quizController.js";


router.route('/createquiz').post(createQuiz)
router.route('/createcollegeexam').post(createCollegeExam)
router.route('/getallquizes').get(getAllQuizes)
router.route('/exam/:collegeName').get(getExam)
router.route('/examDetail/:examId').get(getExamById)
router.route('/getallquestions/:id').get(getAllQuestions)
router.route('/getAllExamQuestions/:id').get(getAllExamQuestions)
router.route('/deletequiz/:quizid').delete(deleteQuiz)
router.route('/updatequiz/:quizId').put(updateQuiz)
router.route('/addcollege').post(addCollege)
router.route('/getcolleges').get(getColleges)
router.route('/saveResult').post(testResult)
router.route('/fetchResult/:createdById').get(fetchResult)
router.route('/downloadResults/:examId').get(viewResult)
export default router