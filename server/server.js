import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDb from './configs/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
const app=express();
await connectDb();
const PORT=process.env.PORT|| '8080';

app.use(express.json());
app.use(cors())


app.get('/',(req,res)=>{
    res.send("server is running")
})

app.use('/api/inngest',serve({ client: inngest, functions }))

app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
    
})