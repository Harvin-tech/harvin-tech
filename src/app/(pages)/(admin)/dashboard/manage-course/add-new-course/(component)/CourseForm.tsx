'use client'
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addCourse } from "@/api/services/coursesService";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

type Lesson = {
  title: string;
  type: 'video';
}

type Chapter = {
  title: string;
  lessons: Lesson[];
}

type CreateCoursePayload = {
  title: string;
  category: string;
  description: string;
  chapters: Chapter[];
}

interface CourseFormProps {
  section: string;
  onUpdate: (section: string, data: any) => void;
  data: any;
}

export const CourseForm: React.FC<CourseFormProps> = ({ section, onUpdate, data }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdate(section, {
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    onUpdate(section, {
      ...data,
      [name]: value
    });
  };

  switch (section) {
    case 'base':
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Course title *</Label>
            <Input
              id="title"
              name="title"
              value={data.title || ''}
              onChange={handleChange}
              placeholder="Enter course title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short description</Label>
            <Textarea
              id="shortDescription"
              name="shortDescription"
              value={data.shortDescription || ''}
              onChange={handleChange}
              placeholder="Enter short description"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <div className="border rounded-md">
              <div className="flex items-center gap-1 p-2 border-b">
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  <span className="text-lg">B</span>
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded italic">
                  <span className="text-lg">I</span>
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded underline">
                  <span className="text-lg">U</span>
                </button>
                <span className="w-px h-6 bg-gray-300 mx-1"></span>
                {/* Add more formatting buttons as needed */}
              </div>
              <Textarea
                id="description"
                name="description"
                value={data.description || ''}
                onChange={handleChange}
                placeholder="Enter description"
                rows={6}
                className="border-0 focus:ring-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Select a category</Label>
            <Select value={data.category || ''} onValueChange={(value) => handleSelectChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select course category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <Select value={data.level || ''} onValueChange={(value) => handleSelectChange('level', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Beginner" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={data.language || ''} onValueChange={(value) => handleSelectChange('language', value)}>
              <SelectTrigger>
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enableDripContent"
                checked={data.enableDripContent || false}
                onCheckedChange={(checked) => handleSelectChange('enableDripContent', checked.toString())}
                className="data-[state=checked]:bg-primary data-[state=checked]:text-white"
              />
              <Label htmlFor="enableDripContent">Enable drip content</Label>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPrivate"
                checked={data.isPrivate || false}
                onCheckedChange={(checked) => handleSelectChange('isPrivate', checked.toString())}
                className="data-[state=checked]:text-primary data-[state=checked]:bg-primary"
              />
              <Label htmlFor="isPrivate">Make it a private course</Label>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="freeForMembers"
                checked={data.freeForMembers || false}
                onCheckedChange={(checked) => handleSelectChange('freeForMembers', checked.toString())}
                className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <Label htmlFor="freeForMembers">Check if this course is free for members</Label>
            </div>
          </div>
        </div>
      );

    case 'pricing':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price (USD)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={data.price || ''}
              onChange={handleChange}
              placeholder="Enter price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discountPrice">Discount Price (Optional)</Label>
            <Input
              id="discountPrice"
              name="discountPrice"
              type="number"
              value={data.discountPrice || ''}
              onChange={handleChange}
              placeholder="Enter discount price"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasCertificate"
              checked={data.hasCertificate || false}
              onCheckedChange={(checked) => handleSelectChange('hasCertificate', checked.toString())}
              className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            />
            <Label htmlFor="hasCertificate">Include Certificate</Label>
          </div>
        </div>
      );

    case 'media':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Course Thumbnail</Label>
            <Input
              id="thumbnail"
              name="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="previewVideo">Preview Video</Label>
            <Input
              id="previewVideo"
              name="previewVideo"
              type="file"
              accept="video/*"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="promotionalVideo">Promotional Video (Optional)</Label>
            <Input
              id="promotionalVideo"
              name="promotionalVideo"
              type="file"
              accept="video/*"
              onChange={handleChange}
            />
          </div>
        </div>
      );

    case 'seo':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              name="metaTitle"
              value={data.metaTitle || ''}
              onChange={handleChange}
              placeholder="Enter meta title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              name="metaDescription"
              value={data.metaDescription || ''}
              onChange={handleChange}
              placeholder="Enter meta description"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords (comma-separated)</Label>
            <Input
              id="keywords"
              name="keywords"
              value={data.keywords || ''}
              onChange={handleChange}
              placeholder="e.g., programming, web development, react"
            />
          </div>
        </div>
      );

    case 'finish':
      return (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-4">Course Summary</h3>
            <div className="space-y-2">
              <p><strong>Title:</strong> {data.title}</p>
              <p><strong>Category:</strong> {data.category}</p>
              <p><strong>Price:</strong> ${data.price}</p>
              {data.discountPrice && <p><strong>Discount Price:</strong> ${data.discountPrice}</p>}
              <p><strong>Description:</strong> {data.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="termsAccepted"
              checked={data.termsAccepted || false}
              onCheckedChange={(checked) => handleSelectChange('termsAccepted', checked.toString())}
              className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            />
            <Label htmlFor="termsAccepted">I confirm that all information is correct</Label>
          </div>
        </div>
      );

    default:
      return null;
  }
};
