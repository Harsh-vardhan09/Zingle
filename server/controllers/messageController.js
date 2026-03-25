import ImageKit from "@imagekit/nodejs";
import fs from "fs";
import Message from "../models/Message.js";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// create an empty object to store server side event connections
const connections = {};

//controller function for SERVER SIDE Event endpoint
export const sseController = (req, res) => {
  const { userId } = req.params;
  console.log("new client connected", userId);

  //set server side headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection-Control", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  //Add the client response object to the connection object
  connections[userId] = res;

  // send an initial event to the client
  res.write("log:connected to sse stream\n\n");

  //handle client disconnection
  req.on("close", () => {
    //remove the client response object from the connections array
    delete connections[userId];

    console.log("client disconnected");
  });
};

//send message

export const sendMessage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { to_user_id, text } = req.body;
    const image = req.file;

    let media_url = "";
    let message_type = image ? "image" : "text";

    if (message_type === "image") {
      const fileBuffer = fs.createReadStream(image.path);
      let response = await client.files.upload({
        file: fileBuffer,
        fileName: image.originalname,
      });

      media_url = client.helper.buildSrc({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        src: response.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });
    }

    const message = await Message.create({
      from_user_id: userId,
      to_user_id,
      text,
      message_type,
      media_url,
    });

    res.json({ success: true, message });

    //send message to to_user_id using sse

    const messageWithUserData = await Message.findById(message._id).populate(
      "from_user_id",
    );

    if (connections[to_user_id]) {
      connections[to_user_id].write(
        `data:${JSON.stringify(messageWithUserData)}\n\n`,
      );
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Get Chat Messages
export const getChatMessage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { to_user_id } = req.body;

    const messages = await Message.find({
      $or: [
        { from_user_id: userId, to_user_id },
        { from_user_id:to_user_id, to_user_id: userId },
      ],
    }).sort({ createdAt: -1 });

    //mark messages as seen
    await Message.updateMany(
      { from_user_id: to_user_id, to_user_id: userId },
      { seen: true },
    );

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserRecentMessages = async (req, res) => {
  try {
    const { userId } = req.auth();
    const messages = await Message.find({
      to_user_id: userId,
    })
      .populate("from_user_id to_user_id")
      .sort({ createdAt: -1 });

     res.json({
      success: true,
      messages,
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
