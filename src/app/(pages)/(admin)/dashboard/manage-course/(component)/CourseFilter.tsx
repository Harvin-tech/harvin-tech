import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface CourseFilterProps {
  onFilter: () => void;
}

const CourseFilter: React.FC<CourseFilterProps> = ({ onFilter }) => {
  return (
    <div className="bg-card shadow-md rounded-md p-4 mb-3 flex flex-col sm:flex-row gap-2">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AI">AI</SelectItem>
          <SelectItem value="Cloud">Cloud</SelectItem>
          <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Instructor" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="John">John</SelectItem>
          <SelectItem value="Sarah">Sarah</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Free">Free</SelectItem>
          <SelectItem value="Paid">Paid</SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={onFilter}
        variant="default"
        className="text-white w-full sm:w-auto"
      >
        Filter
      </Button>
    </div>
  );
};

export default CourseFilter;
