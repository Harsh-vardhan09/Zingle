import User from "../models/User.js";
import fs from "fs";
import ImageKit, { toFile } from "@imagekit/nodejs";
import Connection from "../models/Connection.js";
import Post from "../models/Post.js";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Get user data using user id
export const getUserData = async (req, res) => {
  try {
    const { userId } = req.auth();
    let user = await User.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }
    return res.json({
      success: true,
      message: user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// update user data
export const updateUserData = async (req, res) => {
  try {
    const { userId } = req.auth();
    let { username, bio, location, full_name } = req.body;

    let tempUser = await User.findById(userId);

    !username && (username = tempUser.username);

    if (tempUser.username !== username) {
      const user = await User.findOne({ username });
      if (user) {
        //we will not change the username if its already taken
        username = tempUser.username;
      }
    }

    const updatedData = {
      username,
      bio,
      location,
      full_name,
    };

    const profile = req.files.profile && req.files.profile[0];
    const cover = req.files.cover && req.files.cover[0];
    // console.log(req.files);
    // console.log(req.files.profile[0]);
    // console.log(req.files.cover[0]);

    if (profile) {
      let response = await client.files.upload({
        file: fs.createReadStream(profile.path),
        fileName: profile.originalname,
      });
      console.log(response);

      let url = client.helper.buildSrc({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        src: response.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "512" },
        ],
      });
      // console.log("this is url",url);
      updatedData.profile_picture = url;
    }

    if (cover) {
      let response = await client.files.upload({
        file: fs.createReadStream(cover.path),
        fileName: cover.originalname,
      });

      let url = client.helper.buildSrc({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        src: response.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });

      updatedData.cover_photo = url;
    }

    // console.log(updatedData);

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      returnDocument: "after",
    });
    res.json({ success: true, user, message: "profile update succesfully" });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//find user using username, email, location, name
export const discoverUser = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { input } = req.body;

    const allUsers = await User.find({
      $or: [
        { username: new RegExp(input, "i") },
        { email: new RegExp(input, "i") },
        { full_name: new RegExp(input, "i") },
        { location: new RegExp(input, "i") },
      ],
    });
    const filteredUser = allUsers.filter((user) => user._id != userId);
    return res.json({
      success: true,
      users: filteredUser,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Follow user
export const followUser = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const user = await User.findById(userId);

    if (user.following.includes(id)) {
      return res.json({
        success: false,
        message: "you are already following this user",
      });
    }

    user.following.push(id);
    await user.save();

    const toUser = await User.findById(id);
    toUser.followers.push(userId);

    await toUser.save();
    res.json({
      success: true,
      message: "now you are following this user",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// UnFollow user
export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const user = await User.findById(userId);

    user.following = user.following.filter((user) => user !== id);
    await user.save();

    const toUser = await User.findById(id);
    toUser.followers = toUser.followers.filter((user) => user !== userId);
    await toUser.save();

    res.json({
      success: true,
      message: "now you are no longer following this user",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// get user profiles
export const getUserProfiles = async (req, res) => {
  try {
    const { profileId } = req.body;
    const profile = await User.findById(profileId);
    if(!profile){
      return res.json({success:false,
        message:'profile not found'
      })
    }
    const posts=await Post.find({
      user:profileId
    }).populate('user')

    res.json({
      success:true,
      profile,
      posts
    })

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
