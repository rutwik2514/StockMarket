import React from 'react'
import axios from "axios"
function Login() {
  const [email,setEmail] = React.useState();
  const [password,setPassword] = React.useState();
  const [showError,setShowError] = React.useState("");
  const [showSuccess,setShowSuccess] = React.useState();
  async function handleClick(e){
    await axios.post("http://localhost:8000/api/v1/login", {
        userEmail : email,
        get:false,
        userPassword:password

    }).then((res)=>{
        localStorage.setItem("userEmail", res.data.userEmail);
        setShowError(false);
        setShowSuccess(true);
    }).catch((err)=>{
        // console.log("SOMETHING WENT WRONG mu", err)
        setShowError(err.response.data.msg);
        setShowSuccess(false);
    })
  }
  return (
    <>
    <input data-testid = "email" placeholder='enter email' onChange={(e)=>{setEmail(e.target.value)}} />
    <input data-testid = "password" placeholder='enter password' onChange={(e)=>{setPassword(e.target.value)}} />
    <button data-testid = "btn" type="submit" value="submit"  onClick={handleClick}>Login</button>
    {showError && <h1 data-testid = "inc" value={showError}>{showError}</h1>}
    {showSuccess && <p>SUCCESSFUL LOGIN</p>}
    </>
  )
}

export default Login