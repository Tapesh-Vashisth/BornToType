import { useState, ChangeEvent } from "react";
import {Stack, Slider, Grid} from "@mui/material";
import {Button, Typography, MenuItem, Select} from "@mui/material";
import themeType from "../types/themetype";
import fontType from "../types/fontType";
import axios from "axios";
import { baseURL } from "../middleware/apiList";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {SelectChangeEvent} from "@mui/material/Select";
import themes from "../features/theme/themes";
import {setAllTheme} from "../features/theme/themeSlice";


const Settings = () => {
    const [fontSize, setFontSize] = useState<number>(26);
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user);
    const [theme, setThemes] = useState<number>(1);
    const [fontFamily, setFontFamily] = useState<string>("");
    
    const storetheme = useAppSelector((state) => state.theme);
    
    const fontSizeHandler = (event: Event, newValue: number | number[]) => {
        setFontSize(newValue as number);
    };

    const themeHandler = (event: SelectChangeEvent) => {
        setThemes(Number(event.target.value));
    }
    
    const fontHandler = (event: SelectChangeEvent) => {
        setFontFamily(event.target.value);
    }

    const applyHandler = async () => {
        dispatch(setAllTheme({theme, fontfamily: fontFamily, fontSize }));
        try {
            await axios.post(baseURL + "/settings", {username: user.username, theme: storetheme.theme, fontSize: storetheme.fontSize, fontFamily: storetheme.fontfamily});
        } catch (err: any) {
            alert("couldn't save data");
        }
    }

    return (
        <Stack direction = "column" justifyContent="center" spacing = {4}>
            <h1 style={{textAlign: "center"}}>Settings</h1>
            <Stack direction = "column" style = {{width: "60vw"}} spacing = {3}>
                {/* fontsize  */}
                <Grid container>
                    <Grid item xs = {6}>
                        <Typography textAlign = "center">Font Size:</Typography>
                    </Grid>
                    <Grid item xs = {6}>
                        <Slider
                        size="small"
                        min=  {20}
                        max = {30}
                        onChange = {fontSizeHandler}
                        defaultValue={20}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        />
                    </Grid>
                </Grid>

                {/* theme  */}
                <Grid container>
                    <Grid item xs = {6}>
                        <Typography textAlign="center">Theme</Typography>
                    </Grid>
                    <Grid item xs = {6}>
                        <Select
                        sx = {{width: "100%"}}
                        value={theme.toString()}
                        label="theme"
                        onChange={themeHandler}
                        >
                        <MenuItem value={0}>dark</MenuItem>
                        <MenuItem value={1}>matrix</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                
                {/* font-family  */}
                <Grid container>
                    <Grid item xs = {6}>
                        <Typography textAlign="center">Font-Family</Typography>
                    </Grid>
                    <Grid item xs = {6}>
                        <Select
                        sx = {{width: "100%"}}
                        value={fontFamily}
                        label="font-family"
                        onChange={fontHandler}
                        >
                        <MenuItem value={"Sofia"}>Sofia</MenuItem>
                        <MenuItem value={"Audiowide"}>Audiowide</MenuItem>
                        <MenuItem value={"Trirong"}>Trirong</MenuItem>
                        </Select>
                    </Grid> 
                </Grid>
                
            </Stack>
            <Button onClick={applyHandler}>Apply Settings</Button>
        </Stack>
    )
}

export default Settings;