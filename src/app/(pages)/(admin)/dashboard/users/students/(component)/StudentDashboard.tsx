import React from "react";
import StudentProfile from "./StudentProfile";
import CourseFilters from "./CourseFilters";
import CourseList from "./CourseList";

const StudentDashboard: React.FC = () => {
  return (
    <div className="p-2  min-h-screen">
      <h1 className="text-base md:text-lg font-semibold mb-2">Students</h1>

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
