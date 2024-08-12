"use client"
import { Suspense } from 'react';


import Loading from '@/components/ui/loading';
import List from './list';

export default function Products() {
  

  return (
    <>
      <h1>Products</h1>
     
        <Suspense fallback={<Loading />}>
          <List />
        </Suspense>
      
    </>
  );
}
