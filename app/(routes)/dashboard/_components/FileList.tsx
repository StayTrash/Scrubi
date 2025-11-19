import { FileListContext } from '@/app/_context/FilesListContext'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Archive, MoreHorizontal, FileText, Calendar, User, PenTool } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';

export interface FILE{
  archive:boolean,
  createdBt:string,
  document:string,
  fileName:string,
  teamId:string,
  whiteboard:string,
  _id:string,
  _creationTime:number
}
function FileList({searchQuery}:{searchQuery?:string}) {
  const {fileList_,setFileList_}=useContext(FileListContext);
  const [fileList,setFileList]=useState<any>();
  const [filteredFileList, setFilteredFileList] = useState<any>();
  const {user}:any=useKindeBrowserClient();
  const router=useRouter();
  
  useEffect(()=>{
    fileList_&&setFileList(fileList_);
    console.log(fileList_);
  },[fileList_])

  // Filter files based on search query
  useEffect(() => {
    if (!fileList) {
      setFilteredFileList([]);
      return;
    }

    if (!searchQuery || searchQuery.trim() === '') {
      setFilteredFileList(fileList);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = fileList.filter((file:FILE) => 
      file.fileName.toLowerCase().includes(query)
    );
    setFilteredFileList(filtered);
  }, [fileList, searchQuery]);

  const displayList = filteredFileList || fileList;

  if (!displayList || displayList.length === 0) {
    return (
      <div className='bg-white rounded-lg border border-gray-200 shadow-sm p-8 sm:p-12 text-center'>
        <div className='mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
          <FileText className='w-8 h-8 text-blue-600' />
        </div>
        <h3 className='text-lg font-semibold text-gray-900 mb-2'>
          {searchQuery && searchQuery.trim() ? 'No files found' : 'No files yet'}
        </h3>
        <p className='text-sm text-gray-600 mb-6 max-w-md mx-auto'>
          {searchQuery && searchQuery.trim() 
            ? `No files match "${searchQuery}". Try a different search term.`
            : 'Get started by creating your first document or diagram. Click "New File" in the sidebar to begin.'}
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Mobile Card View */}
      <div className='md:hidden space-y-3'>
        {displayList.map((file:FILE,index:number)=>(
          <div 
            key={index} 
            className='bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]'
            onClick={()=>router.push('/workspace/'+file._id)}
          >
            <div className='flex items-start justify-between mb-3'>
              <div className='flex items-center gap-3 flex-1 min-w-0'>
                <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0'>
                  <FileText className='w-5 h-5 text-white' />
                </div>
                <div className='min-w-0 flex-1'>
                  <h3 className='font-semibold text-gray-900 truncate'>{file.fileName}</h3>
                  <p className='text-xs text-gray-500 mt-0.5'>
                    {moment(file._creationTime).format('MMM DD, YYYY')}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
                  <button className='p-1.5 hover:bg-gray-100 rounded-lg transition-colors'>
                    <MoreHorizontal className='w-5 h-5 text-gray-600' />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className='gap-2 cursor-pointer'>
                    <Archive className='h-4 w-4'/> Archive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className='flex items-center gap-4 text-xs text-gray-500'>
              <div className='flex items-center gap-1.5'>
                <Calendar className='w-3.5 h-3.5' />
                <span>Created {moment(file._creationTime).format('MMM DD')}</span>
              </div>
              {user && (
                <div className='flex items-center gap-1.5'>
                  <User className='w-3.5 h-3.5' />
                  <span>You</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  File Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Last Edited
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayList.map((file:FILE,index:number)=>(
                <tr 
                  key={index} 
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                  onClick={()=>router.push('/workspace/'+file._id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0'>
                        <FileText className='w-4 h-4 text-white' />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{file.fileName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                      <Calendar className='w-4 h-4' />
                      <span>{moment(file._creationTime).format('MMM DD, YYYY')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                      <PenTool className='w-4 h-4' />
                      <span>{moment(file._creationTime).format('MMM DD, YYYY')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user && (
                      <div className='flex items-center gap-2'>
                        <Image 
                          src={user?.picture} 
                          alt='user'
                          width={28}
                          height={28}
                          className='rounded-full border border-gray-200'
                        />
                        <span className='text-sm text-gray-600'>You</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
                        <button className='p-1.5 hover:bg-gray-100 rounded-lg transition-colors'>
                          <MoreHorizontal className='w-5 h-5 text-gray-600' />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className='gap-2 cursor-pointer'>
                          <Archive className='h-4 w-4'/> Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FileList