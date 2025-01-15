import React from 'react';
import HeroSection from './HeroSection';
import WhyChooseUs from './WhyChooseUs';
import Courses from './Courses';
import Trusted from './Trusted';
import Testimonial from './Testimonial';
import TopCourse from './TopCourse';
import CtaCard from './CtaCard';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <WhyChooseUs />
      <Courses />
      <CtaCard/>
      <TopCourse />
      <Trusted />
      <Testimonial />
    </div>
  );
};

export default Home;
