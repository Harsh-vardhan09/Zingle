import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDb from './configs/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import { clerkMiddleware } from '@clerk/express'
import userRouter from './routes/userRoutes.js';

const app=express();
await connectDb();


const PORT=process.env.PORT|| '8080';
// const Development=process.env.NODE;

app.use(express.json());
app.use(cors())
app.use(clerkMiddleware());


app.use('/api/user',userRouter)


app.get('/',(req,res)=>{
    res.send("server is running")
})


app.use('/api/inngest',serve({ client: inngest, functions }))

app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
    
})


