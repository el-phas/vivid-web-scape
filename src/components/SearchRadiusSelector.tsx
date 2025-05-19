
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchRadiusSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchRadiusSelector: React.FC<SearchRadiusSelectorProps> = ({ value, onChange }) => {
  const options = [
    { label: "Local", value: "local", description: "0-50 km" },
    { label: "Regional", value: "regional", description: "50-500 km" },
    { label: "National", value: "national", description: "500-2500 km" },
    { label: "International", value: "international", description: "2500-10000 km" },
    { label: "Global", value: "global", description: "10000+ km" },
  ];
  
  const selectedOption = options.find(option => option.value === value) || options[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          size="sm" 
          variant="outline"
          className={`rounded-full px-3 py-0 h-7 text-xs flex items-center ${
            value === "local" 
              ? 'bg-reachmesh-blue text-white dark:bg-blue-600' 
              : 'border-reachmesh-blue text-reachmesh-blue dark:border-blue-400 dark:text-blue-300'
          }`}
        >
          {selectedOption.label}
          <ChevronDown className="ml-1" size={12} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white dark:bg-gray-800">
        {options.map((option) => (
          <DropdownMenuItem 
            key={option.value}
            className={`flex flex-col items-start justify-between ${
              value === option.value 
                ? 'bg-blue-50 dark:bg-blue-900' 
                : ''
            }`}
            onClick={() => onChange(option.value)}
          >
            <div className="dark:text-white">{option.label}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{option.description}</div>
            {value === option.value && <Check className="absolute right-2 text-blue-500 dark:text-blue-300" size={14} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchRadiusSelector;
