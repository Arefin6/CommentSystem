/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
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

          {/* Modal content */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {title || "Confirm Action"}
              </h3>
              <p className="text-gray-600 mb-6 text-sm">{message}</p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
