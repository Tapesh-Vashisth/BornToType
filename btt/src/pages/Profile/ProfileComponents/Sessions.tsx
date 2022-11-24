import ProfileContainer from "./reusableComp/ProfileContainer";
import {useState, useEffect} from "react";
import SessionsContainer from "./reusableComp/SessionsContainer";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import commonProfileStyles from "../commonProfileStyles";
import { baseURL } from "../../../middleware/apiList";
import { useAppSelector } from "../../../store/hooks";

const styles = makeStyles((theme)=>({
    mainSessionsContainer:{
        justifyContent:"space-evenly"
    },
    attributesContainer:{
        marginRight:"1rem",
    }
}))

const Sessions = () => {
    const user = useAppSelector((state) => state.user);
    const [sessions, setSessions] = useState<{wpm: number, accuracy: number, timingmode: number}[]>([]);

    const getsessions = async () => {
        try {
            const response = await axios.post(baseURL + "/getsessions", {username: user.username});
            const data = await response.data;
            setSessions(data);
        } catch (err: any) {
            alert("couldn't load sessions");
        }
    }
    const sessionsStyles = styles();
    const commonProfStyles = commonProfileStyles()


    useEffect(() => {
        getsessions()
    }, [])

    return(
        <ProfileContainer heading="Sessions">
            <div className={`${commonProfStyles.flexRow}`}>
                <div className={sessionsStyles.attributesContainer}>
                    <h4>Word Per Minute</h4>
                </div>
                <div className={sessionsStyles.attributesContainer}>
                    <h4>Accuracy</h4>
                </div>
                <div>
                    <h4>Timing Mode</h4>
                </div>
            </div>
            {sessions.map((hold) => {
                return (
                    <SessionsContainer wpm={hold.wpm} accuracy={hold.accuracy} timingMode={hold.timingmode} />
                )
            })}
        </ProfileContainer>
    )
}

export default Sessions;