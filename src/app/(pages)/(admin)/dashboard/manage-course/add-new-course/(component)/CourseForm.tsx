import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";


export const CourseForm: React.FC = () => {
  return (
    <form className="space-y-6">
      {/* Course Title */}
      <div className="space-y-2">
        <Label >Course Title *</Label>
        <Input id="title" placeholder="Enter course title" />
      </div>

      {/* Short Description */}
      <div className="space-y-2">
        <Label >Short Description</Label>
        <Textarea id="shortDescription" placeholder="Enter short description" />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label >Description</Label>
        <Textarea id="description" placeholder="Enter course description" rows={4} />
      </div>

      {/* Select Category and Level */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category">Select a Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="level">Level</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Levels</SelectLabel>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Language */}
      <div className="space-y-2">
        <Label htmlFor="language">Language</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Languages</SelectLabel>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Checkboxes */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="private" />
          <Label >Keep it as private course</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="top" />
          <Label >Check if this course is top course</Label>
        </div>
      </div>

      {/* Pagination Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
        <Button variant="outline">Back</Button>
        <Button className="text-white bg-primary">Next</Button>
      </div>
    </form>
  );
};
