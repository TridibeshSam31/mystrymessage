"use client"
import Link from 'next/link'
import React from 'react'
import { useSession , signOut } from 'next-auth/react'
import {User} from 'next-auth'
import { Button } from './ui/button'
const Navbar = () => {
    const {data:session} = useSession() //this will definately show us the error 
    //useSession hook is a client side hook that requires us to wrap our layout file with provider that is sessionprovider which we get from nextauth so in 
    //order to make this work I need to create a provider.tsx file write my code for session provider and then load it in my main layout file that is present on app folder
    //I am doing this process since I only have to use this hook on frontend rendering 

    const user:User = session?.user as User
  return (
    <nav className='p-4 md:p-6 shadow-md'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
            <a className='text-xl font-bold mb-4 md:mb-0' href="#">Mystry Message</a>
            {
                session?(
                    <>
                    <span className='mr-4'>Welcome,{user?.username|| user?.email}</span>
                    <Button className='w-full md:w-auto' onClick={()=>signOut()}>Logout</Button>
                    </>

                ):(
                    <Link href='/sign-in'>
                        <Button className='w-full md:w-auto'>Login</Button>
                    </Link>
                )
            }
        </div>
    </nav>
    
  )
}

export default Navbar