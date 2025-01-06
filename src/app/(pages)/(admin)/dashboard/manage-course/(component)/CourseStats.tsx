import React from 'react';

interface CourseStatsProps {
  activeCourses: number;
}

const CourseStats: React.FC<CourseStatsProps> = ({ activeCourses }) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-3">
      <div className="flex-1 bg-white shadow-md rounded-md p-6 text-center">
        <p className="text-3xl font-bold text-green-500">{activeCourses}</p>
        <p className="text-gray-500 text-sm   ">Total Course</p>
      </div>
    </div>
  );
};

export default CourseStats;
