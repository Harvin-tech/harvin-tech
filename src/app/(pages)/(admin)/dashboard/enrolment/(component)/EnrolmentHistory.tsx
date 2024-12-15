import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const EnrolmentHistory: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4">Enrolment History</h2>
      <div className="flex items-center gap-4 border rounded-md p-2">
        <FaCalendarAlt className="text-gray-500" />
        <span className="text-gray-700">
          November 01, 2024 - November 30, 2024
        </span>
      </div>
    </div>
  );
};

export default EnrolmentHistory;
