import react, {useState} from "react";
import { Stack } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import HelpIcon from '@mui/icons-material/Help';
import { NavLink } from "react-router-dom";
import NavbarDropdown from "./NavbarDropdown";

const Navbar = () => {
    const [prof, setProf] = useState(false);

    return (    
        <header style = {{padding: "10px 20px"}}>
            <Stack direction = "row" justifyContent = "space-between" alignItems = "center">
                <Stack direction = "row" spacing = {{xs: 1, sm: 2}}>
                    <MenuIcon></MenuIcon>
                    <NavLink to = "/settings"><SettingsIcon></SettingsIcon></NavLink>
                </Stack>
                <Stack>
                    <NavLink to = "/" style = {{textDecoration: "none"}}><h2>TYPO</h2></NavLink>
                </Stack>
                <Stack direction="row" spacing = {{xs: 1, sm: 2}} style = {{position: "relative"}}>
                    <NavbarDropdown disp = {prof} style = {{alignItems: "center"}}/>
                    <InsertEmoticonIcon onClick = {(event) => {setProf(!prof)}}></InsertEmoticonIcon>
                    <HelpIcon></HelpIcon>
                </Stack>
            </Stack>
        </header>
    )
}


export default Navbar;

