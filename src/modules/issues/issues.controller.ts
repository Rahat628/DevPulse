import { type Request, type Response } from "express"
import { issuesService } from "./issues.service"
import type { status, type } from "../../types"

const createIssues = async (req: Request, res: Response) => {
    try {
        const result = await issuesService.createIssuesQuery(req.body, req.user?.id)
        res.status(201).json({
            success: true,
            message: "Issue posted",
            data: result.rows[0]
        })

    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err
        })

    }
}

const getIssues = async (req: Request, res: Response) => {
    try {
        const { sort, type, status } = req.query
        const result = await issuesService.getIssuesQuery(sort as string, type as type, status as status)
        res.status(200).json({
            success: true,
            message: "Issues retrieved",
            data: result.rows
        })
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err
        })
    }
}

const getSingleIssue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await issuesService.getSingleIssueQuery(id as string)
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Issue not found",
                data: {}
            })
        }
        res.status(200).json({
            success: true,
            message: "Issue retrieved",
            data: result.rows
        })
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err
        })
    }
}

const updateIssue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await issuesService.updateIssueQuery(id as string, req.body)
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Issue not found",
                data: {}
            })
        }
        res.status(200).json({
            success: true,
            message: "Issue updated",
            data: result.rows
        })

    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err

        })
    }
}

export const issuesController = {
    createIssues,
    getIssues,
    getSingleIssue,
    updateIssue
}