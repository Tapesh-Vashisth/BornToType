import react,  {useState, useEffect} from "react";
import { Box } from '@mui/material';
import { listeners } from "process";
import { isConstructorDeclaration } from "typescript";
import { borderRight } from "@mui/system";
import {useAppSelector, useAppDispatch} from "../store/hooks";
import {Stack} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import themes from "../features/theme/themes";
import axios from "axios";
import { baseURL } from "../middleware/apiList";



let pointerhelper:number = 0;
const modes = [30, 45, 60];

const Home = () => {
    const user = useAppSelector((state) => state.user);
    const theme = useAppSelector(state => state.theme);
    const [mode, setmode] = useState<number>(5);
    const [writer, setwriter] = useState<boolean>(false);
    const [counter, setcounter] = useState<number>(0);
    const [pointer, setpointer] = useState<number>(0);
    const [para, setpara] = useState<string>("");
    const [paraArray, setArray] = useState<{character: string, status: number, pointerStatus: boolean} []>([{character: "", status: 1, pointerStatus: true}]);
    const [result, setresult] = useState<boolean>(false);
    const [correctCharacters, setCorrectCharacters] = useState<number>(0);
    const [totalTyped, setTotalTyped] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(0.0);
    const [wpm, setWpm] = useState<number>(0.0);

    let counterInterval : NodeJS.Timer;

    const handleMode = (mod: number) => {
        setcounter(0);
        setmode(mod);
    }
    
    const writerToggler = () => {
        console.log(paraArray);
        setwriter((prev) => !prev);
    }

    const nextHandler = () => {
        console.log(counter);
        setpointer(0);
        setcounter(0);
        setresult(false);
        setwriter(true);
        setCorrectCharacters(0);
        setTotalTyped(0);
        let holdarray = [];
        for (let i = 0; i < para.length; i++){
            holdarray.push({character: para[i], status: 1, pointerStatus: false});
        }
        holdarray[0].pointerStatus = true;
        setArray(holdarray);
    }

    function playgroundHandler(event: KeyboardEvent){
        console.log(pointerhelper);
        let typed = event.key;
        console.log(typed);
        if (typed === "Shift" || typed === "Delete" || typed === "Enter" || typed === "Alt" || typed === "Control" || typed === "ArrowUp" || typed === "ArrowDown" || typed === "ArrowRight" || typed === "ArrowLeft" || typed === "Meta" || typed === "CapsLock" || typed === "Escape" || typed === "PageUp" || typed === "PageDown" || typed === "Home" || typed === "End" || typed === "NumLock" || typed === "Clear" || typed === "AudioVolumeUp"|| typed === "AudioVolumeDown"|| typed === "MediaTrackPrevious" || typed === "MediaTrackNext" || typed === "MediaTrackPause" || typed === "AudioVolumeMute"|| typed === "Unidentified"){
            return ;
        }
        let correct = para[pointerhelper];
        setTotalTyped((prev) => prev + 1);
        if (typed === correct){
            setCorrectCharacters((prev) => prev + 1);
        }
        if (typed === "Backspace"){
            let updated: {character: string, status: number, pointerStatus: boolean} [] = paraArray;
            if (pointerhelper === 0){
                return ;
            }
            updated[pointerhelper - 1].status = 1;
            updated[pointerhelper - 1].pointerStatus = true;
            updated[pointerhelper].pointerStatus = false;
            setArray(updated);
            setpointer((prev) => prev - 1);
        }else{
            let updated: {character: string, status: number, pointerStatus: boolean} [] = paraArray;
            if (typed == correct){
                console.log(true);
                updated[pointerhelper].status = 2;
            }else{
                console.log(false);
                updated[pointerhelper].status = 3;
            }
            updated[pointerhelper].pointerStatus = false;
            updated[pointerhelper + 1].pointerStatus = true;

            setArray(updated);
            setpointer((prev) => prev + 1);
        }
    }

    useEffect(() => {
        pointerhelper = pointer;
    }, [pointer]);

    useEffect(() => {
        let hold = "my name is tapesh Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad earum voluptas consequatur doloribus dolore debitis ipsa incidunt assumenda at laborum eaque explicabo harum praesentium dicta, quasi nihil esse consectetur, expedita asperiores modi dolor? Iusto, quaerat quasi voluptas suscipit distinctio dolorem earum quibusdam veritatis? Totam, culpa laboriosam?";
        setpara(hold);
        console.log(hold);
        let holdarray = [];
        for (let i = 0; i < hold.length; i++){
            holdarray.push({character: hold[i], status: 1, pointerStatus: false});
        }
        holdarray[0].pointerStatus = true;
        setArray(holdarray);
    }, []);

    useEffect(() => {
        if (writer){
            document.body.addEventListener("keydown", playgroundHandler);
        }
        return () => {
            document.body.removeEventListener("keydown", playgroundHandler);
        }
    }, [writer]);

    const saveData = async (wpm: number, accuracy: number, timingmode: number) => {
        try {
            await axios.post(baseURL + "/postUserSession", {username: user.username, wpm, accuracy, timingmode});
        } catch (err: any) {
            alert("couldn't save data");
        }
    }

    useEffect(() => {
        if (writer){
            counterInterval = setInterval(() => {
                console.log(counter);
                if (counter < mode){
                    setcounter((prev) => prev + 1);
                }else{
                    let accurate = +(((correctCharacters*1.0)/totalTyped) * 100).toFixed(2);
                    let minutes = counter/60;
                    let wpmcal = +(((correctCharacters*1.0)/5)/minutes).toFixed(2);
                    setWpm(wpmcal);
                    setAccuracy(accurate);
                    setpointer(0);
                    clearInterval(counterInterval);
                    setwriter(false);
                    setresult(true);
                    if (user.islogin){
                        saveData(Math.floor(wpmcal), accurate, mode);
                    } 
                }
            }, 1000);
        }

        return (() => {
            clearInterval(counterInterval);
        })
    }, [counter, writer])

    return (
        <Box alignItems = "center" justifyContent="center" style = {{fontSize: theme.fontSize}}>
            {writer && (!result) ? 
                <Stack direction = "column" justifyContent = "center" alignItems="center" rowGap = "20px">
                    <Stack direction = "row" style = {{fontSize: "20px", padding: "10px"}}>{mode - counter}</Stack>
                    <p onClick={writerToggler} className="mainplayground" style = {{width: "70%", textAlign: "justify", margin: "auto", padding: "35px", fontSize: "20px", /* backgroundColor: themes[theme.theme].playgroundcolor, */ borderRadius: "15px"}}>{paraArray.map((x) => {
                        if (x.status === 1){
                            return <span style={x.pointerStatus ? {color: themes[theme.theme].normal, borderLeft: "1px solid yellow", fontSize: theme.fontSize, fontFamily: theme.fontfamily}: {color: themes[theme.theme].normal, opacity: "0.7", fontSize: theme.fontSize, fontFamily: theme.fontfamily}}>{x.character}</span>;
                        }else if(x.status == 2){
                            return <span style={x.pointerStatus ? {color: themes[theme.theme].right, borderLeft: "1px solid yellow", fontSize: theme.fontSize, fontFamily: theme.fontfamily}: {color: themes[theme.theme].right, fontSize: theme.fontSize, fontFamily: theme.fontfamily}}>{x.character}</span>;
                        }else{
                            return <span style={x.pointerStatus ? {color: themes[theme.theme].wrong, borderLeft: "1px solid yellow", fontSize: theme.fontSize, fontFamily: theme.fontfamily}: {color: themes[theme.theme].wrong, fontSize: theme.fontSize, fontFamily: theme.fontfamily}}>{x.character}</span>;
                        }
                    })}</p>
                </Stack>
                : (!writer && (!result)) ?
                <Stack direction = "column" rowGap = "20px">
                    <Stack direction = "row" justifyContent = "center" alignItems="center" spacing = "20px">
                        {modes.map((x) => {
                            return (
                                <Stack onClick = {() => {handleMode(x)}} style = {{cursor: "crosshair"}} justifyContent = "center" direction = "column" alignItems="center">{x}</Stack>
                            )
                        })}
                    </Stack>
                    <p onClick={writerToggler} style = {{textAlign: "center", margin: "auto", fontSize: "20px", backgroundColor: themes[theme.theme].playgroundcolor, borderRadius: "15px", padding: "30px"}}>click here to start</p>
                </Stack>
                :
                <Stack direction = "column" spacing = "20px">
                    <Stack direction = "row" justifyContent = "center" alignItems="center" spacing = "20px">
                        {modes.map((x) => {
                                return (
                                    <Stack onClick = {() => {handleMode(x)}} style = {{cursor: "crosshair"}} justifyContent = "center" direction = "column" alignItems="center">{x}</Stack>
                            )
                        })}
                    </Stack>
                    <Stack direction = "row" spacing = {2} justifyContent = "center" alignItems="center">
                        <Stack direction = "column" >
                            <Stack direction = "row" justifyContent="center">WPM</Stack>
                            <Stack direction = "row" justifyContent="center">{wpm}</Stack>
                        </Stack>
                        <Stack direction = "column">
                            <Stack direction = "row" justifyContent="center">Accuracy</Stack>
                            <Stack direction = "row" justifyContent="center">{accuracy}</Stack>
                        </Stack>
                    </Stack>
                    <Stack direction = "row" justifyContent = "center">
                        <NavigateNextIcon onClick = {nextHandler} />
                    </Stack>
                </Stack>
            }
        </Box>
    )
}

export default Home;