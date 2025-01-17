'use client';
import { appContent } from '@/constants/variants';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { getEnrolledCourse } from '@/services';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import IoTCard from './component/IoTCard';
import CourseDetails from './component/CourseDetails';
import CoursePayment from './component/CoursePayment';
import Cta from './component/Cta';
import Courses from '../home/Courses';

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courses, setCourses] = useState<any>(null);

  const courseId = searchParams.get('course_id');
  const preview = searchParams.get('preview');
  const { courses: dummyData } = useSelector((state: any) => state.courses);

  useEffect(() => {
    async function fetchEnrolledCourses() {
      if (!courseId) return;
      try {
        setLoading(true);
        const response = await getEnrolledCourse(courseId);
        if (response && response.data) {
          setEnrolledCourses(
            response.data.chapters.map((item: any) => ({
              title: item?.title,
              chapterId: item?._id,
            }))
          );

          const courseDetails = response.data;
          const courseData = {
            id: uuidv4(),
            title: courseDetails?.title || 'No Title',
            description: courseDetails?.description || 'No Description',
            instructor: courseDetails?.instructor || 'Unknown Instructor',
            rating: courseDetails?.rating || 0,
            reviewsCount: courseDetails?.reviewsCount || 0,
            price: courseDetails?.price || 0,
            instructorDesc: courseDetails?.instructorDesc || 'No Description',
          };
          setCourses(courseData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        setLoading(false);
      }
    }

    fetchEnrolledCourses();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  const getTitleAndDescription = () => {
    if (courses && !preview) {
      return {
        title: courses.title,
        description: courses.description,
      };
    }
    if (preview && dummyData) {
      return {
        title: dummyData.title,
        description: dummyData.description,
      };
    }
    return {
      title: 'Fundamentals Programs html,css,java',
      description:
        '(Fundamentals Programs) is a rapidly evolving field and has changed from an unimaginable sci-fi dream to a very realistic future.',
    };
  };

  const content = getTitleAndDescription();

  return (
    <div className={appContent({ className: ' min-h-screen ' })}>
      <div className="flex flex-col lg:flex-row gap-4 md:gap-5 mt-4 md:mt-5">
        <div className="w-full lg:w-[70%]">
          <section className="mb-4 md:mb-5">
            <div className="max-w-2xl space-y-2">
              <div className="flex gap-2">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs">
                  Courses
                </span>
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs">
                  Skills
                </span>
              </div>
              <div className="space-y-1">
                <h1 className="font-semibold text-2xl xl:text-3xl tracking-tight">
                  {content.title}
                </h1>
                <p className="text-foreground/80 text-sm md:text-base tracking-wide">
                  {content.description}
                </p>
                <p className="text-muted-foreground text-xs md:text-sm tracking-wide">
                  ~by University of California, Irvine
                </p>
              </div>
            </div>
          </section>

          {/* Hero Section */}
          <section className="flex flex-col md:flex-row gap-3 mb-4 md:mb-5">
            <div className="w-full md:w-[70%] flex flex-col gap-3 ">
              {/* <video
                className="w-full max-w-2xl rounded-lg shadow-lg min-h-[350px]"
                controls
                autoPlay
                muted
                loop
              >
                <source src="/your-video-path.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
              <iframe
                width="560"
                height="315"
                className="w-full max-w-2xl rounded-lg shadow-lg min-h-[350px] bg-black"
                src="https://www.youtube.com/embed/S1DvEdR0iUo?si=Pkcq4ViWqH9mEgU7"
                title="YouTube video player"
                // frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                // referrerpolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              <div className="grid grid-cols-2 gap-3 w-full">
                <IoTCard
                  imageSrc="/images/home/topcourse2.png"
                  title="IoT Graphs"
                />
                <IoTCard
                  imageSrc="/images/home/topcourse1.png"
                  title="Internet of Things"
                />
              </div>
            </div>
            <div className="w-full md:w-[30%]">
              <div className="grid grid-cols-2 md:grid-cols-1 gap-3 h-full">
                <IoTCard imageSrc="/images/home/course1.png" title="Devices" />
                <IoTCard imageSrc="/images/home/course2.png" title="Network" />
                <IoTCard imageSrc="/images/home/course3.png" title="LoRaWAN" />
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
                <li>
                  Learn in-demand skills from university and industry experts
                </li>
                <li>Master a subject or tool with hands-on projects</li>
                <li>Develop a deep understanding of key concepts</li>
                <li>
                  Earn a career certificate from University of California,
                  Irvine
                </li>
              </ul>
            </div>
          </section>

          {/* Course Content */}
          <Suspense
            fallback={
              <div className="text-center">Loading Course Content...</div>
            }
          >
            <CourseDetails course={enrolledCourses} />
          </Suspense>

          <section className="mb-4 md:mb-5">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
                About the Author
              </h2>
              <div className="flex flex-col gap-3">
                <div className="relative size-12 overflow-hidden rounded-full">
                  <Image
                    fill
                    src="/images/home/topcourse1.png"
                    alt="Author"
                    className="absolute object-cover"
                  />
                </div>
                {!courseId ? (
                  <div>
                    <h3 className="font-medium text-lg">Dr. Sarah Johnson</h3>
                    <p className="text-sm text-foreground/80 max-w-[550px]">
                      Professor of Computer Science at UC Irvine with over 15
                      years of experience in IoT and embedded systems.
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* <h3 className="font-medium text-lg">{courses?.instructor}</h3> */}
                    <p className="text-sm text-foreground/80 max-w-[550px]">
                      {/* {courses?.instructorDesc} */}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
        <div className="w-full lg:w-[30%] flex flex-col items-center gap-3 mb-12 md:mb-20">
          <CoursePayment />
          {/* <Cta /> */}
        </div>
      </div>

      <Courses />
    </div>
  );
}
