// src/routes/index.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import MobileHeader from '../components/common/MobileHeader';
import { useAuth } from '../context/AuthContext';

// Lazy loaded page components
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Leads = lazy(() => import('../pages/Leads'));
const Analytics = lazy(() => import('../pages/Analytics'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

/**
 * ProtectedRoute Wrapper
 * Checks for a valid auth token and manages the core app layout.
 */
const ProtectedRoute = () => {
  const { token, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center text-xl text-[#59635A] dark:text-[#B9C0B8]">Loading session...</div>;
  }
  
  // Enforce authentication: redirect to login if no token is found
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // If authorized, render the core Dashboard application layout wrapper
  return (
    <div className="flex h-screen bg-[#F7F8F5] dark:bg-[#171A17] font-sans text-[#1C201B] dark:text-[#F4F6F2] transition-colors duration-200 overflow-hidden">
      <MobileHeader />
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative pb-16 md:pb-0 pt-16 md:pt-0">
        <Suspense fallback={<div className="flex items-center justify-center h-full text-[#59635A] dark:text-[#B9C0B8] text-xl font-medium tracking-wide">Loading view...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-[#59635A] dark:text-[#B9C0B8] text-xl font-medium tracking-wide">Initializing App...</div>}>
      <Routes>
        {/* Public Routes (No layout wrapper) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Authenticated Routes (Wrapped in Dashboard Layout) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
        
        {/* Fallback 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
