import { Router } from "express";
import { passportCall } from "../middleware/passportCall.js";
import { authorization } from "../middleware/authorization.middleware.js";
import { SessionController } from "../controllers/sessions.controller.js";


const router = Router()
const {
    register,
    login,
    logout,
    forgotPassword,
    resetPasswordToken,
    resetPassword
} = new SessionController()

router.post('/register', authorization(['PUBLIC']), register)
router.post('/login', authorization(['PUBLIC']), login)
router.get('/logout', authorization(['PUBLIC']), logout)
router.post('/forgot-password', authorization(['PUBLIC']), forgotPassword)
router.get('/resetPassword/:token', authorization(['PUBLIC']), resetPasswordToken)
router.post('/resetPassword/', authorization(['PUBLIC']), resetPassword)



export default router