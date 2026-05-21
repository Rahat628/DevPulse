const Role = {
    contributor : 'contributor',
    maintainer : 'maintainer'
} as const

export type UserRole = keyof typeof Role