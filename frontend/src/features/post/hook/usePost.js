import { getFeed, createPost, getMyPost, likePost, unlikePost, savePost, unSavePost} from "../services/post.api.js";
import { useCallback, useContext } from "react";
import { PostContext } from "../post.context.jsx";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, post, setPost, feed, setFeed } = context;

  const handleGetFeed = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getFeed();
      setFeed(response.feed.reverse()); // reverse to show latest posts first
    } catch (error) {
      console.error("Failed to fetch feed:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setFeed]);

  const handleCreatePost = useCallback(async (caption, imageFile) => {
    setLoading(true);
    try {
      const data = await createPost(caption, imageFile);
      setFeed([data.post, ...feed]);
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setFeed, feed]);

  const handleLikePost = useCallback(async (postId) => {
    try {
      await likePost(postId);

      setFeed((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, isLiked: true } : post,
        ),
      );
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  }, [setFeed]);

  const handleUnlikePost = useCallback(async (postId) => {
    try {
      await unlikePost(postId);

      setFeed((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, isLiked: false } : post,
        ),
      );
    } catch (error) {
      console.error("Failed to unlike post:", error);
    }
  }, [setFeed]);

  const handleSavePost = useCallback(async (postId) => {
    try {
      await savePost(postId);

      setFeed((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, isSaved: true } : post,
        ),
      );
    } catch (error) {
      console.error("Failed to save post:", error);
    }
  }, [setFeed]);

  const handleUnsavePost = useCallback(async (postId) => {
    try {
      await unSavePost(postId);

      setFeed((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, isSaved: false } : post,
        ),
      );
    } catch (error) {
      console.error("Failed to unsave post:", error);
    }
  }, [setFeed]);

  const handleGetPost = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getMyPost();
      setFeed(response.posts);
      return response;
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setFeed]);

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
