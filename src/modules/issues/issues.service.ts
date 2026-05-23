import { pool } from "../../db/initDB"
import { type Type, type status } from "../../types/index"
import { type IIssue } from "./issues.interface"

const createIssuesQuery = async (payload: IIssue, reporter_id: number) => {
    const { title, description, type } = payload
    const result = await pool.query(`INSERT INTO issues(title, description,type, reporter_id)
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

    const result = await pool.query(`
    SELECT
        issues.id,
        issues.title,
        issues.description,
        issues.type,
        issues.status,

        json_build_object(
            'id', users.id,
            'name', users.name,
            'role', users.role
        ) AS reporter,

        issues.created_at,
        issues.updated_at

    FROM issues
    LEFT JOIN users
    ON issues.reporter_id = users.id

    WHERE ($1::text IS NULL OR issues.type = $1)
    AND ($2::text IS NULL OR issues.status = $2)
    ORDER BY issues.created_at ${sortQuery};
`, [type, status]);

    return result
}

const getSingleIssueQuery = async (issue_id: string) => {
    const issueResult = await pool.query(`SELECT *
        FROM issues
        WHERE issues.id = $1

    `, [issue_id])

    if (issueResult.rowCount === 0) {
        return null
    }

    const userResult = await pool.query(`SELECT users.id, users.name, users.role 
        FROM users
        WHERE id =$1`, [issueResult.rows[0].reporter_id])

    delete issueResult.rows[0].reporter_id

    const result = {
        ...issueResult.rows[0],
        reporter: userResult.rows[0]
    }
    return result
}

const updateIssueQuery = async (issue_id: string, payload: IIssue) => {
    const { title, description, type } = payload
    const result = await pool.query(`UPDATE issues
        SET title = COALESCE($1, title),
        description = COALESCE($2, description),
        type = COALESCE($3, type)
        WHERE id = $4
        RETURNING *
    `, [title, description, type, issue_id])
    return result
}

const deleteIssueQuery = async (issue_id: string) => {
    const result = await pool.query(`DELETE FROM issues
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