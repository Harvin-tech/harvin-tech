"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const CourseFilters: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <h2 className="text-lg font-semibold">COURSE LIST</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {/* Add more categories here */}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {/* Add more status options here */}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Instructor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {/* Add more instructor options here */}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {/* Add more price options here */}
            </SelectContent>
          </Select>

          <Button variant="default" className="text-white">
            Filter
          </Button>
        </div>

        <div className="mt-4 space-y-2">
          <label className="text-sm text-muted-foreground">Search:</label>
          <Input
            type="text"
            placeholder="Search courses..."
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseFilters;
