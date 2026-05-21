import { pool } from "../../db/initDB"

const createIssuesQuery = async(payload : any, reporter_id: number) =>{
    const {title, description, type} = payload
    const result = pool.query(`INSERT INTO issues(title, description,type, reporter_id)
        VALUES($1,$2,$3,$4)
        RETURNING *
        `,[title, description,type,reporter_id])
    return result
}
export const issuesService = {
    createIssuesQuery
}