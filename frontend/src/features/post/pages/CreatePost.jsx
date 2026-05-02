import React, { useState, useRef } from 'react'
import { usePost } from '../hook/usePost.js'
import { useNavigate } from 'react-router-dom'
import { RiArrowLeftFill } from "@remixicon/react";
import FooterNav from '../../shared/FooterNav.jsx'

const CreatePost = () => {
    const [caption, setCaption] = useState('')
    const postImageInputFileRef = useRef(null)

    const { handleCreatePost, loading } = usePost()

    const navigate = useNavigate()


    async function handleSubmit(e) {
        e.preventDefault();
        const file = postImageInputFileRef.current.files[0]

        await handleCreatePost(caption, file)
        navigate('/')
    }

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
            </main>
        )
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-black">

            <div className="w-full max-w-[420px] flex flex-col gap-4 px-4">

                {/* Header */}
                <div className="flex items-center text-white mb-2">
                    <button
                        onClick={() => navigate("/")}
                        className="text-2xl"
                    >
                        <RiArrowLeftFill />
                    </button>
                    <h1 className="flex-1 text-center text-2xl font-bold">
                        Create Post
                    </h1>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 mt-2"
                >
                    <label
                        className="w-full px-6 py-3 rounded-full bg-gray-100 text-gray-700 font-semibold cursor-pointer"
                        htmlFor="postImage"
                    >
                        Select Image
                    </label>

                    <input
                        ref={postImageInputFileRef}
                        type="file"
                        id="postImage"
                        hidden
                    />

                    <input
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full px-6 py-3 rounded-full bg-gray-100 text-gray-700 outline-none"
                        type="text"
                        placeholder="Write a caption..."
                    />

                    <button
                        className="w-full px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 active:scale-95 transition"
                        type="submit"
                    >
                        Post
                    </button>
                </form>

            </div>

        </main>
    )
}

export default CreatePost