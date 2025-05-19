
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  useDeviceTheme: boolean;
  setUseDeviceTheme: (use: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: false,
  toggleTheme: () => {},
  useDeviceTheme: false,
  setUseDeviceTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return false;
  });
  
  const [useDeviceTheme, setUseDeviceTheme] = useState(() => {
    return localStorage.getItem('useDeviceTheme') === 'true';
  });

  // Handle device theme preference
  useEffect(() => {
    if (useDeviceTheme) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setIsDarkTheme(e.matches);
        applyTheme(e.matches);
      };

      setIsDarkTheme(mediaQuery.matches);
      applyTheme(mediaQuery.matches);
      
      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    } else {
      applyTheme(isDarkTheme);
    }
  }, [useDeviceTheme]);

  // Apply theme when it changes
  useEffect(() => {
    if (!useDeviceTheme) {
      applyTheme(isDarkTheme);
      localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    }
  }, [isDarkTheme, useDeviceTheme]);

  // Save useDeviceTheme preference
  useEffect(() => {
    localStorage.setItem('useDeviceTheme', String(useDeviceTheme));
  }, [useDeviceTheme]);

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    if (!useDeviceTheme) {
      setIsDarkTheme(prev => !prev);
    }
  };

  const handleSetUseDeviceTheme = (use: boolean) => {
    setUseDeviceTheme(use);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        isDarkTheme, 
        toggleTheme, 
        useDeviceTheme,
        setUseDeviceTheme: handleSetUseDeviceTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
