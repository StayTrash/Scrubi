"use client"
import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import Editor from '../_components/Editor'
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FILE } from '../../dashboard/_components/FileList';
import Canvas from '../_components/Canvas';
import { FileText, PenTool } from 'lucide-react';

function Workspace({params}:any) {
   const [triggerSave,setTriggerSave]=useState(false);
   const convex=useConvex();
   const [fileData,setFileData]=useState<FILE|any>();
   const [activeView, setActiveView] = useState<'editor' | 'canvas'>('editor');
   const [isLoading, setIsLoading] = useState(true);
   
   useEffect(()=>{
    console.log("FILEID",params.fileId)
    params.fileId&&getFileData();
   },[])

   const getFileData=async()=>{
    setIsLoading(true);
    try {
      const result=await convex.query(api.files.getFileById,{_id:params.fileId})
      setFileData(result);
    } catch (error) {
      console.error('Error loading file:', error);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      <WorkspaceHeader 
        onSave={()=>setTriggerSave(!triggerSave)} 
        fileName={fileData?.fileName}
        isLoading={isLoading}
      />

      {/* Mobile View Toggle */}
      <div className='md:hidden border-b bg-white shadow-sm'>
        <div className='flex'>
          <button
            onClick={() => setActiveView('editor')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 transition-all ${
              activeView === 'editor'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <FileText className='w-4 h-4' />
            <span className='text-sm font-medium'>Document</span>
          </button>
          <button
            onClick={() => setActiveView('canvas')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 transition-all ${
              activeView === 'canvas'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <PenTool className='w-4 h-4' />
            <span className='text-sm font-medium'>Canvas</span>
          </button>
        </div>
      </div>

      {/* Workspace Layout  */}
      <div className='flex flex-col md:flex-row flex-1 overflow-hidden'>
        {/* Document  */}
          <div className={`flex-1 overflow-hidden ${
            activeView === 'editor' ? 'flex' : 'hidden'
          } md:flex border-r border-gray-200 bg-white`}>
            {isLoading ? (
              <div className='flex-1 flex items-center justify-center'>
                <div className='text-center'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2'></div>
                  <p className='text-sm text-gray-500'>Loading document...</p>
                </div>
              </div>
            ) : (
              <Editor 
                onSaveTrigger={triggerSave}
                fileId={params.fileId}
                fileData={fileData}
              />
            )}
          </div>
        {/* Whiteboard/canvas  */}
        <div className={`flex-1 overflow-hidden ${
          activeView === 'canvas' ? 'flex' : 'hidden'
        } md:flex bg-white`}>
          {isLoading ? (
            <div className='flex-1 flex items-center justify-center'>
              <div className='text-center'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2'></div>
                <p className='text-sm text-gray-500'>Loading canvas...</p>
              </div>
            </div>
          ) : (
            <Canvas
              onSaveTrigger={triggerSave}
              fileId={params.fileId}
              fileData={fileData}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Workspace