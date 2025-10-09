import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClipLoader, PropagateLoader } from "react-spinners"; // ✅ import spinner

// Generic reusable protected route
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, isAuthenticated, token } = useSelector((state) => state.user);

  // Wait until user is loaded
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PropagateLoader color="#facc15" size={60} /> {/* yellow spinner */}
      </div>
    ); // or a loading spinner if you want
  }
  // Validate authentication and role
  if (!isAuthenticated || !token || user.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// ✅ Export specialized wrappers for convenience
export const UserProtectedRoute = ({ children }) => (
  <ProtectedRoute allowedRole="user">{children}</ProtectedRoute>
);

export const AdminProtectedRoute = ({ children }) => (
  <ProtectedRoute allowedRole="admin">{children}</ProtectedRoute>
);

export default ProtectedRoute;
