import { makeStyles } from "@mui/styles";
import commonProfileStyles from "../../commonProfileStyles";

const styles = makeStyles((theme)=>({
    mainSessionsContainer:{
        justifyContent:"space-evenly"
    },
    attributesContainer:{
        marginRight:"1rem",
    }
}))

const SessionsContainer = (props:{
    wpm:number,
    accuracy:number,
    timingMode:number
}) => {
    const sessionsStyles = styles()
    const commonProfStyles = commonProfileStyles()
    return (
        <div className={`${commonProfStyles.flexRow}`}>
            <div className={sessionsStyles.attributesContainer}>
                <h4>Word Per Minute</h4>
                <p>{props.wpm}</p>
            </div>
            <div className={sessionsStyles.attributesContainer}>
                <h4>{"Accuracy"}</h4>
                <p>{props.accuracy}%</p>
            </div>
            <div>
                <h4>{"Timing Mode"}</h4>
                <p>{props.timingMode} sec</p>
            </div>
        </div>
    )
}

export default SessionsContainer