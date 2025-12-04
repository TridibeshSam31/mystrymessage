//assignment part 
// the u/[username] folder should contain a page where anonymous users can send messages to a specific user.
//humko link se username ko extract krna hai yaani params.username ko extract krna hai 
//ai suggestions dene hai user ko 

"use client"
import React,{useState} from 'react'
import { useParams } from 'next/navigation'
import {useForm} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { messageSchema } from '@/app/Schemas/messageSchema'
import * as z from 'zod'
import axios,{AxiosError} from 'axios'
import { ApiResponse } from '@/app/types/ApiResponse'
import { useToast } from '@/components/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Loader2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'


const sendMessage = () => {
  const params = useParams<{username:string}>()
  const {toast} = useToast()
  const[isLoading,setIsLoading] = useState(false)//toggles the submit button UI
  const[isSuggestingMessages,setIsSuggestingMessages] = useState<string[]>([])//toggles the "suggestions generation" button UI.
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([])//stores suggestions returned from /api/suggest-messages.

  //react hook form ka use 
  const form = useForm<z.infer<typeof messageSchema>>({
    //in this we get two options resolver , defaultvalues
    resolver:zodResolver(messageSchema),
    defaultValues:{
      content:""
    }
  })
  //well yeh react-hook form hmare validation ke liye abhi iss codebase ke liye jarruri hai 
  //humne schema ke andar message Schema likha tha toh usko follow krne ke liye hook ka use kiya hai uske bina bhi ho skta tha 
  /*
  const[content,setContent] = useState<{string}>()


  const validateContent = () => {
  if(!content.trim()){
  toast({
  title:"Error"
  description:"Message Cannot be empty"
  variant:"destructive"
  
  
  })
  return false
  
  
  }
  return true

  
  
  }

  now similarly sendmessage nad fetchmessage from ai route 

  const sendMessage = async () => {
  if(!validate()){
  return  
  
  }
  setIsloading(true)
  try{
  const res = await axios.post("/api/send-message",{
  username,
  content,
  
  
  })

  toast({
        title: "Success",
        description: res.data.message ?? "Message sent!",
  })
 
  setContent("") // reset
  
  catch(){
  toast se error
  
  
  }finally{
  
  setIsLoading(false)
  }

  fetchAiSuggestions

  const fetchAiSuggestion = async () =>{
 try{
  const res = await axios.post('/api/suggest-messages')
  setSuggestedMessages(res.data.suggestions ?? [])
} catch{
   toast({
        title: "Error",
        description: "Failed to fetch suggestions",
        variant: "destructive",
      })
 

} finally {
      setIsSuggestLoading(false)
    }
  
  
  
  }
  
  
  }


  
  
  
  }



  
  
  
  */

  
  return (
    <div>page</div>
  )
}

export default sendMessage