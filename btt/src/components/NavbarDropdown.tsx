import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import {NavLink} from "react-router-dom";

interface dropdownType {
    disp: boolean
    style: Object
}

const NavbarDropdown: React.FC<dropdownType> = (props: dropdownType) => {
  return (
    <div style={props.disp ? {display: "block"}: {display: "none"}}>
        <List
            sx={{
                padding: "5px 20px",
                position: "absolute",
                top: "130%",
                right: "0px",
                color: "black",
                borderRadius: "15px",
                bgcolor: 'background.paper',
                "& .navlist-item": {
                    padding: "0px",
                    position: "relative",
                    right: "38px"
                }
            }}
        >
        <NavLink to = "profile">
            <ListItem className='navlist-item'>
                <ListItemAvatar>
                <Avatar>
                    <ImageIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Profile"/>
            </ListItem>
            <Divider variant="inset" component="li" />
        </NavLink>
        <NavLink to = "auth">
            <ListItem className='navlist-item'>
                <ListItemAvatar>
                <Avatar>
                    <WorkIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Login" />
            </ListItem>
            <Divider variant="inset" component="li" />
        </NavLink>
        </List>
    </div>
  );
}


export default NavbarDropdown;