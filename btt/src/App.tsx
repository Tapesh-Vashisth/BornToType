import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import { Grid } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home'
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Settings from './pages/Settings';
import {useAppSelector, useAppDispatch} from "./store/hooks";

const Auth = React.lazy(()=>import("./pages/Auth"))

function App() {
  const theme = useAppSelector(state => state.theme);

  return (
    <Grid container direction = "column" style = {{minHeight: "100vh", backgroundColor: theme.background, color: theme.fontColor}} alignItems = "center" justifyContent = "space-between">
      <Grid item sx = {{width: "100%"}}>
        <Navbar/>
      </Grid>
      <Grid item >
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
