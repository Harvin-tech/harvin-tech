import { notFound } from 'next/navigation';
import { nanoScienceCourses } from '@/constants/courses/nano-sceience';
import { CourseViewer } from './CourseViewer';
import { python } from '@/constants/courses/python';

const courses:any = {
  nanoscience: nanoScienceCourses,
  python:python
};

export default function CoursePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const courseData = courses[slug];

  if (!courseData) {
    notFound();
  }

  return (
    <CourseViewer
      course_name={courseData.course_name}
      pdfs={courseData.pdfs}
      videos={courseData.videos}
    />
  );
}