import express from 'express'
const router=express.Router()

import { register,login,getAllUsers,changeRole,verifyOTP} from "../controllers/authController.js";


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/getallusers').get(getAllUsers)
router.route('/changerole/:id').put(changeRole) 
router.route('/verifyOTP').post(verifyOTP)

export default router 