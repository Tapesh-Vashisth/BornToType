import { Typography } from "@mui/material";
import commonProfileStyles from "../commonProfileStyles";
import ProfileContainer from "./reusableComp/ProfileContainer";
import axios from "axios";
import {useState} from "react";
import { baseURL } from "../../../middleware/apiList";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { userActions } from "../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const MyInformation = () => {
    const [oldpassword, setOldPassword] = useState<string>("");
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
                    <input disabled id="user" style={{padding:"0.3rem"}} value={localStorage.getItem("username")!} />
                </div>
                <div>
                    <label htmlFor="email">Email Address</label><br/>
                    <input disabled id="email" style={{padding:"0.3rem"}} value={localStorage.getItem("email")!} />
                </div>
            </div>
            <div>
                <h3>Change Password</h3>
                <hr/><br/>
                <form onSubmit={passwordHandler}>
                    <div>
                        <label htmlFor="oldPass">Current Password</label><br/>
                        <input id="oldPass" type="password" style={{padding:"0.3rem"}} onChange = {(e: React.ChangeEvent<HTMLInputElement>) => {
                        setOldPassword(e.target.value);
                    }} />
                    </div>
                    <div>
                        <label htmlFor="newPass">New Password</label><br/>
                        <input id="newPass" type="password" style={{padding:"0.3rem"}} onChange = {(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNewPassword(e.target.value);
                    }}/>
                    </div>
                    <br/>
                    <button type="submit" className={commonProfStyles.buttonStyle} >
                        Change Password
                    </button>
                </form>
            </div>
            <br/>
            <div>
                <h3>Delete Account</h3>
                <hr/><br/>
                <form onSubmit={deleteHandler}>
                    <label htmlFor="currPass">Current Password</label><br/>
                    <input id="currPass" type="password" style={{padding:"0.3rem"}} onChange = {(e: React.ChangeEvent<HTMLInputElement>) => {
                        setDeletePass(e.target.value);
                    }} />
                    <button type="submit" className={commonProfStyles.buttonStyle}>
                        Delete Account
                    </button>
                </form><br/>
            </div>
        </ProfileContainer>
    )
}

export default MyInformation;