"use client"
import { Button } from '@/components/ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search, Send, User, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Header({searchQuery, setSearchQuery}:any) {
    const {user}:any=useKindeBrowserClient();
    
  return (
    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full'>
        {/* Search Bar */}
        <div className='flex-1 w-full sm:max-w-md'>
            <div className='relative'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400'/>
                <input 
                    type='text' 
                    placeholder='Search files...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    text-sm bg-white placeholder:text-gray-400'
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className='absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors'
                    aria-label="Clear search"
                  >
                    <X className='h-4 w-4 text-gray-400' />
                  </button>
                )}
            </div>
        </div>
        
        {/* Right Side Actions */}
        <div className='flex items-center gap-3 w-full sm:w-auto justify-end'>
            <Button 
                className='gap-2 text-sm h-9 px-4
                hover:bg-blue-700 bg-blue-600 text-white shadow-sm
                hidden sm:flex'
            > 
                <Send className='h-4 w-4'/> 
                <span>Invite</span>
            </Button>
            
            {/* User Avatar */}
            {user && (
                <div className='flex items-center gap-2'>
                    <div className='relative'>
                        <Image 
                            src={user?.picture} 
                            alt='user'
                            width={36}
                            height={36}
                            className='rounded-full border-2 border-gray-200'
                        />
                        <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
                    </div>
                    <div className='hidden sm:block'>
                        <p className='text-sm font-medium text-gray-900'>{user?.given_name}</p>
                        <p className='text-xs text-gray-500'>{user?.email}</p>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default Header