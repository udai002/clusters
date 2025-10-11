import { storevalidation } from '../schemas/store.schema.js';
import ApiError from '../Error/ApiError.js';
import store from '../models/store.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import TryCatch from '../utils/TryCatch.js';

class storeControllers {
// getstoreById=TryCatch(async(req,res)=>{
//         const storeData=await store.findById( req.params.id)
//     if (!storeData)throw new ApiError("store id is not found",404,false)
//             res.json( new ApiResponse("Data Fetched successfully",200 ,storeData))


//     }


    getStores = TryCatch(async (req, res) => {
        const storeData = await store.find({})
        res.json(new ApiResponse("Data Fetched successfully", 200, storeData))

    })



}