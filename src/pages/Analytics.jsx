// src/pages/Analytics.jsx
import React from 'react'; // Import React library

const Analytics = () => { // Create a functional component named Analytics
  return ( // Return the UI layout for this component
    <div className="p-6"> {/* A div container with Tailwind padding of 6 */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Analytics</h1> {/* An h1 element styled to be large, bold, gray, with a bottom margin */}
      <p className="text-gray-600">View your charts, metrics, and reports.</p> {/* A descriptive paragraph styled with gray text color */}
    </div> // Closing the div container
  ); // Closing the return block
}; // Closing the function block

export default Analytics; // Default export of the Analytics component
