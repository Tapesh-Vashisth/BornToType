import ProfileContainer from "./reusableComp/ProfileContainer";
import {useState, useEffect} from "react";
import SessionsContainer from "./reusableComp/SessionsContainer";
import axios from "axios";
import { createSemanticDiagnosticsBuilderProgram } from "typescript";
import { baseURL } from "../../../middleware/apiList";
import { useAppSelector } from "../../../store/hooks";


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

    useEffect(() => {
        getsessions()
    }, [])

    return(
        <ProfileContainer heading="Sessions">
            {sessions.map((hold) => {
                return (<SessionsContainer wpm={hold.wpm} accuracy={hold.accuracy} timingMode={hold.timingmode} />)
            })}
        </ProfileContainer>
    )
}

export default Sessions;