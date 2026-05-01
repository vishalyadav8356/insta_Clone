import { getFeed, createPost, likePost, unlikePost, savePost,  unSavePost } from "../services/post.api.js"
import { useContext, useEffect } from "react"
import { PostContext } from "../post.context.jsx"

export const usePost = () =>{
    
    const context = useContext(PostContext)

    const {loading , setLoading, post, setPost, feed, setFeed} = context

    const handleGetFeed = async ()=>{
        setLoading (true)
        const response = await getFeed()
        setFeed(response.feed.reverse()) // reverse to show latest posts first
        setLoading(false)
    }

    const handleCreatePost = async (caption, imageFile) => {
        setLoading(true)
        const data = await createPost(caption, imageFile)
        setFeed([ data.post, ...feed])
        setLoading(false)
    }    

    const handleLikePost = async (postId) => {
        setLoading(true)
        const data = await likePost(postId)
        await handleGetFeed()
        setLoading(false)
    }

    const handleUnlikePost = async (postId) => {
        setLoading(true)
        const data = await unlikePost(postId)
        await handleGetFeed()
        setLoading(false)
    }

    const handleSavePost = async (postId) => {
        setLoading(true)
        const data = await savePost(postId)
        await handleGetFeed()
        setLoading(false)
    }

    const handleUnsavePost = async (postId) => {
        setLoading(true)
        const data = await unSavePost(postId)
        await handleGetFeed()
        setLoading(false)
    }

    useEffect(() => {
        handleGetFeed()
    }, [])

    return{
        loading,
        post,
        feed,
        handleGetFeed,
        handleCreatePost,
        handleLikePost,
        handleUnlikePost,
        handleSavePost,
        handleUnsavePost
    }

}