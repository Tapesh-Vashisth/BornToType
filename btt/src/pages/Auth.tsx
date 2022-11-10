import react, { useState } from "react";
import { Stack } from '@mui/material';
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";

const Auth = () => {
    const [login, setlogin] = useState<boolean>(true);
    const [name, setname] = useState<string>('');
    const [email, setemail] = useState<string>('');
    const [password, setpassword] = useState<string>('');

    const handlechange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setinput: (val: string) => void) => {
        setinput(event.target.value);
    }

    const submithandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (login){
            const res = await axios.post("http://localhost:9494/bttServer/login", {email: email, password});
        }else{
            const res = await axios.post("http://localhost:9494/bttServer/signup", {name: name, email: email, password});
        }
    }

    const modeToggler = () => {
        setlogin(!login)
    }

    return (
        <form action="" method="POST" onSubmit={submithandler}>
            <Stack alignItems="center" justifyContent="center" spacing={1}>
                {!login && <TextField type="text" style={{ padding: "0px" }} label="Username" variant="outlined" onChange={(event) => { handlechange(event, setname) }} />}
                <TextField type="email" style={{ padding: "0px" }} label="Email" variant="outlined" onChange={(event) => { handlechange(event, setemail) }} />
                <TextField type="password" style={{ padding: "0px" }} label="password" variant="outlined" onChange={(event) => { handlechange(event, setpassword) }} />
                <Button type="submit" variant="contained">Submit</Button>
                <Button style={{ textDecoration: "none", color: "black" }} onClick={modeToggler} >{login ? `create a new account?` : `Already a user?`}</Button>
            </Stack>
        </form>
    )
}

export default Auth;