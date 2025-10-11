import type { Document } from 'mongoose';
import type {storeInput} from '../schemas/store.schema.js'
import type { Types } from "mongoose";


export interface IStore extends Document , storeInput{
    clusterId:string;
    inventryId?:string;
    // storeId:Types.ObjectId ;  


}