//production mai hum jitne bhi providers use krte hai sab options mai likhte hai well aisa jarruri toh nhi hai lekin haan clean code rehta hai kaafi
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import UserModel from "@/app/model/User";
import dbConnect from "@/app/lib/dbconnect";

//hum credential provider use kr rhe hai kyuki hum apne database se hi authenticate krna chahte hai
export const authOptions: NextAuthOptions = {
    
};