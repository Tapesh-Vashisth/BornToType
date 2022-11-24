import { Typography } from "@mui/material";
import commonProfileStyles from "../commonProfileStyles";
import ProfileContainer from "./reusableComp/ProfileContainer";
import axios from "axios";
import {useState} from "react";
import { baseURL } from "../../../middleware/apiList";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { userActions } from "../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import themes from "../../../features/theme/themes";


const MyInformation = () => {
    const [oldpassword, setOldPassword] = useState<string>("");
    const theme = useAppSelector((state) => state.theme);
    const [newPassword, setNewPassword] = useState<string>("");
    const [deletepass, setDeletePass] = useState<string>("");
    const user = useAppSelector((state) => state.user);
    const commonProfStyles = commonProfileStyles();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const submitPasswordHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }   

    const deleteuser = async () => {
        try {
            const res = await axios.post(baseURL + "/api/delete", {password: deletepass, username: user.username});
            dispatch(userActions.actions.logoutOutUser());
            navigate("/");
        } catch (err) {
            alert("something went wrong!");
        }
    }

    const deleteHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("hoooo")
        deleteuser();
    }

    const changePassword = async () => {
        try {
            const resp = await axios.post(baseURL + "/changepassword", {username: user.username, oldPassword: oldpassword, newPassword: newPassword});
            alert("password successfully changed");
        } catch {
            alert("something went wrong");
        }
    }

    const passwordHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        changePassword();
    }

    return (
        <ProfileContainer heading="My Information">
            <div>
                <h3>Your Information</h3>
                <div>
                    <label htmlFor="user">Username</label><br/>
                    <input disabled id="user" style={{ padding: "10px", color: themes[theme.theme].fontColor, width: "100%", backgroundColor: themes[theme.theme].background, fontSize: "20px", border: "1px solid grey", borderRadius: "5px"}} value={localStorage.getItem("username")!} />
                </div>
                <div>
                    <label htmlFor="email">Email Address</label><br/>
                    <input disabled id="email" style={{ padding: "10px", color: themes[theme.theme].fontColor, width: "100%", backgroundColor: themes[theme.theme].background, fontSize: "20px", border: "1px solid grey", borderRadius: "5px"}} value={localStorage.getItem("email")!} />
                </div>
            </div>
            <div>
                <h3>Change Password</h3>
                <hr/><br/>
                <form onSubmit={passwordHandler}>
                    <div>
                        <label htmlFor="oldPass">Current Password</label><br/>
                        <input id="oldPass" type="password" style={{ padding: "10px", color: themes[theme.theme].fontColor, width: "100%", backgroundColor: themes[theme.theme].background, fontSize: "20px", border: "1px solid grey", borderRadius: "5px"}} onChange = {(e: React.ChangeEvent<HTMLInputElement>) => {
                        setOldPassword(e.target.value);
                    }} />
                    </div>
                    <div>
                        <label htmlFor="newPass">New Password</label><br/>
                        <input id="newPass" type="password" style={{ padding: "10px", color: themes[theme.theme].fontColor, width: "100%", backgroundColor: themes[theme.theme].background, fontSize: "20px", border: "1px solid grey", borderRadius: "5px"}} onChange = {(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNewPassword(e.target.value);
                    }}/>
                    </div>
                    <br/>
                    <div>
                        <button type="submit" className={commonProfStyles.buttonStyle} style={{ padding: "10px", color: themes[theme.theme].fontColor, width: "100%", backgroundColor: themes[theme.theme].playgroundcolor, fontSize: "20px", border: "1px solid grey", borderRadius: "5px"}}>
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
            <br/>
            <div>
                <h3>Delete Account</h3>
                <hr/><br/>
                <form onSubmit={deleteHandler} style = {{display: "flex", flexDirection: "column", height: "180px", justifyContent: "space-between"}}>
                    <label htmlFor="currPass">Current Password</label>
                    <input id="currPass" type="password" style={{ padding: "10px", color: themes[theme.theme].fontColor, width: "100%", backgroundColor: themes[theme.theme].background, fontSize: "20px", border: "1px solid grey", borderRadius: "5px"}} onChange = {(e: React.ChangeEvent<HTMLInputElement>) => {
                        setDeletePass(e.target.value);
                    }} />
                    <button type="submit" className={commonProfStyles.buttonStyle} style={{ padding: "10px", color: themes[theme.theme].fontColor, width: "100%", backgroundColor: themes[theme.theme].playgroundcolor, fontSize: "20px", border: "1px solid grey", borderRadius: "5px"}}>
                        Delete Account
                    </button>
                </form><br/>
            </div>
        </ProfileContainer>
    )
}

export default MyInformation;