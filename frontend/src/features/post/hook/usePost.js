import { getFeed, createPost, getMyPost, likePost, unlikePost, savePost, unSavePost, showSavedPosts, editProfile} from "../services/post.api.js";
import { useCallback, useContext } from "react";
import { AuthContext } from "../../auth/auth.context.jsx";
import { PostContext } from "../post.context.jsx";
import { useNavigate } from "react-router-dom";


export const usePost = () => {
  const context = useContext(PostContext);
  const authContext = useContext(AuthContext);

  const { loading, setLoading, post, feed, setFeed } = context;
  const { setUser } = authContext;

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
      setFeed(response.posts.reverse());
      return response;
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setFeed]);

  const handleShowSavedPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await showSavedPosts();
      // normalize backend response: could be { savedPosts: [...] } or { posts: [...] }
      const list = response?.savedPosts ?? response?.posts ?? [];
      setFeed(Array.isArray(list) ? list : []);
      return Array.isArray(list) ? list : [];
    } catch (error) {
      console.error("Failed to fetch saved posts:", error);
      setFeed([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [setLoading, setFeed]);

  const handleEditProfile = useCallback(async(bio, profileImage) => {
    setLoading(true);
    try {
      const response = await editProfile(bio, profileImage);  
      if (response?.user) {
        setUser(response.user);
      }
    } catch (error) {
      console.error("Failed to edit profile:", error);
    } finally {
      setLoading(false);
    }   
  }, [setLoading, setUser]);



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
    handleGetPost,
    handleShowSavedPosts,
    handleEditProfile
  };
};
