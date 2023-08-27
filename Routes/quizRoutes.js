import express from 'express'
const router=express.Router()

import {createQuiz,getAllQuizes,getAllQuestions, deleteQuiz,updateQuiz} from "../controllers/quizController.js";


router.route('/createquiz').post(createQuiz)
router.route('/getallquizes').get(getAllQuizes)
router.route('/getallquestions/:id').get(getAllQuestions)
router.route('/deletequiz/:quizid').delete(deleteQuiz)
router.route('/updatequiz/:quizId').put(updateQuiz)

export default router