'use client';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import useQuizSurvey from './hooks/useQuizSurvey';

const SurveyForm = () => {
  const {
    getCurrentQuestion,
    currentStep,
    setCurrentStep,
    formData,
    handleSelect,
    handleUserInfo,
    canProceed,
    handleSubmit,
  } = useQuizSurvey();
  const question = getCurrentQuestion();
  if (!question) return null;

  return (
    <div className="min-h-screen  flex items-center bg-gray-50 md:py-12 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg sm:p-8 px-4 py-6">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
          />
        </div>

        {/* Question Header */}
        <div className="mb-4">
          <h1 className="sm:text-xl text-lg font-bold mb-2">
            {question.title}
          </h1>
          <p className="text-gray-600">{question.subtitle}</p>
        </div>

        {/* Question Content */}
        {currentStep < 3 ? (
          <div className="space-y-4">
            {question.options.map((option: string) => {
              const isSelected =
                currentStep === 0
                  ? formData.selectedProgram === option
                  : currentStep === 1
                    ? formData.goal === option
                    : formData.businessTrack === option;

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`w-full p-2 rounded-lg border text-left transition-all
                    ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {isSelected && <CheckCircle2 className="text-blue-500" />}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.userInfo.name}
              onChange={(e) => handleUserInfo('name', e.target.value)}
              className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.userInfo.email}
              onChange={(e) => handleUserInfo('email', e.target.value)}
              className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 outline-none"
            />
            <input
              type="tel"
              placeholder="Your Phone Number"
              value={formData.userInfo.phone}
              onChange={(e) => handleUserInfo('phone', e.target.value)}
              className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 outline-none"
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="flex items-center px-6 py-2 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-all"
            >
              <ArrowLeft className="mr-2" />
              Back
            </button>
          )}

          <button
            onClick={() => {
              if (currentStep === 3) {
                handleSubmit();
              } else {
                setCurrentStep((prev) => prev + 1);
              }
            }}
            disabled={!canProceed()}
            className={`flex items-center px-6 py-2 rounded-lg ml-auto transition-all
              ${
                canProceed()
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
          >
            {currentStep === 3 ? 'Submit' : 'Next'}
            {currentStep !== 3 && <ArrowRight className="ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
