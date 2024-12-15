import React from "react";

interface CourseStatsProps {
  activeCourses: number;
  pendingCourses: number;
}

const CourseStats: React.FC<CourseStatsProps> = ({
  activeCourses,
  pendingCourses,
}) => {
  return (
    <div className="flex gap-8 mb-6">
      <div className="flex-1 bg-white shadow-md rounded-md p-6 text-center">
        <p className="text-3xl font-bold text-green-500">{activeCourses}</p>
        <p className="text-gray-500">Active Course</p>
      </div>
      <div className="flex-1 bg-white shadow-md rounded-md p-6 text-center">
        <p className="text-3xl font-bold text-orange-500">{pendingCourses}</p>
        <p className="text-gray-500">Pending Course</p>
      </div>
    </div>
  );
};

export default CourseStats;
