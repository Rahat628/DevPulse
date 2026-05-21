import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post('/signup',authController.userSignUp)
router.post('/signin',authController.userSignIn)

const authRouter = router;
export default authRouter