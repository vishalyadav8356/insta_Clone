const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserContoller(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername == followeeUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isFolloweeExist = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExist) {
    return res.status(404).json({
      message: "user you are trying to follow does not exits",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: `You are already following ${followeeUsername}`,
      follow: isAlreadyFollowing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending",
  });

  res.status(201).json({
    message: `You are now following ${followeeUsername}`,
    follow: followRecord,
  });
}

async function unfollowUserContoller(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You are not following ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`,
  });
}

async function acceptFollowRequest(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const follow = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending",
  });

  if (!follow) {
    return res.status(404).json({
      message: "Follow request not found",
    });
  }

  follow.status = "accepted";
  await follow.save();

  res.status(200).json({
    message: `You have accepted the follow request from ${followeeUsername}`,
    follow,
  });
}

async function rejectFollowRequest(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const follow = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending",
  });

  if (!follow) {
    return res.status(404).json({
      message: "follow request not found",
    });
  }

  follow.status = "rejected"
  await follow.save()

  res.status(200).json({
    message: `You have rejected the follow request from ${followeeUsername}`,
    follow
  })
}

module.exports = {
  followUserContoller,
  unfollowUserContoller,
  acceptFollowRequest,
  rejectFollowRequest
};
