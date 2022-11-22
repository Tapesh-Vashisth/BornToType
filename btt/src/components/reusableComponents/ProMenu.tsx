import React, {useEffect,useState} from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { userActions } from "../../features/user/userSlice";
import makeStyles from "@mui/styles/makeStyles";

const styles = makeStyles(()=>({
  buttonStyle:{
    textTransform:"none"
  } 
}))


const ProMenu = () => {
  const menuStyles = styles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const open = Boolean(anchorEl);
  const auth = useAppSelector((state)=>state.user)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!auth.islogin){
      navigate("/auth",{replace:true})
    }
    else{
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseOut = () => {
    setAnchorEl(null);
  };

  const handleLogout = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(userActions.actions.logoutOutUser());
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
        <AccountCircleIcon style = {{color: "white"}}/>
      </Button>
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
        {auth.islogin &&
          <>
            <MenuItem key={1} >
              <Button className={menuStyles.buttonStyle} type="button" onClick={handleClick}>
                Profile
              </Button>
            </MenuItem>
            <MenuItem key={2}>
              <Button className={menuStyles.buttonStyle} type="button" onClick={handleLogout}>
                Logout
              </Button>
            </MenuItem>
          </>
        }
      </Menu>
    </div>
  );
}


export default ProMenu;