import React from 'react';

const Footer = () => {
  return (
    <div className="border border-t-border border-x-0 border-b-0">
      <div className="max-w-screen-xl mx-auto p-4 sm:p-8 ">
        {/* Footer Container */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left Section */}
          <div className="w-full md:w-1/3 flex justify-center text-center md:text-left border border-r-border border-y-0 border-l-0 ">
            <p className="text-2xl md:text-3xl font-semibold max-w-[300px] text-gray-800 tracking-tight">
              Study any topic, anytime. explore thousands of courses for the
              lowest price ever!
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
            {FOOTERDATA.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 text-center md:text-left w-full "
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.desc.map((item1, index1) => (
                    <li
                      key={index1}
                      className="list-none text-sm  text-gray-600 hover:text-blue-600"
                    >
                      {item1}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section  */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 px-4 md:px-16 gap-6 ">
          {/* Logo */}
          <div className="relative border rotate-45 border-blue-500 w-fit p-4">
            <div className="absolute z-10 top-[39%] left-[-30%] -rotate-45 text-xl w-fit font-extrabold">
              Harvin
            </div>
          </div>

          {/* Links and Copyright */}
          <div className="space-y-2 text-xs">
            <div className="flex flex-wrap justify-center text-center gap-4">
              <p className="border-2 border-r border-y-0 border-l-0 pr-4">
                Careers
              </p>
              <p>Privacy Policy</p>
              <p>Term & Condition</p>
            </div>
            <div className="text-center">
              @2024 Online Class Technologies Inc.
            </div>
          </div>

          {/* Language Selector */}
          <div className="text-center md:text-right">English</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

const FOOTERDATA = [
  {
    title: 'Top Category',
    desc: [
      'Infrastructure',
      'IoT',
      'Artificial Intelligence',
      'Machine Learning',
      'Cyber Security',
      'Data Science',
    ],
  },
  {
    title: 'Top Services',
    desc: [
      'Consulting',
      'Training',
      'Custom Development',
      'Cloud Services',
      'Support',
      'Analytics',
    ],
  },
];
