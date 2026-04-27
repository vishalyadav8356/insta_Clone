import React from 'react'
//react router dom for routing between login and register page
import { Routes, Route } from 'react-router-dom'
import Login from './features/auth/pages/Login.jsx'
import Register from './features/auth/pages/Register.jsx'

const App = () => {
    return (
       
            <Routes >
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>

    )
}

export default App