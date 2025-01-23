import NotFound from '@/app/not-found';
import CoursesPage from '@/components/courses/course';
import React from 'react';

const page = () => {
  return (
    <>
      {/* Currenty showing not found if required then use this */}
      <NotFound />
      {/* <CoursesPage /> */}
    </>
  );
};

export default page;
