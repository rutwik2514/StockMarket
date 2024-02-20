import React from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import logo from "../assets/lottie_gif.gif"
function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showWaterMark,setShowWaterMark] = React.useState(false);
  async function handleClick(e) {
    e.preventDefault();
    if (email == "" || password == "") {
      toast.error('Fields cannot be empty')
    }
    else {
      await axios.post("http://localhost:8000/api/v1/login", {
        userEmail: email,
        get: false,
        userPassword: password
      },{withCredentials:true}).then((res) => {
        localStorage.setItem("userEmail", res.data.userEmail);
        localStorage.setItem("token", res.data.accessToken)
        toast.success("Login Successful, please wait while we redirect")
        setShowWaterMark(true);
        setTimeout(function () {
          window.location.href = "/dashboard"; 
       }, 3000);
      }).catch((err) => {
        toast.error(err.response.data.msg);
      })
    }
  }
  

  return (
    <section className='d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100vw', position: 'relative'}}>
      {showWaterMark && <img src={logo} style={{ height: '100vh', zIndex: '1', opacity: '0.2', position: 'absolute' }} alt="watermark" />}
      {!showWaterMark && <div>
      <form onSubmit={handleClick}>

        <label htmlFor="email">Enter your email:</label>
        <input type="email" data-testid = "email" placeholder='enter email' name="email" onChange={(e) => { setEmail(e.target.value) }} required />
        <label htmlFor="email">Enter your Password:</label>
        <input placeholder='enter password' data-testid = "password" type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} required />
        <div>
        <button data-testid="btn" type="submit" value="submit" onClick={handleClick}>Login</button>
        </div>
      </form></div>}
      <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        
    </section>
  )
}

export default Login