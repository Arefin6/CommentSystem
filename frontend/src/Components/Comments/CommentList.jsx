import { useEffect, useContext } from "react";
import { CommentsContext } from "../../Contexts/CommentsContext";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import SortBar from "./Sortbar";

const CommentList = () => {
  const { comments, fetchComments } = useContext(CommentsContext);

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">💬 Discussion</h3>
        <span className="text-sm text-gray-500">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </span>
      </div>

      {/* Comment form */}
      <div className="mb-8">
        <h4 className="text-lg font-medium text-gray-700 mb-3">
          Add a Comment
        </h4>
        <CommentForm />
      </div>

      {/* Divider */}
      <hr className="border-gray-200 mb-6" />

      {/* Sort bar */}
      <SortBar />

      {/* Divider */}
      <hr className="border-gray-200 mb-6" />

      {/* Comment list */}
      <div className="space-y-5">
        {comments.length > 0 ? (
          comments.map((c) => <CommentItem key={c._id} comment={c} />)
        ) : (
          <p className="text-center text-gray-500 italic">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentList;
