import React from 'react';
import Link from 'next/link';
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Topbar />
      <div className="flex">
        <Sidebar />
        <div className="w-full p-4">
          {children}
        </div>
      </div>
    </>
  );
}
