"use client"
import { Button } from '@/components/ui/button'
import { Link, Save, ArrowLeft, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

function WorkspaceHeader({onSave, fileName, isLoading}:any) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = async () => {
    setIsSaving(true);
    onSave();
    // Reset saving state after a brief delay
    setTimeout(() => setIsSaving(false), 1000);
  }
  
  return (
    <div className='p-3 sm:p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 bg-white shadow-sm z-10'>
      <div className='flex gap-3 items-center min-w-0 flex-1 w-full sm:w-auto'>
        <button
          onClick={() => router.back()}
          className='p-1.5 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0'
          aria-label="Go back"
        >
          <ArrowLeft className='h-5 w-5 text-gray-600' />
        </button>
        <div className='flex gap-2 items-center min-w-0 flex-1'>
          <div className='h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm'>
            <span className='text-white font-bold text-sm sm:text-base'>S</span>
          </div>
          <div className='min-w-0 flex-1'>
            {isLoading ? (
              <div className='flex items-center gap-2'>
                <div className='h-4 w-4 animate-pulse bg-gray-200 rounded'></div>
                <div className='h-4 w-32 bg-gray-200 rounded animate-pulse'></div>
              </div>
            ) : (
              <h2 className='text-sm sm:text-base md:text-lg font-semibold text-gray-900 truncate'>
                {fileName || 'Untitled Document'}
              </h2>
            )}
          </div>
        </div>
      </div>
      <div className='flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end'>
        <Button 
          className='h-9 text-xs sm:text-sm
          gap-2 bg-amber-500 hover:bg-amber-600 text-white px-3 sm:px-4 shadow-sm font-medium'
          onClick={handleSave}
          disabled={isSaving || isLoading}
        > 
          {isSaving ? (
            <>
              <Loader2 className='h-4 w-4 animate-spin' />
              <span className="hidden sm:inline">Saving...</span>
            </>
          ) : (
            <>
              <Save className='h-4 w-4' /> 
              <span className="hidden sm:inline">Save</span>
            </>
          )}
        </Button>
        <Button 
          className='h-9 text-xs sm:text-sm
          gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 shadow-sm font-medium'
          disabled={isLoading}
        >
          <span className="hidden sm:inline">Share</span> 
          <Link className='h-4 w-4' /> 
        </Button>
      </div>
    </div>
  )
}

export default WorkspaceHeader