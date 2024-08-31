import React, { Suspense } from 'react';
import Link from 'next/link';
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';
import Loading from '@/components/ui/loading';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Topbar />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <div className="flex">
          <Sidebar />
          <div className="w-full p-4">
            {children}
          </div>
        </div>
      </Suspense>

    </>
  );
}
