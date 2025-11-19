"use client"
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SideNav from './_components/SideNav';
import { FileListContext } from '@/app/_context/FilesListContext';

function DashboardLayout(
    {
        children,
      }: Readonly<{
        children: React.ReactNode;
      }>
) {
    const convex=useConvex();
    const {user}:any=useKindeBrowserClient();
    const [fileList_,setFileList_]=useState();
    const router=useRouter();
    useEffect(()=>{
        user&&checkTeam();
    },[user])

    const checkTeam=async()=>{
        const result=await convex.query(api.teams.getTeam,
            {email:user?.email});

        if(!result?.length)
        {
            router.push('teams/create')
        }
    }

  return (
    <div className='min-h-screen bg-slate-50'>
      <FileListContext.Provider value={{fileList_,setFileList_}}>
      <div className='flex flex-col md:flex-row'>
          <div className='bg-white h-auto md:h-screen w-full md:w-72 md:fixed md:left-0 md:top-0 z-20 border-r border-gray-200 shadow-sm md:shadow-none'>
          <SideNav/>
          </div>
          <div className='flex-1 md:ml-72 w-full min-h-screen'>
          {children}
          </div>
      </div>
      </FileListContext.Provider>
     
      </div>
  )
}

export default DashboardLayout