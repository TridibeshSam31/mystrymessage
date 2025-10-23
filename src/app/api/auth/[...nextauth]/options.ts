//production mai hum jitne bhi providers use krte hai sab options mai likhte hai well aisa jarruri toh nhi hai lekin haan clean code rehta hai kaafi
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import UserModel from "@/app/model/User";
import dbConnect from "@/app/lib/dbconnect";

//hum credential provider use kr rhe hai kyuki hum apne database se hi authenticate krna chahte hai
const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials:any):Promise<any> {
                await dbConnect();
                try {
                  const user = await UserModel.findOne({
                    $or: [
                        {email:credentials.identifier},
                        {username:credentials.identifier}

                    ]
                   }) 
                   if(!user) {
                    throw new Error("No user found with the given email")
                   }
                   if(!user.isVerified){
                    throw new Error("Please verify your accont before login")
                   }
                   await bcrypt.compare(credentials.password,user.password)
                   const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)
                     if(!isPasswordCorrect){
                        return user
                     }else{
                        throw new Error("Invalid Password")
                     }
                } catch (error:any) {
                    throw new Error(error)
                }

            }
        }),
    ], 
    callbacks: {
        
    async jwt({ token, user }) {
        if (user) {
            token.id = user._id?.toString()
            token.isVerified = user.isVerified
            token.isAcceptingMessages = user.isAcceptingMessages
            token.username = user.username

        }
      return token
    },
    async session({ session,  token }) {
      if (token) {
        session.user._id = token._id
        session.user.isVerified = token.isVerified
        session.user.isAcceptingMessages = token.isAcceptingMessages as boolean | undefined
        session.user.username = token.username
      }
      return session
    },
    },
    pages: {
        signIn: '/sign-in',
        //kaafi aasan ho jaata hai isse kya? mtlb ki agar hum sign in krna chahte hai toh uska page hum custom ya khud nhi bnayegnge sab kuch nextauth khud hi kr dega 
        //since maine sign up ka page khud bnaya hai toh mai yahan nhi use kr rha hu woh

        
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions };