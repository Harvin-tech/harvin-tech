'use client';
import React, { useEffect, useState } from 'react';
import {
  Users,
  BookOpen,
  Check,
  X,
  Play,
  Clock,
  Award,
  BookOpen as Book,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { API_ENDPOINTS } from '@/config/backend-routes';
import { useParams } from 'next/navigation';
import { nextApiClient } from '@/services/apiClient';
import Link from 'next/link';
import { Button } from '../ui/button';
import NotFound from '@/app/not-found';

const CourseDetails = () => {
  const [expandedChapter, setExpandedChapter] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const param = useParams();
  console.log('param', param);
  const slug = param?.slug ?? '';
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const url = API_ENDPOINTS.PUBLIC_COURSES.BASE + '/' + slug;
        const { data } = await nextApiClient.get(url);
        console.log('response', data);
        if (data && data.data) {
          console.log('courses', data.data);
          setCourse(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const pricingPlans = [
    {
      title: 'Self Paced',
      price: '₹ 9,999',
      highlight: 'Best for independent learners',
      features: [
        { text: 'Certificate for Course Completion', included: true },
        { text: '1 Minor and 1 Major project', included: true },
        { text: '25+ hours of Video Content Access', included: true },
        { text: '6 Months LMS Access', included: true },
        { text: 'Up to 4 hours of mentor assistance', included: true },
        { text: 'Co - Branded Course Certificate', included: false },
      ],
    },
    {
      title: 'Mentor Led',
      price: '₹ 14,999',
      highlight: 'Recommended for best results',
      features: [
        { text: '4 Certificate After Course Completion', included: true },
        { text: '2 Minor and 2 Major project', included: true },
        { text: 'Co - Branded Course Certificate', included: true },
        { text: '40+ hours of Video Content Access', included: true },
        { text: 'Lifetime LMS Access', included: true },
        {
          text: 'Mentor training & job assistance',
          included: true,
        },
      ],
    },
  ];

  if (!course && !loading) return <NotFound />;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary/50"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br  from-[#11101d] to-[#2c125c] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {course.title}
            </h1>
            <div className="flex flex-wrap gap-6 mb-8 text-blue-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span className="capitalize">{course.category} Level</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>25+ Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Open Enrollment</span>
              </div>
            </div>
            <div
              className="prose prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
            <Link href={'/contact'}>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105">
                Start Learning Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            Course Curriculum
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            A comprehensive curriculum designed to take you from basics to
            advanced concepts in AI
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.chapters &&
              course.chapters.map((chapter: any, index: number) => (
                <Card
                  key={index}
                  className={`border-2 transition-all ${
                    expandedChapter === index
                      ? 'border-primary shadow-lg'
                      : 'hover:border-primary'
                  }`}
                >
                  <CardContent className="p-0">
                    <button
                      className="w-full p-6 flex items-center justify-between"
                      onClick={() =>
                        setExpandedChapter(
                          expandedChapter === index ? null : index
                        )
                      }
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-lg mb-1">
                            {chapter.title}
                          </h3>
                          <div
                            className="prose prose-invert max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: chapter.description,
                            }}
                          />
                        </div>
                      </div>
                      {/* {expandedChapter === index ? (
                      <ChevronUp className="w-5 h-5 text-blue-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )} */}
                    </button>

                    {/* {expandedChapter === index && (
                    <div className="border-t bg-gray-50 p-6">
                      <ul className="space-y-4">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <li
                            key={lessonIndex}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              {getLessonIcon(lesson.type)}
                              <span className="text-gray-700">
                                {lesson.title}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {lesson.duration}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )} */}
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="bg-blue-100 text-primary w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Play className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Video Content</h3>
              <p className="text-gray-600">
                25+ hours of high-quality video lessons with practical examples
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Book className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Projects</h3>
              <p className="text-gray-600">
                Real-world projects to build your portfolio and experience
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Certification</h3>
              <p className="text-gray-600">
                Industry-recognized certificates upon completion
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Certificates Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Certificates</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            With the building blocks of your career set, you will have laid the
            foundation for your future. We will add the golden bricks for you
            with certificates from Partnered Companies.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-1 gap-2">
              <div className="transform hover:scale-[1.02] transition-transform">
                <img
                  src="/images/certificate/exce.jpeg"
                  alt="Certificate Sample 1"
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
              <div className="transform hover:scale-[1.02] transition-transform">
                <img
                  src="/images/certificate/comp.jpeg"
                  alt="Certificate Sample 3"
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
            </div>
            <div className="transform hover:scale-[1.02] transition-transform">
              <img
                src="/images/certificate/intern.jpeg"
                alt="Certificate Sample 2"
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Select the plan that best fits your learning style and goals. Both
            paths lead to success, but choose the one that matches your pace.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary transition-all transform hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="p-8">
                  <div className="font-medium text-primary mb-2">
                    {plan.highlight}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                  <div className="text-3xl font-bold mb-6">{plan.price}</div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                        )}
                        <span className="text-gray-600">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={'/contact'}>
                    <Button className="w-full text-white text-md">
                      Enroll Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
