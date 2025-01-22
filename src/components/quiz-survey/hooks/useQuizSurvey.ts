import { API_ENDPOINTS } from '@/config/backend-routes';
import { baseQuestions, programQuestions } from '@/constants/survey';
import apiClient from '@/services/apiClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const useQuizSurvey = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const [formData, setFormData] = useState({
    selectedProgram: '',
    goal: '',
    businessTrack: '',
    userInfo: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const getCurrentQuestion = () => {
    if (currentStep === 0) return baseQuestions.programs;

    const program = formData.selectedProgram;
    //@ts-ignore
    if (!programQuestions[program]) return null;

    //@ts-ignore
    if (currentStep === 1) return programQuestions[program].goals;
    //@ts-ignore
    if (currentStep === 2) return programQuestions[program].track;

    return {
      title: 'Almost there! 🎊',
      subtitle: 'Please share your contact details to get started',
      type: 'userInfo',
    };
  };

  const handleSelect = (option: string) => {
    if (currentStep === 0) {
      setFormData((prev) => ({
        ...prev,
        selectedProgram: option,
      }));
    } else if (currentStep === 1) {
      setFormData((prev) => ({
        ...prev,
        goal: option,
      }));
    } else if (currentStep === 2) {
      setFormData((prev) => ({
        ...prev,
        businessTrack: option,
      }));
    }
  };

  const handleUserInfo = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      userInfo: {
        ...prev.userInfo,
        [field]: value,
      },
    }));
  };

  const canProceed = () => {
    if (currentStep === 0) return !!formData.selectedProgram;
    if (currentStep === 1) return !!formData.goal;
    if (currentStep === 2) return !!formData.businessTrack;
    if (currentStep === 3) {
      return !!(
        formData.userInfo.name &&
        formData.userInfo.email &&
        formData.userInfo.phone
      );
    }
    return false;
  };

  const handleSubmit = async () => {
    try {
      const url = API_ENDPOINTS.QUIZ_SURVEY.GET_QUIZ_SURVEY;

      const body = {
        name: formData.userInfo.name,
        email: formData.userInfo.email,
        mobile: formData.userInfo.phone,
        selectedProgram: formData.selectedProgram,
        goal: formData.goal,
        track: formData.businessTrack,
      };

      const { data: response } = await apiClient.post(url, body);

      if (response) {
        toast.success(response.message || 'Form submitted successfully', {
          className: 'bg-blue-50 border-blue-200',
        });
        router.push('/');
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error(error.response.data.message || 'Error Loading Courses', {
        description: 'Failed to load courses. Please try again.',
        className: 'destructive',
      });
    }
  };

  return {
    getCurrentQuestion,
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    handleSelect,
    handleUserInfo,
    canProceed,
    handleSubmit,
  };
};

export default useQuizSurvey;
