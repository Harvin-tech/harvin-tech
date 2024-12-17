'use client'
import React, { useState } from "react";
import { StatCard } from "./(component)/StatCard";
import { TabNavigation } from "./(component)/TabNavigation";
import { CourseForm } from "./(component)/CourseForm";

export default function AddCourse() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold">Add New Course</h1>

      {/* Statistics Cards */}
      <div className="flex space-x-4">
        <StatCard value={15} label="Active Course" />
        <StatCard value={0} label="Pending Course" />
      </div>

      {/* Course Form */}
      <div className="p-6 bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Course Adding Form</h2>
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
