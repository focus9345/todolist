'use client';
import React, { useEffect, useState } from 'react';
import AddGroup from '../components/forms/addgroup';
import AddTask from '../components/forms/addtask';
import { cn } from '../utils/clsxtw';
import { Button, Divider } from '@heroui/react';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import AddProject from '../components/forms/addproject';

const SidebarRight: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        if (typeof window !== 'undefined') {
          const saved = window.localStorage.getItem('sidebarExpanded');
          if (saved === null) return true;
          return JSON.parse(saved);
        }
        return true; // default value if window is not defined
      });

      useEffect(() => {
        window.localStorage.setItem('sidebarExpanded', JSON.stringify(isSidebarOpen));
      }
      , [isSidebarOpen]);

      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
      
        <div className={cn(isSidebarOpen ? 'w-[400px]' : 'w-[15px]',
        'border-l-4 border-zinc-800 p-4 transition-all duration-800 ease-in-out transform hidden sm:flex h-full sm:h-[calc(99vh-60px)]',
    )} >

     
        <aside className="flex h-full flex-col w-full break-words px-2 overflow-x-hidden columns-1">

          {isSidebarOpen ? (
            // Show the sidebar content
            <>
            <h2>Settings</h2>
            <AddProject />
            <Divider />
            <AddGroup />
            <Divider />
            <AddTask />
            </>
            ) : (<></>) 
            }
          
          <Button 
          onPress={toggleSidebar} 
          isIconOnly={true}
          color='primary'
          radius='full'
          className="absolute left-[-22px] top-32 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out z-160 "> 
          {isSidebarOpen ? (
            <FaChevronRight size={16} />
          ) : (
            <FaChevronLeft size={16} />
          )}
            </Button>

          </aside>
          
        </div>
      
    );
  }
  export default SidebarRight;