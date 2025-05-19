
import React from 'react';
import { Star, MessageCircle, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryBadge from './CategoryBadge';

interface BusinessCardProps {
  name: string;
  image: string;
  rating: number;
  reviews: number;
  categories: string[];
  saved?: boolean;
  id?: string;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  name,
  image,
  rating,
  reviews,
  categories,
  saved = false,
  id = "1"
}) => {
  return (
    <div className="p-3">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-36 object-cover"
          />
          <button className="absolute top-2 right-2">
            <Bookmark 
              size={18} 
              className={`${saved ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`}
            />
          </button>
        </div>
        
        <div className="p-3">
          <div className="flex justify-between">
            <h3 className="font-medium">{name}</h3>
            
            <div className="flex items-center">
              <Star size={14} className="text-yellow-400" />
              <span className="text-xs ml-1">{rating.toFixed(1)}</span>
              <span className="text-xs text-gray-400 ml-1">({reviews})</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {categories.map((category, index) => (
              <CategoryBadge key={index} label={category} className="text-xs" />
            ))}
          </div>
          
          <Link 
            to={`/business/${id}`}
            className="mt-2 block w-full bg-reachmesh-blue text-white text-center text-sm py-1 rounded"
          >
            View Business
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
