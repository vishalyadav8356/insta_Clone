import React from 'react'

const Post = ({user, post, loading}) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg">
      {/* Post Card */}

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3">

            <div className="flex items-center gap-3">

              <img
                src={user.profileImage}
                alt="profile"
                className="w-9 h-9 rounded-full object-cover"
              />

              <p className="text-sm font-semibold text-zinc-200">
                {user.username}
              </p>

            </div>

          </div>

          {/* Post Image */}
          <div className="w-full bg-black">

            <img
              src={post.imgUrl}
              alt="post"
              className="w-full max-h-[500px] object-cover"
            />

          </div>

          {/* Actions */}
          <div className="flex items-center justify-between px-4 py-3">

            <div className="flex items-center gap-5 text-xl text-zinc-300">

              <i className={`ri-heart-line cursor-pointer hover:text-red-500 transition ${post.isLiked ? 'text-red-500' : ''}`}></i>

              <i className="ri-chat-3-line cursor-pointer hover:text-white transition"></i>

              <i className="ri-send-plane-line cursor-pointer hover:text-white transition"></i>

            </div>

            <i className="ri-bookmark-line text-xl text-zinc-300 cursor-pointer hover:text-white transition"></i>

          </div>

          {/* Caption */}
          <div className="px-4 pb-4 text-sm text-zinc-300 leading-relaxed">

            <span className="font-semibold text-zinc-100 mr-2">
              {user.username}
            </span>

            {post.caption}

          </div>
        </div>
      )
    }

    export default Post