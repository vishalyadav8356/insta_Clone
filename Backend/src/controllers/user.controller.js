const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

//controller for follow user
async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  //check if the user is trying to follow himself
  if (followeeUsername === followerUsername) {
    return res.status(400).json({
      message: "you cannot follow yourself",
    });
  }

  //check if the user to be followed exists in database 
  const isFolloweeExits = await userModel.findOne({
    username: followeeUsername,
  });

  //if user to be followed does not exist return not found error
  if (!isFolloweeExits) {
    return res.status(404).json({
      message: "User you are trying to follow does not exist",
    });
  }

  //check if a follow record already exists
  const existingFollow = await followModel.findOne({
    follower: followerUsername,
    following: followeeUsername,
  });

  //if already accepted then user is already following
  if (existingFollow && existingFollow.status === "accepted") {
    return res.status(400).json({
      message: `you are already following ${followeeUsername}`,
      follow: existingFollow,
    });
  }

  //if already pending then do not create duplicate request
  if (existingFollow && existingFollow.status === "pending") {
    return res.status(200).json({
      message: `follow request already pending for ${followeeUsername}`,
      follow: existingFollow,
    });
  }

  //if rejected earlier then json request again by moving back to pending
  if (existingFollow && existingFollow.status === "rejected") {
    existingFollow.status = "pending";
    await existingFollow.save();

    return res.status(201).json({
      message: `follow request sent again to ${followeeUsername}`,
      follow: existingFollow,
    });
  }

  //create a fresh follow request with pending status
  const followRecord = await followModel.create({
    follower: followerUsername,
    following: followeeUsername,
    status: "pending",
  });

  //return success response with follow request data
  res.status(201).json({
    message: `follow request sent to ${followeeUsername}`,
    follow: followRecord,
  });
}

//controller for followee to accept follow request
async function acceptFollowRequestController(req, res) {
  const followerUsername = req.params.username;
  const followeeUsername = req.user.username;

  const followRequest = await followModel.findOne({
    follower: followerUsername,
    following: followeeUsername,
  });

  if (!followRequest) {
    return res.status(404).json({
      message: `follow request from ${followerUsername} not found`,
    });
  }

  if (followRequest.status === "accepted") {
    return res.status(200).json({
      message: `follow request from ${followerUsername} already accepted`,
      follow: followRequest,
    });
  }

  followRequest.status = "accepted";
  await followRequest.save();

  return res.status(200).json({
    message: `you accepted ${followerUsername}'s follow request`,
    follow: followRequest,
  });
}

//controller for followee to reject follow request
async function rejectFollowRequestController(req, res) {
  const followerUsername = req.params.username;
  const followeeUsername = req.user.username;

  const followRequest = await followModel.findOne({
    follower: followerUsername,
    following: followeeUsername,
  });

  if (!followRequest) {
    return res.status(404).json({
      message: `follow request from ${followerUsername} not found`,
    });
  }

  if (followRequest.status === "rejected") {
    return res.status(200).json({
      message: `follow request from ${followerUsername} already rejected`,
      follow: followRequest,
    });
  }

  followRequest.status = "rejected";
  await followRequest.save();

  return res.status(200).json({
    message: `you rejected ${followerUsername}'s follow request`,
    follow: followRequest,
  });
}

//controller for followee to get all pending follow requests
async function getFollowRequestsController(req, res) {
  const followeeUsername = req.user.username;

  const followRequests = await followModel.find({
    following: followeeUsername,
    status: "pending",
  });

  return res.status(200).json({
    message: "pending follow requests fetched successfully",
    followRequests,
  });
}

//controller for unfollow user
async function unfollowUserController(req, res) {
  const followeeUsername = req.params.username;
  const followerUsername = req.user.username;

  //find accepted follow record only
  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    following: followeeUsername,
    status: "accepted",
  });

  //if user is not following the user to be unfollowed return bad request error
  if (!isUserFollowing) {
    return res.status(400).json({
      message: `you are not following ${followeeUsername}`,
    });
  }

  //delete the follow record from database where follower username and following username matches
  await followModel.findOneAndDelete({
    follower: followerUsername,
    following: followeeUsername,
  });
  res.status(200).json({
    message: `you have unfollowed ${followeeUsername}`,
  });
}



module.exports = {
  followUserController,
  acceptFollowRequestController,
  rejectFollowRequestController,
  getFollowRequestsController,
  unfollowUserController,
};
