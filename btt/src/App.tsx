import React, {useState,useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import { Grid } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home'
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Settings from './pages/Settings';
import themes from "./features/theme/themes";
import {useAppSelector, useAppDispatch} from "./store/hooks";
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { userActions } from './features/user/userSlice';

const Auth = React.lazy(()=>import("./pages/Auth"))

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const theme = useAppSelector(state => state.theme);

  useEffect(()=>{
    dispatch(userActions.actions.checkIfLoggedIn())
  },[])

  return (
    <Grid container direction = "column" style = {{minHeight: "100vh", backgroundColor: themes[theme.theme].background, color: themes[theme.theme].fontColor, fontFamily: theme.fontfamily}} alignItems = "center" justifyContent = "space-between">
      <Grid item sx = {{width: "100%"}}>
        <Navbar/>
      </Grid>
      <Grid item style = {{padding: "30px"}}>
        <Routes>
          <Route path = "/auth" element = {<Auth />} />
          <Route path = "/" element = {<Home />} />
          <Route path = "/profile" />
          <Route path = "/settings" element = {<Settings />} />
          <Route path = "/contact" element = {<Contact />} />
          <Route path = "/terms" element = {<Terms />} />
        </Routes>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
}


export default App;
