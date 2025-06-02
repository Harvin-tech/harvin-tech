'use client';
import Image from 'next/image';
import React, { useCallback, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';

export default function CertificateGenerator(): JSX.Element {
  const certificateImage = '/images/certificate/certificate-template.jpg'; // Path to your image in public
  const [name, setName] = React.useState<string>('Dummy Name');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log(parsedUser, 'parsedUser');

      setName(parsedUser?.firstName);
    }
  }, []);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

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
  }, [ref]);

  return (
    <div className="w-full flex flex-col items-center  p-4 max-w-4xl mx-auto">
      <div className="relative">
        <div className="absolute top-[47%] md:top-[48%] left-[35%] text-muted-foreground italic font-mono z-10 text-lg md:text-xl">
          {name}
        </div>
        <div className="flex justify-center relative w-[400px] md:w-[600px] aspect-[4/3]">
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
