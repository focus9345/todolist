'use client';
import React from 'react';
import CompanyLogo from './logo';
import {Chip} from "@heroui/react";
import CalendarDisplay from '../components/tasks/calendar-display';

const Header: React.FC = () => {
    return (
      <header className="py-6 border-b-3 border-zinc-800">
        <div className="grid grid-cols-3 justify-between items-center px-8 gap-2">
          <div className="flex justify-start">

            <CompanyLogo /> <h2 className="text-lg pl-2">ToDo List</h2>
          </div>
          <div className="flex justify-center gap-2">
            <Chip color="warning" variant="bordered" size="sm">
            1 Task Overdue
            </Chip>
            
            <CalendarDisplay />
            </div>
          <div className="flex justify-end">
            <div>User Details</div>
          </div>
        </div>
   
      </header>
    );
  }
  export default Header;