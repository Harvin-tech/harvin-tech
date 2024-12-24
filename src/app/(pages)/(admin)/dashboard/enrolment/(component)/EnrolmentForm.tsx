import React from "react";

const EnrolmentForm: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-3">
      <h2 className="text-sm font-medium mb-2">Enrolment form</h2>

      {/* Users Input */}
      <div className="mb-3">
        <label htmlFor="users" className="block text-gray-700 font-medium mb-1 text-sm">
          Users*
        </label>
        <input
          type="text"
          id="users"
          placeholder="Search"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Course to Enrol */}
      <div>
        <label
          htmlFor="course"
          className="block text-gray-700 font-medium mb-1 text-sm"
        >
          Course to enrol*
        </label>
        <input
          type="text"
          id="course"
          placeholder=""
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default EnrolmentForm;
