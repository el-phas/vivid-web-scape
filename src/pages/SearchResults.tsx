
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import ProfessionalCard from '@/components/ProfessionalCard';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const searchRadius = searchParams.get('radius') || 'local';
  const [activeTab, setActiveTab] = useState('home');
  const [locationValue, setLocationValue] = useState(searchRadius);
  
  const toggleLocation = (value: string) => {
    setLocationValue(value);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}&radius=${value}`);
  };

  const { data: professionals = [], isLoading } = useQuery({
    queryKey: ['search-professionals', searchQuery, locationValue],
    queryFn: async () => {
      try {
        let query = supabase.from('professionals').select('*');
        
        if (searchQuery) {
          query = query.ilike('name', `%${searchQuery}%`).or(`title.ilike.%${searchQuery}%`);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        return data.map(prof => ({
          id: prof.id,
          name: prof.name,
          title: prof.title,
          rating: prof.rating || 0,
          reviews: prof.reviews || 0,
          messages: prof.messages || 0,
          likes: prof.likes || 0,
          image: prof.image || 'https://randomuser.me/api/portraits/men/32.jpg',
          online: prof.online || false,
          categories: ['JavaScript', 'React', 'Node.js'], // We should get these from a join table
          verified: prof.verified || false,
          saved: Math.random() > 0.5, // This should be fetched from a saved_items table
        }));
      } catch (error) {
        console.error('Error searching professionals:', error);
        return [];
      }
    }
  });

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      navigate(`/search?q=${encodeURIComponent(target.value)}&radius=${locationValue}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <Header 
        locationValue={locationValue} 
        toggleLocation={toggleLocation}
        isDarkTheme={false}
      />
      
      <div className="bg-white p-3 flex items-center">
        <button onClick={() => navigate('/')} className="mr-3">
          <ArrowLeft size={18} />
        </button>
        <div className="relative flex-1">
          <input
            type="text"
            defaultValue={searchQuery}
            placeholder="Search ReachMesh"
            className="w-full px-4 py-2 pl-10 border rounded-full text-sm"
            onKeyDown={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        </div>
      </div>
      
      <div className="p-3 bg-white">
        <p className="text-sm text-gray-600">Search result: "{searchQuery || 'All professionals'}"</p>
      </div>

      <div className="pb-16">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Searching...</div>
        ) : professionals.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No results found</div>
        ) : (
          professionals.map((professional) => (
            <ProfessionalCard 
              key={professional.id}
              {...professional}
            />
          ))
        )}
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default SearchResults;
