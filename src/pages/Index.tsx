
import React from 'react';
import { Search, MapPin, Users, MessageCircle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import TopNavigation from '@/components/TopNavigation';
import SearchBar from '@/components/SearchBar';
import CategorySection from '@/components/CategorySection';

const Index = () => {
  const navigate = useNavigate();

  // For now, we'll use mock data since the categories tables don't exist yet
  const professionalCategories = [
    { id: 1, name: "Technology", icon: "💻" },
    { id: 2, name: "Healthcare", icon: "🏥" },
    { id: 3, name: "Education", icon: "📚" },
    { id: 4, name: "Finance", icon: "💰" },
  ];

  const businessCategories = [
    { id: 1, name: "Restaurants", icon: "🍽️" },
    { id: 2, name: "Shopping", icon: "🛍️" },
    { id: 3, name: "Services", icon: "🔧" },
    { id: 4, name: "Entertainment", icon: "🎬" },
  ];

  // Mock professionals data
  const professionals = [
    { id: 1, name: "Dr. Sarah Johnson", title: "Cardiologist", location: "Downtown" },
    { id: 2, name: "Mike Chen", title: "Software Engineer", location: "Tech District" },
    { id: 3, name: "Prof. Lisa Rodriguez", title: "Mathematics Teacher", location: "University Area" },
  ];

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <Header />
      
      <div className="p-4">
        <SearchBar onSearch={handleSearch} />
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <Users className="text-blue-600 mr-2" size={20} />
              <div>
                <p className="text-sm text-gray-600">Professionals</p>
                <p className="font-semibold">{professionals.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <TrendingUp className="text-green-600 mr-2" size={20} />
              <div>
                <p className="text-sm text-gray-600">Active Today</p>
                <p className="font-semibold">124</p>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Categories */}
        <CategorySection
          title="Find Professionals"
          categories={professionalCategories}
          onCategoryClick={(category) => navigate(`/search?category=professional&type=${category.name}`)}
        />

        {/* Business Categories */}
        <CategorySection
          title="Discover Businesses"
          categories={businessCategories}
          onCategoryClick={(category) => navigate(`/search?category=business&type=${category.name}`)}
        />

        {/* Recent Professionals */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Recent Professionals</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {professionals.map((professional) => (
              <div key={professional.id} className="p-4 border-b last:border-b-0">
                <h3 className="font-medium">{professional.name}</h3>
                <p className="text-sm text-gray-600">{professional.title}</p>
                <div className="flex items-center mt-1">
                  <MapPin size={12} className="text-gray-400 mr-1" />
                  <p className="text-xs text-gray-500">{professional.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/map')}
            className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center"
          >
            <MapPin className="text-blue-600 mr-2" size={20} />
            <span>View Map</span>
          </button>
          <button 
            onClick={() => navigate('/messages')}
            className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center"
          >
            <MessageCircle className="text-green-600 mr-2" size={20} />
            <span>Messages</span>
          </button>
        </div>
      </div>
      
      <TopNavigation activeIcon="home" />
    </div>
  );
};

export default Index;
