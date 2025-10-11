import { storevalidation } from '../schemas/store.schema.js';
import ApiError from '../Error/ApiError.js';
import store from '../models/store.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import TryCatch from '../utils/TryCatch.js';


class storeControllers{

        CreateStore=TryCatch(async (req , res)=>{
        console.log(req.body)

        const parse = storevalidation.safeParse(req.body)
                if(!parse.success) throw new ApiError("validation failed" , 401 , false)
                    
        console.log("this is location of the store" , parse)
        
        const{id}=req.params
        const formdata = {...parse.data , clusterId:id}
        console.log("cluster Id",id)
        console.log("form data ",formdata)


        const newStore = await store.create(formdata)

        res.json(new ApiResponse("Store created successfully" , 201 ,newStore ))
        
    })


    getstoreById=TryCatch(async(req,res)=>
        {
        const storeData=await store.findById( req.params.id)
         if (!storeData)
            {
                throw new ApiError("store id is not found",404,false)
            }

        res.json( new ApiResponse("Data Fetched successfully",200 ,storeData))


    })

        getStores = TryCatch(async (req, res) => {
        const storeData = await store.find({})
        res.json(new ApiResponse("Data Fetched successfully", 200, storeData))

    })



}

export default storeControllers;