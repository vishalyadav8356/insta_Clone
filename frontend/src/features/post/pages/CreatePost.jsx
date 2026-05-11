import React, { useState, useRef } from 'react'
import { usePost } from '../hook/usePost.js'
import { useNavigate } from 'react-router-dom'
import { RiArrowLeftFill } from "@remixicon/react";
import FooterNav from '../../shared/FooterNav.jsx'
import MotionSection from '../../shared/MotionSection.jsx'

const CreatePost = () => {
    const [caption, setCaption] = useState('')
    const [fileName, setFileName] = useState('')
    const [imageError, setImageError] = useState('')
    const postImageInputFileRef = useRef(null)

    const { handleCreatePost, loading } = usePost()

    // Count words in caption
    const CAPTION_WORD_LIMIT = 100;
    const wordCount = caption.trim() === '' ? 0 : caption.trim().split(/\s+/).length
    const isWordLimitExceeded = wordCount >= CAPTION_WORD_LIMIT;
    
    const handleCaptionChange = (e) => {
        const value = e.target.value;
        const words = value.trim() === '' ? 0 : value.trim().split(/\s+/).length;
        
        // Only allow if word count is within limit
        if (words <= CAPTION_WORD_LIMIT) {
            setCaption(value);
        }
    }

    const handlePaste = (e) => {
    e.preventDefault();

    const pastedText = e.clipboardData.getData('text');

    const currentWords =
        caption.trim() === ''
            ? []
            : caption.trim().split(/\s+/);

    const pastedWords =
        pastedText.trim() === ''
            ? []
            : pastedText.trim().split(/\s+/);

    const remainingWords = CAPTION_WORD_LIMIT - currentWords.length;

    if (remainingWords <= 0) return;

    const allowedWords = pastedWords.slice(0, remainingWords);

    const newText =
        caption +
        (caption && allowedWords.length ? ' ' : '') +
        allowedWords.join(' ');

    setCaption(newText);
}

    const navigate = useNavigate()


    async function handleSubmit(e) {
        e.preventDefault();
        const file = postImageInputFileRef.current.files[0]

        if (!file) {
            setImageError('Image is not there')
            return
        }

        setImageError('')
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
            <MotionSection className="w-full max-w-107.5 flex flex-col gap-4 px-4">

                {/* Header */}
             <div className="w-full relative flex items-center justify-center">
                <button
                    onClick={() => navigate("/")}
                    className="text-2xl text-white absolute top-3 left-4"
                >
                    <RiArrowLeftFill />
                </button>

                <h1 className="text-white text-2xl font-bold text-center mt-2">Create Posts</h1>
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
                            if (f) setImageError('');
                        }}
                    />

                    {imageError && (
                        <div className="text-md text-red-500 text-center">{imageError}</div>
                    )}

                    <input
                        value={caption}
                        onChange={handleCaptionChange}
                        onPaste={handlePaste}
                        className="w-full px-6 py-3 rounded-full bg-gray-100 text-gray-700 outline-none"
                        type="text"
                        placeholder="Write a caption..."
                    />

                    <div className={`text-xs text-right ${isWordLimitExceeded ? 'text-red-500' : 'text-gray-400'}`}>
                        {wordCount} / {CAPTION_WORD_LIMIT} words
                        {isWordLimitExceeded && <span className="block text-red-500 text-xs mt-1">Word limit reached</span>}
                    </div>

                    <button
                        className="w-full px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 active:scale-95 transition"
                        type="submit"
                    >
                        Post
                    </button>
                </form>

            </MotionSection>

        </main>
    )
}

export default CreatePost