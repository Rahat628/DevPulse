import {type Response} from "express";
import { type responseType } from "../types";


export const sendResponse = <T>(res: Response, data : responseType<T>) => {
    return res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
        error : data.error
    })
}