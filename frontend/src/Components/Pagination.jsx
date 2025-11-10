import { useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CommentsContext } from "../Contexts/CommentsContext";

const Pagination = () => {
  const { meta, fetchComments, sortBy } = useContext(CommentsContext);
  const { page, totalPages, limit } = meta;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchComments(newPage, limit, sortBy);
    }
  };

  if (totalPages < 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      {/* Prev */}
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition ${
          page === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <FaChevronLeft /> Prev
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1 flex-wrap">
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition ${
                page === pageNum
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next */}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition ${
          page === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Next <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
