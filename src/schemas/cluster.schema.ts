import * as z from 'zod'

export const clusterValidation = z.object({
    name:z.string() ,
    clusterId:z.string(),
    region:z.string() ,
    locations:z.array(z.object({
        latitude:z.number(),
        longitude:z.number()
    })), 
    storeIds:z.array(z.string()).optional(),
    warehouse:z.string().optional() , 
    isAcitve:z.boolean().optional()
})

export type clusterInput = z.infer<typeof clusterValidation>