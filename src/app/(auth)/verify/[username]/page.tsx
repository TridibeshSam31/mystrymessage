"use client"
import { useToast } from '@/components/hooks/use-toast'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import * as z from 'zod'
import {useForm} from 'react-hook-form'
import { verifySchema } from '@/app/Schemas/verifySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/app/types/ApiResponse'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const VerifyAccount = () => {
  const router = useRouter()
  const params = useParams<{username:string}>()
  const {toast} = useToast()

  const form = useForm<z.infer<typeof verifySchema>>({
      resolver: zodResolver(verifySchema),
      
  })

  const onSubmit = async(data:z.infer<typeof verifySchema>)=>{
    try {
      const response = await axios.post(`/api/verify-code`,{
        username:params.username,
        code:data.code
      })

      toast({
        title:'Success',
        description:response.data.message
      })
      router.replace(`sign-in`) //iski jagah re-validate path(/sign-in) bhi kr skte hai its good
    } catch (error) {
      console.error("Error in SignUp of user",error)
      const axiosError = error as AxiosError<ApiResponse>;
      
      toast({
      title:"signUp failed",
      description:axiosError.response?.data.message,
      variant:"destructive"
      })
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-red-100'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
        <div className="text-center">
          <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>
            Verify Your Account
          </h1>
          <p className='mb-4'>Enter The Verification Code Sent To Your Email</p>
        </div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input placeholder="code" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>


      </div>

    </div>
  )
}

export default VerifyAccount