import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/users",
  withCredentials: true,
});

export const followUser = async (username) => {
  try {
    const response = await api.post(`/follow/${username}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const unFollowUser = async (username) => {
  try {
    const response = await api.post(`/unfollow/${username}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getFollowRequests = async () => {
  try {
    const response = await api.get(`/follow/requests`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const acceptFollowRequest = async (username) => {
  try {
    const response = await api.post(`/follow/${username}/accept`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const rejectFollowRequest = async (username) => {
  try {
    const response = await api.post(`/follow/${username}/reject`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
