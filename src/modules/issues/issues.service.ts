import { pool } from "../../db/initDB"
import { type Type, type status } from "../../types/index"
import { type IIssue } from "./issues.interface"

const createIssuesQuery = async (payload: IIssue, reporter_id: number) => {
    const { title, description, type } = payload
    const result = pool.query(`INSERT INTO issues(title, description,type, reporter_id)
        VALUES($1,$2,$3,$4)
        RETURNING *
        `, [title, description, type, reporter_id])
    return result
}
// reporter_id not done
const getIssuesQuery = async (sort: string, type: Type, status: status) => {

    let sortQuery = 'DESC'
    if (sort === 'oldest') {
        sortQuery = 'ASC'
    }
    const result = pool.query(`SELECT *
        FROM issues
        WHERE ($1::text IS NULL OR type = $1)
        AND ($2::text IS NULL OR status = $2)
        ORDER BY issues.created_at ${sortQuery};

    `, [type, status])
    return result
}

const getSingleIssueQuery = async (issue_id: string) => {
    const result = pool.query(`SELECT *
        FROM issues
        WHERE issues.id = $1

    `, [issue_id])
    return result
}

const updateIssueQuery = async (issue_id: string, payload: IIssue) => {
    const {title, description, type} = payload
    const result = pool.query(`UPDATE issues
        SET title = COALESCE($1, title),
        description = COALESCE($2, description),
        type = COALESCE($3, type)
        WHERE id = $4
        RETURNING *
    `, [title, description, type, issue_id])
    return result
}

const deleteIssueQuery = async (issue_id: string) => {
    const result = pool.query(`DELETE FROM issues
        WHERE id = $1
    `, [issue_id])
    return result
}


export const issuesService = {
    createIssuesQuery,
    getIssuesQuery,
    getSingleIssueQuery,
    updateIssueQuery,
    deleteIssueQuery
}