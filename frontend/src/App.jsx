import React from 'react'
{/* react router dom */}    
import { Navigate, Route, Routes } from 'react-router-dom'
{/* importing the login and register page */}
import Login from './features/auth/pages/Login.jsx'
import Register from './features/auth/pages/Register.jsx'
{/* importing the auth provider to wrap the app with it */ }
import { AuthProvider } from './features/auth/auth.context.jsx'

{/* main app component */}
const App = () => {
    return (
       <AuthProvider>
            <Routes >
                <Route path='/' element={<h2>welcome to 4 layer of Architecture</h2>} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
         </AuthProvider>
    )
}

export default App