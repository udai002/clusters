import *  as z from 'zod'

export const storevalidation =z.object({
    storeType:z.enum(['mother_store','mini_store']),
    storeName:z.string(),
    locations:z.object({
            lat:z.number(),
            lng:z.number()
        })
    })




export type storeInput = z.infer<typeof storevalidation>













