import { type Request, type Response } from "express"
import { issuesService } from "./issues.service"

const createIssues = async(req: Request, res : Response) =>{
    try{
        const result = await issuesService.createIssuesQuery(req.body,req.user?.id)
        res.status(201).json({
            success: true,
            message: "Issue posted",
            data: result.rows[0]
        })

    }
    catch(err:any){
        res.status(201).json({
            success: false,
            message: err.message,
            error: err
        })

    }
}

export const issuesController ={
    createIssues
}