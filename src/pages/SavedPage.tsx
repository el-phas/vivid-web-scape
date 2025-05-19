import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

const SavedPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('saved');
  const [activeFilter, setActiveFilter] = useState('all');

  const savedProfessionals = [
    {
      id: "1",
      name: 'Jane Doe',
      title: 'Software Engineer',
      rating: 4.8,
      reviews: 120,
      messages: 36,
      likes: 152,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      online: false,
      available: false,
    },
    {
      id: "2",
      name: 'John Doe',
      title: 'Software Engineer',
      rating: 3.9,
      reviews: 57,
      messages: 14,
      likes: 103,
      image: 'https://randomuser.me/api/portraits/men/42.jpg',
      online: true,
      available: true,
    },
    {
      id: "3",
      name: 'John Doe',
      title: 'Software Engineer',
      rating: 3.9,
      reviews: 57,
      messages: 14,
      likes: 103,
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      online: true,
      available: true,
    },
  ];

  const savedBusinesses = [
    {
      id: "1",
      name: "Naivas Supermarket",
      image: "public/lovable-uploads/0565e85d-906e-4757-a5be-fabe97d68430.png",
      rating: 3.5,
      reviews: 573,
      messages: 103,
      types: ["Supermarket", "Retail", "Grocery"]
    },
    {
      id: "2",
      name: "Quickmart",
      image: "public/lovable-uploads/ba98f1fe-4fc2-4183-ba54-994b08f626ad.png",
      rating: 3.5,
      reviews: 573,
      messages: 103,
      types: ["Supermarket", "Retail", "Grocery"]
    }
  ];

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'professionals', name: 'Professionals' },
    { id: 'businesses', name: 'Businesses' },
    { id: 'products', name: 'Products' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <div className="bg-white p-4">
        <h1 className="text-xl font-bold text-reachmesh-blue">Reach<span className="text-black">Mesh</span></h1>
        
        <div className="flex space-x-2 mt-4 overflow-x-auto py-1">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`px-4 py-1 rounded-full text-sm whitespace-nowrap ${
                activeFilter === filter.id
                  ? 'bg-reachmesh-blue text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>

      <div className="pb-16">
        <div className="p-4">
          <h2 className="text-base font-medium">Saved professionals <span className="text-xs text-gray-500">3</span></h2>
        </div>

        {savedProfessionals.map((professional, index) => (
          <div key={index} className="border-b border-gray-200 p-4 bg-white flex">
            <img 
              src={professional.image} 
              alt={professional.name} 
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-sm">{professional.name}</h3>
                    <span className="mx-1 text-gray-400">·</span>
                    <span className="text-xs text-gray-500">{professional.title}</span>
                    <span className="mx-1 text-gray-400">·</span>
                    {professional.online && (
                      <span className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded">Online</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-1 text-xs">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-1">{professional.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                      </svg>
                      <span className="ml-1">{professional.messages}</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      <span className="ml-1">{professional.likes}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  <button className="bg-blue-50 text-blue-600 text-xs py-1 px-2 rounded border border-blue-200">
                    Connect
                  </button>
                  {professional.available && (
                    <button className="bg-green-50 text-green-600 text-xs py-1 px-2 rounded border border-green-200">
                      Available
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="p-4 mt-2">
          <h2 className="text-base font-medium">Saved Businesses/Services</h2>
        </div>

        {savedBusinesses.map((business, index) => (
          <div key={index} className="border-b border-gray-200 p-4 bg-white">
            <div className="flex items-start">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-3 relative">
                <div className="absolute inset-0 bg-orange-500 flex items-center justify-center text-white font-bold rounded-full">
                  {business.name === "Naivas Supermarket" ? "nai" : "Q"}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-sm">{business.name}</h3>
                      <MapPin size={14} className="ml-2 text-gray-400" />
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {business.types.map((type, i) => (
                        <span key={i} className="bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5 rounded">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <img 
                src={business.image} 
                alt={business.name} 
                className="w-full h-40 object-cover rounded-md"
              />
            </div>

            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                  <span className="ml-1">{business.rating}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-1">{business.reviews}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span className="ml-1">{business.messages}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default SavedPage;
