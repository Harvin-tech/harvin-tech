import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import { getEnrollDetail } from '@/services';
import { formatDate } from '@/utils/helpers';
import { setEnrollData, setLoading, setError } from '@/redux/enrollSlice';
import { useDispatch, useSelector } from 'react-redux';

interface EnrollmentHistoryItem {
  id: string;
  name: string;
  email: string;
  courseTitle: string;
  startDate: string;
  endDate: string;
}

// Define the column structure with correct types
interface Column<T> {
  key: keyof T; // Ensure 'key' is one of the valid keys of the generic type
  label: string;
}

const EnrolmentHistory: React.FC = () => {
  return (
    <div className="">
      <h2 className="text-sm md:text-base font-semibold mb-2">
        Enrollment History
      </h2>
      <DataTable />
    </div>
  );
};

export default EnrolmentHistory;
