import mongoose, { Schema } from "mongoose";
import type { clusterInput } from "../schemas/cluster.schema.js";

const clusterSchema = new Schema<clusterInput>({
    name:{
        type:String , 
        required:true
    } , 
    clusterId:{
        type:String , 
        required:true
    } , 
    locations:[{
        lat:{
            type:String , 
            required:true
        },
        lng:{
            type:String , 
            required:true
        }
    }] ,
    region:{
        type:String , 
        required:true
    } , 
    storeIds:[{type:String}] , 
    warehouse:{
        type:String
    }
})

const Cluster = mongoose.model("Clusters", clusterSchema)

export default Cluster