
import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryBadgeProps {
  label: string;
  count?: number;
  className?: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ label, count, className }) => {
  return (
    <span className={cn('category-badge category-badge-blue', className)}>
      {label}
      {count !== undefined && <span className="ml-1">({count})</span>}
    </span>
  );
};

export default CategoryBadge;
