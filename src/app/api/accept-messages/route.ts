import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/app/lib/dbconnect";
import UserModel from "@/app/model/User";
import { User } from "next-auth";

//mai yeh chahta hu ki mai ek toggle bnau jisse ki mai msgs accept kru ya na kru so uske liye code likhunga

export async function POST(request:Request){
    await dbConnect()
    
}