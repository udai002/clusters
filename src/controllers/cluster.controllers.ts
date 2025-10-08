import ApiError from "../Error/ApiError.js";
import Cluster from "../models/cluster.model.js";
import { clusterValidation } from "../schemas/cluster.schema.js";
import ApiResponse from "../utils/ApiResponse.js";
import TryCatch from "../utils/TryCatch.js";

class clusterContollers{

    getClusters = TryCatch(async (req , res)=>{
        const clustersData = await Cluster.find({})
        res.json(new ApiResponse("Data Fetched successfully" , 200 , clustersData))
    })

    CreateCluster=TryCatch(async (req , res)=>{
        const parse = clusterValidation.safeParse(req.body)
        if(!parse.success) throw new ApiError(parse.error.message , 401 , false)

        const newCluster = await Cluster.create(parse.data)

        res.json(new ApiResponse("Cluster created successfully" , 201 , newCluster))
        
    })
}

export default clusterContollers