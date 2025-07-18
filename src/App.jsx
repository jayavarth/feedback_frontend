import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import AllPostsPage from "./pages/AllPostspage";
import YourPostsPage from "./pages/YourPostsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/all-posts" element={<AllPostsPage />} />
        <Route path="/your-posts" element={<YourPostsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
