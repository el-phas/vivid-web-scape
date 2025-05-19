
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon, ChevronDown } from 'lucide-react';
import SearchRadiusSelector from './SearchRadiusSelector';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/context/ThemeContext';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  toggleLocation?: (value: string) => void;
  locationValue: string;
  toggleTheme?: () => void;
  isDarkTheme?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  toggleLocation, 
  locationValue,
  toggleTheme,
  isDarkTheme
}) => {
  const { toast } = useToast();
  // Use the props if provided, otherwise use context
  const themeContext = useTheme();
  const isThemeDark = isDarkTheme !== undefined ? isDarkTheme : themeContext.isDarkTheme;
  const handleThemeToggle = toggleTheme || themeContext.toggleTheme;
  
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const modes = [
    { value: 'local', label: 'Local', description: '0-50 km' },
    { value: 'regional', label: 'Regional', description: '50-500 km' },
    { value: 'national', label: 'National', description: '500-2500 km' },
    { value: 'international', label: 'International', description: '2500-10000 km' },
    { value: 'global', label: 'Global', description: '10000+ km' },
  ];
  
  const getModeLabel = () => {
    return modes.find(mode => mode.value === locationValue)?.label || 'Local';
  };

  const handleModeChange = (value: string) => {
    if (toggleLocation) {
      toggleLocation(value);
      
      toast({
        title: "Mode updated",
        description: `Content scope changed to ${modes.find(mode => mode.value === value)?.label || value} (${modes.find(mode => mode.value === value)?.description})`,
      });
    }
  };
  
  return (
    <header className="p-4 bg-white dark:bg-gray-800 dark:text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-reachmesh-blue dark:text-blue-400">Reach<span className="text-black dark:text-white">Mesh</span></h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {isHomePage && (
            <div className="flex items-center">
              <span className="mr-2 text-sm dark:text-gray-300">Mode:</span>
              <SearchRadiusSelector value={locationValue} onChange={handleModeChange} />
            </div>
          )}
          
          <button onClick={handleThemeToggle} className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700">
            {isThemeDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
