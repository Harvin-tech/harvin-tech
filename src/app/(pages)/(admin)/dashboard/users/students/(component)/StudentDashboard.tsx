import React from "react";
import StudentProfile from "./StudentProfile";
import CourseFilters from "./CourseFilters";
import CourseList from "./CourseList";

const StudentDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Students</h1>

      {/* Student Profile */}
      <StudentProfile
        name="Harvin"
        email="harvin@gmail.com"
        activeCourses={15}
      />

      {/* Course Filters */}
      <CourseFilters />

      {/* Course List */}
      <CourseList />
    </div>
  );
};

export default StudentDashboard;
