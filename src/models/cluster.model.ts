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
            type:Number , 
            required:true
        },
        lng:{
            type:Number , 
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
    } , 
    isAcitve:{
        type:Boolean , 
        default:false
    }
})

const Cluster = mongoose.model("Clusters", clusterSchema)

export default Cluster
