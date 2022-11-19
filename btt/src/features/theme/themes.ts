import {theme} from "../../types/themetype";
import "../../styles/contact.css";

const themes: theme[] = [
    {
        background: "#1c1c1c",
        fontColor: "#F5F5F7",
        buttonbg: "blue",
        buttonfg: "green",
        playgroundcolor: "green",
        right: "pink",
        wrong: "red",
        normal: "black"
    },
    {
        background: "green",
        fontColor: "#b4b8ad",
        buttonbg: "",
        buttonfg: "",
        playgroundcolor: "#262926", 
        right: "#44e34f",
        wrong: "#d4263a",
        normal: "#9c9c9c"
    }
    // dark: {
    //     background: ,
    //     fontColor:,
    //     buttonbg: ,
    //     buttonfg: ,
    //     playgroundcolor:, 
    //     right: ,
    //     wrong: ,
    //     normal: 
    // },
]

export const fontfamilies = ["Sofia", "Audiowide", "Trirong"];
export default themes;