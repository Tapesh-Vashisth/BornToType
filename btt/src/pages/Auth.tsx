import react, { useState } from "react";
import { Stack,Typography } from '@mui/material';
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { LoginCredentials, SignupCredentials } from "../types/auth/authtypes";
import { userActions } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useSelector } from "react-redux";
import {setTheme, setFontSize, setFontFamily, setAllTheme} from "../features/theme/themeSlice";
import { RootState } from "../store/store";
import themes from "../features/theme/themes";

const Auth = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const theme = useAppSelector((state) => state.theme);
    const authState = useSelector((state:RootState) => state.user)
    const [login, setlogin] = useState<boolean>(true);
    const [name, setname] = useState<string>('');
    const [email, setemail] = useState<string>('');
    const [password, setpassword] = useState<string>('');

    const handlechange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setinput: (val: string) => void) => {
        setinput(event.target.value);
    }

    const modeToggler = () => {
        setlogin(!login)
    }

    const submithandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (login){
            const sendData:LoginCredentials = {
                email:email,
                password:password
            }
            const res = await dispatch(userActions.loginThunk(sendData));
            if (userActions.loginThunk.fulfilled.match(res)){
                dispatch(setAllTheme(res.payload))
                navigate("/")
            }
            else{
                alert("Invalid Credentials")
            }
        }else{
            const sendData:SignupCredentials = {
                username:name,
                email:email,
                password:password,
                theme:theme.theme,
                fontSize:theme.fontSize,
                fontfamily:theme.fontfamily
            }
            const res = await dispatch(userActions.signUpThunk(sendData));
            if (userActions.signUpThunk.fulfilled.match(res)){
                modeToggler()
            }
            else{
                alert("Invalid Credentials")
            }
        }
    }

    return (
        <div>
            <Typography variant="h5" style={{color: themes[theme.theme].fontColor ,marginBottom:"1rem"}}>{login?"Sign In":"Sign Up"}</Typography>
            <form action="" method="POST" onSubmit={submithandler}>
                <Stack alignItems="center" justifyContent="center" spacing={1}>
                    {!login && <TextField type="text" style={{ padding: "0px", color: themes[theme.theme].fontColor }} label="Username" variant="outlined" onChange={(event) => { handlechange(event, setname) }} />}
                    <TextField type="email" style={{ padding: "0px", color: "blue" }} label="Email" variant="outlined" onChange={(event) => { handlechange(event, setemail) }} />
                    <TextField type="password" style={{ padding: "0px", color: themes[theme.theme].fontColor }} label="password" variant="outlined" onChange={(event) => { handlechange(event, setpassword) }} />
                    <Button type="submit" variant="contained">Submit</Button>
                    <Button style={{ textDecoration: "none", color: "black" }} onClick={modeToggler} >{login ? `create a new account?` : `Already a user?`}</Button>
                </Stack>
            </form>
        </div>
    )
}

export default Auth;