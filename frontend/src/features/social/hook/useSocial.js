import { useSocial as useSocialContext } from "../social.context.jsx";
import * as api from "../services/social.api";

export default function useSocialActions() {
  const { social, setSocial } = useSocialContext();

  async function fetchFollowRequests() {
    const res = await api.getFollowRequests();
    setSocial((prev) => ({ ...prev, followRequests: res.followRequests || [] }));
    return res;
  }

  async function sendFollowRequest(username) {
    return api.followUser(username);
  }

  async function acceptFollowRequest(username) {
    const res = await api.acceptFollowRequest(username);
    // refresh pending requests and add follower locally
    fetchFollowRequests().catch(() => {});
    setSocial((prev) => ({ ...prev, followers: [...(prev.followers || []), username] }));
    return res;
  }

  async function rejectFollowRequest(username) {
    const res = await api.rejectFollowRequest(username);
    fetchFollowRequests().catch(() => {});
    return res;
  }

  async function unFollow(username) {
    const res = await api.unFollowUser(username);
    setSocial((prev) => ({ ...prev, following: (prev.following || []).filter((u) => u !== username) }));
    return res;
  }

  return {
    social,
    fetchFollowRequests,
    sendFollowRequest,
    acceptFollowRequest,
    rejectFollowRequest,
    unFollow,
  };
}

