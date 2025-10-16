
import type { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js'
import { type storesDataServer , type StoreRequest , storeResponse } from 'mom-protos'
import {storesDataService} from 'mom-protos'
import grpc from '@grpc/grpc-js'


// service functions
function StoreService(call:ServerUnaryCall<StoreRequest , storeResponse>, callback:sendUnaryData<storeResponse>){
    console.log("this si id we need the data" , call.request.storeId)
   callback(null , {
    storeName:"udai"
   })
}

// service server and connections
function getServer(){
    var server = new grpc.Server()
    server.addService(storesDataService , {
        storeDetails:StoreService
    })

    return server
}

export default getServer