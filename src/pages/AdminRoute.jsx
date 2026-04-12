import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/admin-login" />;
  }

  // ❌ Not admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}