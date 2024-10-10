import React, { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { handleError, handleSuccess } from "../utils";
function Signup() {


    const [SignupInfo,setSignupInfo]= useState({
      name:"",
      email:"",
      password:""
    })

    const navigate =useNavigate();

    const handleChange = (e)=>{
      const {name,value}=e.target;
      console.log(name,value);
      const copySignupInfo = {...SignupInfo}
      copySignupInfo[name]=value
      setSignupInfo(copySignupInfo)
      
    }
    
    const handleSignup =async(e)=>{
      e.preventDefault();
      const {name,email,password}=SignupInfo;
      if(!name || !email || !password){
        return handleError("name,email,password are required")
      }


      try {
        const url = "http://localhost:8000/auth/signup"
        const response = await fetch(url,{
          method: "POST",
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(SignupInfo)
        });
        const result= await response.json();
        const {success,message,error}=result;
        if(success){
          handleSuccess(message);
          setTimeout(() => {
            navigate('/login')
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
    <h2>Sign Up</h2>
    <form id="signupForm" onSubmit={handleSignup} >
      <div>
        <label htmlFor="name">Name</label>
        <input onChange={handleChange} type="text" id="name" name="name" autoFocus placeholder="Enter your name" value={SignupInfo.name}></input>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input onChange={handleChange} type="email" id="email" name="email" placeholder="Enter your email" value={SignupInfo.email}></input>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input onChange={handleChange} type="password" id="password" name="password" placeholder="Enter your password" value={SignupInfo.password}></input>
        
      </div>
      
      <button type="submit">Sign Up</button>
      <span >
          Already have an account &nbsp; &nbsp; <Link to="/login" >Login</Link>
      </span>
    </form>
    <ToastContainer/>
  </div>)
}

export default Signup;
