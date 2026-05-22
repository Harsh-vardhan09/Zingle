import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDb from './configs/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import { clerkMiddleware } from '@clerk/express'
import userRouter from './routes/userRoutes.js';
import connectionRouter from './routes/connectionRoutes.js';
import postRouter from './routes/postRoutes.js';
import storyRouter from './routes/storyRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app=express();
await connectDb();

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});
app.set('io', io);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('joinroom', (roomid) => {
    socket.join(roomid);
    console.log(`Socket ${socket.id} joined room ${roomid}`);
  });

  socket.on('leaveroom', (roomid) => {
    socket.leave(roomid);
    console.log(`Socket ${socket.id} left room ${roomid}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});
const PORT=process.env.PORT|| '8080';
// const Development=process.env.NODE;

app.use(express.json());
app.use(cors())
app.use(clerkMiddleware());
app.use('/api/inngest',serve({ client: inngest, functions }))


app.get('/',(req,res)=> res.send("server is running"))

app.use('/api/user',userRouter)
app.use('/api/connection',connectionRouter)
app.use('/api/post',postRouter);
app.use('/api/story',storyRouter);
app.use('/api/message',messageRouter)

server.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
    
})

