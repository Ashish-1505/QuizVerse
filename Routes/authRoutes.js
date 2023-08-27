import express from 'express'
const router=express.Router()

import { register,login,getAllUsers,changeRole} from "../controllers/authController.js";


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/getallusers').get(getAllUsers)
router.route('/changerole/:id').put(changeRole)

export default router