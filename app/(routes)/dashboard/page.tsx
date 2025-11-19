"use client"
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation, useQuery } from 'convex/react'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import FileList from './_components/FileList'
import AdBanner from './../../_components/AdBanner'

function Dashboard() {
  const convex=useConvex();
  const {user}:any=useKindeBrowserClient();
  const createUser=useMutation(api.user.createUser);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(()=>{
      if(user)
      {
        checkUser()
      }
  },[user])
  

  const checkUser=async()=>{
    const result=await convex.query(api.user.getUser,{email:user?.email});
    if(!result?.length)
    {
        createUser({
          name:user.given_name,
          email:user.email,
          image:user.picture
        }).then((resp)=>{
          console.log(resp)
        })
    }
  }
  
  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto'>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

        <div className='mt-6 sm:mt-8'>
          <div className='mb-6'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>My Files</h1>
            <p className='text-sm sm:text-base text-gray-600 mt-1'>Manage and organize your documents and diagrams</p>
          </div>
          
          <FileList searchQuery={searchQuery}/>
        </div>
        
        <div className='mt-8'>
          <AdBanner
            data-ad-slot="4796371341"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard