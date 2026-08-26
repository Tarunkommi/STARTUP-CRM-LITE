// src/pages/NotFound.jsx
import React from 'react'; // Import React to create the component
import { Link } from 'react-router-dom'; // Import Link to enable client-side navigation without full page reloads

const NotFound = () => { // Declare the NotFound functional component
  return ( // Return the JSX to be rendered
    <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-[#F7F8F5] dark:bg-[#171A17] transition-colors duration-200"> {/* Centered flex container taking full height with padding */}
      <h1 className="text-6xl font-extrabold text-[#C95A5A] dark:text-[#D96D6D] mb-4">404</h1> {/* Very large, extra bold, red heading displaying 404 */}
      <h2 className="text-2xl font-semibold text-[#1C201B] dark:text-[#F4F6F2] mb-6">Page Not Found</h2> {/* Secondary heading stating the page is not found */}
      <p className="text-[#59635A] dark:text-[#B9C0B8] mb-8">The page you are looking for doesn't exist or has been moved.</p> {/* Paragraph explaining the error with bottom margin */}
      <Link to="/" className="px-4 py-2 bg-[#50614F] hover:bg-[#3E4C3D] text-white dark:bg-[#8BAE87] dark:text-[#171A17] dark:hover:bg-[#9FBF9B] rounded transition"> {/* A link routing back to the home page with button styling */}
        Go Back Home {/* Text inside the link */}
      </Link> {/* Close Link component */}
    </div> // Close outer container
  ); // Close return statement
}; // Close component definition

export default NotFound; // Export NotFound to be used in our router as the catch-all
