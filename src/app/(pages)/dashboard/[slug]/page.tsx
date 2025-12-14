import { notFound } from 'next/navigation';
import { nanoScienceCourses } from '@/constants/courses/nano-sceience';
import { CourseViewer } from './CourseViewer';
import { python } from '@/constants/courses/python';
import { aiml } from '@/constants/courses/ai-ml';
import { MedicalCoding } from '@/constants/courses/medical-coding';
import { Cdm } from '@/constants/courses/cdm';
import { Pharmacovogilance } from '@/constants/courses/pharmaco';
import { Cdm1 } from '@/constants/courses/cdmb1';
import { MedicalCodingb3 } from '@/constants/courses/medical-coding-b3';
import { Pharmacovogilanceb2 } from '@/constants/courses/pharmacob2';
import { genai } from '@/constants/courses/gen-ai';
import { Pharmacovogilanceb3 } from '@/constants/courses/pharmacob3';

const courses: any = {
  nanoscience: nanoScienceCourses,
  python: python,
  aiml: aiml,
  medicalcoding: MedicalCoding,
  clinicaldatamanagement: Cdm,
  pharmacovigilance: Pharmacovogilance,
  clinicaldatamanagementb1: Cdm1,
  medicalcodingb3: MedicalCodingb3,
  pharmacovigilanceb2: Pharmacovogilanceb2,
  generativeai: genai,
  pharmacovigilanceb3: Pharmacovogilanceb3, // Temporary mapping until pharmacovigilanceb3 is created
  

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
