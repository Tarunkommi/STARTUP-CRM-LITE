// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      {/* Global Toaster for all API success/error messages */}
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
