import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';


<script src="https://unpkg.com/@mui/material@5.4.1/umd/material-ui.development.js"></script>

ReactDOM.render(
  //<React.StrictMode>
  
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
