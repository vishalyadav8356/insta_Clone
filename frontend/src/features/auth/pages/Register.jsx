import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {useAuth} from '../hook/useAuth.js'


{/* register page component */}
const Register = () => {

    const {handleRegister, loading} = useAuth();

    {/* state for username, email and password */}
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    {/* function to handle form submission */}
    const handleSubmit = async (e) => {
        e.preventDefault()

            await handleRegister(username, email, password)
            navigate('/')

    
        }


    if(loading){
        return (
            <main className="min-h-screen flex items-center justify-center bg-black">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
            </main>
          )
    }

    

    {/* rendering the register form */}
    return (
        <main className='min-h-screen w-full flex items-center justify-center'>
            <div className='w-fit min-w-96 flex flex-col gap-6'>
                <h1 className='text-3xl font-bold '>Register</h1>

            

                {/* form */}
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

                    {/* input for username */}
                    <input
                        className='w-full px-6 py-3 rounded-full bg-gray-100 text-gray-700 outline-none placeholder-gray-500'
                        type="text"
                        name="username"
                        onInput={(e) => setUsername(e.target.value)}
                        placeholder='Enter username'
                    />

                    {/* input for email */}
                    <input
                        className='w-full px-6 py-3 rounded-full bg-gray-100 text-gray-700 outline-none placeholder-gray-500'
                        type="text"
                        name="email"
                        onInput={(e) => setEmail(e.target.value)}
                        placeholder='Enter Email'
                    />

                    {/* input for password */}
                    <input
                        className='w-full px-6 py-3 rounded-full bg-gray-100 text-gray-700 outline-none placeholder-gray-500'
                        type="password"
                        name="password"
                        onInput={(e) => setPassword(e.target.value)}
                        placeholder='Enter password'
                    />

                    {/* button to submit the form */}
                    <button
                        className='w-full px-6 py-3 rounded-full bg-red-500 text-white font-semibold cursor-pointer hover:bg-red-600 transition-transform duration-150 ease-in-out active:scale-95' 
                        type="submit">Register</button>

                    {/* link to navigate to login page */}
                    <p>Already have an account? <Link to="/login" className='text-red-500'>Login to Account</Link></p>
                </form>
            </div>
        </main>
    )
}

export default Register