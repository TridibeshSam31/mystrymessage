import { resend } from "../lib/resend";
import VerificationEmail from "../../../emails/VerificationEmail";
import { ApiResponse } from "../types/ApiResponse";


export async function sendVerificationEmail(
    //ab aise hi thodi email bhej denge kuch parameters bhi toh pass krenge
    email: string,
    username: string,
    verifyCode: string
):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'tridisam651@gmail.com',
            to: email,
            subject: 'Mystry Message | Verification Code',
            react: VerificationEmail({ username, otp: verifyCode }),//obv jo humne verification email ka template bnaya tha usme humne username and otp as prop pass kiya tha usse bhi isme pass krenge 
        });
       return {success:true , message:"Verification email sent successfully"}
    } catch (emailError) {
        console.error("Error Sending Verification Email",emailError)
        return {success:false , message:"Failed to send verification email"}
    }

}