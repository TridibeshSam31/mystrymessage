import dbConnect from "../lib/dbconnect";
import UserModel from "../model/User";
import { Message } from '../model/User'

export async function POST(request:Request){
    await dbConnect()
    const {username,content} = await request.json();
    try {
        const user = await UserModel.findOne({ username: username }).exec()
        if(!user){
            return Response.json(
           { message: 'User not found', success: false },
           { status: 404 }
          );

        }
        //yeh check krenge ki user messages accept kr rhe hai ki nhi
        if(!user.isAcceptingMessage){
            return Response.json(
           { message: 'User is not accepting messages', success: false },
            { status: 403 } // 403 Forbidden status
          );
        }
        //ab saari cheeje ho gyi user mil gya humme aur woh user msgs accept bhi kr rha hai 
        //mai ek new msg craft krta hu ab jo message hai uskke schema mai humne 2 hi cheeje diye hai ek hai content aur created at then hum wahi likhenge new messages mai 
        
        const newMessage = { content, createdAt: new Date() };
        //ab inn message ko mai user jo message bhejega usme push kr dunga aur save kr dunga
        // Push the new message to the user's messages array
        user.messages.push(newMessage as Message);
        await user.save();


        return Response.json(
      { message: 'Message sent successfully', success: true },
      { status: 201 }
     );
 

    } catch (error) {
        console.error('Error adding message:', error);
       return Response.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
     );
    }
}