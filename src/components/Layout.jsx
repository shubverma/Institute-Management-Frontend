import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css'; // Import the CSS file for styling
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="p-6 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;