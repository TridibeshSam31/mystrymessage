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
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {Loader2} from 'lucide-react'
import { signInSchema } from '@/app/Schemas/signInSchema'

import { signIn } from 'next-auth/react';


 const page = () => {
  
  const [isSubmitting,setIsSubmitting] = useState(false)

  
  const {toast} = useToast()
  const router = useRouter()

  //zod implementation is same everywhere using react hook form

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues:{
      identifier:'',
      password:'',
      
    }
  })

  

  const onSubmit = async(data:z.infer<typeof signInSchema>)=>{
    const result = await signIn('credentials',{
      redirect:false,
      identifier:data.identifier,
      password:data.password
    })
    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    }
    
    if (result?.url) {
      router.replace('/dashboard')
    }
  }
    
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-red-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome Back to True Feedback
          </h1>
          <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type="submit">Sign In</Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
  
}

export default page