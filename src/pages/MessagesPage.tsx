import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Home, Search, MapPin, Briefcase, Users, Bookmark } from 'lucide-react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ProfessionalCard from '@/components/ProfessionalCard';
import BusinessCard from '@/components/BusinessCard';
import BottomNavigation from '@/components/BottomNavigation';
import TopNavigation from '@/components/TopNavigation';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Json } from '@/integrations/supabase/types';
import CategorySection from '@/components/CategorySection';

interface ProfessionalCategory {
  name: string;
  count: number;
}

interface BusinessCategory {
  name: string;
  count: number;
}

interface Professional {
  id: string;
  name: string;
  title: string;
  bio?: string;
  image: string;
  rating: number;
  reviews: number;
  messages: number;
  likes: number;
  online: boolean;
  verified: boolean;
  categories: string[];
  user_id: string;
  created_at?: string;
  updated_at?: string;
  distance?: number;
  type?: string;
  working_hours?: Json;
}

interface Business {
  id: string;
  name: string;
  description?: string;
  image: string;
  rating: number;
  reviews: number;
  categories: string[];
  saved?: boolean;
  user_id: string;
  service_hours?: Json;
  contact_info?: Json;
  is_open?: boolean;
  created_at?: string;
  updated_at?: string;
  distance?: number;
  type?: string;
}

// Helper function to filter content based on mode
const filterContentByMode = (items: any[], mode: string): any[] => {
  // Simulating distance-based filtering
  // In a real app, you would have actual geolocation data
  switch(mode) {
    case 'local':
      return items.filter(item => (item.distance || 0) <= 50);
    case 'regional':
      return items.filter(item => (item.distance || 0) > 50 && (item.distance || 0) <= 500);
    case 'national':
      return items.filter(item => (item.distance || 0) > 500 && (item.distance || 0) <= 2500);
    case 'international':
      return items.filter(item => (item.distance || 0) > 2500 && (item.distance || 0) <= 10000);
    case 'global':
      return items.filter(item => (item.distance || 0) > 10000);
    default:
      return items;
  }
};

