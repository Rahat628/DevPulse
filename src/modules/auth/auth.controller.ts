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
        res.status(400).json({
            success: false,
            message: "User not signed up",
            data: err.message
        })
    }

}
export const authController = {
    userSignUp
}