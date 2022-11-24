import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    flexRow:{
        display:"flex",
        flexDirection:"row",
        justifyContent: "space-between"
    },
    flexColumn:{
        display:"flex",
        flexDirection:"column"
    },
    buttonStyle:{
        padding:"0.5rem",
        cursor:"pointer",
        borderColor:"none",
        borderRadius:"0.5rem",
        color:"black",
        width:"100%",
    }
}))