import React, { useEffect } from 'react'
import Post from '../components/post.jsx'
import { usePost } from '../hook/usePost.js'
import Nav from '../../shared/Nav.jsx'
import FooterNav from '../../shared/FooterNav.jsx'

const Feed = () => {
    const { handleGetFeed , loading, feed , handleLikePost, handleUnlikePost} = usePost()

    useEffect(() => {
        handleGetFeed()
    }, [])

    if (loading || !feed) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
            </main>
        )
    }

    return (
        <main className="bg-black min-h-screen">
            <div className="feed flex justify-center items-start">

                <div className="post max-w-[400px] w-full flex flex-col gap-2 ">

                    <Nav/>
                    {feed.map((post) => (
                        <Post key={post._id} user={post.user} post={post} handleLikePost={handleLikePost} handleUnlikePost={handleUnlikePost} loading={loading} />
                    ))}
                 
                </div>
            </div>
            <FooterNav/>
        </main>
    )
}

export default Feed