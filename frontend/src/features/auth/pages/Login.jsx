import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hook/useAuth.js'
import MotionSection from '../../shared/MotionSection.jsx'

const Login = () => {

    const { loading, handleLogin } = useAuth()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')

        if (!username.trim() || !password.trim()) {
            setError('Please enter username and password')
            return
        }

        try {
            await handleLogin(username.trim(), password)
            navigate('/')
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                'Login failed. Please check credentials and try again.'
            )
        }
    }

if (loading) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
    </main>
  )
}
    return (
        <main className='min-h-screen w-full flex items-center justify-center bg-black'>
            <MotionSection className='w-full max-w-107.5 px-4 flex flex-col gap-6'>
            
                <h1 className='text-3xl font-bold '>Login</h1>

                {/* form */}
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}   >

                    {/* input for username */}
                    <input
                        className='w-full px-6 py-3 rounded-full bg-gray-100 text-gray-700 outline-none placeholder-gray-500'
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Enter username'
                    />

                    {/* input for password */}
                    <div className='relative w-full'>
                        <input
                            className='w-full px-6 py-3 pr-14 rounded-full bg-gray-100 text-gray-700 outline-none placeholder-gray-500'
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter password'
                        />

                        <button
                            type='button'
                            onClick={() => setShowPassword((prev) => !prev)}
                            className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    className='w-5 h-5'
                                >
                                    <path d='M3 3l18 18' />
                                    <path d='M10.58 10.58a2 2 0 102.83 2.83' />
                                    <path d='M9.88 5.09A9.77 9.77 0 0112 5c5 0 9.27 3.11 11 7-0.81 1.81-2.17 3.36-3.88 4.5' />
                                    <path d='M6.61 6.61C4.62 7.87 3.1 9.76 2 12c1.73 3.89 6 7 10 7 1.61 0 3.16-.4 4.53-1.12' />
                                </svg>
                            ) : (
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    className='w-5 h-5'
                                >
                                    <path d='M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z' />
                                    <circle cx='12' cy='12' r='3' />
                                </svg>
                            )}
                        </button>
                    </div>

                    {error && (
                        <p className='text-sm text-red-400 font-medium' role='alert'>
                            {error}
                        </p>
                    )}

                    {/* button to submit the form */}
                    <button
                        className='w-full px-6 py-3 rounded-full bg-red-500 text-white font-semibold cursor-pointer hover:bg-red-600 transition-transform duration-150 ease-in-out active:scale-95' 
                        type="submit">Login</button>

                    {/* link to navigate to register page */}
                    <p>Don't have an account? <Link to="/register" className='text-red-500'>Create Account</Link></p>
                </form>
            </MotionSection>
        </main>
    )
}

export default Login