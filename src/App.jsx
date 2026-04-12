import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // 🔥 ADD THIS

/* ===== USER PAGES ===== */
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import OtpReset from "./pages/OtpReset";
import MyTrips from "./pages/MyTrips";
import Profile from "./pages/Profile";
import PackageDetails from "./pages/PackageDetails";

/* ===== ADMIN PAGES ===== */
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

/* ===== COMPONENTS ===== */
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>

      {/* 🔥 GLOBAL TOAST (VERY IMPORTANT) */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "10px",
          },
        }}
      />

      {/* 🔥 NAVBAR */}
      <Navbar />

      <Routes>

        {/* ===== USER ROUTES ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<OtpReset />} />

        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/profile" element={<Profile />} />

        {/* ===== ADMIN ROUTES ===== */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* ❌ BLOCK DIRECT /admin */}
        <Route path="/admin" element={<Navigate to="/admin-login" />} />

        {/* PACKAGE PAGE */}
        <Route path="/package/:name" element={<PackageDetails />} />

        {/* 🔥 FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </Router>
  );
}

export default App;