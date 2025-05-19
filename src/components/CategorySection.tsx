
import React from 'react';
import CategoryBadge from './CategoryBadge';

interface Category {
  name: string;
  count: number;
}

interface CategorySectionProps {
  title: string;
  categories: Category[];
  showMore?: () => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, categories, showMore }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center px-4 mb-2">
        <h2 className="font-medium text-sm">{title}</h2>
        {showMore && (
          <button onClick={showMore} className="text-xs text-reachmesh-blue">
            Show more
          </button>
        )}
      </div>
      <div className="px-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <CategoryBadge
              key={index}
              label={category.name}
              count={category.count}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
