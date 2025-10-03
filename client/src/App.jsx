import React from 'react'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import Dashboard from './auth/Dashboard'
import Home from './auth/Home'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'



const App = () => {
  
  
  
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>

    </Routes>
  )
}

export default App
