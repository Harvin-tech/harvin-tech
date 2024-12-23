import React from "react";

interface StatCardProps {
  title: string;
  value: number | string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center justify-center p-3 border rounded-md shadow-sm bg-white">
      <h3 className="text-xl font-bold">{value}</h3>
      <p className="text-xs md:text-sm text-gray-500 text-center ">{title}</p>
    </div>
  );
};
