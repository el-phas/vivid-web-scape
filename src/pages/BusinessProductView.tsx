
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

const BusinessProductView = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = React.useState('home');
  const [activeCategory, setActiveCategory] = React.useState('All');

  const categories = [
    'All', 'Household', 'Snacks', 'Toiletries', 'Clothing', 'Cleaning'
  ];

  const products = [
    { 
      id: 1, 
      name: 'Geisha soap', 
      price: '200', 
      image: 'public/lovable-uploads/6079cce4-e850-424a-9c36-589b7a2a7ba0.png', 
      category: 'Toiletries' 
    },
    { 
      id: 2, 
      name: 'Geisha soap', 
      price: '200', 
      image: 'public/lovable-uploads/930b8ba8-9fab-4d7f-bbe2-998e16e99fdb.png', 
      category: 'Toiletries' 
    },
    { 
      id: 3, 
      name: 'Geisha soap', 
      price: '200', 
      image: 'public/lovable-uploads/fc50baa2-2bf1-4aa1-b9c8-aa5e456da78e.png', 
      category: 'Toiletries'  
    },
    { 
      id: 4, 
      name: 'Geisha soap', 
      price: '200', 
      image: 'public/lovable-uploads/6079cce4-e850-424a-9c36-589b7a2a7ba0.png', 
      category: 'Household' 
    },
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-reachmesh-gray pb-16">
      <div className="bg-white p-4">
        <div className="flex items-center">
          <Link to={`/business/${id}`} className="mr-3">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-lg font-bold">Products/Services</h2>
          <span className="text-gray-500 ml-2 text-sm">Naivas</span>
        </div>
        
        <div className="mt-4 overflow-x-auto">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-4 py-1 rounded-full text-sm ${
                  activeCategory === category
                    ? 'bg-reachmesh-blue text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-3 grid grid-cols-2 gap-3">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-md overflow-hidden shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-28 object-cover"
            />
            <div className="p-2">
              <p className="text-sm">{product.name}</p>
              <p className="text-sm font-bold">$ {product.price}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-orange-500 mx-3 my-4 p-3 rounded-md text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold">BACK 2 SCHOOL DEALS</p>
            <p className="text-xs">SAVE UP TO</p>
            <p className="text-2xl font-bold">65%<span className="text-sm ml-1">off</span></p>
          </div>
          <img 
            src="public/lovable-uploads/fc50baa2-2bf1-4aa1-b9c8-aa5e456da78e.png" 
            alt="Back to School" 
            className="w-16 h-16 object-cover rounded"
          />
        </div>
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default BusinessProductView;
