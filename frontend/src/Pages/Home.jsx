import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import CommentList from "../components/Comments/CommentList";

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {user ? (
        <>
          {/* Top Navbar */}
          <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Welcome, <span className="text-blue-600">{user.name}</span> 👋
              </h1>
              <button
                onClick={logout}
                className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </header>

          {/* Comment Section */}
          <main className="pt-6 pb-10">
            <CommentList />
          </main>
        </>
      ) : (
        // Guest view
        <div className="flex flex-col items-center justify-center text-center min-h-screen px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
            Welcome to <span className="text-blue-600">CommentSpace</span> 💬
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl mb-8 max-w-lg">
            Join the conversation — share your thoughts, engage, and connect
            with others in real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/login"
              className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition shadow-sm"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
