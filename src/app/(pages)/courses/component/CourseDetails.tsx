import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import ChapterContent from './ChapterContent';

interface Lesson {
  title: string;
  type: 'video' | 'article' | 'quiz'; // Union type
}

interface Chapter {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  title: string;
  category: string;
  description: string;
  chapters: Chapter[];
}

interface CourseDetailProps {
  course: Course;
}

const CourseDetails = ({ course }: any) => {
  // console.log(course, "course")
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Chapters</h2>
      <div>
        {course.map((chapter: any, index: any) => (
          <ChapterContent key={index} chapter={chapter} />
        ))}
      </div>
    </div>
  );
};

export default CourseDetails;
