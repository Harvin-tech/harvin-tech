import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { getEnrollDetail } from "@/api";
import { formatDate } from "@/utils/helpers";
import { setEnrollData,setLoading,setError } from "@/app/store/enrollSlice";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state: any) => state.enroll);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getEnrollDetail(); // Replace with your actual API endpoint
        // console.log(result);

        // Transform API data to match the shape of the table
        const transformedData: EnrollmentHistoryItem[] = result.data.data.map((item: any) => ({
          id: item.user.id,
          name: item.user.name,
          email: item.user.email,
          courseTitle: item.course.title,
          startDate: formatDate(item.enrolledAt),
          endDate: formatDate(item.expiredAt ?? new Date().toISOString()), // Use expiredAt if available, fallback to current date
        }));

        dispatch(setEnrollData(transformedData)); // Dispatch to store data
      } catch (error) {
        dispatch(setError('Error fetching enrollment history'));
        console.error('Error fetching enrollment history:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, []);

  // Define columns with keys matching the 'EnrollmentHistoryItem' keys
  const columns: Column<EnrollmentHistoryItem>[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "courseTitle", label: "Course Title" },
    { key: "startDate", label: "Start Date" },
    { key: "endDate", label: "End Date" },
  ];

  return (
    <div className="">
      <h2 className="text-sm md:text-base font-semibold mb-2">Enrollment History</h2>
      {error && <div className="text-red-500">{error}</div>}
      <DataTable data={data} columns={columns} isLoading={isLoading} />
    </div>
  );
};

export default EnrolmentHistory;


