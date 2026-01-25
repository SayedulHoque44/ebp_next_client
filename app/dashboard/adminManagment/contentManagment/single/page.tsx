import React, { Suspense } from 'react';
import SingleUc from '@/components/features/Dashboard/AdminManagment/UniContent/SingleUC';
import { Metadata } from 'next';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const metadata: Metadata = {
  title: "Content Details",
  description: "Content Details | Easy Bangla Patente",
};

const SingleUcSkeleton = () => (
  <div className="py-10">
    <div className="space-y-8">
      <Skeleton width={300} height={48} />
      <Skeleton height={200} className="rounded-2xl" />
      <Skeleton width={300} height={48} />
      <Skeleton height={400} className="rounded-2xl" />
    </div>
  </div>
);

const page = () => {
  return (
    <Suspense fallback={<SingleUcSkeleton />}>
      <SingleUc />
    </Suspense>
  );
};

export default page;
