export interface LoginCredentials {
    email: string,
    password: string
}


export interface SignupCredentials extends LoginCredentials {
    username: string
    theme: number
    fontSize: number
    fontfamily: string
}
