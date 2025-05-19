
import React from 'react';
import { Star, MessageCircle, Bookmark, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryBadge from './CategoryBadge';

interface ProfessionalCardProps {
  name: string;
  title: string;
  rating: number;
  reviews: number;
  messages: number;
  likes: number;
  image: string;
  online?: boolean;
  categories: string[];
  saved?: boolean;
  verified?: boolean;
  id?: string;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  name,
  title,
  rating,
  reviews,
  messages,
  likes,
  image,
  online = false,
  categories,
  saved = false,
  verified = false,
  id = "1"
}) => {
  return (
    <div className="p-3">
      <div className="flex p-2 bg-white rounded-lg shadow-sm">
        <div className="relative w-12 h-12 mr-3">
          <img 
            src={image} 
            alt={name} 
            className="w-12 h-12 rounded-full object-cover"
          />
          {online && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                <h3 className="font-medium text-sm">{name}</h3>
                <span className="mx-1 text-gray-400">·</span>
                <span className="text-xs text-gray-500">{title}</span>
              </div>
              
              <div className="flex items-center mt-1">
                {verified && (
                  <span className="mr-2 bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded">Verified</span>
                )}
                <Link to={`/professional/${id}`} className="text-xs bg-reachmesh-blue text-white px-1.5 py-0.5 rounded">
                  Connect
                </Link>
              </div>
            </div>
            
            <button>
              <Bookmark 
                size={16} 
                className={`${saved ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
              />
            </button>
          </div>
          
          <div className="flex items-center space-x-3 mt-2 text-xs">
            <div className="category-badge-rating">
              <Star size={12} className="text-yellow-400" />
              <span>{rating.toFixed(1)}</span>
            </div>
            
            <div className="category-badge-rating">
              <MessageCircle size={12} className="text-gray-400" />
              <span>{messages}</span>
            </div>
            
            <div className="category-badge-rating">
              <Heart size={12} className="text-gray-400" />
              <span>{likes}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {categories.map((category, index) => (
              <CategoryBadge key={index} label={category} className="text-xs" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;
