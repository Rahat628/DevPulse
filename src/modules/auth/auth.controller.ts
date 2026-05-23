import { type Request, type Response } from "express"
import { authService } from "./auth.service"
import { sendResponse } from "../../utils/sendResponse"

const userSignUp = async (req: Request, res: Response) => {
    try {
        const result = await authService.userSignUpQuery(req.body)
        sendResponse(res, { statusCode: 201, success: true, message: "User registered successfully", data: result.rows[0] })

    }
    catch (err: any) {
        sendResponse(res, { statusCode: 500, success: false, message: err.message, error: err })
    }

}

const userSignIn = async (req: Request, res: Response) => {
    try {
        const result = await authService.userSignInQuery(req.body)
        sendResponse(res, { statusCode: 200, success: true, message: " Login successful", data: result })
    }
    catch (err: any) {
        sendResponse(res, { statusCode: 404, success: false, message: err.message, error: err })
    }
}


export const authController = {
    userSignUp,
    userSignIn
}