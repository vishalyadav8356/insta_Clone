import React from 'react'
{/* react router dom */}    
import { Navigate, Route, Routes } from 'react-router-dom'
{/* importing the login and register page */}
import Login from './features/auth/pages/Login.jsx'
import Register from './features/auth/pages/Register.jsx'

{/* main app component */}
const App = () => {
    return (
       
            <Routes >
                <Route path='/' element={<Navigate to='/login' replace />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>

    )
}

export default App