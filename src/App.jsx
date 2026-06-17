// src/App.jsx
import React from 'react'; // Import the React library
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter to enable HTML5 history API based routing
import AppRoutes from './routes'; // Import the AppRoutes component which contains all our route definitions

function App() { // Define the main App functional component
  return ( // Start returning the JSX
    // Wrap the entire application within BrowserRouter. This provides routing context to all nested routing components (like Link, NavLink, Routes, Route).
    <BrowserRouter> {/* The router wrapper */}
      {/* Render the AppRoutes component inside the router. It contains the Sidebar and the page Routes. */}
      <AppRoutes /> {/* The component holding our layout and route definitions */}
    </BrowserRouter> // End router wrapper
  ); // End return
} // End App component definition

export default App; // Export App as the default export to be rendered in main.jsx
