import react, {useState,useEffect} from "react";
import { Stack } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import HelpIcon from '@mui/icons-material/Help';
import { NavLink } from "react-router-dom";
import ProMenu from "./reusableComponents/ProMenu";
import themes from "../features/theme/themes";
import { useAppSelector } from "../store/hooks";

const Navbar = () => {
    const theme = useAppSelector((state) => state.theme);

    return (    
        <header style = {{padding: "10px 20px"}}>
            <Stack direction = "row" justifyContent = "space-between" alignItems = "center">
                <Stack direction = "row" spacing = {{xs: 1, sm: 2}}>
                    <NavLink to = "/settings"style = {{textDecoration: "none", color: themes[theme.theme].fontColor}}><SettingsIcon></SettingsIcon></NavLink>
                </Stack>
                <Stack>
                    <NavLink to = "/" style = {{textDecoration: "none", color: themes[theme.theme].fontColor}}><h2>TYPO</h2></NavLink>
                </Stack>
                <Stack direction="row" spacing = {{xs: 1, sm: 2}} style = {{textDecoration: "none", color: themes[theme.theme].fontColor}} alignItems = "center">
                    <ProMenu />
                </Stack>
            </Stack>
        </header>
    )
}


export default Navbar;

