import React, { useState, useEffect } from "react";
import {
    RiArrowLeftFill,
    RiHeart3Line,
    RiHeart3Fill,
    RiChat3Line,
    RiSendPlaneLine,
    RiBookmarkLine,
    RiBookmarkFill,
    RiMore2Fill,
    RiDeleteBin6Line,
} from "@remixicon/react";
import { getPostDetails } from "../services/post.api.js";
import { usePost } from "../hook/usePost.js";
import ModalShell from "../../shared/ModalShell.jsx";
import { motion, AnimatePresence } from "framer-motion";



const PostDetailModal = ({ postId, isOpen, onClose, onLike, onSave, onDelete }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const { handleLikePost, handleUnlikePost, handleSavePost, handleUnsavePost, handleDeletePost } = usePost();
    const [showMenu, setShowMenu] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isOpen) return;
        if (!postId) return;

        let cancelled = false;

        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await getPostDetails(postId);
                if (!cancelled) setPost(res?.post ?? res);
            } catch (err) {
                if (!cancelled) setError(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();

        return () => {
            cancelled = true;
        };
    }, [isOpen, postId]);

    const handleDeleteClick = async () => {
        if (!onDelete) return;
        try {
            setIsDeleting(true);
            await onDelete(postId);
            setShowMenu(false);
            onClose?.();
        } catch (err) {
            console.error(err);
        } finally {
            setIsDeleting(false);
        }
    };

    const author = (post && (post.author ?? post.userId ?? post.user)) || {};
    const authorUsername = author?.username || "username";
    const authorProfileImage = author?.profilePicture || author?.profileImage;

    return (
        <ModalShell
            isOpen={isOpen}
            onClose={onClose}
            className="flex h-screen w-screen max-w-107.5 mx-auto flex-col overflow-hidden bg-black rounded-none md:rounded-3xl"
        >
                {/* TOP HEADER */}
                <div className="flex h-17.5 items-center justify-between border-b border-neutral-900 ">
                    {/* LEFT */}
                    <div className="flex items-center gap-4">
                        <button type="button" onClick={onClose} className="text-white text-[28px]">
                             <RiArrowLeftFill />
                        </button>

                        <h2 className="text-white text-2xl font-semibold">Posts</h2>
                    </div>

                    {/* RIGHT */}
                    <button type="button" onClick={() => setShowMenu(true)} className="text-white text-2xl" aria-label="Open post menu">
                        <RiMore2Fill />
                    </button>
                </div>

                {/* CONTENT */}
                <div className="flex-1 overflow-hidden">
                    {/* USER INFO */}
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                            {/* PROFILE */}
                            <div className="h-12 w-12 overflow-hidden rounded-full bg-neutral-800">
                                {authorProfileImage && <img src={authorProfileImage} alt="profile" className="h-full w-full object-cover" />}
                            </div>

                            {/* INFO */}
                            <div>
                                <h2 className="text-white text-lg font-semibold leading-none">{authorUsername}</h2>
                            </div>
                        </div>
                    </div>

                    {/* IMAGE */}
                    <div className="flex w-full items-center justify-center bg-black px-4">
                        {loading ? (
                            <div className="w-full h-64 flex items-center justify-center">
                                <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <img src={post?.imgUrl} alt="post" className="h-full w-80 object-contain" />
                        )}
                    </div>

                    {/* ACTIONS */}
                    <div className="px-4 pt-4">
                        <div className="flex items-center justify-between">
                            {/* LEFT */}
                            <div className="flex items-center gap-5">
                                {/* LIKE */}

                                <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={async () => {
                                        if (!post) return;
                                        try {
                                            if (post.isLiked) {
                                                await handleUnlikePost(postId);
                                                setPost((p) => (p ? { ...p, isLiked: false, likeCount: Math.max((p.likeCount || 1) - 1, 0) } : p));
                                            } else {
                                                await handleLikePost(postId);
                                                setPost((p) => (p ? { ...p, isLiked: true, likeCount: (p.likeCount || 0) + 1 } : p));
                                            }
                                        } catch (err) {
                                            console.error("Modal like error:", err);
                                        }
                                    }}
                                    className="text-white text-[34px]"
                                >
                                    {post?.isLiked ? <RiHeart3Fill className="text-red-500" /> : <RiHeart3Line />}
                                </button>

                                <span className="font-semibold text-white">
                                    {post?.likeCount ?? 0}
                                </span>
                                </div>

                                {/* COMMENT */}
                                <button type="button" className="text-white text-[32px]"><RiChat3Line /></button>

                                {/* SHARE */}
                                <button type="button" className="text-white text-[32px]"><RiSendPlaneLine /></button>
                            </div>

                            {/* SAVE */}
                            <button
                                type="button"
                                onClick={async () => {
                                    if (!post) return;
                                    try {
                                        if (post.isSaved) {
                                            await handleUnsavePost(postId);
                                            setPost((p) => (p ? { ...p, isSaved: false } : p));
                                        } else {
                                            await handleSavePost(postId);
                                            setPost((p) => (p ? { ...p, isSaved: true } : p));
                                        }
                                    } catch (err) {
                                        console.error("Modal save error:", err);
                                    }
                                }}
                                className="text-white text-[32px]"
                            >
                                {post?.isSaved ? <RiBookmarkFill /> : <RiBookmarkLine />}
                            </button>
                        </div>



                        {/* CAPTION */}
                        <div className="mt-2">
                            <p className="wrap-break-word text-[17px] leading-relaxed text-white">
                                <span className="mr-2 font-bold">{authorUsername}</span>
                                "{post?.caption}"
                            </p>
                        </div>

                        {/* COMMENTS */}
                        {post?.comments && post.comments.length > 0 && (
                            <div className="mt-4 max-h-40 overflow-auto">
                                {post.comments.map((c) => (
                                    <div key={c._id || c.id} className="mb-2">
                                        <span className="font-semibold mr-2">{c.user?.username || c.author || 'user'}</span>
                                        <span className="text-neutral-300">{c.text ?? c.body}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* DATE */}
                        <p className="mt-1 text-sm text-neutral-500">{post?.createdAt ? new Date(post.createdAt).toDateString() : ''}</p>
                    </div>
                </div>

                {/* MENU */}
                <AnimatePresence>
                    {showMenu && (
                        <>
                            <motion.div
                                onClick={() => setShowMenu(false)}
                                className="fixed inset-0 z-60 bg-black/70"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />

                            <motion.div
                                onClick={(e) => e.stopPropagation()}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 200,
                                }}
                                className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-107.5 rounded-t-3xl border-t border-neutral-800 bg-neutral-950 overflow-hidden z-60"
                            >
                                {/* HANDLE */}
                                <div className="flex justify-center py-3">
                                    <div className="h-1.5 w-16 rounded-full bg-neutral-700" />
                                </div>

                                <div className="px-3 pb-6 flex flex-col gap-3">
                                    {/* DELETE */}
                                    {onDelete && (
                                        <motion.button
                                            type="button"
                                            onClick={async () => {
                                                try {
                                                    setIsDeleting(true);
                                                    await onDelete(postId);
                                                    setIsDeleting(false);
                                                } catch (err) {
                                                    console.error("Modal delete error:", err);
                                                    setIsDeleting(false);
                                                }
                                            }}
                                            disabled={isDeleting}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1, duration: 0.3 }}
                                            className="w-full py-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-medium transition flex items-center justify-center gap-2"
                                        >
                                            <RiDeleteBin6Line className="text-xl" />
                                            {isDeleting ? "Deleting..." : "Delete Post"}
                                        </motion.button>
                                    )}

                                    {/* CLOSE */}
                                    <motion.button
                                        type="button"
                                        onClick={() => setShowMenu(false)}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15, duration: 0.3 }}
                                        className="w-full py-4 rounded-2xl bg-zinc-700 hover:bg-zinc-600 text-white font-medium transition"
                                    >
                                        Cancel
                                    </motion.button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
        </ModalShell>
    );
};

export default PostDetailModal;