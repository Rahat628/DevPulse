export const Roles = {
    contributor : 'contributor',
    maintainer : 'maintainer'
} as const

export type UserRole = keyof typeof Roles

export type Type ='bug'| 'feature-request'|null

export type status = 'open' | 'in_progress'|"resolved"| null

export type responseType<T> = {
    statusCode : number,
    success : boolean,
    message : string,
    data? : T,
    error? : any
}
