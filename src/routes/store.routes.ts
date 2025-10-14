import express from 'express'
import StoreContollers from '../controllers/store.controller.js'

const router = express.Router()
const storeActions = new StoreContollers()

router.post('/create/:id' , storeActions.CreateStore)
router.get('/get' , storeActions.getStores)
router.delete('/delete/:id',storeActions.deleteStoreById)


export default router
