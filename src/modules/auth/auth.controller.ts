import { type Request, type Response } from "express"
import { authService } from "./auth.service"

const userSignUp = async (req: Request, res: Response) => {
    try {
        const result = await authService.userSignUpQuery(req.body)
        res.status(201).json({
            success: true,
            message: "User signed up",
            data: result.rows[0]
        })
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: "User not signed up",
            data: err.message
        })
    }

}

const userSignIn = async (req: Request, res: Response) => {
    try {
        const result = await authService.userSignInQuery(req.body)
        res.status(200).json({
            success: true,
            message: "User signed in",
            data: result
        })
    }
    catch (err: any) {
        res.status(404).json({
            success: false,
            message: "User not Found",
            data: err.message
        })
    }
}

export const authController = {
    userSignUp,
    userSignIn
}