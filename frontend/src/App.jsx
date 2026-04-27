import React from 'react'
//react router dom 
import { Routes, Route } from 'react-router-dom'
//importing the login and register page
import Login from './features/auth/pages/Login.jsx'
import Register from './features/auth/pages/Register.jsx'

//main app component
const App = () => {
    return (
       
        //defining the routes for login and register page
            <Routes >
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>

    )
}

export default App