import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

const AdminRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Wait until authentication is checked
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FCF8F4]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#E5D7DC] border-t-[#B18A50]" />

          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#806F78]">
            Checking admin access...
          </p>
        </div>
      </main>
    );
  }

  // Not logged in
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Logged in but not admin
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin
  return <Outlet />;
};

export default AdminRoute;