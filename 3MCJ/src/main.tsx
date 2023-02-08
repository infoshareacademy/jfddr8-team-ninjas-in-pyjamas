import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Context from './Context/Context'
import { HashRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
   <Context>
    <App />
  </Context>
  </HashRouter>
);
