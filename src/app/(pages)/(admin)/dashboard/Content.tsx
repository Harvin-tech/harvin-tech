
'use client'
import React from "react";

import EmblaCarousel from "@/components/emblaCrausel/EmblaCarousel";
import styled from "styled-components";
import { StatCard } from "./(component)/StatsCard";
import { VideoCard } from "./(component)/VideoCard";
import { LineChart } from "./(component)/LineChart";

const Dashboard = () => {
  

  return (
    <div className="px-3 pt-2 space-y-2 md:space-y-3 w-full">
      {/* Statistics and Chart Container */}
      <div className="max-w-screen-xl">
        <div className="font-semibold mb-2 text-base md:text-lg">Overview</div>
        <div className="relative bg-white p-3 md:p-4 lg:p-6 border rounded-md shadow-sm">
          {/* Statistics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            <StatCard title="Number of Courses" value={15} />
            <StatCard title="Number of Enrolment" value={1502} />
            <StatCard title="Number of Students" value={302} />
          </div>

          {/* Line Chart Section */}
          <div className="w-full h-[200px] md:h-[260px] lg:h-[300px]">
            <LineChart/>
          </div>
        </div>
      </div>

      {/* Continue Watching Section */}
      <div>
        <h3 className="text-base md:text-lg font-semibold mb-2">Continue Watching</h3>
        <VideoStyle >
          <EmblaCarousel
            slides={VIDEODATA}
            options={{ 
              align: "start", 
              containScroll: "trimSnaps",
              dragFree: true,
              slidesToScroll: 1,
            }}
            renderSlide={(item) => (
                
                <VideoCard
                  imageSrc={item.imageSrc}
                  title={item.title}
                  instructor={item.instructor}
                  rating={item.rating}
                  reviewsCount={item.reviewsCount}
                  price={item.price}
                  originalPrice={item.originalPrice}
                />
            )}
          />
        </VideoStyle>
      </div>
    </div>
  );
};

export default Dashboard;

const VideoStyle = styled.div`
@media (max-width: 374px) {
  width: 180px;
}
@media (min-width: 375px) and (max-width: 425px) {
  width: 200px;
}
@media (min-width: 426px) and (max-width: 524px) {
  width: 280px;
}
@media (min-width: 625px) and (max-width: 768px) {
  width: 538px;
}
@media (min-width: 769px) and (max-width: 1024px) {
  width: 100%;
}
@media (min-width: 1025px) {
  width: 100%;
}
`



const VIDEODATA = [
    {
      imageSrc: "/harvinlogo.jpg",
      title: "The Complete AI-Powered Copywriting Course & ChatGPT",
      instructor: "Ing. Tomas Moravek, Learn Digital",
      rating: 4.6,
      reviewsCount: 1694,
      price: 549,
      originalPrice: 3099,
    },
    {
      imageSrc: "/harvinlogo.jpg",
      title: "The Complete AI-Powered Copywriting Course & ChatGPT",
      instructor: "Ing. Tomas Moravek, Learn Digital",
      rating: 4.6,
      reviewsCount: 1694,
      price: 549,
      originalPrice: 3099,
    },
    {
      imageSrc: "/harvinlogo.jpg",
      title: "The Complete AI-Powered Copywriting Course & ChatGPT",
      instructor: "Ing. Tomas Moravek, Learn Digital",
      rating: 4.6,
      reviewsCount: 1694,
      price: 549,
      originalPrice: 3099,
    },
    {
      imageSrc: "/harvinlogo.jpg",
      title: "The Complete AI-Powered Copywriting Course & ChatGPT",
      instructor: "Ing. Tomas Moravek, Learn Digital",
      rating: 4.6,
      reviewsCount: 1694,
      price: 549,
      originalPrice: 3099,
    },
    {
      imageSrc: "/harvinlogo.jpg",
      title: "The Complete AI-Powered Copywriting Course & ChatGPT",
      instructor: "Ing. Tomas Moravek, Learn Digital",
      rating: 4.6,
      reviewsCount: 1694,
      price: 549,
      originalPrice: 3099,
    },
  ];


