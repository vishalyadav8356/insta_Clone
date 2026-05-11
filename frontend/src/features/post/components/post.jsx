import React, { useState } from 'react'
import { RiHeartLine, RiHeartFill } from '@remixicon/react'
import { RiChat4Line } from '@remixicon/react'
import { RiShareForwardLine } from '@remixicon/react'
import { RiBookmarkLine } from '@remixicon/react'
import { RiBookmarkFill } from '@remixicon/react'
import { RiMore2Line } from '@remixicon/react'
import { usePost } from '../hook/usePost.js'

const CAPTION_LIMIT = 100;

const post = ({ user, post, handleLikePost, handleUnlikePost, handleSavePost, handleUnsavePost, loading }) => {


    const [isExpanded, setIsExpanded] = useState(false);
    
    const wordCount = post.caption && post.caption.trim() !== '' ? post.caption.trim().split(/\s+/).length : 0;
    const isCaptionLong = post.caption && post.caption.length > CAPTION_LIMIT;
    const displayCaption = isExpanded ? post.caption : post.caption?.slice(0, CAPTION_LIMIT);

    return (
        <div className="posts w-full bg-gray-900 p-2 rounded-2xl">

            <div className="flex items-center justify-between mb-2">

                {/* Left side (profile) */}
                <div className="flex items-center gap-2">
                    <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={post.userId.profileImage}
                        alt="User"
                    />
                    <p className="text-white text-sm font-semibold">
                        {post.userId.username}
                    </p>
                </div>

                {/* Right side (menu) */}
                {/* <button className="text-white text-xl">
                    <RiMore2Line />
                </button> */}

            </div>

            <img className="rounded-md w-full h-80 object-cover" src={post.imgUrl} alt={"Post image"} />
            <div className="flex items-center justify-between gap-4 ">
                <div className="flex gap-4 py-2">
                    <button
                        onClick={() => { post.isLiked ? handleUnlikePost(post._id) : handleLikePost(post._id) }}
                        className='cursor-pointer'
                    >{post.isLiked ? < RiHeartFill color="rgba(255,9,32,1)" /> : <RiHeartLine />} </button>

                    <button className='cursor-pointer'><RiChat4Line /></button>
                    <button className='cursor-pointer'><RiShareForwardLine /></button>
                </div>
                <div>
                    <button
                        onClick={() => { post.isSaved ? handleUnsavePost(post._id) : handleSavePost(post._id) }}
                        className='cursor-pointer'
                    >{post.isSaved ? <RiBookmarkFill /> : <RiBookmarkLine />}</button>
                </div>
            </div>

            <div className="caption mt-2">
                <p className="text-white text-sm">
                    {displayCaption}
                    {isCaptionLong && !isExpanded && '...'}
                </p>
                {isCaptionLong && (
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-gray-400 text-xs hover:text-white mt-1 transition"
                    >
                        {isExpanded ? 'Read less' : 'Read more'}
                    </button>
                )}
            </div>

        </div>
    )
}

export default post