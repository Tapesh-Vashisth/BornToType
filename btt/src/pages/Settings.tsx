import { useState, ChangeEvent } from "react";
import {Stack, Slider, Grid} from "@mui/material";
import {Button, Typography, MenuItem, Select} from "@mui/material";
import themeType from "../types/themetype";
import fontType from "../types/fontType";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {SelectChangeEvent} from "@mui/material/Select";

const Settings = () => {
    const [fontSize, setFontSize] = useState<number>(26);
    const [theme, setTheme] = useState<string>("");
    const [fontFamily, setFontFamily] = useState<string>("");
 
    const storetheme = useAppSelector((state) => state.theme);
    
    const fontSizeHandler = (event: Event, newValue: number | number[]) => {
        setFontSize(newValue as number);
    };

    const themeHandler = (event: SelectChangeEvent) => {
        setTheme(event.target.value);
    }
    
    const fontHandler = (event: SelectChangeEvent) => {
        setFontFamily(event.target.value);
    }

    const applyHandler = () => {
        console.log(fontSize, theme, fontFamily);
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
                        onChange = {fontSizeHandler}
                        defaultValue={70}
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
                        value={theme}
                        label="theme"
                        onChange={themeHandler}
                        >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
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
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                
            </Stack>
            <Button onClick={applyHandler}>Apply Settings</Button>
        </Stack>
    )
}

export default Settings;