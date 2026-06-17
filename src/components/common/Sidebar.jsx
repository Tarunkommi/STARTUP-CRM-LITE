// src/components/common/Sidebar.jsx
import React from 'react'; // Import React
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom to handle active states automatically
import { LayoutDashboard, Users, BarChart2 } from 'lucide-react'; // Import icons from lucide-react for the sidebar links

const Sidebar = () => { // Define the Sidebar functional component
  // Define an array of route objects to easily iterate over them and create links
  const navItems = [ // Start array
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> }, // Dashboard route definition with its path, display name, and icon
    { path: '/leads', name: 'Leads', icon: <Users size={20} /> }, // Leads route definition
    { path: '/analytics', name: 'Analytics', icon: <BarChart2 size={20} /> }, // Analytics route definition
  ]; // End array

  return ( // Return the JSX for the sidebar
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col"> {/* Aside HTML element for the sidebar, fixed width 64, dark gray background, white text, full screen height, flex column layout */}
      <div className="p-6 border-b border-gray-800"> {/* Header container with padding and bottom border */}
        <h2 className="text-2xl font-bold tracking-wider">CRM Lite</h2> {/* App title, large, bold, with wider letter spacing */}
      </div> {/* Close header container */}
      
      <nav className="flex-1 p-4 space-y-2"> {/* Navigation container that takes up remaining space, with padding and vertical space between children */}
        {navItems.map((item) => ( // Map over the navItems array to render a NavLink for each item
          <NavLink // The NavLink component from react-router-dom
            key={item.path} // Unique key required by React when mapping over arrays, using the path
            to={item.path} // The URL path to navigate to when clicked
            className={({ isActive }) => // Dynamic className function provided by NavLink, giving us the 'isActive' boolean
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${ // Template literal for base classes: flex, items center, gap 3, horizontal/vertical padding, rounded corners, color transition
                isActive // Check if the link is active
                  ? 'bg-blue-600 text-white' // Classes to apply if active: blue background, white text
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white' // Classes to apply if inactive: light gray text, dark gray background on hover, white text on hover
              }` // Close template literal
            } // Close className function
          > {/* Close opening NavLink tag */}
            {item.icon} {/* Render the icon for the link */}
            <span className="font-medium">{item.name}</span> {/* Render the name of the link with medium font weight */}
          </NavLink> // Close NavLink component
        ))} {/* End map */}
      </nav> {/* Close navigation container */}
    </aside> // Close sidebar aside element
  ); // Close return
}; // Close component definition

export default Sidebar; // Export Sidebar component as default
