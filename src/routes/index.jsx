// src/routes/index.jsx
import React, { Suspense, lazy } from 'react'; // Import React, Suspense for handling loading states, and lazy for dynamic imports
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route from react-router-dom v6
import Sidebar from '../components/common/Sidebar'; // Import the Sidebar component to include in the layout

// Use React.lazy to dynamically import page components. This splits the code into smaller chunks, loading only when needed.
const Dashboard = lazy(() => import('../pages/Dashboard')); // Lazy load the Dashboard component
const Leads = lazy(() => import('../pages/Leads')); // Lazy load the Leads component
const Analytics = lazy(() => import('../pages/Analytics')); // Lazy load the Analytics component
const NotFound = lazy(() => import('../pages/NotFound')); // Lazy load the NotFound component

const AppRoutes = () => { // Define the AppRoutes functional component which will hold all route definitions
  return ( // Start returning the layout and routes
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900"> {/* Main wrapper div: flex layout, full screen height, light gray background, sans-serif font */}
      <Sidebar /> {/* Render the Sidebar component on the left side */}
      
      <main className="flex-1 overflow-y-auto relative"> {/* Main content area: takes up remaining flex space, allows vertical scrolling if content overflows */}
        {/* Suspense wraps the lazy-loaded components and provides a fallback UI (like a loading spinner) while the code chunk is being downloaded */}
        <Suspense fallback={<div className="flex items-center justify-center h-full text-gray-500 text-xl font-medium tracking-wide">Loading...</div>}> {/* Provide a simple loading div as the fallback */}
          <Routes> {/* The Routes component from v6 that looks through all its children Route elements to find the best match */}
            {/* Route definition for the root path ('/'). It renders the Dashboard component when the URL exactly matches '/' */}
            <Route path="/" element={<Dashboard />} /> {/* Define the Dashboard route */}
            
            {/* Route definition for '/leads'. It renders the Leads component */}
            <Route path="/leads" element={<Leads />} /> {/* Define the Leads route */}
            
            {/* Route definition for '/analytics'. It renders the Analytics component */}
            <Route path="/analytics" element={<Analytics />} /> {/* Define the Analytics route */}
            
            {/* Catch-all route. The '*' path matches any URL that wasn't matched by the routes above, acting as a 404 page */}
            <Route path="*" element={<NotFound />} /> {/* Define the 404 NotFound route */}
          </Routes> {/* End Routes component */}
        </Suspense> {/* End Suspense component */}
      </main> {/* End main content area */}
    </div> // End main wrapper div
  ); // End return
}; // End component definition

export default AppRoutes; // Export the AppRoutes component as the default export
