import React, {useEffect,useState} from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import {Stack} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { userActions } from "../../features/user/userSlice";
import makeStyles from "@mui/styles/makeStyles";
import themes from "../../features/theme/themes";


const styles = makeStyles(()=>({
  buttonStyle:{
    textTransform:"none"
  } 
}))


const ProMenu = () => {
  const theme = useAppSelector((state) => state.theme)
  const menuStyles = styles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const open = Boolean(anchorEl);
  const auth = useAppSelector((state)=>state.user)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!auth.islogin){
      setAnchorEl(null);
      navigate("/auth",{replace:true})
    }else{
      setAnchorEl(event.currentTarget);
    }
  };

  const handleProfileClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAnchorEl(null);
    navigate("/profile")
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseOut = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(userActions.actions.logoutOutUser());
    setAnchorEl(null);
    window.location.reload()
  }


  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style = {{}}
      >
        <AccountCircleIcon style = {{color: themes[theme.theme].fontColor}} />
      </Button>
      
        {auth.islogin &&
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseOut}
            TransitionComponent={Fade}
          > 
            <Stack key={1} style = {{color: themes[theme.theme].fontColor, backgroundColor: themes[theme.theme].playgroundcolor}}>
              <Button className={menuStyles.buttonStyle} type="button" style = {{color: themes[theme.theme].fontColor}} onClick={handleProfileClick}>
                Profile
              </Button>
            </Stack>
            <Stack key={2} style = {{color: themes[theme.theme].fontColor, backgroundColor: themes[theme.theme].playgroundcolor}}>
              <Button className={menuStyles.buttonStyle} style = {{color: themes[theme.theme].fontColor}} type="button" onClick={handleLogout}>
                Logout
              </Button>
            </Stack>
          </Menu>
        }
    </div>
  );
}


export default ProMenu;