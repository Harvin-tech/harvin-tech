import React from "react";

export const CourseForm: React.FC = () => {
  return (
    <form className="space-y-4">
      {/* Course Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Title *
        </label>
        <input
          type="text"
          placeholder="Enter course title"
          className="w-full border rounded-md p-2 mt-1"
        />
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Short Description
        </label>
        <textarea
          placeholder="Enter short description"
          className="w-full border rounded-md p-2 mt-1"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          rows={4}
          placeholder="Enter course description"
          className="w-full border rounded-md p-2 mt-1"
        />
      </div>

      {/* Select Category and Level */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select a Category
          </label>
          <select className="w-full border rounded-md p-2 mt-1">
            <option>Development</option>
            <option>Design</option>
            <option>Marketing</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Level
          </label>
          <select className="w-full border rounded-md p-2 mt-1">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      {/* Language */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Language
        </label>
        <select className="w-full border rounded-md p-2 mt-1">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>

      {/* Checkboxes */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input type="checkbox" />
          <span>Keep it as private course</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" />
          <span>Check if this course is top course</span>
        </label>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-end space-x-2">
        <button className="px-4 py-2 bg-gray-200 rounded-md">Back</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Next
        </button>
      </div>
    </form>
  );
};
