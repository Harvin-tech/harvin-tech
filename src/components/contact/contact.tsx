'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Link from 'next/link';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    // console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {`Have questions about our courses? We're here to help! Reach out to us
          through any of the channels below.`}
        </p>
      </div>

      {/* Contact Form Section */}
      <div className="grid md:grid-cols-2 gap-12 items-start ">
        <div className="border shadow-lg p-4">
          <h2 className="text-3xl font-semibold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block  font-medium mb-2">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block  font-medium mb-2">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block  font-medium mb-2">Phone</label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Subject</label>
              <Input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Message</label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="w-full text-white">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </div>

        {/* Map/Location Section */}
        <div>
          {/* <h2 className="text-3xl font-semibold mb-6">Visit Our Office</h2> */}
          <div className="flex flex-col gap-8 ">
            {/* Contact Cards */}
            <Card className="p-4 text-center hover:shadow-lg transition-shadow bg-transparent">
              <Link href="mailto:info@harvinntechnologies.in">
                <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600">info@harvinntechnologies.in</p>
              </Link>
            </Card>

            <Card className="p-4 text-center hover:shadow-lg transition-shadow bg-transparent">
              <Link href="tel:+919849541178">
                <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600">+91 9849541178</p>
              </Link>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      {/* <div className="mt-16">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: 'How can I enroll in a course?',
              a: 'You can enroll through our website by selecting your desired course and following the registration process, or contact our admissions team for assistance.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept credit/debit cards, UPI, net banking, and various EMI options through our payment partners.',
            },
            {
              q: 'Are there any prerequisites for courses?',
              a: 'Prerequisites vary by course. Check individual course pages for specific requirements or contact our counselors.',
            },
            {
              q: 'Do you offer placement assistance?',
              a: 'Yes, we provide comprehensive placement assistance including resume building, interview preparation, and job referrals.',
            },
          ].map((faq, index) => (
            <Card key={index} className="p-6">
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </Card>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ContactPage;
