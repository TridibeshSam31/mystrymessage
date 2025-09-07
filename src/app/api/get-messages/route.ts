//Agar mai messages accept kr rha hu toh mujhe saare messages de do uske liye route likhenge

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/app/lib/dbconnect";
import UserModel from "@/app/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";


export async function GET(request:Request){
    //wahi kaam ji humne thoda accept msgs mai kiya tha session mai se user nikal lenge
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user:User = session?.user as User

    if(!session||!session.user){
        return Response.json({
        success:false,
        message:'Not Authenticated'
        
       },{status:401}) 

    }

    //const userId = user._id; baat yeh hai ki ab jab hum aggregation pipeline likhenge toh yeh pakka error dega hum kuch iss tarah likhte hai 
    const userId = new mongoose.Types.ObjectId(user._id)
    try {
     const user = await UserModel.aggregate([
      { $match: { _id: userId } },  // Step 1: find the user by _id
      { $unwind: '$messages' },// Step 2: deconstruct messages[] → one document per message
      { $sort: { 'messages.createdAt': -1 } },// Step 3: sort those messages by createdAt descending
      { $group: { _id: '$_id', messages: { $push: '$messages' } } },// Step 4: regroup into one user with sorted messages
     ]).exec();
     //ab yeh jab ag

     if (!user || user.length === 0) {
      return Response.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }
       return Response.json(
      { messages: user[0].messages },
      {
        status: 200,
      }
      );
     
    } catch (error) {
       console.error('An unexpected error occurred:', error);
       return Response.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
     );
    }
}



/*
Why to use aggregation here ?
1. You want sorted messages
In MongoDB, arrays (messages: [...]) are stored unsorted.
If you just did UserModel.findById(userId), you’d get the messages array as-is (order preserved, but not auto-sorted by createdAt).
Aggregation allows you to:
unwind the array → break it into separate documents.
sort them by createdAt.
Then group back into one array, but now in sorted order.
👉 That’s the main reason: sorting nested array elements by a field.

2. More flexibility

Aggregation gives you more options than .find(), for example:
Filtering messages ($match inside after unwind).
Adding computed fields ($project).
Limiting messages ($limit after unwind).
Joining with another collection ($lookup).
You couldn’t do these things directly on an array field with a simple find().


3. Efficiency

Instead of:
Fetching the whole user doc (with possibly thousands of messages).
Then sorting/filtering in JavaScript (slow, in-memory).
👉 Aggregation pushes the sorting + transformation down to MongoDB engine itself → faster & more memory efficient.

*/
