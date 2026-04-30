import React, { useState, useRef } from 'react'
import { usePost } from '../hook/usePost.js'
import {useNavigate} from 'react-router-dom'

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

     if(loading){
        return (
            <main className="min-h-screen flex items-center justify-center bg-black">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
            </main>
          )
    }

    return (
        <main className="h-screen max-w-[400px] mx-auto flex items-center justify-center">

            <div className="w-full">
                <h1 className="text-2xl font-bold ">Create Post</h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 mt-4">
                    <label
                        className="w-full px-6 py-3 rounded-full bg-gray-100 text-gray-700 outline-none placeholder-gray-500 font-semibold cursor-pointer "
                        htmlFor="postImage">Select Image</label>
                    <input ref={postImageInputFileRef} type="file" name="postImage" id="postImage" hidden />
                    <input
                        value={caption}
                        onInput={(e) => setCaption(e.target.value)}
                        className="w-full px-6 py-3 rounded-full bg-gray-100 text-gray-700 outline-none placeholder-gray-500"
                        type="text" name="caption" id="caption" placeholder='Write a caption...' />
                    <button
                        className='w-full px-6 py-3 rounded-full     bg-red-500 text-white font-semibold cursor-pointer hover:bg-red-600 transition-transform duration-150 ease-in-out active:scale-95'
                        type='submit'>Post</button>
                </form>
            </div>
        </main>
    )
}

export default CreatePost