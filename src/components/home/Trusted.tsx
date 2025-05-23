import React from 'react';
import Marquee from 'react-fast-marquee';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import Image from 'next/image';

const imagesPath = '/images/trustedby/';
interface TrustedCompany {
  name: string;
  Logo: string;
}

export const TRUSTEDBYCOMPANY: TrustedCompany[] = [
  { name: 'NVIDIA', Logo: `${imagesPath}nvidia.png}` },
  { name: 'Microsoft', Logo: `${imagesPath}microsoft.avif` },
  { name: 'Amazon', Logo: `${imagesPath}amazon.webp` },
  { name: 'Reliance', Logo: `${imagesPath}reliance.png` },
  { name: 'TCS', Logo: `${imagesPath}tcs.jpeg` },
  { name: 'Bharti Airtel', Logo: `${imagesPath}airtel.webp` },
  { name: 'Infosys', Logo: `${imagesPath}infosys.png` },
  { name: 'HCL Technologies', Logo: `${imagesPath}hcl.jpg` },
  { name: 'Larsen & Toubro', Logo: `${imagesPath}larsen.png` },
  { name: 'Wipro', Logo: `${imagesPath}wipro.jpg` },
  { name: 'Mahindra & Mahindra', Logo: `${imagesPath}mahindra.png` },
  { name: 'Sun Pharmaceutical', Logo: `${imagesPath}sunpharma.png` },
  { name: 'NTPC', Logo: `${imagesPath}ntpc.png` },
  { name: 'Tech Mahindra', Logo: `${imagesPath}techmahindra.png` },
  { name: 'Tata Motors', Logo: `${imagesPath}tatamotors.png` },
  { name: 'Oracle', Logo: `${imagesPath}oracle.jpg` },
  { name: 'IBM', Logo: `${imagesPath}ibm.webp` },
  { name: 'Salesforce', Logo: `${imagesPath}saleforce.png` },
  { name: 'VMware', Logo: `${imagesPath}vmware.png` },
  { name: 'Autodesk', Logo: `${imagesPath}autodesk.png` },
];

const Trusted = () => {
  // const TRUSTED = [
  //   '/images/home/coursera.svg',
  //   '/images/home/udemy.svg',
  //   '/images/home/edx.svg',
  //   '/images/home/byjus.svg',
  // ];

  return (
    <Card className="bg-foreground/5 border-none shadow-sm rounded-none py-16 ">
      <CardContent className="p-0  ">
        {/* Header Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Trusted by 500+ Mentors
          </h2>
          <p className="text-gray-600 text-center max-w-2xl">
            Join our community of industry-leading experts and educators
          </p>
        </div>

        {/* Marquee Section */}
        <div className="relative pt-8">
          {/* Left Gradient */}
          {/* <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-primary/[16%] via-primary/[%] to-transparent z-10" /> */}

          {/* Right Gradient */}
          {/* <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10" /> */}

          {/* Marquee */}
          <Marquee
            speed={40}
            gradient={false}
            pauseOnHover={true}
            className="py-4"
            autoFill
          >
            {TRUSTEDBYCOMPANY.map((t, index) => (
              <div key={`${t.name}-${index}`} className="">
                <div className="relative w-[280px] aspect-[2] mx-1 border border-border rounded-lg shadow-md bg-white ">
                  <Image
                    fill
                    className="absolute object-contain dark:invert border border-primary/40 rounded-lg p-1"
                    src={t.Logo}
                    alt={`Trusted logo ${index + 1}`}
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </CardContent>
    </Card>
  );
};

export default Trusted;
