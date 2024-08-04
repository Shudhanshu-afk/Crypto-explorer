import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Coincontextprovider from './Context/Coincontext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Coincontextprovider>
    <App />
    </Coincontextprovider>
    </BrowserRouter>
  </React.StrictMode>,
)
