import type { UserRole } from "../../types";

export interface IUser {
    name : string,
    email : string,
    password : string,
    role : UserRole
}