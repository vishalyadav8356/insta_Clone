import { getFeed, createPost, getMyPost, likePost, unlikePost, savePost, unSavePost} from "../services/post.api.js";
import { useContext, useEffect } from "react";
import { PostContext } from "../post.context.jsx";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, post, setPost, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const response = await getFeed();
    setFeed(response.feed.reverse()); // reverse to show latest posts first
    setLoading(false);
  };

  const handleCreatePost = async (caption, imageFile) => {
    setLoading(true);
    const data = await createPost(caption, imageFile);
    setFeed([data.post, ...feed]);
    setLoading(false);
  };

  const handleLikePost = async (postId) => {
    await likePost(postId);

    setFeed((prev) =>
      prev.map((post) =>
        post._id === postId ? { ...post, isLiked: true } : post,
      ),
    );
  };

  const handleUnlikePost = async (postId) => {
    await unlikePost(postId);

    setFeed((prev) =>
      prev.map((post) =>
        post._id === postId ? { ...post, isLiked: false } : post,
      ),
    );
  };

  const handleSavePost = async (postId) => {
    await savePost(postId);

    setFeed((prev) =>
      prev.map((post) =>
        post._id === postId ? { ...post, isSaved: true } : post,
      ),
    );
  };

  const handleUnsavePost = async (postId) => {
    await unSavePost(postId);

    setFeed((prev) =>
      prev.map((post) =>
        post._id === postId ? { ...post, isSaved: false } : post,
      ),
    );
  };

  const handleGetPost = async (postId) => {
    setLoading(true);
    const response = await getMyPost();
    setFeed(response.posts);
    setLoading(false);
    return response;
  }

  useEffect(() => {
    handleGetFeed();
  }, []);

  return {
    loading,
    post,
    feed,
    handleGetFeed,
    handleCreatePost,
    handleLikePost,
    handleUnlikePost,
    handleSavePost,
    handleUnsavePost,
    handleGetPost
  };
};
