import React from 'react'
{/* react router dom */ }
import { Navigate, Route, Routes } from 'react-router-dom'
{/* importing the login and register page */ }
import Login from './features/auth/pages/Login.jsx'
import Register from './features/auth/pages/Register.jsx'
{/* importing the auth provider to wrap the app with it */ }
import Feed from './features/post/pages/Feed.jsx'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { PostProvider } from './features/post/post.context.jsx'
import CreatePost from './features/post/pages/CreatePost.jsx'

{/* main app component */ }
const App = () => {
    return (
        <AuthProvider>
            <PostProvider>
                <Routes >
                    <Route path='/' element={<Feed />} />
                    <Route path='/create-post' element={<CreatePost/>}/>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </PostProvider>
        </AuthProvider>
    )
}

export default App