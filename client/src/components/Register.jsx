import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [userName, setUserName] = React.useState("");
    function handleClick(e) {
        e.preventDefault();
        if(email=="" || password == "" || confirmPassword == "" || userName == ""){
            toast.error("Fields cannot be empty")
        }
        else if (password !== confirmPassword) {
            toast.error("Password and confirm Password does not match")
        }
        else {
            axios.post("http://localhost:8000/api/v1/register", {
                userEmail: email,
                userName: userName,
                userPassword: password,
                userPortfolio: [{
                    userBalance: 1000,
                    userSpent: 0,
                    userProfit: 0,
                    userStocks: []
                }],
                confirmPassword:confirmPassword
            }).then((res)=>{
                toast.success("Success");
            }).catch((err)=>{
                toast.error(err.response.data.msg)
            })
        }

    }



    return (
        <>
            <form onSubmit={handleClick}>
                <label htmlFor="email">Enter your email:</label>
                <input type="email" data-testid="email" placeholder='Enter email' name="email" onChange={(e) => { setEmail(e.target.value) }}/>
                <label htmlFor="email">Enter Username:</label>
                <input data-testid="userName" placeholder='Enter username' name="password" onChange={(e) => { setUserName(e.target.value) }}  />
                <label htmlFor="email">Enter your Password:</label>
                <input data-testid="password" placeholder='Enter password' type="password"  name="password" onChange={(e) => { setPassword(e.target.value) }}  />
                <label htmlFor="email">Confirm Password:</label>
                <input data-testid="confirmPassword" placeholder='Enter confirm password' type="password"  name="password" onChange={(e) => { setConfirmPassword(e.target.value) }} />
                <div>
                    <button data-testid="btn" type="submit" value="submit" >Login</button>
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

export default Register