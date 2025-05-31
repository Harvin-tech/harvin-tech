import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getEnrollDetail } from '@/services';
import { debounce } from 'lodash';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import useProfile from '@/hooks/useProfile';
import { nextApiClient } from '@/services/apiClient';

interface EnrollmentHistoryItem {
  id: string;
  name: string;
  email: string;
  courseTitle: string;
  startDate: string;
  endDate: string;
  status: number;
}

const DataTable: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [enrollments, setEnrollments] = useState<EnrollmentHistoryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 50;

  const [status, setStatus] = useState<string>('');
  const [userId, setUserId] = useState<any>();

  useEffect(() => {
    const toggleEnrollement = async () => {
      console.log(status, 'status');
      const response = await nextApiClient.patch(
        `/api/private/courses/enroll/${userId}`,
        {
          status: status === 'active' ? 1 : 0,
        }
      );

      console.log(response, 'response');
    };

    toggleEnrollement();
  }, [status]);

  const fetchEnrollments = async (page: number, search: string = '') => {
    try {
      setLoading(true);
      const response = await getEnrollDetail({
        page,
        limit: itemsPerPage,
        search,
      });

      if (response.data?.data) {
        console.log(response.data.data[0]._id);
        setEnrollments(
          response.data.data.map((item: any) => ({
            id: item?._id,
            name: `${item.user.firstName || '-'} ${item.user.middleName || ''} ${item.user.lastName || ''}`,
            email: item.user.email,
            courseTitle: item.course.title,
            startDate: new Date(item.enrolledAt).toLocaleDateString(),
            endDate: item.endDate
              ? new Date(item.endDate).toLocaleDateString()
              : '-',
            status: item.status,
          }))
        );
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = React.useCallback(
    debounce((query: string) => {
      setCurrentPage(1); // Reset to first page on new search
      fetchEnrollments(1, query);
    }, 300),
    []
  );

  useEffect(() => {
    fetchEnrollments(currentPage, searchQuery);
  }, [currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // console.log(enrollments,'enrollements')

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'courseTitle', label: 'Course Title' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'action', label: 'Action' },
    // { key: 'endDate', label: 'End Date' },
  ];

  return (
    <div className="w-full space-y-2 bg-white p-6 rounded-lg">
      <div className="mb-2 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search by name, email or course"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="rounded-md border h-[300px] overflow-y-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className="text-left px-4 py-2 font-semibold text-gray-600"
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-6"
                >
                  <div className="flex items-center justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900"></div>
                    <span className="ml-2 text-gray-600">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : enrollments.length > 0 ? (
              enrollments.map((item) => (
                <TableRow key={`${item.id}-${item.courseTitle}`}>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className="px-4 py-2 text-sm text-gray-700"
                    >
                      {item[col.key as keyof EnrollmentHistoryItem]}
                      {col.key === 'action' && (
                        <Select
                          defaultValue={`${item.status === 1 ? 'active' : 'inactive'}`}
                          onValueChange={(status) => {
                            setStatus(status);
                            setUserId(item.id);
                          }}
                        >
                          <SelectTrigger className="w-[90px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-500"
                >
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-primary/90 text-white rounded-md hover:bg-primary disabled:bg-gray-300 text-sm"
          >
            First
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-primary/90 text-white rounded-md hover:bg-primary disabled:bg-gray-300 text-sm"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-primary/90 text-white rounded-md hover:bg-primary disabled:bg-gray-300 text-sm"
          >
            Next
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-primary/90 text-white rounded-md hover:bg-primary disabled:bg-gray-300 text-sm"
          >
            Last
          </button>
        </div>
        <span className="text-gray-600 text-sm">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
};

export default DataTable;
