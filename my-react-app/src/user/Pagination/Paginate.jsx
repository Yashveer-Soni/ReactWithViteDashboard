"use client";

import { Pagination } from "flowbite-react";
import { useState } from "react";

export default function Paginate({ initialPage = 1, totalPages = 1, onPageChangeCallback }) {
  const validTotalPages = Number.isInteger(totalPages) && totalPages > 0 ? totalPages : 1;

  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (onPageChangeCallback) {
      onPageChangeCallback(page);
    }
  };

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={validTotalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
