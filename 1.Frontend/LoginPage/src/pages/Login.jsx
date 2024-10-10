import React, { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from "../utils";
function Login() {


    const [loginInfo,setLoginInfo]= useState({
      name:"",
      password:""
    })

    const navigate = useNavigate();

    const handleChange = (e)=>{
      const {name,value}=e.target;
      console.log(name,value);
      const copyLoginInfo = {...loginInfo};
      copyLoginInfo[name]=value;
      setLoginInfo(copyLoginInfo)
      
    }
    
    const handleLogin = async(e)=>{
      e.preventDefault();
      const {name, password}=loginInfo;
      if(!name || !password){
        return handleError("name & password are required")
      }

      try {
        const url = "http://localhost:8000/auth/login"
        const response = await fetch(url,{
          method: "POST",
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(loginInfo)
        });
        const result= await response.json();
        const {success,message, jwtToken, name, error}=result;
        if(success){
          handleSuccess(message);
          localStorage.setItem('token',jwtToken);
          localStorage.setItem('loggedInUser',name);

          setTimeout(() => {
            navigate('/home')
          }, 1000);
        }else if(error){
          const details = error?.details[0].message;
          handleError(details)

        }else if (!success){
          handleError(message)
        }
        console.log(result);
        
      } catch (error) {
        handleError(error);
        
      }
    }

  return ( <div className="container">
    <h2>Login</h2>
    <form id="loginForm" onSubmit={handleLogin} >
      <div>
        <label htmlFor="name">Name</label>
        <input onChange={handleChange} type="text" id="name" name="name" autoFocus placeholder="Enter your name" value={loginInfo.name}></input>
      </div>
      
      <div>
        <label htmlFor="password">Password</label>
        <input onChange={handleChange} type="password" id="password" name="password" placeholder="Enter your password" value={loginInfo.password}></input>
      </div>
      
      <button type="submit">Login</button>
      <span>
        Don't have an account.&nbsp; <Link to="/signup" >SignUp</Link>
      </span>
    </form>
    <ToastContainer/>
  </div>)
}

export default Login;
