import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EnrollmentHistoryItem, fetchEnrollments, setCurrentPage, setSearchQuery } from "@/app/store/enrollementSlice";


const DataTable: React.FC = () => {
  const dispatch = useDispatch<any>();
  const {
    filteredItems,
    loading,
    error,
    currentPage,
    itemsPerPage,
    searchQuery
  } = useSelector((state:any) => state.enrollment);

  useEffect(() => {
    dispatch(fetchEnrollments());
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "courseTitle", label: "Course Title" },
    { key: "startDate", label: "Start Date" },
    { key: "endDate", label: "End Date" },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className="w-full space-y-2 bg-white p-6 rounded-lg">

      <div className="mb-2 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="rounded-md border h-[300px] overflow-y-scroll">
        <Table>
          <TableCaption>A list of enrollment history.</TableCaption>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key} className="text-left px-4 py-2 font-semibold text-gray-600">
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-6">
                  <div className="flex items-center justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900"></div>
                    <span className="ml-2 text-gray-600">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : currentItems.length > 0 ? (
              currentItems.map((item:any) => (
                <TableRow key={`${item.id}-${item.courseTitle}`}>
                  {columns.map((col) => (
                    <TableCell key={col.key} className="px-4 py-2 text-sm text-gray-700">
                      {item[col.key as keyof EnrollmentHistoryItem]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-6 text-gray-500">
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