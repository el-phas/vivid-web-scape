import React, { useState, useEffect } from 'react';
import { Bell, MessageCircle, User, Heart } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import Header from '@/components/Header';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: number;
  title: string;
  time: string;
  read: boolean;
  type: 'like' | 'message' | 'view' | 'location' | 'follow';
}

const NotificationsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('notifications');
  const [locationValue, setLocationValue] = useState('local');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleLocation = (value: string) => {
    setLocationValue(value);
    
    toast({
      title: "Location updated",
      description: `Notifications scope changed to ${value}`,
    });
  };

  useEffect(() => {
    // In a real app, this would fetch from the backend
    // For now, we'll use mock data until the backend is set up
    const mockNotifications: Notification[] = [
      {
        id: 1,
        title: 'John Doe liked your post',
        time: '2 hours ago',
        read: false,
        type: 'like'
      },
      {
        id: 2,
        title: 'New message from Jane Smith',
        time: '5 hours ago',
        read: false,
        type: 'message'
      },
      {
        id: 3,
        title: 'Your profile has been viewed 27 times this week',
        time: '1 day ago',
        read: true,
        type: 'view'
      },
      {
        id: 4,
        title: 'New business near your location',
        time: '2 days ago',
        read: true,
        type: 'location'
      }
    ];
    
    setNotifications(mockNotifications);
    setLoading(false);
  }, [user]);

  const markAsRead = (id: number) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="h-5 w-5 text-blue-500" />;
      case 'message':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'view':
        return <User className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <Header 
        locationValue={locationValue} 
        toggleLocation={toggleLocation}
      />
      
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-bold">Notifications</h1>
      </div>
      
      <div className="pb-16">
        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No notifications yet</div>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`p-4 border-b ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex">
                <div className="mr-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>
                <div>
                  <p className={`${notification.read ? 'text-gray-700' : 'font-medium text-black'}`}>
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default NotificationsPage;
