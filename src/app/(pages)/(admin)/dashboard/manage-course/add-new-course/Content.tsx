'use client'
import React, { useState } from "react";
import { StatCard } from "./(component)/StatCard";
import { TabNavigation } from "./(component)/TabNavigation";
import { CourseForm } from "./(component)/CourseForm";

export default function AddCourse() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-2  bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-base md:text-lg font-semibold mb-2">Add New Course</h1>

      {/* Statistics Cards */}
      <div className="flex flex-col sm:flex-row gap-2 mb-2">
        <StatCard value={15} label="Active Course" />
        <StatCard value={0} label="Pending Course" />
      </div>

      {/* Course Form */}
      <h2 className="text-lg font-semibold mb-2 ">Course Adding Form</h2>
      <div className="p-4 bg-white rounded-md shadow-md">
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={["Base", "Pricing", "Media", "SEO", "Finish"]}
        />
        <CourseForm />
      </div>
    </div>
  );
}
