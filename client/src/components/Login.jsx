import React from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
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
      }).then((res) => {
        localStorage.setItem("userEmail", res.data.userEmail);
        toast.success("Login Successful, please wait while we redirect")
        setTimeout(function () {
          window.location.href = "/dashboard"; 
       }, 3000);
      }).catch((err) => {
        toast.error(err.response.data.msg);
      })
    }
  }
  return (
    <>
      <form onSubmit={handleClick}>
        <label htmlFor="email">Enter your email:</label>
        <input type="email" id="email" data-testid="email" placeholder='enter email' name="email" onChange={(e) => { setEmail(e.target.value) }} required />
        <label htmlFor="email">Enter your Password:</label>
        <input data-testid="password" placeholder='enter password' type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value) }} required />
        <div>

        <button data-testid="btn" type="submit" value="submit" onClick={handleClick}>Login</button>
        </div>
      </form>
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
    </>
  )
}

export default Login