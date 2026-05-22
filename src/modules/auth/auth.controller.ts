import { type Request, type Response } from "express"
import { authService } from "./auth.service"
import { sendResponse } from "../../utils/sendResponse"

const userSignUp = async (req: Request, res: Response) => {
    try {
        const result = await authService.userSignUpQuery(req.body)
        sendResponse(res, { statusCode: 201, success: true, message: "User signed up", data: result.rows[0] })

    }
    catch (err: any) {
        sendResponse(res, { statusCode: 500, success: false, message: "User not signed up", error: err.message })
    }

}

const userSignIn = async (req: Request, res: Response) => {
    try {
        const result = await authService.userSignInQuery(req.body)
        sendResponse(res, { statusCode: 200, success: true, message: "User signed in", data: result })
    }
    catch (err: any) {
        sendResponse(res, { statusCode: 404, success: false, message: "User not Found", error: err.message })
    }
}


export const authController = {
    userSignUp,
    userSignIn
}