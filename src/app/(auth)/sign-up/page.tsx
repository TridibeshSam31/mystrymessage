'use client'

import {useForm} from 'react-hook-form'
import * as z from 'zod'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {useDebounceValue,useDebounceCallback} from 'usehooks-ts'
import { useToast } from '@/components/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { signUpSchema } from '@/app/Schemas/signUpSchema'
import { zodResolver } from "@hookform/resolvers/zod"
import axios , {AxiosError} from "axios"
import { ApiResponse } from '@/app/types/ApiResponse'

const page = () => {
  const [username,setUsername] = useState('')
  const[usernameMessage,setUsernameMessage] = useState('')
  const [isCheckingUsername,setIsCheckingUsername] = useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false)

  const debounced = useDebounceCallback(username,300)
  const {toast} = useToast()
  const router = useRouter()

  //zod implementation is same everywhere using react hook form

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues:{
      email:'',
      password:'',
      username:''
    }
  })

  useEffect(()=>{
    const checkUsernameUnique = async () => {
      if(debouncedUsername){
        setIsCheckingUsername(true)

        setUsernameMessage('')
        try {
          const response = await axios.get(`/api/check-username-unique?username=${debouncedUsername}`)
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(axiosError.response?.data.message??'Error in checking Username')
        }finally{
          setIsCheckingUsername(false)
        }


      }
    }
    checkUsernameUnique()

  },[debouncedUsername])

  const onSubmit = async(data:z.infer<typeof signUpSchema>)=>{
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up',data)
      toast({
        title:"success",
        description:response.data.message
      })
      router.replace(`/verify/${username}`)
      setIsSubmitting(false)
    } catch (error) {
      console.error("Error in SignUp of user",error)
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message
      toast({
        title:"signUp failed",
        description:errorMessage,
        variant:"destructive"
      })
      setIsSubmitting(false)
    }

  }
    
  
  return (
    <div>page</div>
  )
}

export default page