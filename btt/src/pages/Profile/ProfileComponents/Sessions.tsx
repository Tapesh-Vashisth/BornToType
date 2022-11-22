import ProfileContainer from "./reusableComp/ProfileContainer";
import SessionsContainer from "./reusableComp/SessionsContainer";


const Sessions = () => {
    return(
        <ProfileContainer heading="Sessions">
            <SessionsContainer wpm={34} accuracy={89} timingMode={30} />
        </ProfileContainer>
    )
}

export default Sessions;