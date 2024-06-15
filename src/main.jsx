import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import { PrimaryTheme } from './Theme.js';

import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <ThemeProvider theme={PrimaryTheme}>
        <App/>
    </ThemeProvider>
    </Router>
    
  </React.StrictMode>,
)
