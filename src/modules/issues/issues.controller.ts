import { type Request, type Response } from "express"
import { issuesService } from "./issues.service"
import type { status, Type } from "../../types"
import { sendResponse } from "../../utils/sendResponse"

const createIssues = async (req: Request, res: Response) => {
    try {
        const result = await issuesService.createIssuesQuery(req.body, req.user?.id)
        sendResponse(res, { statusCode: 201, success: true, message: "Issue posted", data: result.rows[0] })


    }
    catch (err: any) {
        sendResponse(res, { statusCode: 500, success: false, message: err.message, error: err })
    }
}

const getIssues = async (req: Request, res: Response) => {
    try {
        const { sort, type, status } = req.query
        const result = await issuesService.getIssuesQuery(sort as string, type as Type, status as status)
        sendResponse(res, { statusCode: 200, success: true, message: "Issues retrieved", data: result.rows })

    }
    catch (err: any) {
        sendResponse(res, { statusCode: 500, success: false, message: err.message, error: err })

    }
}

const getSingleIssue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await issuesService.getSingleIssueQuery(id as string)
        if (result.rows.length === 0) {
            return sendResponse(res, { statusCode: 404, success: false, message: "Issue not found", data: {} })
        }


        sendResponse(res, { statusCode: 200, success: true, message: "Issue retrieved", data: result.rows })
    }
    catch (err: any) {
        sendResponse(res, { statusCode: 500, success: false, message: err.message, error: err })

    }
}

const updateIssue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await issuesService.updateIssueQuery(id as string, req.body)
        if (result.rows.length === 0) {
            return sendResponse(res, { statusCode: 404, success: false, message: "Issue not found", data: {} })
        }
        sendResponse(res, { statusCode: 200, success: true, message: "Issue updated", data: result.rows })

    }
    catch (err: any) {
        sendResponse(res, { statusCode: 500, success: false, message: err.message, error: err })

    }
}

const deleteIssue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await issuesService.deleteIssueQuery(id as string)
        if (result.rows.length === 0) {
            return sendResponse(res, { statusCode: 404, success: false, message: "Issue not found", data: {} })
        }
        sendResponse(res, { statusCode: 200, success: true, message: "Issue Deleted", data: {} })
    }


    catch (err: any) {
        sendResponse(res, { statusCode: 500, success: false, message: err.message, error: err })
    }
}

export const issuesController = {
    createIssues,
    getIssues,
    getSingleIssue,
    updateIssue,
    deleteIssue
}