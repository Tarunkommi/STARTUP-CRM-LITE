import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart2 } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const Sidebar = () => {
  const navItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/leads', name: 'Leads', icon: <Users size={20} /> },
    { path: '/analytics', name: 'Analytics', icon: <BarChart2 size={20} /> },
  ];

  return (
    <aside className="fixed bottom-0 md:relative w-full md:w-20 lg:w-64 bg-gray-900 text-white h-16 md:h-screen flex flex-row md:flex-col transition-all duration-300 border-t md:border-t-0 md:border-r border-gray-800 dark:border-gray-800 z-40">
      <div className="hidden lg:block p-6 border-b border-gray-800 min-h-[64px]">
        <h2 className="text-2xl font-bold tracking-wider truncate">CRM Lite</h2>
      </div>
      
      <nav className="flex-1 p-2 md:p-4 flex flex-row md:flex-col justify-around md:justify-start space-x-2 md:space-x-0 md:space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-lg transition-colors duration-200 min-h-[44px] min-w-[44px] ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <span className="text-[10px] md:text-sm font-medium lg:block md:hidden block">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="hidden md:block p-4 border-t border-gray-800">
        <DarkModeToggle />
      </div>
    </aside>
  );
};

export default Sidebar;
