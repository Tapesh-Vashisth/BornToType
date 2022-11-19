import React, {useEffect,useState} from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";



const ProMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate()
  const open = Boolean(anchorEl);
  const [isLoggedIn,setLoggedIn] = useState<boolean>(false)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!isLoggedIn){
      navigate("/auth")
    }
    else{
      setAnchorEl(event.currentTarget);
    }
  };
  console.log(isLoggedIn)
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseOut = () => {
    setAnchorEl(null);
  };

    useEffect(()=>{
        const isTokenThere = localStorage.getItem("username")
        const isEmailThere = localStorage.getItem("email")
        if (!isTokenThere || !isEmailThere){
            setLoggedIn(false)
        }
        else{
            setLoggedIn(true)
        }
    },[])


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
        {isLoggedIn &&
          <>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </>
        }
      </Menu>
    </div>
  );
}


export default ProMenu;