import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import DBConnect from './config/dbConnect.js'
import ErrorHandler from './middleware/ErrorHandler.js'
import { connectRedisClient } from './config/RedisClient.js'
import clusterRoutes from './routes/cluster.routes.js'

dotenv.config()
const port = process.env.PORT
const app = express()
DBConnect()
connectRedisClient()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

//routes
app.use("/api/cluster" ,clusterRoutes)

app.use(ErrorHandler)

app.listen(port , ()=>{
    console.log(`Authentication server is running at http://localhost:${port}`);
})