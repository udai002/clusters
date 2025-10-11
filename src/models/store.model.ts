import mongoose, { model, Schema } from "mongoose";
import type { IStore } from "../Types/store.type.js";

const StoreSchema = new Schema<IStore>({

    clusterId:{
         type:Schema.Types.ObjectId
    },

    inventryId:
    {
        type:Schema.Types.ObjectId
    },

    storeType:
    {
        type:String,
        enum:["mother_Store","mini_Store"]
    },
    storeName:
    {
        type:String
    },
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
    
    })

const Store = mongoose.model("Clusters", StoreSchema)

export default Store