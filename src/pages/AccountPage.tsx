import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import TopNavigation from '@/components/TopNavigation';

const AccountPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [locationValue, setLocationValue] = useState("local");
  const [activeTab, setActiveTab] = useState('account');

  const toggleLocation = (value: string) => {
    setLocationValue(value);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-16">
      <Header 
        locationValue={locationValue}
        toggleLocation={toggleLocation}
      />

      <div className="bg-white dark:bg-gray-800 px-4 py-2">
        <TopNavigation activeIcon="account" />
      </div>

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Account Settings</h1>
        <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">User Information</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Here you can manage your account settings and profile information.
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </div>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default AccountPage;
