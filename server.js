import express from 'express'
import { createServer } from "http";
import { Server } from "socket.io";
import http from 'http'
const port=process.env.PORT || 5000
const app=express();
export var io;
import dotenv from 'dotenv'
dotenv.config()

import connectDB from './db/connect.js';
import authRouter from './Routes/authRoutes.js'
import quizRouter from './Routes/quizRoutes.js'
import { log } from 'console';
app.use(express.json())


app.use('/api/v1/auth',authRouter)
app.use('/api/v1/quiz',quizRouter)

app.get('/',(req,res)=>{
    res.send('Welcome!')
})  

// app.enable('trust proxy')



 
export const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        const server=app.listen(port,()=>{
            console.log(`Server is Listening on port ${port}...`);
        })
        io = new Server(server, { 
            pingTimeout: 60000, 
            cors: { 
              origin: "http://localhost:3000",
            },
          });
 
          io.on("connection",(socket)=>{
            console.log("connected to socket.io");
        
            socket.on('setup',(userData)=>{
                socket.join(userData._id);
                socket.emit("connected");
                console.log(`${userData._id} connected`);
            })
            // socket.on('deletequiz', (quizId) => {
            //     // Handle the `deletequiz` event here.
            //     console.log("Deleted quiz"); 
            // })
            socket.on("disconnect",(userData)=>{
                console.log("USER DISCONNECTED");
                socket.leave(userData._id);
            })
        })
         
    } catch (error) { 
        console.log(error);
    } 
}

start()



