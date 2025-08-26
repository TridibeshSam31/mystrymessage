import {z} from "zod"

export const signInSchema = z.object({
    identifier: z.string(),
    password: z.string()
})
//identifier bolo ya username dono hi same hai jaise mrji waise likho 

