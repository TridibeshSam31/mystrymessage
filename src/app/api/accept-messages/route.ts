import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/app/lib/dbconnect";
import UserModel from "@/app/model/User";
import { User } from "next-auth";

//mai yeh chahta hu ki mai ek toggle bnau jisse ki mai msgs accept kru ya na kru so uske liye code likhunga

export async function POST(request:Request){
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user:User = session?.user as User

    if(!session||!session.user){
        return Response.json({
        sucess:false,
        message:'Not Authenticated'
        
       },{status:401}) 

    }

    const userId = user._id;
    //frontend se bhi toh request bhejega ki message accept krna hai ki nhi
    const {acceptMessages} = await request.json()
    try {
       const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {isAcceptingMessage:acceptMessages},
        {new:true} //new isliye likha hai
       )
       if(!updatedUser){
        return Response.json({
        sucess:false,
        message:'failed to update user status to accept messages'
        
       },{status:500}) 
       }
       return Response.json({
        sucess:true,
        message:"Message acceptance status updated successfully",
        updatedUser
        
       },{status:200}) 
    } catch (error) {
        console.log("failed to update user status to accept messages")
        return Response.json({
        sucess:false,
        message:'failed to update user status to accept messages'
        
       },{status:500}) 
    }
}

export async function GET(request:Request){
    
    await dbConnect()
    try {
        const session = await getServerSession(authOptions)
        const user:User = session?.user as User
    
        if(!session||!session.user){
            return Response.json({
            sucess:false,
            message:'Not Authenticated'
            
           },{status:401}) 
    
        }
        const userId = user._id;
    
        const foundUser = await UserModel.findById(userId)
        if(!foundUser){
            return Response.json({
            sucess:false,
            message:'User not found'
            
           },{status:404}) 
        }
        return Response.json({
            sucess:false,
            isAcceptingmessage:foundUser.isAcceptingMessage
            
        },{status:200}) 
           


    } catch (error) {
        console.log("failed to update user status to accept messages")
        return Response.json({
        sucess:false,
        message:'error in accepting messages'
        
       },{status:500}) 
    }

       
    

}