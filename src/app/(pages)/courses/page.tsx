import React from 'react';
import Courses from './Content';
import { Suspense } from 'react';

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Courses />
    </Suspense>
  );
};

export default page;
