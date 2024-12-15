import React from "react";
import EnrolmentForm from "./EnrolmentForm";
import EnrolmentHistory from "./EnrolmentHistory";

const CourseEnrolment: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Course Enrolment</h1>

      {/* Enrolment Form */}
      <EnrolmentForm />

      {/* Enrolment History */}
      <EnrolmentHistory />
    </div>
  );
};

export default CourseEnrolment;
