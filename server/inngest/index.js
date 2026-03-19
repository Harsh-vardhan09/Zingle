import { Inngest } from "inngest";
import User from "../models/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "zingle-app" });

//ingest func to save user data to a database
const syncUserCreation=inngest.createFunction(
    {id:'sync-user-from-clerk'},
    {event:'user.created'},
    async({event})=>{
        const {id,first_name,last_name,email_addresses,image_url}=event.data
        let username=email_addresses[0].email_address.split('@')[0]
      
        //check availability of username
        const user=await User.findOne({username})
        if(user){
            username=username+Math.floor(Math.random()*10000)
        }
        
        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            full_name:first_name+" "+last_name,
            profile_picture:image_url,
            username
        }
       await User.create(userData)
        // console.log(userIn);
        console.log("EVENT RECEIVED:", event);
    }
)

//ingest function to update user in the database
const syncUserUpdation=inngest.createFunction(
    {id:'update-user-from-clerk'},
    {event:'user.updated'},
    async({event})=>{
        const {id,first_name,last_name,email_addresses,image_url}=event.data
      
      const updateUserData={
        email:email_addresses[0].email_address,
        full_name:first_name+" "+last_name,
      }
        await User.findIdAndUpdate(id,updateUserData)
        console.log("EVENT RECEIVED:", event);
    }
)

//ingest function to delete user in the database
const syncUserDeletion=inngest.createFunction(
    {id:'delete-user-from-clerk'},
    {event:'user.deleted'},
    async({event})=>{
        const {id}=event.data
      
        await User.findIdAndDelete(id)
        console.log("EVENT RECEIVED:", event);

    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion
];

