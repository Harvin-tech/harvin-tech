'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface CourseFiltersProps {
  filters: {
    category: string;
    status: string;
    instructor: string;
    price: string;
    search: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category: string;
      status: string;
      instructor: string;
      price: string;
      search: string;
    }>
  >;
  applyFilters: () => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({
  filters,
  setFilters,
  applyFilters,
}) => {
  return (
    <Card className="mb-2">
      <CardHeader>
        <h2 className="text-lg font-semibold">COURSE LIST</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="category1">medium</SelectItem>
              <SelectItem value="category2">medium</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, status: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="lock">Lock</SelectItem>
              <SelectItem value="unlock">Unlock</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, instructor: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Instructor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="instructor1">Instructor 1</SelectItem>
              <SelectItem value="instructor2">Instructor 2</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, price: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="default"
            className="text-white"
            onClick={applyFilters}
          >
            Filter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseFilters;
