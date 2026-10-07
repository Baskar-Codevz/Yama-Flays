import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

const ProtectedRoute = ({ adminOnly = false, children }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // =====================================================
  // CHECKING AUTHENTICATION
  // =====================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FCF8F4]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#E5D7DC] border-t-[#B18A50]" />

          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#806F78]">
            Checking account...
          </p>
        </div>
      </main>
    );
  }

  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // =====================================================
  // ADMIN ONLY CHECK
  // =====================================================

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // =====================================================
  // ALLOW ACCESS
  // =====================================================

  // If children are provided
  if (children) {
    return children;
  }

  // If using nested routes
  return <Outlet />;
};

export default ProtectedRoute;