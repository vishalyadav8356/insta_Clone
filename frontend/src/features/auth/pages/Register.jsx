import React, {useState} from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()  

        axios.post("http://localhost:3000/api/auth/register", {
            username,
            email,
            password
        }, {
            withCredentials: true
        }).then((res) => {
            console.log(res.data)
        })
    }        

  return (
    <main className="min-h-screen w-full bg-zinc-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-800/60 backdrop-blur-sm p-8 rounded-3xl shadow-xl flex flex-col gap-6">

        <h1 className="text-3xl font-semibold tracking-tight">Register</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            onInput={(e) => setUsername(e.target.value)}
            className="bg-white text-black p-4 rounded-2xl text-lg outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            onInput={(e) => setEmail(e.target.value)}
            className="bg-white text-black p-4 rounded-2xl text-lg outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onInput={(e) => setPassword(e.target.value)}
            className="bg-white text-black p-4 rounded-2xl text-lg outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
          />

          <button
            type="submit"
            className="mt-2 bg-red-500 hover:bg-red-600 active:scale-[0.98] transition-all duration-200 text-white p-3 rounded-2xl text-xl font-medium shadow-md"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-zinc-400">
          Already have an account{" "}
          <Link
            to="/login"
            className="font-medium text-red-500 hover:text-red-400 hover:underline transition-all duration-200"
          >
            Login
          </Link>
        </p>

      </div>
    </main>
  )
}

export default Register