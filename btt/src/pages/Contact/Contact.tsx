import react from "react";
import {Stack} from "@mui/material";
import "./Contact.css";
import EmailIcon from '@mui/icons-material/Email';
import FeedbackIcon from '@mui/icons-material/Feedback';
import BugReportIcon from '@mui/icons-material/BugReport';
import themes from "../../features/theme/themes";
import { useAppSelector } from "../../store/hooks";

const Contact = () => {
    const theme = useAppSelector((state) => state.theme);
    return (
        <Stack style = {{maxWidth: "100%", padding: "0px 30px", color: themes[theme.theme].fontColor}} direction = "column" justifyContent="center">
            <header className="header">
                <img className="logo" src="images/typo_dot_com_logo.png" alt="logo" />
                <h1 className="contact" style = {{color: themes[theme.theme].fontColor}} >
                    Contact
                </h1>
            </header>
            <p className = "contact special" style = {{color: themes[theme.theme].fontColor}}>You like our typo? Give us a feedback or feel free to send an email to shashank.r21@iiits.in (the buttons below will open the default mail client).</p>
            <ul>
                <li>
                    <div className="buttons">
                        <FeedbackIcon />
                        <a style = {{color: themes[theme.theme].fontColor}} href="mailto:shashankraj3636@gmail.com ?subject=Feedback!">Feedback</a>
                    </div>
                </li>
                <li>
                    <div className="buttons" >
                        <EmailIcon />
                        <a href="mailto:shashankraj3636@gmail.com ?subject=Question!" style = {{color: themes[theme.theme].fontColor}}>Question</a>
                    </div>
                </li>
                <li>
                    <div className="buttons">
                        <BugReportIcon />
                        <a href="mailto:shashankraj3636@gmail.com ?subject=Found a Bug!" style = {{color: themes[theme.theme].fontColor}}>Bug Report</a>
                    </div>
                </li>
            </ul>
        </Stack>
    )
}

export default Contact;