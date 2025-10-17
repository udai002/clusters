import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import DBConnect from './config/dbConnect.js'
import ErrorHandler from './middleware/ErrorHandler.js'
import { connectRedisClient } from './config/RedisClient.js'
import clusterRoutes from './routes/cluster.routes.js'
import store from './routes/store.routes.js'
import getServer from './service/storeService.js'
import grpc from '@grpc/grpc-js'

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

//
const storeServer = getServer()
storeServer.bindAsync("localhost:5001" , grpc.ServerCredentials.createInsecure() , (err , port)=>{
    if(err)console.log(err)
    console.log("GRPC server running at " , port)
})

//routes
app.use("/api/cluster" ,clusterRoutes)
app.use("/api/store",store)

app.use(ErrorHandler)

app.listen(port , ()=>{
    console.log(`Authentication server is running at http://localhost:${port}`);
})