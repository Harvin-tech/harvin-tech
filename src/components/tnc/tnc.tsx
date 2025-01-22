'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsSection = ({
  title,
  content,
}: {
  title: string;
  content: string | string[];
}) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-700">{content}</p>
  </div>
);

const TermsAndConditions = ({ terms = defaultTerms }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-transparent">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Terms and Conditions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {terms.map((section, index) => (
            <TermsSection
              key={index}
              title={section.title}
              content={section.content}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Default terms structure that can be overridden
const defaultTerms = [
  {
    title: 'Acceptance of Terms',
    content:
      'By accessing and using our harvinn technologies platform, you agree to be bound by these Terms and Conditions.',
  },
  {
    title: 'Use of Platform',
    content:
      'Our platform is intended for educational purposes only. You may use the platform to access educational content, participate in online classes and assessments, and communicate with other users. You agree to use the platform in a responsible manner and to comply with all applicable laws.',
  },
  {
    title: 'Account Registration',
    content:
      'To access our platform, you must create an account. You agree to provide accurate and complete information during the registration process and to keep your account information up to date. You are solely responsible for maintaining the security of your account and password.',
  },
  {
    title: 'Payment',
    content:
      'Our platform may offer paid services, such as access to premium content or courses. You agree to pay all fees associated with these services. All payments are final and non-refundable.',
  },
  {
    title: 'Intellectual Property',
    content:
      'Our platform and all its content, including text, graphics, logos, and images, are the property of our company or its licensors. You may not copy, distribute, or modify any part of our platform or its content without our prior written consent.',
  },
  {
    title: 'User Content',
    content:
      'You may submit content, such as comments, questions, or feedback, through our platform. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, copy, and distribute your content.',
  },
  {
    title: 'Prohibited Activities',
    content:
      'You agree not to engage in any activity that may harm our platform or its users, such as hacking, spamming, or distributing malware. You also agree not to use our platform for any illegal or unauthorized purpose.',
  },
  {
    title: 'Termination',
    content:
      'We may terminate your account or access to our platform at any time, with or without cause. You may also terminate your account at any time by contacting us.',
  },
  {
    title: 'Disclaimer of Warranties',
    content:
      'Our platform is provided "as is" and without warranties of any kind, whether express or implied. We do not guarantee that our platform will be error-free, uninterrupted, or secure.',
  },
  {
    title: 'Limitation of Liability',
    content:
      'Our company will not be liable for any damages, whether direct, indirect, incidental, or consequential, arising from your use of our platform.',
  },
  {
    title: 'Governing Law',
    content:
      'These Terms and Conditions will be governed by and construed in accordance with the laws of the jurisdiction where our company is located.',
  },
  {
    title: 'Changes to Terms and Conditions',
    content:
      'We may update these Terms and Conditions at any time, without prior notice. Your continued use of our platform after any changes will indicate your acceptance of the updated Terms and Conditions.',
  },
];

export default TermsAndConditions;
