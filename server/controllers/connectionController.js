import { inngest } from "../inngest/index.js";
import User from "../models/User.js";
import Connection from "../models/Connection.js";

//Send connection request
export const sendConnectionRequest = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    //check if user has sent more than 20 req in last 24 hours
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const connectionRequest = await Connection.find({
      from_user_id: userId,
      created_at: { $gt: last24Hours },
    });

    if (connectionRequest.length >= 20) {
      return res.json({
        success: false,
        message:
          "you have sent more than 20 connection request in last 24 hours",
      });
    }

    //check if the users are already connected
    const connection = await Connection.findOne({
      $or: [
        { from_user_id: userId, to_user_id: id },
        { from_user_id: id, to_user_id: userId },
      ],
    });

    if (!connection) {
      const newConnection=await Connection.create({
        from_user_id: userId,
        to_user_id: id,
      });

      await inngest.send({
        name:'app/connection-request',
        data:{
          connectionId:newConnection._id,
        }
      })

      return res.json({
        success: true,
        message: "Connection request sent",
      });
    } else if (connection && connection.status === "accepted") {
      return res.json({
        success: false,
        message: "You are already connected with this user",
      });
    }
    return res.json({
      success: false,
      message: "Connection request pending",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//get user Connections
export const getUserConnection = async (req, res) => {
  try {
    const { userId } = req.auth();
    const user = await User.findById(userId).populate(
      "connections followers following",
    );

    const connections = user.connections;
    const followers = user.followers;
    const following = user.following;

    const pendingConnections = (
      await Connection.find({
        to_user_id: userId,
        status: "pending",
      }).populate("from_user_id")
    ).map((connection) => connection.from_user_id);

    res.json({
      success: true,
      connections,
      followers,
      following,
      pendingConnections,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//accept connection request
export const acceptConnectionRequest = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const connection = await Connection.findOne({
      from_user_id: id,
      to_user_id: userId,
    });

    if (!connection) {
      return res.json({
        success: false,
        message: "Connection not found",
      });
    }

    const user=await User.findById(userId);
    user.connections.push(id);
    await user.save()

    const toUser=await User.findById(id);
    toUser.connections.push(userId);
    await toUser.save()

    connection.status='accepted'
    await connection.save();

    return res.json({
      success: true,
      message: 'Connection accepted successfully',
    });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
