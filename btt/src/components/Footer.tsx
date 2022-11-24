import react from 'react';
import { Stack } from "@mui/material";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DvrIcon from '@mui/icons-material/Dvr';
import { NavLink } from 'react-router-dom';
import themes from '../features/theme/themes';
import { useAppSelector } from '../store/hooks';

const Footer = () => {
    const theme = useAppSelector((state) => state.theme);

    return (
        <Stack direction = "row" spacing = {3}>
            <Stack direction = "row" alignItems="center">
                <NavLink to = "/contact" style = {{color: themes[theme.theme].fontColor}}><ContactMailIcon></ContactMailIcon> Contact</NavLink>
            </Stack>
            <Stack direction = "row" alignItems="center">
                <NavLink to = "/terms" style = {{color: themes[theme.theme].fontColor}}><DvrIcon></DvrIcon> Terms</NavLink> 
            </Stack>
        </Stack>
    )
}


export default Footer;