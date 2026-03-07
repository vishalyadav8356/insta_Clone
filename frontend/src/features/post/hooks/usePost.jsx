import { getFeed } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context";

export function usePost() {
    const context = useContext(PostContext)
   
    const {loading, setLoading, posts, setPosts, feed, setFeed} = context

    const handleGetFeed = async () => {
        setLoading(true)
        try{
            const data = await getFeed()
               console.log("API DATA:", data)
                setFeed(data.post)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }
    return {loading, posts, feed, handleGetFeed}
}