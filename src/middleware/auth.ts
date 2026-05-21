import { type NextFunction, type Request, type Response } from "express";
import type { UserRole } from "../types";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db/initDB";
import config from "../config";

const auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization
            const decoded: JwtPayload = jwt.verify(token as string, config.jwtSecret as string) as { role: UserRole }
            // if decoded result is not valid then throw error
            if (!decoded) {
                throw new Error("Invalid token")
            }

            const user = await pool.query(`SELECT * FROM users 
                WHERE id = $1`, [decoded.id])

            if (user.rows.length == 0) {
                throw new Error("User not found")
            }

            if (!roles.includes(decoded.role)) {
                throw new Error("Forbidden Access")
            }

            req.user = decoded


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

export default auth