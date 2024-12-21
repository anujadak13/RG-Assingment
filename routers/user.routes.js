import { Router } from 'express'
import { registerUser,loginUser } from '../controllers/user.controller.js'
const router = Router()


router.route("/registerUser").post(registerUser)
router.route("/loginUse").post(loginUser)

export{
    router
}