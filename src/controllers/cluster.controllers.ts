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
    // create the cluster 
    



    CreateCluster=TryCatch(async (req , res)=>{
        console.log(req.body)
        const parse = clusterValidation.safeParse(req.body)
        if(!parse.success) throw new ApiError( "validation failed",401 , false)
        const newCluster = await Cluster.create(parse.data);
        console.log("clusters body data",newCluster);



    res.json(new ApiResponse("Cluster created successfully", 201, newCluster));
  });

  DeleteClusterById = TryCatch(async (req, res) => {
    const { id } = req.params;
    console.log("id is params:", id);

    const deletedCluster = await Cluster.findByIdAndDelete(id );

    // if(!deletedCluster)
    // {
    //   throw new ApiError("Error in delete user", 401, false);
    // }
    

    console.log("delete cluster", deletedCluster);

    res.json(
      new ApiResponse("Cluster Deleted successfully", 201, deletedCluster)
    );
  });

  searchClusters = TryCatch(async (req, res) => {
    const {search,page = 1,limit = 6,sortBy = "createdAt",order = "desc",...filters} = req.query;
    let query = {};

    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }];
    }

    if (filters.supportType) {
      query.supportType = filters.supportType;
    }

    console.log("stores", search);

    const skip = (Number(page) - 1) * Number(limit);
    const clusters = await Cluster.find(query)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(Number(skip))
      .limit(Number(limit));
    const total = await Cluster.countDocuments(query);
    const clusterData = {...clusters ,total};
    console.log("clusters", clusterData);

    if (!clusterData) {
      throw new ApiError("failed to get data", 404, false);
    }

    res.json(new ApiResponse("Data Fetched successfully", 200, clusterData));
  });

}

export default clusterContollers;
