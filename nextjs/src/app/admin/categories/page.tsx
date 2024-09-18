"use client"
import { Suspense } from 'react';


import Loading from '@/components/ui/loading';
import List from './list';

export default function Categories() {
  

  return (
    <>
      <h1>Categories</h1>
     
        <Suspense fallback={<Loading />}>
          <List />
        </Suspense>
      
    </>
  );
}
