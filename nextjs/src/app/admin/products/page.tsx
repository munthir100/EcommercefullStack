"use client"
import { Suspense } from 'react';
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Loading from '@/components/ui/loading';
import List from './list';
import Breadcrumb from "../components/breadcrumb"

export default function Products() {
  return (
    <>
      <Breadcrumb pageTitle={'Products'} />
      <div className="container mx-auto px-4"> {/* Container-like behavior */}
        <Card>

          <CardBody>
            <Suspense fallback={<Loading />}>
              <List />
            </Suspense>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
