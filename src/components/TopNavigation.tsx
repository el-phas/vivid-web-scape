
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, MapPin, Briefcase, Users, Bookmark } from 'lucide-react';

interface TopNavigationProps {
  activeIcon?: string;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ activeIcon }) => {
  const navItems = [
    {
      icon: Home,
      text: 'Home',
      path: '/',
      id: 'home'
    },
    {
      icon: Search,
      text: 'Search',
      path: '/search',
      id: 'search'
    },
    {
      icon: MapPin,
      text: 'Map',
      path: '/map',
      id: 'location'
    },
    {
      icon: Briefcase,
      text: 'Business',
      path: '/business/manage',
      id: 'business'
    },
    {
      icon: Users,
      text: 'Profession',
      path: '/profession/manage',
      id: 'profession'
    },
    {
      icon: Bookmark,
      text: 'Saves',
      path: '/saved',
      id: 'saved'
    }
  ];

  return (
    <div className="px-4 py-2 grid grid-cols-3 sm:grid-cols-6 gap-2">
      {navItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center px-2 py-1 ${
              activeIcon === item.id || isActive ? 'text-blue-600' : 'text-gray-500'
            }`
          }
        >
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-1">
            <item.icon size={20} />
          </div>
          <span className="text-xs">{item.text}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default TopNavigation;
