import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ currentPage, handlePageChange, noOfPages }) => {
  return (
    <div>
      <div className="flex justify-center items-center p-10 gap-6">
        <button
          className="flex items-center gap-3 border p-2 rounded-lg drop-shadow-lg hover:bg-gray-200 active:bg-gray-500 ease-in duration-200"
          disabled={currentPage === 1}
          onClick={() => handlePageChange("Prev")}
        >
          <FaArrowLeft className="size-4" />
          <p className="text-lg font-semibold">Prev</p>
        </button>
        <span className="text-sm border p-2 pr-4 pl-4 rounded-lg drop-shadow-lg hover:bg-gray-200 active:bg-gray-500 ease-in duration-200">
          {currentPage}
        </span>
        <button
          className="flex items-center gap-3 border p-2 rounded-lg drop-shadow-lg hover:bg-gray-200 active:bg-gray-500 ease-in duration-200"
          disabled={currentPage === noOfPages}
          onClick={() => handlePageChange("Next")}
        >
          <p className="text-lg font-semibold">Next</p>
          <FaArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
