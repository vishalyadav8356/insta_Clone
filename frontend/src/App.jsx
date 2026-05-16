import React from 'react'
{/* react router dom */ }
import { Route, Routes } from 'react-router-dom'
{/* importing the login and register page */ }
import Login from './features/auth/pages/Login.jsx'
import Register from './features/auth/pages/Register.jsx'
{/* importing the auth provider to wrap the app with it */ }
import Feed from './features/post/pages/Feed.jsx'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { PostProvider } from './features/post/post.context.jsx'
import { SocialProvider } from './features/social/social.context.jsx'
import CreatePost from './features/post/pages/CreatePost.jsx'
import Profile from './features/post/pages/Profile.jsx'
import SavePost from './features/post/pages/SavePost.jsx'
import EditProfile from './features/post/components/EditProfile.jsx'
import ProtectedRoute from './features/auth/ProtectedRoute.jsx'
import ScrollManager from './features/shared/ScrollManager.jsx'
import Notification from './features/social/pages/Notification.jsx'
{/* main app component */ }
const App = () => {
    return (
        <AuthProvider>
            <PostProvider>
                <SocialProvider>
                    <ScrollManager />
                    <Routes >
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/' element={<ProtectedRoute><Feed /></ProtectedRoute>} />
                    <Route path='/create-post' element={<ProtectedRoute><CreatePost/></ProtectedRoute>}/>
                    <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
                    <Route path='/saved-posts' element={<ProtectedRoute><SavePost/></ProtectedRoute>} />
                    <Route path='/editProfile' element={<ProtectedRoute><EditProfile/></ProtectedRoute>} />
                    <Route path='/notifications' element={<ProtectedRoute><Notification/></ProtectedRoute>} />
                    </Routes>
                </SocialProvider>
        </PostProvider>
        </AuthProvider>
    )
}

export default App