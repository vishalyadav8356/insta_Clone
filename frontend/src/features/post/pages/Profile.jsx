import React, { useEffect, useState } from 'react'
import { useAuth } from '../../auth/hook/useAuth.js'
import {usePost} from '../hook/usePost.js'
import FooterNav from '../../shared/FooterNav.jsx';
import { useNavigate } from 'react-router-dom';


const Profile = () => {

  const {user} = useAuth();
  const { handleGetPost , loading, handleShowSavedPosts  } = usePost();
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

  const navigate = useNavigate();

  const handleNavigateToSavedPosts = async () => {
    await handleShowSavedPosts();
    navigate('/saved-posts');
  }


      if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
            </main>
        )
    }


  return (
    <main className="min-h-screen w-full max-w-100 mx-auto bg-black text-white p-4 mb-15">

      {/* Top Section */}
      <div className="flex items-center gap-4 ">

        {/* Profile Image */}
        <div className="h-24 w-24 bg-gray-300 rounded-full overflow-hidden ">
          <img
            src={user?.profileImage}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Username + Bio */}
        <div className="flex-1 min-w-0">
        <div className="flex flex-col min-w-0">
          <h1 className="text-xl font-bold truncate">{user?.username || "Username"}</h1>
          <p className="text-gray-300 text-sm mt-1 wrap-words overflow-hidden">{user?.bio || "Bio goes here..."}</p>
        </div>
        <div className="flex flex-wrap gap-4 mt-1 text-sm">
            <p className="truncate">{user?.postsCount || 0} posts</p>
            <p className="truncate">{user?.followersCount || 0} followers</p>    
            <p className="truncate">{user?.followingCount || 0} following</p>
        </div>
        <div className=" flex gap-2 mt-2 ">
          <button 
            onClick={() => navigate("/editProfile")}
          className="px-4 py-1 bg-gray-500 rounded cursor-pointer hover:bg-gray-600">Edit Profile</button>
          <button
            onClick={handleNavigateToSavedPosts}
          className="px-4 py-1 bg-gray-500 rounded cursor-pointer hover:bg-gray-600">Save posts</button>
        </div>
        </div>

      </div>

      <div className="mt-4 border-t border-gray-600 pt-4">
        
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

          <FooterNav/>

      </div>    

    </main>
  )
}

export default Profile