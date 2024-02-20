import React from 'react'
import {BrowserRouter, Route,Routes} from "react-router-dom"
import Homepage from './components/Homepage'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard'
import Login from './components/Login';
import Register from './components/Register';
import Buypage from './components/Buypage';
import StudyStock from './components/StudyStock';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} /> 
        <Route exact path="/dashboard" element={<Dashboard />} /> 
        <Route exact path="/login" element={<Login />} /> 
        <Route exact path="/register" element={<Register />} /> 
        <Route exact path="/buy" element={<Buypage />} /> 
        <Route exact path="/study" element={<StudyStock />} /> 





      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App