'use client'
import { appContent } from '@/constants/variants';
import IoTCard from './component/IoTCard';
import TopCourse from '@/components/home/TopCourse';
import Courses from '@/components/home/Courses';
import CoursePayment from './component/CoursePayment';
import Cta from './component/Cta';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CoursesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
useEffect(() => {
  // Check if user is logged in
  const userData = localStorage.getItem('user');
  if (!userData) {
    router.push('/login');
    
  }else{
    setLoading(false);
  }
}, []);  

 if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        {/* You can use a spinner, or a simple loading text */}
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }


 
  return (
    <div
      className={appContent({
        className: ' min-h-screen ',
      })}
    >
      <div className="flex flex-col lg:flex-row gap-4 md:gap-5 mt-4 md:mt-5">

        <div className="w-full lg:w-[70%]  ">


          <section className="mb-4 md:mb-5">
            <div className="max-w-2xl  space-y-2  ">
              <div className="flex gap-2">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs">
                  Courses
                </span>
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs">
                  Skills
                </span>
              </div>
              <h1 className="font-semibold text-2xl xl:text-3xl tracking-tight">
                Fundamentals Programs html,css,java
              </h1>
              <p className="text-muted-foreground text-sm md:text-base tracking-wide ">
                (Fundamentals Programs) is a rapidly evolving field and has changed
                from an unimaginable sci-fi dream to a very realistic future. This
                course will teach you the basics of IoT and help you to keep up with
                the latest developments in the IoT field.
              </p>
              <p className="text-muted-foreground text-xs md:text-sm tracking-wide ">
                ~by University of California, Irvine
              </p>
            </div>
          </section>

          {/* Hero Section */}
          <section className=" flex flex-col md:flex-row gap-3 mb-4 md:mb-5">
            <div className="w-full md:w-[70%] flex flex-col gap-3">
                <video
                  className="w-full max-w-2xl rounded-lg shadow-lg min-h-[320px]"
                  controls
                  autoPlay
                  muted
                  loop
                >
                  <source src="/your-video-path.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              <div className="grid grid-cols-2 gap-3 w-full ">
                <IoTCard imageSrc="/iot-graph.png" title="IoT Graphs" />
                <IoTCard imageSrc="/iot-internet.png" title="Internet of Things" />
              </div>
            </div>
            <div className="w-full md:w-[30%]">
              <div className="grid grid-cols-2 md:grid-cols-1 gap-3 h-full">
                <IoTCard imageSrc="/iot-device.png" title="Devices" />
                <IoTCard imageSrc="/iot-network.png" title="Network" />
                <IoTCard imageSrc="/lorawan.png" title="LoRaWAN" />
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-4 md:mb-5">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
                Advance your subject-matter expertise
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Learn in-demand skills from university and industry experts</li>
                <li>Master a subject or tool with hands-on projects</li>
                <li>Develop a deep understanding of key concepts</li>
                <li>
                  Earn a career certificate from University of California, Irvine
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-4 md:mb-5">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
                Course Content
              </h2>
              
              <div className="space-y-3">
                {/* Module 1 */}
                <div className="border rounded-lg">
                  <button 
                    className="w-full px-4 py-3 hover:bg-accent/50 rounded-lg flex items-center justify-between"
                    onClick={(e) => e.currentTarget.parentElement?.classList.toggle('open')}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">Module 1: Introduction to IoT</span>
                      <span className="text-xs text-muted-foreground">(4 lectures • 45 min)</span>
                    </div>
                    <span className="transform transition-transform">▼</span>
                  </button>
                  <div className="hidden px-4 py-2 border-t">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>1.1</span>
                        <span>What is IoT?</span>
                        <span className="ml-auto">15 min</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>1.2</span>
                        <span>IoT Architecture</span>
                        <span className="ml-auto">10 min</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>1.3</span>
                        <span>IoT Protocols</span>
                        <span className="ml-auto">12 min</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>1.4</span>
                        <span>IoT Applications</span>
                        <span className="ml-auto">8 min</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Module 2 & 3 follow the same pattern */}
                {/* ... repeat the above structure for other modules ... */}
              </div>
            </div>
          </section>
          <section className="mb-4 md:mb-5">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
                About the Author
              </h2>
              <div className="flex flex-col gap-3">
                <img 
                  src="/author-avatar.jpg" 
                  alt="Author" 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-lg">Dr. Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground">
                    Professor of Computer Science at UC Irvine with over 15 years of experience in IoT and embedded systems. 
                    Published author of multiple research papers on IoT architecture and security.
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

      {/* Header */}
    </div>
  );
}
