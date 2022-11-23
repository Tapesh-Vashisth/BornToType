import axios from "axios";
import { LoginCredentials, SignupCredentials } from "../../types/auth/authtypes";
import { themeApiConfig } from "../apiList";

const fetchThemeApi = async (getuser: {username: string}) => {
    console.log("hmm")
    return await axios.post(themeApiConfig.fetch, getuser);
}

const themeApi = {
    fetchThemeApi
}

export default themeApi