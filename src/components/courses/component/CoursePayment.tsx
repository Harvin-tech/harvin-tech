import React from 'react';

const CoursePayment = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center  ">
      <div className=" w-full bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            5000 <span className="line-through text-gray-500">14999</span>
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Get this course plus top-rated picks in tech skills and other
            popular topics in IOT
          </p>
          <button className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600">
            Get started
          </button>
          <p className="mt-2 text-xs text-gray-500">
            Discount on 14999 get in 5000
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Your 10 day Standard free trial includes
          </h2>
          <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
            <li>Expert-led courses</li>
            <li>
              Keep up with the pace of change with thousands of expert-led,
              in-depth courses.
            </li>
          </ul>

          <h3 className="mt-4 text-md font-semibold text-gray-700">
            For teams
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Give up to 50 users access to our full library including this
            coursefree for 30 days
          </p>
        </div>

        <div className="mt-6 border-t pt-4">
          <h4 className="text-md font-semibold text-gray-700">Course info</h4>
          <div className="mt-2 text-sm">
            <p>
              <span className="font-medium">Rating:</span> ⭐⭐⭐⭐⭐ (1290)
            </p>
            <p>
              <span className="font-medium">Level:</span> Beginner
            </p>
            <p>
              <span className="font-medium">Updated:</span> Sep 11, 2020
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePayment;
