import type { Document } from 'mongoose';
import type {storeInput} from '../schemas/store.schema.js'
import type { Types } from "mongoose";


export interface IStore extends Document , storeInput{
    clusterId:Types.ObjectId ;
    inventryId:Types.ObjectId ;
    // storeId:Types.ObjectId ;  


}