import React from "react";

interface Course {
  id: number;
  title: string;
  status: "lock" | "unlock";
}

const courses: Course[] = [
  { id: 1, title: "Artificial Intelligence Fundamentals: A Comprehensive Guide to AI and its Applications", status: "unlock" },
  { id: 2, title: "Mastering Machine Learning: An In-Depth Guide to Algorithms and Techniques", status: "lock" },
  { id: 3, title: "Cybersecurity Fundamentals: Defend Your Online Assets", status: "lock" },
  { id: 4, title: "Mastering Azure Cloud Computing: A Comprehensive Guide to Building and Managing Cloud Solutions", status: "lock" },
];

const CourseList: React.FC = () => {
  return (
    <div className="bg-card rounded-md shadow-sm">
      <table className="w-full">
        <thead className="border-b border-border">
          <tr className="text-muted-foreground text-left">
            <th className="p-4">#</th>
            <th className="p-4">Title</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="hover:bg-muted/50">
              <td className="p-4 text-muted-foreground">{course.id}</td>
              <td className="p-4 text-primary underline cursor-pointer">
                {course.title}
              </td>
              <td className="p-4">
                {course.status === "unlock" ? (
                  <span className="text-green-600 border border-green-600 px-2 py-1 rounded-md">
                    Unlock
                  </span>
                ) : (
                  <span className="text-destructive border-destructive border px-2 py-1 rounded-md">
                    Lock
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
