
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/BottomNavigation';

const BusinessServicesPostPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  
  const categoryTabs = [
    { id: 'business', name: 'Business/Services' },
    { id: 'profession', name: 'Profession' },
    { id: 'products', name: 'Products' },
    { id: 'post', name: 'Post' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <div className="bg-white p-4">
        <h1 className="text-xl font-bold text-reachmesh-blue">Reach<span className="text-black">Mesh</span></h1>
        
        {/* Icon Navigation */}
        <div className="flex justify-between mt-3 overflow-x-auto py-2">
          <button className="flex flex-col items-center min-w-[40px]">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-reachmesh-blue">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
          </button>
          <button className="flex flex-col items-center min-w-[40px]">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-reachmesh-blue">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
          <button className="flex flex-col items-center min-w-[40px]">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-reachmesh-blue">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
          </button>
          <button className="flex flex-col items-center min-w-[40px]">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-reachmesh-blue">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9l-4.95 4.95a.75.75 0 01-1.06 0l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
          <button className="flex flex-col items-center min-w-[40px]">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-reachmesh-blue">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
          </button>
          <button className="flex flex-col items-center min-w-[40px]">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-reachmesh-blue">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
            </div>
          </button>
          <button className="flex flex-col items-center min-w-[40px]">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-reachmesh-blue">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
        </div>

        <div className="flex space-x-2 mt-4 overflow-x-auto py-1">
          {categoryTabs.map(tab => (
            <button
              key={tab.id}
              className="px-4 py-1 bg-reachmesh-blue text-white rounded-full text-sm whitespace-nowrap"
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Posts <span className="text-gray-500 text-sm">1</span></h2>
          <button className="flex items-center px-3 py-1 bg-blue-100 text-reachmesh-blue rounded-full text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>New Post</span>
          </button>
        </div>
        
        <div className="bg-white rounded-md overflow-hidden shadow-sm">
          <div className="p-3 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-2">N</div>
                <div>
                  <p className="font-medium text-sm">Naivas <span className="text-gray-500 font-normal">· Supermarket</span></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-3 py-2">
            <p className="text-sm">No more worries anymore, as we present naivas mirooyi</p>
          </div>
          
          <div className="relative">
            <img 
              src="public/lovable-uploads/9bfedca6-0a80-450b-b335-b11c08ec4ab0.png" 
              alt="Naivas promo" 
              className="w-full h-56 object-cover"
            />
          </div>
          
          <div className="flex justify-between p-3 text-gray-500">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              <span>573</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
              </svg>
              <span>573</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
              </svg>
              <span>193</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default BusinessServicesPostPage;
