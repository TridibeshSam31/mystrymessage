'use client'

import {useForm} from 'react-hook-form'
import * as z from 'zod'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {useDebounceValue} from 'usehooks-ts'
import { useToast } from '@/components/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { signUpSchema } from '@/app/Schemas/signUpSchema'
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"

const page = () => {
  const [username,setUsername] = useState('')
  const[usernameMessage,setUsernameMessage] = useState('')
  const [isCheckingUsername,setIsCheckingUsername] = useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false)

  const debouncedUsername = useDebounceValue(username,300)
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


      }
    }

  },[debouncedUsername])




    
  
  return (
    <div>page</div>
  )
}

export default page