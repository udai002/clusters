import express from 'express'
import clusterContollers from '../controllers/cluster.controllers.js'

const router = express.Router()
const clusterActions = new clusterContollers()

router.post('/' , clusterActions.CreateCluster)
router.get('/' , clusterActions.getClusters)

export default router