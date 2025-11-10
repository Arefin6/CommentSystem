/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EditCommentModal = ({ isOpen, comment, onSave, onCancel }) => {
  const [content, setContent] = useState(comment?.content || "");

  // When a new comment is passed, reset text
  useEffect(() => {
    if (comment) setContent(comment.content);
  }, [comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSave(comment._id, content);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal box */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Edit Comment
              </h3>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="4"
                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
                placeholder="Update your comment..."
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditCommentModal;
