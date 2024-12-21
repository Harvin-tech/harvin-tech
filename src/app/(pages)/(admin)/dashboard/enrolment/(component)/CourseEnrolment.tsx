import React from "react";
import EnrolmentForm from "./EnrolmentForm";
import EnrolmentHistory from "./EnrolmentHistory";

const CourseEnrolment: React.FC = () => {
  return (
    <div className="p-2 min-h-screen">
      <h1 className="font-semibold mb-2 text-sm md:text-base">Course Enrolment</h1>

      {/* Enrolment Form */}
      <EnrolmentForm />

      {/* Enrolment History */}
      <EnrolmentHistory />
    </div>
  );
};

export default CourseEnrolment;
