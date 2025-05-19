
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/BottomNavigation';

const BusinessProductPostPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('clothing');
  
  // Sample clothing products
  const products = [
    { 
      id: 1, 
      name: 'Soap', 
      price: '200', 
      image: 'public/lovable-uploads/6079cce4-e850-424a-9c36-589b7a2a7ba0.png', 
      category: 'Clothing' 
    },
    { 
      id: 2, 
      name: 'Soap', 
      price: '200', 
      image: 'public/lovable-uploads/930b8ba8-9fab-4d7f-bbe2-998e16e99fdb.png', 
      category: 'Clothing' 
    },
    { 
      id: 3, 
      name: 'Nutri', 
      price: '300', 
      image: 'public/lovable-uploads/aef309a4-1723-4c4d-b808-0279a2496c91.png', 
      category: 'Clothing',
      live: true,
      timeRemaining: '24\''
    },
    { 
      id: 4, 
      name: 'Venus', 
      price: '250', 
      image: 'public/lovable-uploads/205418d7-0314-45d1-b820-c76d0d92e9d0.png', 
      category: 'Clothing',
      live: true,
      timeRemaining: '24\''
    },
  ];

  const categoryTabs = [
    { id: 'business', name: 'Business/Services' },
    { id: 'profession', name: 'Profession' },
    { id: 'products', name: 'Products' },
    { id: 'post', name: 'Post' },
  ];

  const categories = [
    { id: 'clothing', name: 'Clothing', count: 5 },
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
        <h2 className="mb-2">Categories</h2>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center px-3 py-1.5 bg-blue-100 text-reachmesh-blue rounded-full text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Add a new category</span>
          </button>
          
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between px-2 py-1 bg-gray-100 rounded-md w-full"
            >
              <span>{category.name}</span>
              <div className="flex space-x-1">
                <button className="p-1 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button className="p-1 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="p-1 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          
          {[...Array(4)].map((_, index) => (
            <div 
              key={`clothing-${index}`} 
              className="flex items-center justify-between px-2 py-1 bg-gray-100 rounded-md w-full"
            >
              <span>Clothing</span>
              <div className="flex space-x-1">
                <button className="p-1 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button className="p-1 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="p-1 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <div className="flex-1 p-2 bg-gray-50 rounded-md">
            <span className="block text-center">Soap</span>
            <span className="block text-center font-bold">$ 200</span>
          </div>
          <div className="flex-1 p-2 bg-blue-50 rounded-md">
            <span className="block text-center">Soap</span>
            <span className="block text-center font-bold text-blue-600">$ 200</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white border rounded-md overflow-hidden">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-32 object-cover"
                />
                {product.live && (
                  <div className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1.5 rounded">
                    LIVE
                  </div>
                )}
                {product.timeRemaining && (
                  <div className="absolute bottom-1 right-1 bg-red-600 text-white text-xs px-1.5 rounded">
                    {product.timeRemaining}
                  </div>
                )}
              </div>
              <div className="p-2 text-center">
                <p className="text-sm">{product.name}</p>
                <p className={`text-sm font-bold ${product.id === 3 || product.id === 4 ? 'text-blue-600' : ''}`}>
                  $ {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default BusinessProductPostPage;
