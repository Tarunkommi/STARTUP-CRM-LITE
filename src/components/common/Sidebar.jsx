import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart2, LogOut } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/leads', name: 'Leads', icon: <Users size={20} /> },
    { path: '/analytics', name: 'Analytics', icon: <BarChart2 size={20} /> },
  ];

  return (
    <aside className="fixed bottom-0 md:relative w-full md:w-20 lg:w-64 bg-[#171A17] text-[#F4F6F2] h-16 md:h-screen flex flex-row md:flex-col transition-all duration-300 border-t md:border-t-0 md:border-r border-[#343A35] z-40">
      <div className="hidden lg:block p-6 border-b border-[#343A35] min-h-[64px]">
        <h2 className="text-2xl font-bold tracking-wider truncate text-[#F4F6F2]">CRM Lite</h2>
      </div>
      
      <nav className="flex-1 p-2 md:p-4 flex flex-row md:flex-col justify-around md:justify-start space-x-2 md:space-x-0 md:space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-lg transition-colors duration-200 min-h-[44px] min-w-[44px] ${
                isActive
                  ? 'bg-[#50614F] text-white dark:bg-[#8BAE87] dark:text-[#171A17] font-semibold'
                  : 'text-[#B9C0B8] hover:bg-[#212520] dark:hover:bg-[#282D27] hover:text-[#F4F6F2]'
              }`
            }
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <span className="text-[10px] md:text-sm font-medium lg:block md:hidden block">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="hidden md:block p-4 border-t border-[#343A35]">
        <DarkModeToggle />
      </div>

      {/* Account Section */}
      <div className="hidden md:block p-4 border-t border-[#343A35]">
        <div className="min-w-0 mb-3 lg:block md:hidden">
          <p className="text-sm font-semibold text-[#F4F6F2] truncate">
            {user?.name || 'User'}
          </p>
          <p className="text-xs text-[#B9C0B8] truncate mt-0.5">
            {user?.email || ''}
          </p>
        </div>
        <button
          onClick={logout}
          title="Logout"
          className="flex items-center justify-center lg:justify-start gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-[#B9C0B8] hover:text-[#C95A5A] hover:bg-[#212520] dark:hover:bg-[#282D27] transition-colors duration-200 focus:outline-none"
        >
          <LogOut size={18} />
          <span className="lg:inline md:hidden">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
