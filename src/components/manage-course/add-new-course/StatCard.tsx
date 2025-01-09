import React from 'react';

interface StatCardProps {
  value: number;
  label: string;
}

export const StatCard: React.FC<StatCardProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 border rounded-md shadow-sm bg-white w-full ">
      <span className="text-3xl font-bold text-green-500">{value}</span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
};
