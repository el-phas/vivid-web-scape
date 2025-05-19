
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import BottomNavigation from '@/components/BottomNavigation';

const BusinessDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [isLocal, setIsLocal] = useState(true);
  const [status, setStatus] = useState('open');

  const toggleLocation = () => {
    setIsLocal(!isLocal);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <div className="bg-white flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-reachmesh-blue">Reach<span className="text-black">Mesh</span></h1>
      </div>
      
      <div className="relative">
        <img 
          src="public/lovable-uploads/0565e85d-906e-4757-a5be-fabe97d68430.png" 
          alt="Naivas Supermarket" 
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
          <Edit size={18} className="text-gray-500" />
        </button>
        <button className="absolute top-2 left-2 bg-white rounded-full p-2 shadow-md">
          <Edit size={18} className="text-gray-500" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Name</h3>
            <button>
              <Edit size={16} className="text-gray-400" />
            </button>
          </div>
          <div className="px-3 py-2 bg-blue-50 rounded-lg">
            <span className="text-blue-800">Naivas</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Type</h3>
            <button>
              <Edit size={16} className="text-gray-400" />
            </button>
          </div>
          <div className="px-3 py-2 bg-purple-50 rounded-lg">
            <span className="text-purple-800">Supermarket</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Status</h3>
            <div></div>
          </div>
          
          <ToggleGroup type="single" value={status} onValueChange={(value) => value && setStatus(value)} className="flex justify-between">
            <ToggleGroupItem value="open" className="flex-1 rounded-l-md bg-green-500 text-white data-[state=on]:bg-green-600">
              Open
            </ToggleGroupItem>
            <ToggleGroupItem value="closed" className="flex-1 rounded-r-md bg-red-500 text-white data-[state=on]:bg-red-600">
              Closed
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Service/Working time</h3>
            <button>
              <Edit size={16} className="text-gray-400" />
            </button>
          </div>
          <div className="px-3 py-2 bg-yellow-50 rounded-lg">
            <span className="text-yellow-800">Monday-Friday | 8:00 AM - 8:00 PM</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Contact</h3>
            <div></div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Mail size={16} className="text-blue-600 mr-2" />
                <span className="text-sm">inquiries-naivas@gmail.com</span>
              </div>
              <div className="flex space-x-2">
                <button>
                  <Edit size={16} className="text-gray-400" />
                </button>
                <button>
                  <Mail size={16} className="text-blue-500" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Phone size={16} className="text-blue-600 mr-2" />
                <span className="text-sm">+123-456-7890</span>
              </div>
              <div className="flex space-x-2">
                <button>
                  <Edit size={16} className="text-gray-400" />
                </button>
                <button>
                  <Phone size={16} className="text-blue-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">About</h3>
            <button>
              <Edit size={16} className="text-gray-400" />
            </button>
          </div>
          <div className="px-3 py-2 bg-green-50 rounded-lg">
            <span className="text-green-800">Always Save You Money</span>
          </div>
        </div>
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default BusinessDetails;
