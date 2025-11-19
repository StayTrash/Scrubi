import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import { Separator } from '@/components/ui/separator'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export interface TEAM{
    createdBy:String,
    teamName:String,
    _id:String
}
function SideNavTopSection({user,setActiveTeamInfo}:any) {
    const menu=[
        {
            id:1,
            name:'Create Team',
            path:'/teams/create',
            icon:Users
        },
        {
            id:2,
            name:'Settings',
            path:'',
            icon:Settings
        }
    ];
    const router=useRouter();
    const convex=useConvex();
    const [activeTeam,setActiveTeam]=useState<TEAM>();
    const [teamList,setTeamList]=useState<TEAM[]>();
    useEffect(()=>{
        user&&getTeamList();
    },[user])

    useEffect(()=>{
        activeTeam?setActiveTeamInfo(activeTeam):null
    },[activeTeam])
    const getTeamList=async()=>{
        const result=await convex.query(api.teams.getTeam,{email:user?.email})
        console.log("TeamList",result);
        setTeamList(result);
        setActiveTeam(result[0]);
    }

    const onMenuClick=(item:any)=>{
        if(item.path)
        {
            router.push(item.path);
        }
    }
    return (
        <div>
        <Popover>
            <PopoverTrigger asChild>
                <button className='w-full flex items-center gap-3
      hover:bg-blue-50 p-3 rounded-lg
      cursor-pointer transition-colors
      border border-transparent hover:border-blue-200
      '>
                    <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm'>
                        <span className='text-white font-bold text-sm'>S</span>
                    </div>
                    <div className='flex-1 min-w-0 text-left'>
                        <h2 className='flex gap-2 items-center
                        font-semibold text-base text-gray-900 truncate'>
                            {activeTeam?.teamName || 'Select Team'}
                            <ChevronDown className='w-4 h-4 text-gray-500 flex-shrink-0' />
                        </h2>
                    </div>
                </button>
            </PopoverTrigger>
            <PopoverContent className='ml-7 p-3 w-64' align="start">
               {/* Team Section  */}
                <div className='mb-2'>
                    <p className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2'>Teams</p>
                    {teamList && teamList.length > 0 ? (
                        teamList.map((team,index)=>(
                            <button
                                key={index}
                                className={`w-full text-left p-2.5 hover:bg-blue-50
                                 hover:text-blue-700 rounded-lg mb-1 cursor-pointer transition-colors
                                 flex items-center gap-2 text-sm
                                 ${activeTeam?._id==team._id?'bg-blue-50 text-blue-700 font-medium':'text-gray-700'}`}
                                onClick={()=>setActiveTeam(team)}
                            >
                                <div className='w-2 h-2 rounded-full bg-blue-500'></div>
                                <span className='truncate'>{team.teamName}</span>
                            </button>
                        ))
                    ) : (
                        <p className='text-xs text-gray-500 px-2 py-2'>No teams found</p>
                    )}
                </div>
                <Separator className='my-2'/>
                {/* Option Section  */}
                <div className='mb-2'>
                    {menu.map((item,index)=>(
                        <button
                            key={index} 
                            className='w-full flex gap-2 items-center
                            p-2.5 hover:bg-gray-100 rounded-lg cursor-pointer text-sm text-gray-700 transition-colors'
                            onClick={()=>onMenuClick(item)}
                        >
                            <item.icon className='h-4 w-4'/>
                            {item.name}
                        </button>
                    ))}
                    <LogoutLink className='block'>
                        <button className='w-full flex gap-2 items-center
                            p-2.5 hover:bg-red-50 hover:text-red-600 rounded-lg cursor-pointer text-sm text-gray-700 transition-colors'>
                            <LogOut className='h-4 w-4'/>
                            Logout
                        </button>
                    </LogoutLink>
                </div>
                <Separator className='my-2'/>
                {/* User Info Section  */}
               {user&& <div className='flex gap-3 items-center p-2'>
                    <Image src={user?.picture} alt='user'
                    width={36}
                    height={36}
                    className='rounded-full border-2 border-gray-200 flex-shrink-0'
                    />
                    <div className='min-w-0 flex-1'>
                        <p className='text-sm font-semibold text-gray-900 truncate'>{user?.given_name} {user?.family_name}</p>
                        <p className='text-xs text-gray-500 truncate'>{user?.email}</p>
                    </div>
                </div>}
            </PopoverContent>
        </Popover>

        {/* All File Button  */}
        <Button variant='outline'
         className='w-full justify-start
          gap-2 font-medium mt-6 bg-white hover:bg-blue-50 
          border-gray-200 hover:border-blue-200 text-gray-700 hover:text-blue-700'>
            <LayoutGrid className='h-4 w-4'/>
            All Files</Button>
        </div>

    )
}

export default SideNavTopSection