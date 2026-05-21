import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post('/signup',authController.userSignUp)

const authRouter = router;
export default authRouter