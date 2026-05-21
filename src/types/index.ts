export const Roles = {
    contributor : 'contributor',
    maintainer : 'maintainer'
} as const

export type UserRole = keyof typeof Roles

export type type ='bug'| 'feature-request'|null

export type status = 'open' | 'in_progress'|"resolved"| null