import { useState, useContext } from "react";
import { CommentsContext } from "../../Contexts/CommentsContext";

const CommentForm = () => {
  const { addComment } = useContext(CommentsContext);
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await addComment(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5 mb-6"
    >
      <label htmlFor="comment" className="sr-only">
        Write a comment
      </label>

      <textarea
        id="comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        rows="3"
        className="w-full resize-none border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400"
      />

      <div className="flex justify-end mt-3">
        <button
          type="submit"
          disabled={!text.trim()}
          className={`px-5 py-2 rounded-lg font-medium text-white transition ${
            text.trim()
              ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
