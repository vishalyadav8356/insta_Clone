import React, { useEffect, useState } from 'react'
import { useAuth } from '../../auth/hook/useAuth.js'
import {usePost} from '../hook/usePost.js'

const Profile = () => {

  const {user} = useAuth();
  const { handleGetPost } = usePost();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const response = await handleGetPost();
      if (response?.posts) {
        setPosts(response.posts);
      }
    };

    loadPosts();
  }, [handleGetPost]);

  return (
    <main className="min-h-screen w-full max-w-100 mx-auto bg-gray-700 text-white p-4">

      {/* Top Section */}
      <div className="flex items-center gap-4 ">

        {/* Profile Image */}
        <div className="h-24 w-24 bg-gray-300 rounded-full overflow-hidden">
          <img
            src={user?.profileImage}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Username + Bio */}
        <div>
        <div className="">
          <h1 className="text-xl font-bold">{user?.username || "Username"}</h1>
          <p className="text-gray-300 text-sm">{user?.bio || "Bio goes here..."}</p>
        </div>
        <div className=" flex gap-2 mt-2 ">
            <p>{user?.postsCount || 0} posts</p>
            <p>{user?.followersCount || 0} followers</p>    
            <p>{user?.followingCount || 0} following</p>
        </div>
        <div className=" flex gap-2 mt-2 ">
          <button className="px-4 py-1 bg-blue-500 rounded">Edit Profile</button>
          <button className="px-4 py-1 bg-gray-500 rounded">Save posts</button>
        </div>
        </div>

      </div>

      <div className="mt-6 border-t border-gray-600 pt-4">
        
        <div className="grid grid-cols-3 gap-2">
          {posts.map((post) => (
           ( <div key={post._id} className="w-full h-52 bg-gray-300 rounded-md overflow-hidden">
              <img
                src={post.imgUrl} 
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>)
          ))}
        </div>

      </div>    

    </main>
  )
}

export default Profile