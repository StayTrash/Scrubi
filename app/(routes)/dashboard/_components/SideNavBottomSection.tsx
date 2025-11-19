import { Button } from '@/components/ui/button'
import { Archive, Flag, Github } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import Constant from '@/app/_constant/Constant'
import PricingDialog from './PricingDialog'
function SideNavBottomSection({onFileCreate,totalFiles}:any) {
  const menuList=[
    {
      id:1,
      name:'Getting Started',
      icon:Flag,
      path:''
    },
    {
      id:2,
      name:'Github',
      icon:Github,
      path:''
    },
    {
      id:3,
      name:'Archive',
      icon:Archive,
      path:''
    }
  ]
  const [fileInput,setFileInput]=useState('');
  return (
    <div className='space-y-1'>
      {menuList.map((menu,index)=>(
        <button
          key={index} 
          className='w-full flex gap-2 items-center p-2.5 text-sm 
          hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700 transition-colors'
        >
          <menu.icon className='h-4 w-4'/>
          <span>{menu.name}</span>
        </button>
      ))}

      {/* Add New File Button  */}
      <Dialog>
        <DialogTrigger className='w-full' asChild>
          <Button className='w-full bg-gradient-to-r from-blue-600 to-blue-700 
              hover:from-blue-700 hover:to-blue-800 justify-center mt-4 shadow-sm
              text-white font-medium'>
            <span className='mr-1'>+</span> New File
          </Button>
        </DialogTrigger>
        {totalFiles<Constant.MAX_FREE_FILE? 
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='text-xl'>Create New File</DialogTitle>
            <DialogDescription className='pt-2'>
                <Input 
                  placeholder='Enter file name...' 
                  className='mt-3'
                  onChange={(e)=>setFileInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && fileInput && fileInput.length > 3) {
                      onFileCreate(fileInput);
                    }
                  }}
                />
                <p className='text-xs text-gray-500 mt-2'>File name must be at least 4 characters</p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button 
                type="button" 
                className='bg-blue-600 hover:bg-blue-700'
                disabled={!(fileInput&&fileInput.length>3)}
                onClick={()=>onFileCreate(fileInput)}
              >
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>:
        <PricingDialog/>}
      </Dialog>

      {/* Progress Bar  */}
      <div className='mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200'>
        <div className='flex items-center justify-between mb-2'>
          <span className='text-xs font-semibold text-gray-700'>Storage</span>
          <span className='text-xs text-gray-600'>
            {totalFiles || 0} / {Constant.MAX_FREE_FILE}
          </span>
        </div>
        <div className='h-2 w-full bg-gray-200 rounded-full overflow-hidden'>
          <div 
            className={`h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300`}
            style={{ width: `${Math.min((totalFiles/Constant.MAX_FREE_FILE)*100, 100)}%` }}
          >
          </div>
        </div>
        <p className='text-xs text-gray-600 mt-2'>
          {totalFiles >= Constant.MAX_FREE_FILE ? (
            <span className='text-amber-600 font-medium'>Limit reached. Upgrade for unlimited access.</span>
          ) : (
            <span>Upgrade your plan for unlimited access.</span>
          )}
        </p>
      </div>
     </div>
  )
}

export default SideNavBottomSection