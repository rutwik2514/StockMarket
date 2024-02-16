import React from 'react'
import {BrowserRouter, Route,Routes} from "react-router-dom"
import Homepage from './components/Homepage'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Dashboard from './components/Dashboard'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} /> 
        <Route exact path="/dashboard" element={<Dashboard />} /> 

      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App