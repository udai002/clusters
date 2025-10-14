import express from "express";
import clusterContollers from "../controllers/cluster.controllers.js";

const router = express.Router();
const clusterActions = new clusterContollers();

router.post("/create", clusterActions.CreateCluster);
router.get("/", clusterActions.getClusters);
router.delete("/deleteid/:id", clusterActions.DeleteClusterById);
router.get("/search", clusterActions.searchClusters);



export default router;
