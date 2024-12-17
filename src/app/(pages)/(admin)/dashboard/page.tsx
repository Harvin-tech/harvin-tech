'use client'
import React from "react";
import { LineChart } from "./(component)/DashboardComponent/LineChart";
import { StatCard } from "./(component)/DashboardComponent/StatsCard";
import { VideoCard } from "./(component)/DashboardComponent/VideoCard";
import EmblaCarousel from "@/components/emblaCrausel/EmblaCarousel";

const Dashboard = () => {
  const videoData = [
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

  return (
    <div className="p-2 md:p-6 space-y-4 md:space-y-6 w-full">
      {/* Statistics and Chart Container */}
      <div>
      <div className="text-2xl font-semibold mb-4">Overview</div>
      <div className="relative bg-white p-2 md:p-4 border rounded-md shadow-sm">
        {/* Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-4">
          <StatCard title="Number of Courses" value={15} />
          <StatCard title="Number of Enrolment" value={1502} />
          <StatCard title="Number of Students" value={302} />
        </div>

        {/* Line Chart Section */}
        <div className="w-full">
          <LineChart height={260} />
        </div>
      </div>
        </div>

      {/* Continue Watching Section */}
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-4">Continue Watching</h3>
        <div className="max-w-[820px] mx-auto overflow-auto">
          <EmblaCarousel
            slides={videoData}
            options={{ align: "start", containScroll: "trimSnaps" }}
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


