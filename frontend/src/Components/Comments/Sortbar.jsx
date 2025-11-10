import { useEffect, useContext } from "react";
import {
  FaSortAmountDownAlt,
  FaThumbsUp,
  FaThumbsDown,
  FaClock,
} from "react-icons/fa";
import { CommentsContext } from "../../Contexts/CommentsContext";

const SortBar = () => {
  const { fetchComments, sortBy, setSortBy } = useContext(CommentsContext);

  useEffect(() => {
    // Whenever sort changes, fetch comments from API with sort parameter
    fetchComments();
  }, [sortBy]);

  return (
    <div className="flex items-center justify-between mb-5">
      <h4 className="text-gray-700 font-medium flex items-center gap-2">
        <FaSortAmountDownAlt className="text-gray-500" />
        Sort by
      </h4>

      <div className="flex flex-wrap gap-2">
        {/* Newest */}
        <button
          onClick={() => setSortBy("newest")}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition ${
            sortBy === "newest"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <FaClock /> Newest
        </button>

        {/* Likes */}
        <button
          onClick={() => setSortBy("mostLiked")}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition ${
            sortBy === "mostLiked"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <FaThumbsUp /> Likes
        </button>

        {/* Dislikes */}
        <button
          onClick={() => setSortBy("mostDisliked")}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition ${
            sortBy === "mostDisliked"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <FaThumbsDown /> Dislikes
        </button>
      </div>
    </div>
  );
};

export default SortBar;
