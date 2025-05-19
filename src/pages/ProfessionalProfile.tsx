
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ThumbsUp, MessageSquare, Users, Bookmark } from 'lucide-react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Badge } from '@/components/ui/badge';

const ProfessionalProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = React.useState('home');
  const [isLocal, setIsLocal] = React.useState(true);

  const toggleLocation = () => {
    setIsLocal(!isLocal);
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
      
      <div className="bg-white pb-4">
        <div className="relative pt-5 px-4">
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg mb-3">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="John Doe" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg font-bold">John Doe</h2>
            <Badge className="my-2 bg-reachmesh-blue">Software Engineer</Badge>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded flex items-center">
              <span className="mr-1">Available</span>
              <CheckCircle size={12} />
            </span>
            
            <p className="text-sm text-center mt-4 px-6 text-gray-600">
              Hi! I'm John Doe, a software engineer passionate about creating efficient and maintainable solutions. I love tackling challenging problems and constantly learning new technologies.
            </p>
            
            <div className="flex space-x-8 mt-6">
              <button className="flex flex-col items-center text-reachmesh-blue">
                <ThumbsUp size={20} />
                <span className="text-xs mt-1">Like</span>
              </button>
              <button className="flex flex-col items-center text-gray-500">
                <Bookmark size={20} />
                <span className="text-xs mt-1">Save</span>
              </button>
              <button className="flex flex-col items-center text-gray-500">
                <MessageSquare size={20} />
                <span className="text-xs mt-1">Message</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between px-6 mt-6">
          <div className="flex flex-col items-center">
            <ThumbsUp size={18} className="text-reachmesh-blue" />
            <span className="text-xs font-bold mt-1">3.5k</span>
          </div>
          <div className="flex flex-col items-center">
            <Bookmark size={18} className="text-gray-500" />
            <span className="text-xs font-bold mt-1">573</span>
          </div>
          <div className="flex flex-col items-center">
            <Users size={18} className="text-gray-500" />
            <span className="text-xs font-bold mt-1">14</span>
          </div>
          <div className="flex flex-col items-center">
            <MessageSquare size={18} className="text-gray-500" />
            <span className="text-xs font-bold mt-1">103</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white mt-2 p-4">
        <div className="flex items-center">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="John Doe"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <div className="flex items-center">
              <h3 className="font-medium text-sm">John Doe</h3>
              <span className="mx-1 text-gray-400">·</span>
              <span className="text-xs text-gray-500">Software Engineer</span>
            </div>
            <div className="flex items-center">
              <CheckCircle size={12} className="text-blue-500 mr-1" />
              <span className="text-xs text-gray-500">Verified Professional</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="bg-blue-900 text-white rounded-lg p-4">
            <h3 className="text-lg font-bold mb-1">Software Development</h3>
            <p className="text-sm text-blue-200">Life Cycle</p>
            
            <div className="flex mt-4 text-sm items-center">
              <ThumbsUp size={16} className="mr-1" />
              <span className="mr-4">2.5k</span>
              <Bookmark size={16} className="mr-1" />
              <span>573</span>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default ProfessionalProfile;
