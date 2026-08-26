// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      {/* Global Toaster for all API success/error messages */}
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          duration: 4000,
          style: {
            borderRadius: '8px',
            background: '#ECEDE8',
            color: '#1C201B',
            border: '1px solid #D6D8D2',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#4C8C5A',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#C95A5A',
              secondary: '#FFFFFF',
            },
          }
        }} 
      />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
