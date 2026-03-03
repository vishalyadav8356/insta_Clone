import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {useAuth} from "../hooks/useAuth"




const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const {handleLogin, loading} = useAuth()
  const navigate = useNavigate()

  if(loading){
    return(
      <h1 className="text-3xl font-semibold tracking-tight ">Loading...</h1>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    handleLogin(username, password)
    .then(res =>{
      console.log(res)
      navigate("/")
    })
  }

  return (
    <main className="min-h-screen w-full bg-zinc-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-800/60 backdrop-blur-sm p-8 rounded-3xl shadow-xl flex flex-col gap-6">

        <h1 className="text-3xl font-semibold tracking-tight">Login</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            onInput={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="bg-white text-black p-4 rounded-2xl text-lg outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
          />

          <input
            type="password"
            name="password"
            onInput={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="bg-white text-black p-4 rounded-2xl text-lg outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
          />

          <button
            type="submit"
            className="mt-2 bg-red-500 hover:bg-red-600 active:scale-[0.98] transition-all duration-200 text-white p-3 rounded-2xl text-xl font-medium shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-zinc-400">
          Don't have an account{" "}
          <Link
            to="/register"
            className="font-medium text-red-500 hover:text-red-400 hover:underline transition-all duration-200"
          >
            Register
          </Link>
        </p>

      </div>
    </main>
  )
}

export default Login