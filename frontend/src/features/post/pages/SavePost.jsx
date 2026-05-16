import React, { useEffect, useState } from 'react'
import { usePost } from '../hook/usePost.js'
import FooterNav from '../../shared/FooterNav.jsx';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftFill } from "@remixicon/react";
import MotionSection from '../../shared/MotionSection.jsx';
import PostDetailModal from '../components/PostDetailModal.jsx'


const SavePost = () => {

    const { handleShowSavedPosts, loading, feed, handleLikePost, handleUnlikePost, handleSavePost, handleUnsavePost, handleDeletePost } = usePost();
    const navigate = useNavigate();
    const [selectedPost, setSelectedPost] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        let mounted = true;
        // call to populate provider state; provider manages its own state updates
        handleShowSavedPosts().then(() => {
            // no local state to set here; guard available if needed
        }).catch(() => { }).finally(() => {
            if (!mounted) return;
        });
        return () => { mounted = false };
    }, [handleShowSavedPosts])

    const handleOpenModal = (post) => {
        setSelectedPost(post)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedPost(null)
    }

    const handleModalLike = async (postId) => {
        if (!selectedPost) return

        const nextIsLiked = !selectedPost.isLiked

        if (selectedPost.isLiked) {
            await handleUnlikePost(postId)
        } else {
            await handleLikePost(postId)
        }

        setSelectedPost((prev) =>
            prev
                ? {
                    ...prev,
                    isLiked: nextIsLiked,
                    likeCount: Math.max((prev.likeCount || 0) + (nextIsLiked ? 1 : -1), 0),
                }
                : prev,
        )
    }

    const handleModalSave = async (postId) => {
        if (!selectedPost) return

        const nextIsSaved = !selectedPost.isSaved

        if (selectedPost.isSaved) {
            await handleUnsavePost(postId)
        } else {
            await handleSavePost(postId)
        }

        setSelectedPost((prev) => (prev ? { ...prev, isSaved: nextIsSaved } : prev))
    }

    const handleModalDelete = async (postId) => {
        try {
            await handleDeletePost(postId)
            // refresh saved list
            await handleShowSavedPosts()
            handleCloseModal()
        } catch (err) {
            console.error('Failed to delete post from modal:', err)
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
            </main>
        )
    }


    return (
        <main className="min-h-screen max-w-107.5 w-full flex flex-col items-center justify-start mx-auto bg-black px-4 pb-20">
            <MotionSection className="w-full relative flex items-center justify-center">
                <button
                    onClick={() => navigate("/Profile")}
                    className="text-2xl text-white absolute top-3 left-4"
                >
                    <RiArrowLeftFill />
                </button>

                <h1 className="text-white text-2xl font-bold text-center mt-2">Saved Posts</h1>
            </MotionSection>

            <div className="w-full flex flex-col gap-4 mt-4">

                {/* Render saved posts here */}
                <div className='grid grid-cols-3 gap-4'>
                    {feed && feed.length > 0 ? (
                        feed.map((post) => (
                            <div key={post._id || post.id} className=" rounded-lg overflow-hidden cursor-pointer" onClick={() => handleOpenModal(post)}>

                                <img src={post.imgUrl || post.image} alt={post.caption || ''} className=" w-full h-40 object-cover" />

                            </div>
                        ))
                    ) : (
                        <div className="w-full min-h-[80vh] flex items-center justify-center col-span-3">
                            <p className="text-white text-center text-xl">No saved posts to display.</p>
                        </div>
                    )}
                </div>

                <PostDetailModal
                    postId={selectedPost?._id}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onLike={handleModalLike}
                    onSave={handleModalSave}
                    onDelete={handleModalDelete}
                />

                <FooterNav />
            </div>
        </main>
    )
}

export default SavePost