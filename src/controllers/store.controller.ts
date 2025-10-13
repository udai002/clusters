import { storevalidation } from "../schemas/store.schema.js";
import ApiError from "../Error/ApiError.js";
import store from "../models/store.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import TryCatch from "../utils/TryCatch.js";

class storeControllers {
  CreateStore = TryCatch(async (req, res) => {
    console.log(req.body);

    const parse = storevalidation.safeParse(req.body);
    if (!parse.success) throw new ApiError("validation failed", 401, false);

    console.log("this is location of the store", parse);

    const { id } = req.params;
    const formdata = { ...parse.data, clusterId: id };
    console.log("cluster Id", id);
    console.log("form data ", formdata);

    const newStore = await store.create(formdata);

    res.json(new ApiResponse("Store created successfully", 201, newStore));
  });

  getstoreById = TryCatch(async (req, res) => {
    const storeData = await store.findById(req.params.id);
    if (!storeData) {
      throw new ApiError("store id is not found", 404, false);
    }

    res.json(new ApiResponse("Data Fetched successfully", 200, storeData));
  });

  getStores = TryCatch(async (req, res) => {
    const storeData = await store.find({});
    res.json(new ApiResponse("Data Fetched successfully", 200, storeData));
  });

  searchStores = TryCatch(async (req, res) => {
    const {
      search,
      page = 1,
      limit = 6,
      sortBy = "createdAt",
      order = "desc",
      ...filters
    } = req.query;
    let query = {};

    if (search) {
      query.$or = [{ storeName: { $regex: search, $options: "i" } }];
    }

    if (filters.supportType) {
      query.supportType = filters.supportType;
    }
    console.log("stores", search);

    const skip = (Number(page) - 1) * Number(limit);
    const stores = await store
      .find(query)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(Number(skip))
      .limit(Number(limit));
    const total = await store.countDocuments(query);

    console.log("stores", stores);

    if (!stores) {
      throw new ApiError("failed to get data", 404, false);
    }

    res.json(new ApiResponse("Data Fetched successfully", 200, stores));
  });
}

export default storeControllers;
