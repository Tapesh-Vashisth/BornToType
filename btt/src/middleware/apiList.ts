export const baseURL = "http://localhost:9494/bttServer";

export const userAuthApiConfig = {
    login:baseURL + "/login",
    signup:baseURL + "/signup",
    logout:baseURL + "/logout"
}

export const userSessionsApiConfig = {
    postUserSessionApi:"/postUserSession"
}