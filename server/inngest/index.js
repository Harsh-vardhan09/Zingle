import { Inngest } from "inngest";
import User from "../models/User.js";
import Connection from "../models/connection.js";
import sendEmail from "../configs/nodeMailer.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "zingle-app" });

//ingest func to save user data to a database
const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk-v2",
    triggers: { event: "clerk/user.created" },
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    let username = email_addresses[0].email_address.split("@")[0];

    //check availability of username
    const user = await User.findOne({ username });
    if (user) {
      username = username + Math.floor(Math.random() * 10000);
    }

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      full_name: first_name + " " + last_name,
      profile_picture: image_url,
      username,
    };
    await User.create(userData);
    // console.log(userIn);
    console.log("EVENT RECEIVED:", event);
  },
);

//ingest function to update user in the database
const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk-v2",
    triggers: { event: "clerk/user.updated" },
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const updateUserData = {
      email: email_addresses[0].email_address,
      full_name: first_name + " " + last_name,
    };
    await User.findByIdAndUpdate(id, updateUserData);
    console.log("EVENT RECEIVED:", event);
  },
);

//ingest function to delete user in the database
const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-from-clerk-v2",
    triggers: { event: "clerk/user.deleted" },
  },
  async ({ event }) => {
    const { id } = event.data;

    await User.findByIdAndDelete(id);
    console.log("EVENT RECEIVED:", event);
  },
);

// INNGEST FUNSTION TO SEND REMAILDER WHEN A NEW CONNECTION REQUEST IS ADDED
const sendnewConnectionRequestReminder = inngest.createFunction(
  {
    id: "send-new-connection-request-reminder",
    triggers: { event: "app/connection-request" },
  },
  async ({ event, step }) => {
    const { connectionId } = event.data;

    await step.run("send-connection-request-mail", async () => {
      const connection =
        await Connection.findById(connectionId).populate("from_user_id");
      const subject = `New Connection Request`;
      const body = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Hi ${connection.to_user_id.full_name},</h2>
                <p>
                  You have a new connection request from 
                  ${connection.from_user_id.full_name} 
                  (@${connection.from_user_id.username}).
                </p>
                <p>
                  <a href="${process.env.FRONTEND_URL}/connections" style="color: #10b981;">
                    View request
                  </a>
                </p>
                <p>
                  Thanks,<br/>
                  Zingle - Stay Connected
                </p>
            </div> `;

      await sendEmail({
        to: connection.to_user_id.email,
        subject,
        body,
      });
    });

    const in24Hour = new Date(Date.now() + 24 * 60 * 0 * 1000);

    await step.sleepUntil("wait for 24 hours", in24Hour);
    await step.run(`send-connection-request-reminder`, async () => {
      const connection = await Connection.findById(connectionId).populate(
        "from_user_id to_user_id",
      );

      if (connection.status === "accepted") {
        return { message: "alredy accepted" };
      }
      const subject = `New Connection Request`;
      const body = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Hi ${connection.to_user_id.full_name},</h2>
                <p>
                  You have a new connection request from 
                  ${connection.from_user_id.full_name} 
                  (@${connection.from_user_id.username}).
                </p>
                <p>
                  <a href="${process.env.FRONTEND_URL}/connections" style="color: #10b981;">
                    View request
                  </a>
                </p>
                <p>
                  Thanks,<br/>
                  Zingle - Stay Connected
                </p>
            </div> `;

      await sendEmail({
        to: connection.to_user_id.email,
        subject,
        body,
      });
      return { message: "reminder sent" };
    });
  },
);

// Create an empty array where we'll export future Inngest functions
export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
  sendnewConnectionRequestReminder,
];
