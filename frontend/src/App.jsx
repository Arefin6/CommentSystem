import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import { CommentsProvider } from "./Contexts/CommentsContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./Pages/Home";

const App = () => {
  return (
    <AuthProvider>
      <CommentsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </CommentsProvider>
    </AuthProvider>
  );
};

export default App;
