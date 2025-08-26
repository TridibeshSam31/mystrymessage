//jo user pehle aayega obv usse sabse pehle signin krwa denge 

//since typeScript ka use kr rhe hai toh hum zod library ka use krenenge

import {z} from 'zod'


export const usernameValidation = z
.string()
.min(2,"Username must be atleast 2 characters long")
.max(20,"Username must be no more than 20 characters ")
.regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,"Username must not contain special character")



export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:'Invalid Email Address'}),
    password:z.string().min(6,{message:"password must not be atleast 6 characters"})
})