import AllCourseList from '@/components/courses/all-course-list';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import React from 'react';

const page = () => {
  return (
    <>
      <Header />
      <AllCourseList />
      <Footer />
    </>
  );
};

export default page;
