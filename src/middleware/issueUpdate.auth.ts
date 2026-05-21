import { type NextFunction, type Request, type Response } from "express";
import { Roles } from "../types";
import { pool } from "../db/initDB";



// this auth checks jwtToken and also checks if the user has the require role and valid user or not

const issueUpdateAuth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.id
            const role = req.user?.role
            if(role === Roles.contributor){
                const result = await pool.query(`SELECT status, reporter_id
                    FROM issues
                    WHERE id = $1
                    `, [userId])
                
                if(result.rows.length === 0){
                    throw new Error("Issue not found")
                }
                if(result.rows[0].reported_id !== req.user?.id && result.rows[0].status !== 'open'){
                    throw new Error("Forbidden Access")
                }
            }

            next()


        }
        catch (err: any) {
            res.status(401).json({
                success: false,
                message: err.message,
                error: err
            })

        }

    }
}

export default issueUpdateAuth