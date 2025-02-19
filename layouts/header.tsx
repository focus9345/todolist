import React from 'react';
import CompanyLogo from './logo';

const Header: React.FC = () => {
    return (
      <header className="py-6 border-b-3 border-zinc-800">
        <div className="grid grid-cols-3 justify-between items-center px-8">
          <div className="flex justify-start">

            <CompanyLogo /> <h2 className="text-lg pl-2">ToDo List</h2>
          </div>
          <div className="border border-zinc-700">anything else Here</div>
          <div className="border border-zinc-700">Controls Here</div>
        </div>
   
      </header>
    );
  }
  export default Header;