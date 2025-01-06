'use client';
import React, { useState } from 'react';
import { StatCard } from './(component)/StatCard';
import { TabNavigation } from './(component)/TabNavigation';
import { CourseForm } from './(component)/CourseForm';
import { toast } from 'sonner';
import { addCourse } from '@/api/services/coursesService';

type FormData = {
  base: {
    title?: string;
    category?: string;
    description?: string;
  };
  pricing: {
    price?: number;
  };
  media: {
    thumbnail?: File;
  };
  seo: {
    metaTitle?: string;
    metaDescription?: string;
  };
  finish: {
    termsAccepted?: boolean;
  };
};
type Course = {
  title: string;
  category: string;
  description: string;
  price: number;
  mrp: number;
  level: string;
  status: number;
  subTitle: string | null;
  image: string | null;
  instructor: string;
  chapters: {
    title: string;
    description: string;
    lessons: {
      title: string;
      content: string;
      type: string;
      duration: number;
    }[];
  }[];
};

export default function AddCourse() {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    base: {},
    pricing: {},
    media: {},
    seo: {},
    finish: {},
  });

  const validateBaseSection = () => {
    const { title, category, description } = formData.base;
    if (!title?.trim()) {
      toast.error('Course title is required');
      return false;
    }
    if (!category) {
      toast.error('Please select a category');
      return false;
    }
    if (!description?.trim()) {
      toast.error('Course description is required');
      return false;
    }
    return true;
  };

  const validatePricingSection = () => {
    const { price } = formData.pricing;
    if (!price) {
      toast.error('Price is required');
      return false;
    }
    return true;
  };

  const validateMediaSection = () => {
    const { thumbnail } = formData.media;
    if (!thumbnail) {
      toast.error('Course thumbnail is required');
      return true;
    }
    return true;
  };

  const validateSeoSection = () => {
    const { metaTitle, metaDescription } = formData.seo;
    if (!metaTitle?.trim()) {
      toast.error('Meta title is required');
      return true;
    }
    if (!metaDescription?.trim()) {
      toast.error('Meta description is required');
      return true;
    }
    return true;
  };

  const validateAllSections = () => {
    // Check base section
    if (!validateBaseSection()) {
      setActiveTab(0);
      return false;
    }

    // Check pricing section
    if (!validatePricingSection()) {
      setActiveTab(1);
      return false;
    }

    // Check media section
    if (!validateMediaSection()) {
      setActiveTab(2);
      return false;
    }

    // Check SEO section
    if (!validateSeoSection()) {
      setActiveTab(3);
      return false;
    }

    return true;
  };

  const handleNext = () => {
    let isValid = false;

    switch (activeTab) {
      case 0:
        isValid = validateBaseSection();
        break;
      case 1:
        isValid = validatePricingSection();
        break;
      case 2:
        isValid = validateMediaSection();
        break;
      case 3:
        isValid = validateSeoSection();
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      setActiveTab((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all sections before proceeding
    if (!validateAllSections()) {
      return;
    }

    if (!formData.finish.termsAccepted) {
      toast.error('Please accept the terms to continue');
      return;
    }

    try {
      const courseData = {
        title: formData.base.title,
        category: formData.base.category,
        description: formData.base.description,
        price: formData.pricing.price || 0,
        mrp: formData.pricing.price || 0,
        level: 'beginner',
        status: 1,
        subTitle: null,
        image: null,
        instructor: '65f1c2b3e32a6b2d4c8f9e0a',
        chapters: [
          {
            title: 'Introduction',
            description: 'Getting started with the course',
            lessons: [
              {
                title: 'Welcome',
                content: 'Welcome to the course',
                type: 'content',
                duration: 0,
              },
            ],
          },
        ],
      };

      const response = await addCourse(courseData as Course);

      // Check if the response has an error
      if (!response.success) {
        toast.error(response.message || 'Failed to create course');
        throw new Error(response.message || 'Failed to create course');
      }

      toast.success(response.message || 'Course created successfully!');
      // You might want to redirect here
      // router.push('/dashboard/manage-course');
    } catch (error: any) {
      console.error('Error creating course:', error);
      toast.error(
        error.response.data.message || 'Failed to create course. Please try again.'
      );
    }
  };

  const updateFormData = (section: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const renderFormSection = () => {
    switch (activeTab) {
      case 0:
        return (
          <CourseForm
            section="base"
            onUpdate={updateFormData}
            data={formData.base}
          />
        );
      case 1:
        return (
          <CourseForm
            section="pricing"
            onUpdate={updateFormData}
            data={formData.pricing}
          />
        );
      case 2:
        return (
          <CourseForm
            section="media"
            onUpdate={updateFormData}
            data={formData.media}
          />
        );
      case 3:
        return (
          <CourseForm
            section="seo"
            onUpdate={updateFormData}
            data={formData.seo}
          />
        );
      case 4:
        return (
          <CourseForm
            section="finish"
            onUpdate={updateFormData}
            data={formData.finish}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-4 pt-2  min-h-screen">
      <h1 className="text-base md:text-lg font-semibold mb-2">
        Add New Course
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <StatCard label="Active Courses" value={15} />
        <StatCard label="Pending Courses" value={0} />
      </div>

      <div className="p-4 bg-card rounded-md shadow-md">
        <form onSubmit={handleSubmit}>
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={['Base', 'Pricing', 'Media', 'SEO', 'Finish']}
          />
          {renderFormSection()}

          <div className="mt-4 flex justify-end gap-2">
            {activeTab > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab((prev) => prev - 1)}
                className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/90"
              >
                Previous
              </button>
            )}
            {activeTab < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
