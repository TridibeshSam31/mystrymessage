import dbConnect from "@/app/lib/dbconnect";
//jab bhi hum route likhenge fark nhi pdta hum hmesha db connect ko call krenge 

import UserModel from "@/app/model/User";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "@/app/helpers/sendVerificationEmail";


//ab next js mai jab hum routes likhte hai toh hum uss request ka type bhi likhte hai jaise yeh Get request hai Post request hai  patch hai ya delete hai 
//yeh framework hai toh isme folders aur files kaafi matter krti hai humne jaise yahan pe pehle hi app ka folder bnaya usme api ka folder bnaya aur usme sign-up ka folder bnaya toh ab isse jo hum url bnatae the http://localhost:3000/api/sign-up yeh url pehle se hi handle ho jaata hai iss file structure se so likhte hai

export async function POST(request: Request) {
   //sbse  pehle database se connect krenge ki jab kisine request ki toh hum db se connect krenge warna toh pehle se hi connected hai
   await dbConnect();
   try {
    const {username,email,password} = await request.json(); //json se jab bhi koi data lete hai toh humesha await use krte hai 
    //ab db mai check krna hai ki  kya koi aisa user hai jiska username hai aur woh verified hai so uske liye likhte hai 
    const exixstingUserVerifiedByUsername = await UserModel.findOne({username:username, isVerified:true});
    if(exixstingUserVerifiedByUsername){
        return Response.json({
            sucess:false,
            message:"Username already taken"
        },{status:400})
    }
    //ab agar user email se exist krta hai toh fir? uske liye bhi check krenge

    const existingUserByEmail = await UserModel.findOne({email:email});
    //verification code generate krte hai
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();//6 digit ka code generate hoga
    if(existingUserByEmail){
        if(existingUserByEmail.isVerified){
            return Response.json({
            sucess:true,
            message:'User already exist with this Email'

        },{status:400})
    } else{
        const hashedPassword = await bcrypt.hash(password,10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);//1 hour baad expire ho jaaye
        await existingUserByEmail.save();
    
    }
    
    }else{
        const hashedPassword = await bcrypt.hash(password,10);
        //humne ek verification code ki expiry ka bhi time rkha tha
        //so usko bhi update krte hai aasan hai waise 
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);//1 hour baad expire ho jaaye
        //ab inn sab ko user model mai save kr denge
        const newUser = new UserModel({
            username,
            email,
            password:hashedPassword,
            verifyCode:verifyCode,
            verifyCodeExpiry:expiryDate,
            isVerified:false,
            isAcceptingMessage: true,
            messages:[]
        
        
        })
        newUser.save();//ab save kr denge

    }
    //ab send verification email
    const emailResponse = await sendVerificationEmail(
        email,
        username,
        verifyCode
    );
    if(!emailResponse.success){
        return Response.json({
            sucess:false,
            message:emailResponse.message

        },{status:500})
    } 

    return Response.json({
            sucess:true,
            message:'User registered successfully. Please Verify Your Email'

        },{status:201})
  

   } catch (error) {
    console.error("Error Registering User",error);
    return Response.json(
        {
        sucess:false,
        message:"Error Registering User"
        },
        {
            status:500
        }
    )
   }
}

