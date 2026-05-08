import React, { useState, useRef } from 'react'
import { usePost } from '../hook/usePost.js'
import { useNavigate } from 'react-router-dom'
import { RiArrowLeftFill } from "@remixicon/react";
import FooterNav from '../../shared/FooterNav.jsx'

const CreatePost = () => {
    const [caption, setCaption] = useState('')
    const [fileName, setFileName] = useState('')
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
             <div className="w-full relative flex items-center justify-center">
                <button
                    onClick={() => navigate("/")}
                    className="text-2xl text-white absolute top-3 left-4"
                >
                    <RiArrowLeftFill />
                </button>

                <h1 className="text-white text-2xl font-bold text-center mt-2">Saved Posts</h1>
            </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 mt-2"
                >
                    <label
                        className="w-full px-6 py-3 rounded-full bg-gray-100 text-gray-700 font-semibold cursor-pointer flex items-center justify-between"
                        htmlFor="postImage"
                    >
                    
                        <span className="text-sm text-gray-500">{fileName || 'Select Image'}</span>
                    </label>

                    <input
                        ref={postImageInputFileRef}
                        type="file"
                        id="postImage"
                        hidden
                        onChange={() => {
                            const f = postImageInputFileRef.current?.files?.[0];
                            setFileName(f ? f.name : '');
                        }}
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