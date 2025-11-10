import { useContext, useState } from "react";
import { CommentsContext } from "../../Contexts/CommentsContext";
import { AuthContext } from "../../Contexts/AuthContext";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaTrashAlt,
  FaEdit,
  FaUserCircle,
} from "react-icons/fa";
import ConfirmModal from "../ConfirmModal";
import EditCommentModal from "./EditCommentModal";

const CommentItem = ({ comment }) => {
  const { like, dislike, deleteComment, updateComment } =
    useContext(CommentsContext);
  const { user } = useContext(AuthContext);
  const isOwner = user && user.id === comment.author._id;
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  //Delete handler
  const handleDelete = async () => {
    await deleteComment(comment._id);
    setShowConfirm(false);
  };

  const handleSaveEdit = async (id, content) => {
    await updateComment(id, content);
    setShowEdit(false);
  };

  return (
    <>
      <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-5 mb-4 transition hover:shadow-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          {/* Avatar */}
          <FaUserCircle className="text-3xl text-gray-400" />

          {/* Author info */}
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {comment.author.name}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Comment content */}
        <p className="text-gray-700 leading-relaxed mb-4">{comment.content}</p>

        {/* Actions */}
        <div className="flex items-center gap-4 text-gray-600">
          {/* Like */}
          <button
            onClick={() => like(comment._id)}
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <FaThumbsUp className="text-sm" />
            <span className="text-sm">{comment.likesCount || 0}</span>
          </button>

          {/* Dislike */}
          <button
            onClick={() => dislike(comment._id)}
            className="flex items-center gap-1 hover:text-red-600 transition"
          >
            <FaThumbsDown className="text-sm" />
            <span className="text-sm">{comment.dislikesCount || 0}</span>
          </button>

          {/* Edit & Delete for owner */}
          {isOwner && (
            <div className="ml-auto flex gap-3">
              <button
                onClick={() => setShowEdit(true)}
                className="text-gray-500 hover:text-yellow-500 transition"
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="text-gray-500 hover:text-red-500 transition"
                title="Delete"
              >
                <FaTrashAlt />
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
      {/* Edit Modal */}
      <EditCommentModal
        isOpen={showEdit}
        comment={comment}
        onSave={handleSaveEdit}
        onCancel={() => setShowEdit(false)}
      />
    </>
  );
};

export default CommentItem;
