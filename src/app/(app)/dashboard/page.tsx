'use client'

import { Message } from '@/app/model/User'
import { useSession } from 'next-auth/react'
import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

const page = () => {
    const [messages,setMessages] = useState<Message[]>([])
    const [isLoading,setIsLoading] = useState(false)
    const [isSwitchLoading ,setIsSwitchLoading] = useState(false)


    const {toast} = useToast() 

    const handleDeleteMessage = (messageId:string) => {
        setMessages(messages.filter((message) => message.id!== messageId))
    }

    const {data:session} = useSession()

    const form = useForm({
        resolver: zodResolver(formSchema)
    })
  return (
    <div>Dashboard</div>
  )
}

export default page