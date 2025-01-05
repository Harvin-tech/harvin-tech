'use client'
import React, { useState } from "react";
import CourseStats from "./CourseStats";
import CourseFilter from "./CourseFilter";
import CourseTable from "./CourseTable";

const ManageCourse: React.FC = () => {



  return (
    <div className="px-4 pt-2 min-h-screen">
      <h1 className="text-base md:text-lg font-semibold mb-2">Manage Course</h1>
      {/* Stats */}
      <CourseStats activeCourses={courses.length} />
      {/* Filter */}
      {/* Table */}
      <CourseTable courses={courses} />
    </div>
  );
};

export default ManageCourse;

const courses = [
  {
    id: 1,
    name: "John Doe",
    emailCoursed: "john.coursed@example.com",
    title: "Introduction to React",
    email: "john@example.com",
    isLocked: false
  },
  // ... more courses
];