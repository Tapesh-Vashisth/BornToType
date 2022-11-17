import axios from "axios";
import { LoginCredentials, SignupCredentials } from "../../types/auth/authtypes";
import { userAuthApiConfig } from "../apiList";

const userSignInApi = async (incomingData:LoginCredentials) => {
    return await axios.post(userAuthApiConfig.login,incomingData,{withCredentials:true})
}

const userSignUpApi = async (incomingData:SignupCredentials) => {
    return await axios.post(userAuthApiConfig.signup,incomingData,{withCredentials:true})
}

const userSignOutApi = async () => {
    return await axios.get(userAuthApiConfig.logout,{withCredentials:true})
}

const userAuthApi = {
    userSignInApi:userSignInApi,
    userSignUpApi:userSignUpApi,
    userSignOutApi:userSignOutApi
}

export default userAuthApi