const Index = () => {
  const navigate = useNavigate();
  const [searchRadius, setSearchRadius] = useState("local");
  const [activeTab, setActiveTab] = useState('home');
  const { user } = useAuth();
  const { isDarkTheme } = useTheme();

  const toggleLocation = (value: string) => {
    setSearchRadius(value);
  };

  // Fetch professional categories with error handling
  const { data: professionalCategories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['professionalCategories'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('professional_categories')
          .select('*')
          .order('count', { ascending: false })
          .limit(10);
        
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching professional categories:', error);
        return [];
      }
    }
  });

  // Fetch business categories with error handling
  const { data: businessCategories = [], isLoading: businessCategoriesLoading } = useQuery({
    queryKey: ['businessCategories'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('business_categories')
          .select('*')
          .order('count', { ascending: false })
          .limit(10);
        
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching business categories:', error);
        return [];
      }
    }
  });

  // Fetch professionals - Improved error handling
  const { data: professionalsData = [], isLoading: professionalsLoading } = useQuery({
    queryKey: ['professionals'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('professionals')
          .select('*')
          .limit(10);
        
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching professionals:', error);
        return [];
      }
    }
  });

  // Fetch businesses - Improved error handling
  const { data: businessesData = [], isLoading: businessesLoading } = useQuery({
    queryKey: ['businesses'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .limit(10);
        
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching businesses:', error);
        return [];
      }
    }
  });

  // Process professionals data to match Professional interface
  const professionals: Professional[] = professionalsData.map(professional => ({
    ...professional,
    categories: professional.categories || ['Professional'],
    verified: professional.verified || false,
    online: professional.online || false,
    rating: professional.rating || 4.5,
    reviews: professional.reviews || 0,
    messages: professional.messages || 0,
    likes: professional.likes || 0,
    image: professional.image || 'https://randomuser.me/api/portraits/men/32.jpg',
    // Mock distance data for demo
    distance: Math.floor(Math.random() * 15000),
  }));

  // Process businesses data to match Business interface
  const businesses: Business[] = businessesData.map(business => ({
    ...business,
    categories: business.categories || ['Business'],
    rating: business.rating || 4.5,
    reviews: business.reviews || 0,
    saved: false,
    image: business.image || 'https://randomuser.me/api/portraits/men/32.jpg',
    // Mock distance data for demo
    distance: Math.floor(Math.random() * 15000),
  }));

  // Filter content based on selected mode
  const filteredProfessionals = filterContentByMode(professionals, searchRadius);
  const filteredBusinesses = filterContentByMode(businesses, searchRadius);

  // Navigation configurations
  const topNavButtons = [
    { icon: Home, label: "Home", path: '/' },
    { icon: Search, label: "Search", path: '/search' },
    { icon: MapPin, label: "Location", path: '/map' }
  ];

  const additionalNavButtons = [
    { icon: Briefcase, label: "Business", path: '/business/manage' },
    { icon: Users, label: "Profession", path: '/profession/manage' },
    { icon: Bookmark, label: "Saves", path: '/saved' },
  ];

  // Fallback data in case the fetch fails
  const fallbackProfessionals: Professional[] = [
    {
      id: "1",
      name: 'John Doe',
      title: 'Software Engineer',
      rating: 4.8,
      reviews: 120,
      messages: 67,
      likes: 308,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      online: true,
      categories: ['JavaScript', 'React', 'Node.js'],
      verified: true,
      user_id: '123',
      distance: 25,
    },
    {
      id: "2",
      name: 'Jane Doe',
      title: 'Software Engineer',
      rating: 4.2,
      reviews: 78,
      messages: 53,
      likes: 122,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      online: false,
      categories: ['Python', 'Django'],
      verified: false,
      user_id: '124',
      distance: 350,
    },
  ];

  const fallbackBusinesses: Business[] = [
    {
      id: "1",
      name: 'Nature Supermarket',
      image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.7,
      reviews: 324,
      categories: ['Grocery', 'Organic', 'Health'],
      saved: true,
      user_id: '123',
      distance: 15,
    },
    {
      id: "2",
      name: 'Naivas Supermarket',
      image: 'public/lovable-uploads/0565e85d-906e-4757-a5be-fabe97d68430.png',
      rating: 4.5,
      reviews: 573,
      categories: ['Grocery', 'Retail', 'Household'],
      saved: false,
      user_id: '124',
      distance: 1200,
    }
  ];

  // Determine what data to display based on fetch results and filtering
  const filteredProfessionals = filterContentByMode(professionals, searchRadius);
  const filteredBusinesses = filterContentByMode(businesses, searchRadius);

  const displayedProfessionals = filteredProfessionals.length > 0 ? filteredProfessionals : filterContentByMode(fallbackProfessionals, searchRadius);
  const displayedBusinesses = filteredBusinesses.length > 0 ? filteredBusinesses : filterContentByMode(fallbackBusinesses, searchRadius);
  
  const displayedProfessionalCategories = professionalCategories.length > 0 ? professionalCategories : [
    { name: 'Photographer', count: 42 },
    { name: 'Web Developer', count: 38 },
    { name: 'Graphic Designer', count: 24 },
    { name: 'Software Engineer', count: 116 },
    { name: 'Data Analyst', count: 89 },
    { name: 'Economist', count: 57 },
  ];
  
  const displayedBusinessCategories = businessCategories.length > 0 ? businessCategories : [
    { name: 'Cafe', count: 23 },
    { name: 'Restaurant', count: 112 },
    { name: 'Tech Services', count: 47 },
    { name: 'Retail', count: 123 },
    { name: 'Mechanic Shop', count: 19 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-16 dark:text-white">
      <Header 
        locationValue={searchRadius}
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
      
      <div className="px-4 py-2 bg-white dark:bg-gray-800 mt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium dark:text-gray-200">
            {searchRadius.charAt(0).toUpperCase() + searchRadius.slice(1)} Mode
          </h2>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {searchRadius === 'local' && '0-50 km'}
            {searchRadius === 'regional' && '50-500 km'}
            {searchRadius === 'national' && '500-2500 km'}
            {searchRadius === 'international' && '2500-10000 km'}
            {searchRadius === 'global' && '10000+ km'}
          </span>
        </div>
      </div>
      
      <CategorySection 
        title="Professions Near You" 
        categories={displayedProfessionalCategories}
        showMore={() => navigate('/search')}
      />
      
      <CategorySection 
        title="Business & Services Near You" 
        categories={displayedBusinessCategories}
        showMore={() => navigate('/search')}
      />
      
      <div className="mt-2">
        <h2 className="px-4 text-sm font-medium mb-2 dark:text-gray-200">Discover</h2>
        
        {displayedProfessionals.length > 0 ? (
          displayedProfessionals.map((professional) => (
            <ProfessionalCard 
              key={professional.id}
              id={professional.id}
              {...professional}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No professionals found in this mode range
          </div>
        )}

        {displayedBusinesses.length > 0 ? (
          displayedBusinesses.map((business) => (
            <BusinessCard 
              key={business.id}
              id={business.id}
              {...business}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No businesses found in this mode range
          </div>
        )}
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
