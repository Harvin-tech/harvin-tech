
import React from "react";

interface CourseTableProps {
  courses: string[];
}

const CourseTable: React.FC<CourseTableProps> = ({ courses }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left text-gray-500 font-semibold">#</th>
            <th className="p-3 text-left text-gray-500 font-semibold">Title</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-3">{index + 1}</td>
              <td className="p-3 text-blue-600 hover:underline cursor-pointer text-sm md:text-base">
                {course}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
