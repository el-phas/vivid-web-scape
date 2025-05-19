
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchBarProps {
  defaultRadius?: string;
  onRadiusChange?: (radius: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ defaultRadius = 'local', onRadiusChange }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(query)}&radius=${defaultRadius}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex px-4 py-3">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress} 
          className="w-full px-10 py-2 border rounded-full text-sm"
        />
        <Search 
          className="absolute left-4 top-2.5 text-gray-400" 
          size={16} 
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
