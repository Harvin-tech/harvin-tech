import React from "react";

interface StudentProfileProps {
  name: string;
  email: string;
  activeCourses: number;
}

const StudentProfile: React.FC<StudentProfileProps> = ({
  name,
  email,
  activeCourses,
}) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-md mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-gray-600">{email}</p>
      </div>
      <div className="bg-gray-100 rounded-md p-4 text-center shadow-sm">
        <span className="text-green-500 text-4xl font-bold">{activeCourses}</span>
        <p className="text-gray-600 mt-1">Active Course</p>
      </div>
    </div>
  );
};

export default StudentProfile;
