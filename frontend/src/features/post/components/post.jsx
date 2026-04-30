import React from 'react'
import {RiHeartLine, RiHeartFill} from '@remixicon/react'
import {RiChat4Line} from '@remixicon/react'
import {RiShareForwardLine} from '@remixicon/react'
import {RiBookmarkLine} from '@remixicon/react'
import { usePost } from '../hook/usePost.js'

const post = ({user, post, handleLikePost, handleUnlikePost, loading}) => {

  
    return (
        <div className="posts w-full bg-gray-900 p-2 rounded-2xl">

            <div className="user flex gap-2 items-center mb-2">
                <img className="h-12 w-12 rounded-full aspect-square " src={post.userId.profileImage} alt={"User"} />
                <p>{post.userId.username}</p>
            </div>

            <img className="rounded-md" src={post.imgUrl} alt={ "Post image"} />
            <div className="flex items-center justify-between gap-4 ">
                <div className="flex gap-4 py-2">
                    <button
                        onClick={()=>{post.isLiked?handleUnlikePost(post._id) : handleLikePost(post._id)}}
                    >{post.isLiked ? < RiHeartFill  color="rgba(255,9,32,1)"   /> : <RiHeartLine /> } </button>
                    <button><RiChat4Line /></button>
                    <button><RiShareForwardLine /></button>
                </div>
                <div><RiBookmarkLine /></div>
            </div>

            <div className="caption">
                <p>{post.caption}</p>
            </div>

        </div>
    )
}

export default post