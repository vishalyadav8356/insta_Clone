import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  withCredentials: true,
});

export async function getFeed() {
  const response = await api.get("/feed");
  return response.data;
}

export async function createPost(caption, imageFile) {
  const formData = new FormData();
  formData.append("caption", caption);
  formData.append("image", imageFile);

  const response = await api.post("/", formData);
  return response.data;
}

export async function likePost(postId) {
  const response = await api.post("/like/" + postId);
  return response.data;
}

export async function unlikePost(postId) {
  const response = await api.post("/unlike/" + postId);
  return response.data;
}

export async function savePost(postId) {
  const response = await api.post("/save/" + postId);
  return response.data;
}

export async function unSavePost(postId) {
  const response = await api.post("/unsave/" + postId);
  return response.data;
}

export async function getMyPost() {
  const response = await api.get("/");
  return response.data;
}

export async function getPostDetails(postId) {
  const response = await api.get("/details/" + postId);
  return response.data;
}

export async function showSavedPosts() {
  const response = await api.get("/savedPosts");
  return response.data;
}

export async function deletePost(postId) {
  const response = await api.delete("/postDelete/" + postId);
  return response.data;
}

export async function editProfile(bio, profileImage) {
  const formData = new FormData();
  formData.append("bio", bio);
  if (profileImage) {
    formData.append(
      "profileImage",
      profileImage
    );
  }

  const response = await api.post("/editProfile", formData);
  return response.data;
}


