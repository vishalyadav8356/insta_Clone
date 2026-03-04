import React from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import {AuthProvider} from './features/auth/auth.context'

const App = () => {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<h1>Welcome to Home</h1>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
   </AuthProvider> 
  )
}

export default App