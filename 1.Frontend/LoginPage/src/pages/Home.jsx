import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from "../utils";

function home() {
  const [loggedInUser,setLoggedInUser]=useState('');
  const navigate = useNavigate();
  useEffect(()=>{setLoggedInUser(localStorage.getItem('loggedInUser'))},[])
  
  const handleLogout=(e)=>{
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    handleSuccess("user Logged Out")
    setTimeout(()=>{
      navigate('/login')
    },1000)
  }

  return <div className="main">
    <nav>
      <a href="#">Home</a>
      <a href="http://localhost:8000/employee">Employee List</a>
      <a>{loggedInUser}-</a>
      <button onClick={handleLogout}>Logout</button>
    </nav>
    <div>
    <h2>Welcome Admin Panel &nbsp;{loggedInUser}</h2>
    </div>
    
    <ToastContainer/>
  </div>;
}

export default home;
