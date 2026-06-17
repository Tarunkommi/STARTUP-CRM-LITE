// src/pages/NotFound.jsx
import React from 'react'; // Import React to create the component
import { Link } from 'react-router-dom'; // Import Link to enable client-side navigation without full page reloads

const NotFound = () => { // Declare the NotFound functional component
  return ( // Return the JSX to be rendered
    <div className="flex flex-col items-center justify-center h-full p-6 text-center"> {/* Centered flex container taking full height with padding */}
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1> {/* Very large, extra bold, red heading displaying 404 */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Page Not Found</h2> {/* Secondary heading stating the page is not found */}
      <p className="text-gray-600 mb-8">The page you are looking for doesn't exist or has been moved.</p> {/* Paragraph explaining the error with bottom margin */}
      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"> {/* A link routing back to the home page with button styling */}
        Go Back Home {/* Text inside the link */}
      </Link> {/* Close Link component */}
    </div> // Close outer container
  ); // Close return statement
}; // Close component definition

export default NotFound; // Export NotFound to be used in our router as the catch-all
