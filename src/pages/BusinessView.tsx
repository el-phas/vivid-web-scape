
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, MessageSquare, Bookmark } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

const BusinessView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('home');
  const [isLocal, setIsLocal] = React.useState(true);

  const toggleLocation = () => {
    setIsLocal(!isLocal);
  };
  
  const goToProducts = () => {
    navigate(`/business/${id}/products`);
  };

  return (
    <div className="min-h-screen bg-reachmesh-gray pb-16">
      <div className="bg-white flex items-center p-4">
        <Link to="/" className="mr-3">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-reachmesh-blue">Reach<span className="text-black">Mesh</span></h1>
        <div className="ml-auto flex items-center space-x-2">
          <span className="text-xs font-medium">Local</span>
          <div className="switch">
            <input type="checkbox" checked={isLocal} onChange={toggleLocation} id="location-toggle" className="hidden" />
            <label htmlFor="location-toggle" className={`flex items-center w-10 h-5 rounded-full cursor-pointer transition-colors ${isLocal ? 'bg-reachmesh-blue' : 'bg-gray-300'}`}>
              <span className={`w-4 h-4 bg-white rounded-full transition-transform ${isLocal ? 'translate-x-5' : 'translate-x-1'}`}></span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <img 
          src="public/lovable-uploads/0565e85d-906e-4757-a5be-fabe97d68430.png" 
          alt="Naivas Supermarket" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="text-white">
            <h2 className="text-lg font-bold">Naivas Supermarket</h2>
            <p className="text-sm">Supermarket chain offering a wide variety of products</p>
            <div className="flex space-x-1 mt-1">
              <span className="bg-blue-500 text-xs text-white px-1.5 py-0.5 rounded">Grocery</span>
              <span className="bg-green-500 text-xs text-white px-1.5 py-0.5 rounded">Supermarket</span>
            </div>
            <div className="flex space-x-1 mt-1">
              <span className="bg-yellow-500 text-xs text-white px-1.5 py-0.5 rounded">Home Products</span>
              <span className="bg-purple-500 text-xs text-white px-1.5 py-0.5 rounded">Beauty</span>
              <span className="bg-red-500 text-xs text-white px-1.5 py-0.5 rounded">Clothing</span>
            </div>
            <button className="mt-2 bg-reachmesh-blue text-white text-xs px-4 py-1 rounded-full">
              View Location
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-3 flex justify-between">
        <div className="flex items-center">
          <ThumbsUp size={16} className="text-gray-500 mr-1" />
          <span className="text-sm">2.5k</span>
        </div>
        <div className="flex items-center">
          <Bookmark size={16} className="text-gray-500 mr-1" />
          <span className="text-sm">573</span>
        </div>
        <div className="flex items-center">
          <MessageSquare size={16} className="text-gray-500 mr-1" />
          <span className="text-sm">102</span>
        </div>
      </div>
      
      <div className="mt-2 bg-white p-3">
        <h3 className="font-medium mb-3">Products/Services</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          <div className="min-w-[120px] border rounded-md overflow-hidden">
            <img src="public/lovable-uploads/6079cce4-e850-424a-9c36-589b7a2a7ba0.png" alt="Product" className="w-full h-16 object-cover" />
            <div className="p-2 text-center">
              <p className="text-xs">Geisha soap</p>
              <p className="text-xs font-bold">$ 200</p>
            </div>
          </div>
          <div className="min-w-[120px] border rounded-md overflow-hidden">
            <img src="public/lovable-uploads/930b8ba8-9fab-4d7f-bbe2-998e16e99fdb.png" alt="Product" className="w-full h-16 object-cover" />
            <div className="p-2 text-center">
              <p className="text-xs">Geisha soap</p>
              <p className="text-xs font-bold">$ 200</p>
            </div>
          </div>
        </div>
        <button 
          onClick={goToProducts}
          className="w-full mt-3 bg-reachmesh-blue text-white text-sm py-2 rounded-md"
        >
          View All Products
        </button>
      </div>
      
      <div className="mt-2 bg-white p-3">
        <h3 className="font-medium mb-3">Posts</h3>
        <div className="border rounded-md overflow-hidden">
          <img src="public/lovable-uploads/fc50baa2-2bf1-4aa1-b9c8-aa5e456da78e.png" alt="Post" className="w-full h-32 object-cover" />
        </div>
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default BusinessView;
