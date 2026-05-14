import React, { useState, useRef, useEffect } from 'react'
import {
    RiHeart3Line,
    RiHeart3Fill,
    RiChat3Line,
    RiSendPlaneLine,
    RiBookmarkLine,
    RiBookmarkFill,
    RiMore2Fill,
} from '@remixicon/react'

{/*Limit for caption preview before showing "Read more" */ }
const CAPTION_LIMIT = 100;

{/* Post component to display individual post details and interactions */ }
const post = ({ user, post, handleLikePost, handleUnlikePost, handleSavePost, handleUnsavePost, loading }) => {

    {/* State for caption expansion and heart animation */ }
    const [isExpanded, setIsExpanded] = useState(false);
    const [heartStyleState, setHeartStyleState] = useState({
        transform: "translate(-50%, -50%) rotate(-60deg) scale(0)",
        opacity: 0,
    });
    {/* Ref to keep track of timeouts for heart animation, ensuring they can be cleared on unmount */ }
    const timeoutsRef = useRef([]);

    {/* Cleanup function to clear any pending timeouts when the component unmounts, preventing memory leaks */ }
    useEffect(() => {
        return () => {
            {/* clear any pending timeouts on unmount */ }
            timeoutsRef.current.forEach(id => clearTimeout(id));
            timeoutsRef.current = [];
        }
    }, [])

    {/* Function to handle double-click on the post image, triggering a like and heart animation */ }
    const handleDoubleClick = () => {
        // like the post if not already liked
        if (!post.isLiked) handleLikePost(post._id);

        // start heart animation sequence
        setHeartStyleState({ transform: "translate(-50%, -50%) rotate(0deg) scale(1)", opacity: 1, transition: 'transform 300ms ease-out, opacity 200ms linear' });

        // move up after 600ms
        timeoutsRef.current.push(setTimeout(() => {
            setHeartStyleState(s => ({ ...s, transform: "translate(-50%, -300%) rotate(0deg) scale(1)" }));
        }, 600));

        // fade out shortly after
        timeoutsRef.current.push(setTimeout(() => {
            setHeartStyleState(s => ({ ...s, opacity: 0 }));
        }, 650));

        // reset to initial state after animation completes
        timeoutsRef.current.push(setTimeout(() => {
            setHeartStyleState({ transform: "translate(-50%, -50%) rotate(-60deg) scale(0)", opacity: 0 });
        }, 950));
    }

    const wordCount = post.caption && post.caption.trim() !== '' ? post.caption.trim().split(/\s+/).length : 0;
    const isCaptionLong = post.caption && post.caption.length > CAPTION_LIMIT;
    const displayCaption = isExpanded ? post.caption : post.caption?.slice(0, CAPTION_LIMIT);

    return (
        <div className="posts w-full bg-gray-900 p-3 rounded-2xl">

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
                {/* <button className="text-white text-xl" type="button">
                    <RiMore2Fill />
                </button> */}

            </div>

            {/* Post image with double-click like functionality and heart animation */}
            <div className="relative rounded-lg w-full h-full overflow-hidden">
                <img
                    onDoubleClick={handleDoubleClick}
                    className="w-full h-full object-cover"
                    src={post.imgUrl}
                    alt={"Post image"}
                />

                {/* Heart animation element, positioned absolutely over the image, with styles controlled by state for animation effects */}
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: heartStyleState.transform,
                        opacity: heartStyleState.opacity,
                        transition: heartStyleState.transition || 'transform 300ms ease-out, opacity 200ms linear',
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* SVG heart with a gradient fill, using the post ID to create a unique gradient for each post */}
                    <svg width="96" height="96" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <defs>
                            <linearGradient id={`grad-${post._id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#feda75" />
                                <stop offset="25%" stopColor="#fa7e1e" />
                                <stop offset="50%" stopColor="#d62976" />
                                <stop offset="75%" stopColor="#962fbf" />
                                <stop offset="100%" stopColor="#4f5bd5" />
                            </linearGradient>
                        </defs>
                        <path fill={`url(#grad-${post._id})`} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-4 ">

                    <div className="flex gap-4 py-2 items-center">
                        
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() =>
                                    post.isLiked
                                        ? handleUnlikePost(post._id)
                                        : handleLikePost(post._id)
                                }
                                className="cursor-pointer"
                            >
                                {post.isLiked ? (
                                    <RiHeart3Fill className="text-red-500" />
                                ) : (
                                    <RiHeart3Line />
                                )}
                            </button>

                            <span className="font-semibold text-white">
                                {post.likeCount ?? 0}
                            </span>
                        </div>


                        <button className='cursor-pointer' type="button"><RiChat3Line /></button>
                        <button className='cursor-pointer' type="button"><RiSendPlaneLine /></button>
                    </div>
                    <div>
                        <button
                            onClick={() => { post.isSaved ? handleUnsavePost(post._id) : handleSavePost(post._id) }}
                            className='cursor-pointer'
                            type="button"
                        >{post.isSaved ? <RiBookmarkFill /> : <RiBookmarkLine />}</button>
                    </div>
                </div>


            </div>

            <div className="caption mt-3 px-1">
                <p className="text-white text-sm leading-relaxed">
                    <span className="font-semibold">{post.userId.username}</span> {displayCaption}
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