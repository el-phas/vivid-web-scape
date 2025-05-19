
import React from 'react';
import { Home, PenTool, LayoutGrid, MapPin, Users, Smartphone, Plus } from 'lucide-react';

const CategoryIcons: React.FC = () => {
  const categories = [
    { icon: Home, label: 'Home' },
    { icon: PenTool, label: 'Tools' },
    { icon: LayoutGrid, label: 'Business' },
    { icon: MapPin, label: 'Location' },
    { icon: Users, label: 'People' },
    { icon: Smartphone, label: 'Mobile' },
    { icon: Plus, label: 'More' }
  ];

  return (
    <div className="py-4 px-2">
      <div className="flex justify-between">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center space-y-1">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-reachmesh-blue text-reachmesh-blue">
              <category.icon size={18} />
            </div>
            <span className="text-xs">{category.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryIcons;
