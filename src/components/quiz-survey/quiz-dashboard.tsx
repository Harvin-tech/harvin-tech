'use client';
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, Target, BookOpen, TrendingUp } from 'lucide-react';
import { mockSuveryData as mockData } from '@/constants/survey';

const SurveyQuizDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('all');

  // Mock data processing functions
  const getKPIs = () => ({
    totalResponses: mockData.length,
    existingUsers: mockData.filter((d) => d.exsistingUser).length,
    completionRate: Math.round(
      (mockData.filter((d) => d.track).length / mockData.length) * 100
    ),
    activeUsers: mockData.filter((d) => d.status === 1).length,
  });

  const getProgramDistribution = () => {
    const distribution = {};
    mockData.forEach((response) => {
      if (response.selectedProgram) {
        //@ts-ignore
        distribution[response.selectedProgram] =
          //@ts-ignore
          (distribution[response.selectedProgram] || 0) + 1;
      }
    });
    return Object.entries(distribution).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const getResponseTrends = () => {
    const trends = {};
    mockData.forEach((response) => {
      const date = new Date(response.createdAt).toLocaleDateString();
      //@ts-ignore
      trends[date] = (trends[date] || 0) + 1;
    });
    return Object.entries(trends).map(([date, count]) => ({ date, count }));
  };

  const getGoalDistribution = () => {
    const distribution = {};
    mockData.forEach((response) => {
      if (response.goal) {
        //@ts-ignore
        distribution[response.goal] = (distribution[response.goal] || 0) + 1;
      }
    });
    return Object.entries(distribution).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#8884D8',
    '#82CA9D',
  ];
  const kpis = getKPIs();

  return (
    <div className="p-6 bg-gray-50 min-h-screen my-2 rounded-md">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        <h1 className="text-2xl font-bold ">Quiz Survey Analytics Dashboard</h1>

        {/* Time Filter */}
        <div className="">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 font-semibold">
          <Card className="p-4">
            <div className="flex items-center  space-x-2 pb-2">
              <Users className="text-blue-500" />
              <p className="text-lg">Total Responses</p>
            </div>
            <div>
              <div className="text-2xl ">{kpis.totalResponses}</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2 pb-2">
              <Target className="text-green-500" />
              <p className="text-lg">Completion Rate</p>
            </div>
            <div>
              <div className="text-2xl ">{kpis.completionRate}%</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2 pb-2">
              <BookOpen className="text-yellow-500" />
              <p className="text-lg">Existing Users</p>
            </div>
            <div>
              <div className="text-2xl">{kpis.existingUsers}</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2 pb-2">
              <TrendingUp className="text-purple-500" />
              <p className="text-lg">Active Users</p>
            </div>
            <div>
              <div className="text-2xl ">{kpis.activeUsers}</div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          {/* Program Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Program Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getProgramDistribution()}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {getProgramDistribution().map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Response Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Response Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getResponseTrends()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Goal Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Goal Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getGoalDistribution()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SurveyQuizDashboard;
