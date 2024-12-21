import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const EnrolmentHistory: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-sm font-medium mb-2">Enrolment History</h2>
      <div className="flex items-center gap-4 border rounded-md p-2">
        <FaCalendarAlt className="text-gray-500 text-sm md:text-base" />
        <span className="text-gray-700 text-sm md:text-base">
          November 01, 2024 - November 30, 2024
        </span>
      </div>
    </div>
  );
};

export default EnrolmentHistory;
