//here we will add ai suggestions means using ui we will suggest the user visiting the platform what they should write
//for that we will integrate openAI in that we will give all the suggesting messages in form of array 

//for adding this ai suggesting route we can use open Ai but that is of paid so we will use gemini for it

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
//or we could also import that generative ai one but no issue








const ai = new GoogleGenerativeAI("process.env.GEMINI_API_KEY")

//kuch prompt jo hai unhe pass krenge idhar 
export async function POST(){
  try {
    const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. 
    These questions are for an anonymous social messaging platform like Qooh.me and should be suitable for a diverse audience. 
    Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. 
    Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment. 
    Example format: "What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?"`

    //we have to pass this prompt into our ai model

     const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
     
     // Send prompt to Gemini
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Split the response string by "||" into an array of questions
    const suggestions = response.split("||").map(q => q.trim()).filter(Boolean);


     return NextResponse.json({
      success: true,
      suggestions,
    });
     

    /*

   return new Response(response, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
       }
       })  this is alternative for the suggestions part so nothing else

     */  






  } catch (error) {
    console.error(`Gemini API Error:`,error)
    return NextResponse.json({
      success: false, error: (error as Error)?.message || 'Failed to generate suggestions'

    },{status:500})
  }

}


