'use client'
import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export const LineChart = () => {
  const data = [
    { name: "January", value: 0 },
    { name: "February", value: 0 },
    { name: "March", value: 0 },
    { name: "April", value: 1 },
    { name: "May", value: 0 },
    { name: "June", value: 0 },
    { name: "July", value: 0 },
  ];

  return (
    <div style={{ height: "100%", width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ left: -15,top: 10,bottom: 10,right: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" className="text-xs md:text-sm" />
          <YAxis className="text-xs md:text-sm" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8f4fcf" // Tailwind blue
            strokeWidth={2}
            dot={{ fill: '#8f4fcf' }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};
