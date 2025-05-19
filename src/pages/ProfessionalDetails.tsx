
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Home, Users, Calendar, MapPin, Briefcase, Mail, Phone, Edit, MessageSquare, Heart, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import BottomNavigation from '@/components/BottomNavigation';

const ProfessionalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [isLocal, setIsLocal] = useState(true);
  const [status, setStatus] = useState('available');

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
      
      <div className="bg-white px-4 py-2">
        <div className="flex overflow-x-auto space-x-4 pb-2">
          {['Home', 'Users', 'Calendar', 'MapPin', 'Briefcase', 'Phone', 'Settings'].map((icon) => (
            <div key={icon} className="flex flex-col items-center space-y-1 min-w-[50px]">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                {icon === 'Home' && <Home size={20} className="text-gray-500" />}
                {icon === 'Users' && <Users size={20} className="text-gray-500" />}
                {icon === 'Calendar' && <Calendar size={20} className="text-gray-500" />}
                {icon === 'MapPin' && <MapPin size={20} className="text-gray-500" />}
                {icon === 'Briefcase' && <Briefcase size={20} className="text-gray-500" />}
                {icon === 'Phone' && <Phone size={20} className="text-gray-500" />}
                {icon === 'Settings' && <Edit size={20} className="text-gray-500" />}
              </div>
              <span className="text-xs whitespace-nowrap">{icon}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative">
        <div className="h-28 bg-gradient-to-r from-blue-500 to-blue-700"></div>
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-3 w-11/12">
          <div className="relative flex flex-col items-center">
            <div className="relative">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="John Doe" 
                className="w-20 h-20 rounded-full object-cover border-4 border-white"
              />
              <button className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                <Edit size={14} className="text-white" />
              </button>
            </div>
            
            <h2 className="mt-2 text-lg font-bold">John Doe</h2>
            <p className="text-sm text-gray-600">Software Engineer</p>
            <Badge className="mt-1 bg-green-100 text-green-800">Verified</Badge>
          </div>
        </div>
      </div>
      
      <div className="mt-28 px-4">
        <div className="bg-white rounded-lg p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Professions</h3>
            <Badge className="bg-reachmesh-blue text-white rounded-full w-6 h-6 flex items-center justify-center p-0 text-xs">1</Badge>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg mb-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-2">
                <Briefcase size={16} className="text-blue-600" />
              </div>
              <span className="text-sm">Software Engineer</span>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-500">
                <MessageSquare size={18} />
              </button>
              <button className="text-gray-400">
                <Heart size={18} />
              </button>
            </div>
          </div>
          
          <button className="w-full flex items-center justify-center p-2 border border-dashed border-gray-300 rounded-lg">
            <span className="text-sm text-gray-500 mr-1">+</span>
            <span className="text-sm text-gray-500">Add profession</span>
          </button>
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Status</h3>
            <button>
              <Edit size={16} className="text-gray-400" />
            </button>
          </div>
          
          <ToggleGroup type="single" value={status} onValueChange={(value) => value && setStatus(value)} className="flex justify-between">
            <ToggleGroupItem value="available" className="flex-1 rounded-l-md bg-green-500 text-white data-[state=on]:bg-green-600">
              Available
            </ToggleGroupItem>
            <ToggleGroupItem value="busy" className="flex-1 bg-red-500 text-white data-[state=on]:bg-red-600">
              Busy
            </ToggleGroupItem>
            <ToggleGroupItem value="away" className="flex-1 rounded-r-md bg-yellow-500 text-white data-[state=on]:bg-yellow-600">
              Away
            </ToggleGroupItem>
          </ToggleGroup>
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
                <span className="text-sm">johndoe@gmail.com</span>
              </div>
              <div className="flex space-x-2">
                <button>
                  <Edit size={16} className="text-gray-400" />
                </button>
                <button>
                  <MessageSquare size={16} className="text-blue-500" />
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Bio</h3>
            <button>
              <Edit size={16} className="text-gray-400" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600">
            I'm a software engineer passionate about creating efficient and innovative solutions. I love tackling challenging problems and constantly learning new technologies.
          </p>
          
          <div className="flex justify-between mt-4">
            <div className="flex items-center">
              <Heart size={16} className="text-blue-500 mr-1" />
              <span className="text-xs">3.5k</span>
            </div>
            <div className="flex items-center">
              <Bookmark size={16} className="text-gray-400 mr-1" />
              <span className="text-xs">573</span>
            </div>
            <div className="flex items-center">
              <Users size={16} className="text-gray-400 mr-1" />
              <span className="text-xs">14</span>
            </div>
            <div className="flex items-center">
              <MessageSquare size={16} className="text-gray-400 mr-1" />
              <span className="text-xs">103</span>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default ProfessionalDetails;
