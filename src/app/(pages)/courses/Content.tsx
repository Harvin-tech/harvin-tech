'use client';
import { appContent } from '@/constants/variants';
import IoTCard from './component/IoTCard';
import Courses from '@/components/home/Courses';
import CoursePayment from './component/CoursePayment';
import Cta from './component/Cta';
import { use, useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CourseDetails, { Course } from './component/CourseDetails';
import { getCourseChapter, getEnrolledCourse } from '@/api';
import Image from 'next/image';

export default function CoursesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Retrieve the 'id' from query params
  const course_id = searchParams.get('id'); // Assuming `id` is passed in the query string

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Now it's safe to use localStorage
      const userData = localStorage.getItem('user');
      if (!userData) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    }
  }, [router]);

  useEffect(() => {
    async function fetchEnrolledCourses() {
      if (!course_id) return; // Prevent fetching if id is not available
      try {
        const response = await getEnrolledCourse(course_id);
        if (response && response.data) {
          // Set the fetched data to enrolledCourses
          setEnrolledCourses(response.data.chapters.map((item: any) => ({
            title: item?.title,
            chapterId: item?._id,
          }))); // Ensure this is the correct structure
          console.log(response.data, 'Enrolled Courses Data');
        } else {
          console.warn('No enrolled courses data found');
        }
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        console.log("Finished fetching enrolled courses");
      }
    }

    fetchEnrolledCourses();
  }, [course_id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className={appContent({ className: ' min-h-screen ' })}>
      <div className="flex flex-col lg:flex-row gap-4 md:gap-5 mt-4 md:mt-5">
        <div className="w-full lg:w-[70%]">
          <section className="mb-4 md:mb-5">
            <div className="max-w-2xl space-y-2">
              <div className="flex gap-2">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs">Courses</span>
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs">Skills</span>
              </div>
              <h1 className="font-semibold text-2xl xl:text-3xl tracking-tight">
                Fundamentals Programs html,css,java
              </h1>
              <p className="text-foreground/80 text-sm md:text-base tracking-wide">
                (Fundamentals Programs) is a rapidly evolving field and has changed from an unimaginable sci-fi dream to a very realistic future.
              </p>
              <p className="text-muted-foreground text-xs md:text-sm tracking-wide">
                ~by University of California, Irvine
              </p>
            </div>
          </section>

          {/* Hero Section */}
          <section className="flex flex-col md:flex-row gap-3 mb-4 md:mb-5">
            <div className="w-full md:w-[70%] flex flex-col gap-3">
              <video className="w-full max-w-2xl rounded-lg shadow-lg min-h-[350px]" controls autoPlay muted loop>
                <source src="/your-video-path.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="grid grid-cols-2 gap-3 w-full">
                <IoTCard imageSrc="/Images/home/topcourse2.png" title="IoT Graphs" />
                <IoTCard imageSrc="/Images/home/topcourse1.png" title="Internet of Things" />
              </div>
            </div>
            <div className="w-full md:w-[30%]">
              <div className="grid grid-cols-2 md:grid-cols-1 gap-3 h-full">
                <IoTCard imageSrc="/Images/home/course1.png" title="Devices" />
                <IoTCard imageSrc="/Images/home/course2.png" title="Network" />
                <IoTCard imageSrc="/Images/home/course3.png" title="LoRaWAN" />
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-4 md:mb-5">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
                Advance your subject-matter expertise
              </h2>
              <ul className="list-disc list-inside space-y-2 text-foreground/80">
                <li>Learn in-demand skills from university and industry experts</li>
                <li>Master a subject or tool with hands-on projects</li>
                <li>Develop a deep understanding of key concepts</li>
                <li>Earn a career certificate from University of California, Irvine</li>
              </ul>
            </div>
          </section>

          {/* Course Content */}
          <Suspense fallback={<div className="text-center">Loading Course Content...</div>}>
            <CourseDetails course={enrolledCourses} />
          </Suspense>

          <section className="mb-4 md:mb-5">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-card-foreground">About the Author</h2>
              <div className="flex flex-col gap-3">
                <div className="relative size-12 overflow-hidden rounded-full">
                  <Image fill src="/Images/home/topcourse1.png" alt="Author" className="absolute object-cover" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Dr. Sarah Johnson</h3>
                  <p className="text-sm text-foreground/80 max-w-[550px]">
                    Professor of Computer Science at UC Irvine with over 15 years of experience in IoT and embedded systems.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="w-full lg:w-[30%] flex flex-col items-center gap-3 mb-12 md:mb-20">
          <CoursePayment />
          <Cta />
        </div>
      </div>

      <Courses />
    </div>
  );
}
