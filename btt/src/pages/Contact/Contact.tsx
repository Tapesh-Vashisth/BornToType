import react from "react";
import {Stack} from "@mui/material";
import "./Contact.css";
import EmailIcon from '@mui/icons-material/Email';
import FeedbackIcon from '@mui/icons-material/Feedback';
import BugReportIcon from '@mui/icons-material/BugReport';

const Contact = () => {
    return (
        <Stack style = {{maxWidth: "100%", padding: "0px 30px"}} direction = "column" justifyContent="center">
            <header className="header">
                <img className="logo" src="images/typo_dot_com_logo.png" alt="logo" />
                <h1 className="contact">
                    Contact
                </h1>
            </header>
            <p className = "contact special">You like our typo? Give us a feedback or feel free to send an email to shashank.r21@iiits.in (the buttons below will open the default mail client).</p>
            <ul>
                <li>
                    <div className="buttons">
                        <FeedbackIcon />
                        <a href="mailto:shashankraj3636@gmail.com ?subject=Feedback!">Feedback</a>
                    </div>
                </li>
                <li>
                    <div className="buttons" >
                        <EmailIcon />
                        <a href="mailto:shashankraj3636@gmail.com ?subject=Question!">Question</a>
                    </div>
                </li>
                <li>
                    <div className="buttons">
                        <BugReportIcon />
                        <a href="mailto:shashankraj3636@gmail.com ?subject=Found a Bug!">Bug Report</a>
                    </div>
                </li>
            </ul>
        </Stack>
    )
}

export default Contact;