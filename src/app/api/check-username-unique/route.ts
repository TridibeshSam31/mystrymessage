//yeh folder humne username ko check krne ko bnaya hai ki kya username unique hai  ??

import dbConnect from "@/app/lib/dbconnect";
import {success, z} from 'zod'
import UserModel from "@/app/model/User";
import { usernameValidation } from "@/app/Schemas/signUpSchema"; 

//so ab jo humne zod ka schema bnaya tha uska use krenge 

const UsernameQuerySchema = z.object({
    username:usernameValidation
})

//humme ek get request use krke function bnana pdega jisse ki user ke username ko check krke hum yeh bta paaye ki kya user new hai mere platform mai ya fir pehle se hi exist krta hai 


export async function GET(request:Request){
   await dbConnect()
   

   try {
    //username check krenge hum url se 
    //mere url mai ab kaafi saare query parameters ka use kiya hoga usme se mujhe specific username nikalna hai ab mera url kuch aisa sa hoga
    //localhost:3000/api/cuu?username=shivam?phone=android aise hi krke kaafi saare value ho skte hai unme se mujhe sirf username=shivam chaiye 

    const {searchParams} = new URL(request.url)
    const queryParam = {
        username:searchParams.get('username')
    }
    //ab username toh hume mil gya isse validate krenge zod se
  const result = UsernameQuerySchema.safeParse(queryParam)
  console.log(result)
  //jab iss result ko console log krke dekhenge toh usme humko kaafi saari values milti hai jaise
  //.success etc
  if(!result.success){
    const usernameErrors = result.error.format().username?._errors || []
    return Response.json({
        sucess:false,
        message: usernameErrors?.length >0
        ? usernameErrors.join(',')
        :'Invalid query parameters'
    },{status:400})


  }

   //jaise humne result ko console log kraya toh usme humko data bhi milta hai so 

   const {username} = result.data

  const existingVerifiedUser = UserModel.findOne({username , isVerified:true})
   if (!existingVerifiedUser) {
    return Response.json({
        sucess:false,
        message:'Username is already taken'
        
    },{status:400})
    
   }else{
    return Response.json({
        sucess:true,
        message:'Username is unique'
        
    },{status:400})
   }
    





   } catch (error) {
    console.error("Eroor Checking Username",error)
    return Response.json(
        {
            success:false,
            message:"Error checking username"
        },
        {status:500}
    )
    
   }
   
}