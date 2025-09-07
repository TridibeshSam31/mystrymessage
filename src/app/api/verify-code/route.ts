import dbConnect from "@/app/lib/dbconnect";
import UserModel from "@/app/model/User";


export async function POST(request:Request){
    await dbConnect()

    try {
        const{username,code} = await request.json()
        //to decode things / information from url we use 
        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({username:decodedUsername})
        if (!user) {
        return Response.json({
        sucess:false,
        message:'User not found'
        
       },{status:500}) 
     }

     //ab agar user mujhe mil gya hai then 
     const isCodeValid = user.verifyCode ===code
     const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

     if(isCodeValid && isCodeNotExpired){
        user.isVerified = true
        await user.save()
        return Response.json({
        sucess:true,
        message:'Account Verified successfully'
        
       },{status:200}) 

     }else if(!isCodeNotExpired){
        return Response.json({
        sucess:false,
        message:'Verification Code has expired,please signup again to get a new code'
        
       },{status:400}) 

     }else{
        return Response.json({
        sucess:false,
        message:'Incorrect Verification Code'
        
       },{status:400}) 
     }




    } catch (error) {
        return Response.json({
        sucess:false,
        message:'Error Verifying user'
        
    },{status:500})
    }
}