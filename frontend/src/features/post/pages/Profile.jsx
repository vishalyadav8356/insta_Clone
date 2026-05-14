import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/hook/useAuth.js";
import { usePost } from "../hook/usePost.js";
import FooterNav from "../../shared/FooterNav.jsx";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../components/ProfileMenu.jsx";
import MotionSection from "../../shared/MotionSection.jsx";
import PostDetailModal from "../components/PostDetailModal.jsx";


const Profile = () => {
  const { user, handleLogout, setUser } = useAuth();
  const { handleGetPost, loading, handleShowSavedPosts, handleLikePost, handleUnlikePost, handleSavePost, handleUnsavePost, handleDeletePost, feed } = usePost();

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      const response = await handleGetPost();

      if (response?.posts) {
        setPosts(response.posts);
      }
    };

    loadPosts();
  }, [handleGetPost]);

  const handleNavigateToSavedPosts = async () => {
    await handleShowSavedPosts();
    navigate("/saved-posts");
  };

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleLike = async (postId) => {
    if (!selectedPost) return;

    const nextIsLiked = !selectedPost.isLiked;

    if (selectedPost.isLiked) {
      await handleUnlikePost(postId);
    } else {
      await handleLikePost(postId);
    }

    setSelectedPost((prev) =>
      prev
        ? {
            ...prev,
            isLiked: nextIsLiked,
            likeCount: Math.max((prev.likeCount || 0) + (prev.isLiked ? -1 : 1), 0),
          }
        : prev,
    );

    setPosts((prev) =>
      prev.map((p) =>
        p._id === postId
          ? {
              ...p,
              isLiked: nextIsLiked,
              likeCount: Math.max((p.likeCount || 0) + (selectedPost.isLiked ? -1 : 1), 0),
            }
          : p,
      ),
    );
  };

  const handleSave = async (postId) => {
    if (!selectedPost) return;

    const nextIsSaved = !selectedPost.isSaved;

    if (selectedPost.isSaved) {
      await handleUnsavePost(postId);
    } else {
      await handleSavePost(postId);
    }

    setSelectedPost((prev) => (prev ? { ...prev, isSaved: nextIsSaved } : prev));

    setPosts((prev) =>
      prev.map((p) => (p._id === postId ? { ...p, isSaved: nextIsSaved } : p)),
    );
  };

  const handleDelete = async (postId) => {
    try {
      await handleDeletePost(postId);
      setPosts((prev) => prev.filter((p) => p._id !== postId));
      
      // Update user post count
      if (user) {
        setUser({
          ...user,
          postsCount: Math.max((user.postsCount || 1) - 1, 0),
        });
      }
      
      handleCloseModal();
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };


  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full max-w-107.5 mx-auto bg-black text-white p-4 mb-15">

      {/* Top Profile Section */}
      <MotionSection className="flex items-start justify-between gap-4">

        {/* Left Side */}
        <div className="flex gap-4 flex-1">

          {/* Profile Image */}
          <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-300 shrink-0">
            <img
              src={user?.profileImage}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex flex-col gap-3 flex-1 min-w-0">

            {/* Username + Bio */}
            <div>
              <h1 className="text-2xl font-bold truncate">
                {user?.username || "Username"}
              </h1>

              <p className="text-sm text-gray-300 mt-1 wrap-break-word">
                {user?.bio || "Bio goes here..."}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 text-sm font-medium flex-wrap">
              <p>
                <span className="font-bold">
                  {user?.postsCount || 0}
                </span>{" "}
                posts
              </p>

              <p>
                <span className="font-bold">
                  {user?.followersCount || 0}
                </span>{" "}
                followers
              </p>

              <p>
                <span className="font-bold">
                  {user?.followingCount || 0}
                </span>{" "}
                following
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => navigate("/editProfile")}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition text-sm font-medium"
              >
                Edit Profile
              </button>

              <button
                onClick={handleNavigateToSavedPosts}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition text-sm font-medium"
              >
                Saved Posts
              </button>
            </div>
          </div>
        </div>

        {/* Account Menu */}
        <div className="self-start">
          <ProfileMenu handleLogout={handleLogout} />
        </div>
      </MotionSection>

      {/* Posts Grid */}
      <MotionSection className="mt-6 border-t border-gray-700 pt-4" delay={0.1}>
        <div className="grid grid-cols-3 gap-2">

          {posts.map((post) => (
            <div
              key={post._id}
              className="w-full h-52 bg-gray-300 rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition"
              onClick={() => handleOpenModal(post)}
            >
              <img
                src={post.imgUrl}
                alt="post"
                className="w-full h-full object-cover"
              />
            </div>
          ))}

        </div>
      </MotionSection>

      {/* Post Detail Modal */}
      <PostDetailModal
        postId={selectedPost?._id}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onLike={handleLike}
        onSave={handleSave}
        onDelete={handleDelete}
      />

      {/* Footer Navigation */}
      <FooterNav />
    </main>
  );
};

export default Profile;