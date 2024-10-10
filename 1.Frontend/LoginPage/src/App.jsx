import { useState } from 'react'
import { Navigate, Route , Routes } from "react-router-dom";
import './App.css'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login"></Navigate>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </>
  )
}

export default App
