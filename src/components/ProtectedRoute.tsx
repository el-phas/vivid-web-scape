
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  // If auth is still loading, show nothing or a loading spinner
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // If no user is authenticated, redirect to login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If user is authenticated, render the child routes
  return <>{children}</>;
};

export default ProtectedRoute;
