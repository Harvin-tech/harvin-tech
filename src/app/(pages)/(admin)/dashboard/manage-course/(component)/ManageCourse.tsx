'use client'
import React, { useState } from "react";
import CourseStats from "./CourseStats";
import CourseFilter from "./CourseFilter";
import CourseTable from "./CourseTable";

const ManageCourse: React.FC = () => {
  const [courses, setCourses] = useState<string[]>([
    "Artificial Intelligence Fundamentals: A Comprehensive Guide to AI and its Applications",
    "Mastering Machine Learning: An In-Depth Guide to Algorithms and Techniques",
    "Cybersecurity Fundamentals: Defend Your Online Assets",
    "Mastering Azure Cloud Computing: A Comprehensive Guide to Building and Managing Cloud Solutions",
  ]);

  const handleFilter = () => {
    // Handle filter logic here
    console.log("Filter clicked!");
  };

  return (
    <div className="px-4 pt-2 min-h-screen">
      <h1 className="text-base md:text-lg font-semibold mb-2">Manage Course</h1>
      {/* Stats */}
      <CourseStats activeCourses={15} pendingCourses={3} />
      {/* Filter */}
      <CourseFilter onFilter={handleFilter} />
      {/* Table */}
      <CourseTable courses={courses} />
    </div>
  );
};

export default ManageCourse;
