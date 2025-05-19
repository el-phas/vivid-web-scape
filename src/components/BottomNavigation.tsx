
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Bell, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const tabs = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'messages', icon: MessageCircle, label: 'Messages', path: '/messages' },
    { id: 'notifications', icon: Bell, label: 'Notifications', path: '/notifications' },
    { id: 'account', icon: User, label: 'Account', path: user ? '/account' : '/auth' },
  ];

  const handleTabChange = (tabId: string, path: string) => {
    onTabChange(tabId);
    navigate(path);
  };

  // Update active tab based on current route
  React.useEffect(() => {
    const currentTab = tabs.find(tab => location.pathname === tab.path);
    if (currentTab) {
      onTabChange(currentTab.id);
    }
  }, [location.pathname, onTabChange]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-200 py-2 rounded-t-xl shadow-sm">
      <div className="flex justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 flex flex-col items-center justify-center py-1 ${
              activeTab === tab.id ? 'text-reachmesh-blue' : 'text-gray-500'
            }`}
            onClick={() => handleTabChange(tab.id, tab.path)}
          >
            <tab.icon size={20} />
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
