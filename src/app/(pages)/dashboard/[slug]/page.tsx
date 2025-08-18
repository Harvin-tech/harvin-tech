import { notFound } from 'next/navigation';
import { nanoScienceCourses } from '@/constants/courses/nano-sceience';
import { CourseViewer } from './CourseViewer';
import { python } from '@/constants/courses/python';
import { aiml } from '@/constants/courses/ai-ml';
import { MedicalCoding } from '@/constants/courses/medical-coding';
import { Cdm } from '@/constants/courses/cdm';
import { Pharmacovogilance } from '@/constants/courses/pharmaco';

const courses: any = {
  nanoscience: nanoScienceCourses,
  python: python,
  aiml: aiml,
  medicalcoding:MedicalCoding,
  certifieddigitalmarketing:Cdm,
  pharmacovigilance:Pharmacovogilance

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
