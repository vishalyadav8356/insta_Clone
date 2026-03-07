import React from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import { AuthProvider } from './features/auth/auth.context'
import Feed from './features/post/pages/Feed'
import { PostContextProvider } from './features/post/post.context'
const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <Routes>
          <Route path="/" element={<h1>Welcome to Home</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App