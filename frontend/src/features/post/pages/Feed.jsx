import React, {useEffect} from "react";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";

const Feed = () => {

   const { feed, handleGetFeed,loading, handleLike, handleUnLike } = usePost()

    useEffect(() => { 
        handleGetFeed()
    }, [])

    if(loading || !feed){
        return (<main><h1>Feed is loading...</h1></main>)
    }

  console.log(feed)

  return (
    <main className="min-h-screen w-full bg-zinc-950 flex justify-center py-10 px-4">

      {/* Feed Container */}
      <div className="w-full max-w-md flex flex-col gap-6">

      {feed.map(post =>{
        return <Post user={post.user} post={post}/>
      })}

      </div>

    </main>
  );
};

export default Feed;