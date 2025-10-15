import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, isAuthenticated, token, loading } = useSelector(
    (state) => state.user
  );

  // ✅ 1. While still loading from Redux (initial state)
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PropagateLoader color="#facc15" size={60} />
      </div>
    );
  }

  // ✅ 2. If not authenticated OR missing token
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ 3. If user doesn’t have the right role
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  // ✅ 4. If all checks pass → allow
  return children;
};

// ✅ Export role-based shortcuts
export const UserProtectedRoute = ({ children }) => (
  <ProtectedRoute allowedRole="user">{children}</ProtectedRoute>
);

export const AdminProtectedRoute = ({ children }) => (
  <ProtectedRoute allowedRole="admin">{children}</ProtectedRoute>
);

export default ProtectedRoute;
