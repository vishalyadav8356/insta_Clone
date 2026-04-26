const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followeeUsername === followerUsername) {
    return res.status(400).send({
      message: "you cannot follow yourself",
    });
  }

  const isFolloweeExits = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExits) {
    return res.status(404).json({
      message: "User you are trying to follow does not exist",
    });
  }

  const alreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    following: followeeUsername,
  });

  if (alreadyFollowing) {
    return res.status(400).send({
      message: `you are already following ${followeeUsername}`,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    following: followeeUsername,
  });

  res.status(201).send({
    message: `you are now following ${followeeUsername}`,
    follow: followRecord,
  });
}

async function unfollowUserController(req, res) {
  const followeeUsername = req.params.username;
  const followerUsername = req.user.username;

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    following: followeeUsername,
  });

  if (!isUserFollowing) {
    return res.status(400).send({
      message: `you are not following ${followeeUsername}`,
    });
  }
  await followModel.findOneAndDelete(isUserFollowing._id);
  res.status(200).send({
    message: `you have unfollowed ${followeeUsername}`,
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
};
