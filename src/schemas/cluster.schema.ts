import * as z from 'zod'

export const clusterValidation = z.object({
    name:z.string() ,
    clusterId:z.string(),
    region:z.string() ,
    locations:z.array(z.object({
        latitude:z.string(),
        longitude:z.string()
    })), 
    storeIds:z.array(z.string()),
    warehouse:z.string()
})

export type clusterInput = z.infer<typeof clusterValidation>