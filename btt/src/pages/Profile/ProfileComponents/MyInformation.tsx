import { Typography } from "@mui/material";
import commonProfileStyles from "../commonProfileStyles";
import ProfileContainer from "./reusableComp/ProfileContainer";

const MyInformation = () => {
    const commonProfStyles = commonProfileStyles()

    const submitPasswordHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
                <form>
                    <div>
                        <label htmlFor="oldPass">Current Password</label><br/>
                        <input id="oldPass" type="password" style={{padding:"0.3rem"}} />
                    </div>
                    <div>
                        <label htmlFor="newPass">New Password</label><br/>
                        <input id="newPass" type="password" style={{padding:"0.3rem"}}/>
                    </div>
                    <br/>
                    <button type="submit" className={commonProfStyles.buttonStyle}>
                        Change Password
                    </button>
                </form>
            </div>
            <br/>
            <div>
                <h3>Delete Account</h3>
                <hr/><br/>
                <form>
                    <label htmlFor="currPass">Current Password</label><br/>
                    <input id="currPass" type="password" style={{padding:"0.3rem"}} />
                </form><br/>
                <button type="submit" className={commonProfStyles.buttonStyle}>
                    Delete Account
                </button>
            </div>
        </ProfileContainer>
    )
}

export default MyInformation;