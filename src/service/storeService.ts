import {Stores} from 'mom-protos'
import grpc, { type ServerUnaryCall } from '@grpc/grpc-js'
import Store from '../models/store.model.js'

// call -> request from client 

async function storeDetails(call:ServerUnaryCall<Stores.StoreRequest , Stores.storeResponse> , callback:any){
    const {storeId} = call.request
    // const storeDetail = await Store.findOne({_id:storeId})
    callback(null , {storeName:"Hyderabad store"})
}

function getStores(){
    var server = new grpc.Server()
    server.addService(Stores.storesDataService  , {
        storeDetails
    })

    return server
}

export default getStores