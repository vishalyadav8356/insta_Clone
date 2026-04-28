import {getFeed} from "../services/post.api.js"
import { useContext } from "react"
import { PostContext } from "../post.context.jsx"

export const usePost = () =>{
    
    const context = useContext(PostContext)

    const {loading , setLoading, post, srPost, feed, setFeed} = context

    const handleGetFeed = async ()=>{
        setLoading (true)
        const response = await getFeed()
        setFeed(response.feed)
        setLoading(false)
    }

    return{
        loading,
        post,
        feed,
        handleGetFeed
    }

}