'use client';
import Image from 'next/image';
import React, { useCallback, useRef, useEffect, useState } from 'react';
import { toPng } from 'html-to-image';
import { nextApiClient } from '@/services/apiClient';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function CertificateGenerator(): JSX.Element {
  const certificateImage = '/images/certificate/certificate-template.jpg';
  const [name, setName] = useState<string>('Dummy Name');
  const [canDownload, setCanDownload] = useState<boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setName(parsedUser?.firstName);

      const fetchEnrollementDetails = async () => {
        try {
          const response = await nextApiClient.get(
            `/api/private/certificate?userId=${parsedUser._id}`
          );
          console.log(response, 'response in certificate');

          if (response?.data?.success === true) {
            setCanDownload(true);
          } else {
            setCanDownload(false);
          }
        } catch (error) {
          console.error('Error fetching certificate data', error);
          setCanDownload(false);
        }
      };

      fetchEnrollementDetails();
    }
  }, []);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) return;

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'certificate.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (canDownload === null) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading...
      </div>
    );
  }

if (canDownload === false) {
  return (
    <div className="flex items-center justify-center h-[60vh] px-4">
      <Card className="max-w-md w-full bg-red-50 border-red-200 shadow-md">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Certificate Not Available Yet 🚫
          </h2>
          <p className="text-sm text-gray-700">
            You can download your certificate only after completing
            <span className="font-semibold text-red-600"> 7 days </span> of the course.
            <br />
            Please wait until the 7-day period is completed to access your certificate.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


  return (
    <div className="w-full flex flex-col items-center p-4 max-w-4xl mx-auto">
      <div className="relative">
        <div className="absolute top-[47%] md:top-[48%] left-[35%] text-muted-foreground italic font-mono z-10 text-lg md:text-xl">
          {name}
        </div>
        <div ref={ref} className="flex justify-center relative w-[400px] md:w-[600px] aspect-[4/3]">
          <Image
            src={certificateImage}
            alt="Certificate Template"
            className="max-w-full border absolute"
            fill
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={onButtonClick}
          className="w-full p-2 px-4 bg-primary text-white rounded hover:bg-primary/90"
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
}
