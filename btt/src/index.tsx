import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import store from "./store/store";
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store = {store}>
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>
);
