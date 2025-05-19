import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, MapPin, Briefcase, Users, Bookmark } from 'lucide-react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import BottomNavigation from '@/components/BottomNavigation';
import TopNavigation from '@/components/TopNavigation';

const NetworkPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [locationValue, setLocationValue] = useState('local');

  const toggleLocation = (value: string) => {
    setLocationValue(value);
  };

  const additionalNavButtons = [
    { icon: Briefcase, label: "Business", path: '/business/manage' },
    { icon: Users, label: "Profession", path: '/profession/manage' },
    { icon: Bookmark, label: "Saves", path: '/saved' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-16 dark:text-white">
      <Header 
        locationValue={locationValue}
        toggleLocation={toggleLocation}
      />
      
      <div className="bg-white dark:bg-gray-800 px-4 py-2">
        <TopNavigation activeIcon="home" />
      </div>
      
      <div className="bg-white dark:bg-gray-800 px-4 pt-1 pb-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-between overflow-x-auto">
          {additionalNavButtons.map((button, index) => (
            <button 
              key={index} 
              className="flex flex-col items-center min-w-[60px]"
              onClick={() => navigate(button.path)}
            >
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-1">
                <button.icon size={18} className="dark:text-blue-300" />
              </div>
              <span className="text-xs dark:text-gray-300">{button.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <SearchBar />
      
      <div className="p-4">
        <h1 className="text-2xl font-bold">Network Page</h1>
        <p>This is the network page content.</p>
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default NetworkPage;
