import { pool } from "../../db/initDB";
import bcrypt from "bcrypt"
import type { IUser } from "./users.interface";
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../../config";

const userSignUpQuery = async (payload: IUser) => {
    const { name, email, password, role } = payload;
    const hashPassword = await bcrypt.hash(password, 9)
    const result = await pool.query(`
        INSERT INTO users(name,email,password,role)
        VALUES($1,$2,$3,COALESCE($4,'contributor'))
        RETURNING *
        `, [name, email, hashPassword, role])

    delete result.rows[0].password
    return result;
}

const userSignInQuery = async (payload: { email: string, password: string }) => {
    const { email, password } = payload
    const result = await pool.query(`SELECT * FROM users
        WHERE email = $1`, [email])

    if (result.rows.length == 0) {
        throw new Error("Invalid Credentials!")
    }
    const matchPassword = bcrypt.compare(password, (await result).rows[0].password)
    if (!matchPassword) {
        throw new Error("Invalid Credentials!")
    }

    const user = result.rows[0]

    const jwtPayload = {
        id : user.id,
        name : user.name,
        role : user.role
    } as JwtPayload

    const accessToken = jwt.sign(jwtPayload,config.jwtSecret as string, {expiresIn : '1d'})
    delete user.password
    return {token : accessToken, user : user};

}

export const authService = {
    userSignUpQuery,
    userSignInQuery
}