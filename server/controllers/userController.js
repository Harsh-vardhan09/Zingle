import User from "../models/User.js";
import fs from "fs";
import ImageKit, { toFile } from "@imagekit/nodejs";

const client = new ImageKit();
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
    const { username, bio, location, full_name } = req.body;

    let tempUser = await User.findById(userId);

    !username && (username = tempUser.username);

    if (tempUser.username !== username) {
      const user = User.findOne({ username });
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
    if (profile) {
      const buffer = fs.readFileSync(profile.path);
      await client.files.upload({
        file: buffer,
        fileName: profile.originalname,
      });

      const url = client.helper.buildSrc({
        src:response.filePath,
        transformation:[
            {quality:'auto'},
            {format:'webp'},
            {width:'512'}
        ]
      });

      updatedData.profile_picture=url;
    }

    if (cover) {
      const buffer = fs.readFileSync(cover.path);
      await client.files.upload({
        file: buffer,
        fileName: profile.originalname,
      });

      const url = client.helper.buildSrc({
        src:response.filePath,
        transformation:[
            {quality:'auto'},
            {format:'webp'},
            {width:'1280'}
        ]
      });

      updatedData.cover_photo=url;
    }

    const user=await User.findByIdAndUpdate(userId,updatedData,{new:true})
    res.json({success:true,user,message:'profile update succesfully'})
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
    const {input}=req.body;

    const allUsers=await User.find(
        {
            $or:[
                {username:new RegExp(input,'i')},
                {email:new RegExp(input,'i')},
                {full_name:new RegExp(input,'i')},
                {location:new RegExp(input,'i')},
            ]
        }
    )
    const filteredUser=allUsers.filter(user=>user._id!=userId);
     return res.json({
      success: true,
      users:filteredUser
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
    const {input}=req.body;

    

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};