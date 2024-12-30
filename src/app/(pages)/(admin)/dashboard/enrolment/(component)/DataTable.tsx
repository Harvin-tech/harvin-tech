import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EnrollmentHistoryItem {
  id: string;
  name: string;
  email: string;
  courseTitle: string;
  startDate: string;
  endDate: string;
}

interface Column<T> {
  key: keyof T;
  label: string;
}

interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
}

const columns: Column<EnrollmentHistoryItem>[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "courseTitle", label: "Course Title" },
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End Date" },
];

const DataTable = <T extends { id: string }>({
  data,
  columns,
  isLoading,
}: DataTableProps<T>) => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 3;

  const pages = Math.ceil(data.length / rowsPerPage);
  const currentData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="w-full space-y-4 bg-white p-4 rounded-lg">
      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of enrollment history.</TableCaption>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead 
                  key={String(col.key)}
                  className="text-left"
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                {columns.map((col) => (
                  <TableCell 
                    key={String(col.key)}
                    className="h-24 text-center"
                  >
                    {col.key === columns[0].key && (
                      <div className="flex items-center justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900"></div>
                        <span className="ml-2">Loading...</span>
                      </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ) : (
              currentData.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((col) => (
                    <TableCell
                      key={String(col.key)}
                    >
                      {item[col.key] as React.ReactNode}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-gray-500">
            Page {page} of {pages}
          </div>
          <div className="space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-md border px-3 py-2 text-sm font-medium disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  page === pageNumber
                    ? "bg-blue-500 text-white"
                    : "border text-gray-700 hover:bg-gray-50"
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
              className="rounded-md border px-3 py-2 text-sm font-medium disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;