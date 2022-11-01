import react from 'react';
import { Stack } from "@mui/material";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DvrIcon from '@mui/icons-material/Dvr';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <Stack direction = "row" spacing = {3}>
            <Stack direction = "row" alignItems="center">
                <NavLink to = "/contact" ><ContactMailIcon></ContactMailIcon> Contact</NavLink>
            </Stack>
            <Stack direction = "row" alignItems="center">
                <NavLink to = "/terms" ><DvrIcon></DvrIcon> Terms</NavLink> 
            </Stack>
        </Stack>
    )
}


export default Footer;