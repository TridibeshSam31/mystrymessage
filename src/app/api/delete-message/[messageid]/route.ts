import UserModel from "@/app/model/User";
import { getServerSession, User } from "next-auth";
import dbConnect from "@/app/lib/dbconnect";
import { Message } from "@/app/model/User";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export  async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const messageId = params.messageid;
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user = session?.user;
  if (!session || !_user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const updateResult = await UserModel.updateOne(
      { _id: _user._id },
      { $pull: { messages: { _id: messageId } } }
    );//messages areray hai jab bhi mongodb array ko save krta hai toh array  ke sabhi elements ko documents ki tarah save krta hai so isiliye hum pull ka use kr rhe hai
    //$pull operator use krke hum us document ko hata rhe hai jiska _id messageId ke barabar hai
    //response mai hum yeh check kr rhe hai ki modifiedCount 0 toh nahi hai iska matlab yeh hua ki ya toh message hi nahi mila ya phir pehle hi delete ho chuka tha
    if (updateResult.modifiedCount === 0) {
      return Response.json(
        { message: 'Message not found or already deleted', success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { message: 'Message deleted', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return Response.json(
      { message: 'Error deleting message', success: false },
      { status: 500 }
    );
  }
}