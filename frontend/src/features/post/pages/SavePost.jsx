import React, { useEffect } from 'react'
import { usePost } from '../hook/usePost.js'
import FooterNav from '../../shared/FooterNav.jsx';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftFill } from "@remixicon/react";


const SavePost = () => {

    const { handleShowSavedPosts, loading, feed } = usePost();
    const navigate = useNavigate();

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


    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
            </main>
        )
    }


    return (
        <main className="min-h-screen max-w-[400px] w-full flex flex-col items-center justify-start mx-auto bg-black">
            <div className="w-full relative flex items-center justify-center">
                <button
                    onClick={() => navigate("/Profile")}
                    className="text-2xl text-white absolute top-3 left-4"
                >
                    <RiArrowLeftFill />
                </button>

                <h1 className="text-white text-2xl font-bold text-center mt-2">Saved Posts</h1>
            </div>

            <div className="w-full max-w-[420px] flex flex-col gap-4 px-4 mt-4">

                {/* Render saved posts here */}
                <div className='grid grid-cols-3 gap-4'>
                    {feed && feed.length > 0 ? (
                        feed.map((post) => (
                            <div key={post._id || post.id} className=" rounded-lg overflow-hidden">

                                <img src={post.imgUrl || post.image} alt={post.caption || ''} className=" w-full h-40 object-cover" />

                            </div>
                        ))
                    ) : (
                        <div className="w-full min-h-[80vh] flex items-center justify-center col-span-3">
                            <p className="text-white text-center text-xl">No saved posts to display.</p>
                        </div>
                    )}
                </div>

                <FooterNav />
            </div>
        </main>
    )
}

export default SavePost