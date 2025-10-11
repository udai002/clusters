import mongoose, { model, Schema } from "mongoose";
import type { IStore } from "../Types/store.type.js";

const StoreSchema = new Schema<IStore>({

    clusterId:{
         type:String
    },

    inventryId:
    {
        type:Schema.Types.ObjectId
    },

    storeType:
    {
        type:String,
        enum:["mother_store","mini_store"]
    },
    storeName:
    {
        type:String
    },
     locations:{
        lat:{
            type:Number , 
            required:true
        },
        lng:{
            type:Number , 
            required:true
        }
    } ,
    
    })

const Store = mongoose.model("newstores", StoreSchema)

export default Store