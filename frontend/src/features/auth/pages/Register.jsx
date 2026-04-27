import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

//register page component
const Register = () => {

    //state for username, email and password
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    //function to handle form submission
    async function handleSubmit(e) {
        e.preventDefault()

    }
    

    //rendering the register form
    return (
        <main className='min-h-screen w-full flex items-center justify-center'>
            <div className='w-fit min-w-[400px] flex flex-col gap-6'>
                <h1 className='text-3xl font-bold '>Register</h1>

                //form
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

                    //input for username
                    <input
                        className='w-full px-6 py-3 rounded-2xl bg-gray-100 text-gray-700 outline-none placeholder-gray-500'
                        type="text"
                        name="username"
                        onInput={(e) => setUsername(e.target.value)}
                        placeholder='Enter username'
                    />

                    //input for email
                    <input
                        className='w-full px-6 py-3 rounded-2xl bg-gray-100 text-gray-700 outline-none placeholder-gray-500'
                        type="text"
                        name="email"
                        onInput={(e) => setEmail(e.target.value)}
                        placeholder='Enter Email'
                    />

                    //input for password
                    <input
                        className='w-full px-6 py-3 rounded-2xl bg-gray-100 text-gray-700 outline-none placeholder-gray-500'
                        type="password"
                        name="password"
                        onInput={(e) => setPassword(e.target.value)}
                        placeholder='Enter password'
                    />

                    //button to submit the form
                    <button
                        className='w-full px-6 py-3 rounded-2xl bg-red-500 text-white font-semibold cursor-pointer hover:bg-red-600 transition-colors duration-300'
                        type="submit">Register</button>

                    //link to navigate to login page
                    <p>Already have an account? <Link to="/login" className='text-red-500'>Login</Link></p>
                </form>
            </div>
        </main>
    )
}

export default Register