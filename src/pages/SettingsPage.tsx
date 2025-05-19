
import React, { useState } from 'react';
import { ArrowLeft, Settings, Moon, Sun, Palette, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/context/ThemeContext';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isDarkTheme, toggleTheme, useDeviceTheme, setUseDeviceTheme } = useTheme();
  
  const [appSettings, setAppSettings] = useState({
    notifications: true,
    soundEffects: true,
    autoPlay: false,
    language: 'en',
  });
  
  const handleSettingToggle = (setting: string) => {
    setAppSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    
    toast({
      title: "Setting updated",
      description: "Your preference has been saved."
    });
  };
  
  const handleLanguageChange = (value: string) => {
    setAppSettings(prev => ({
      ...prev,
      language: value
    }));
    
    toast({
      title: "Language updated",
      description: `App language has been changed to ${value === 'en' ? 'English' : value === 'es' ? 'Spanish' : value === 'fr' ? 'French' : 'English'}.`
    });
  };
  
  const handleUseDeviceThemeToggle = () => {
    setUseDeviceTheme(!useDeviceTheme);
    toast({
      title: "Theme setting updated",
      description: !useDeviceTheme 
        ? "App will now use your device theme preference." 
        : "App will now use your manual theme selection."
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white p-4 flex items-center">
        <button onClick={() => navigate('/account')} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold">Settings</h1>
      </div>
      
      <div className="p-4">
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Palette size={18} className="mr-2 text-reachmesh-blue" />
            <h2 className="text-md font-semibold">Theme Settings</h2>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Use Device Theme</h3>
                  <p className="text-xs text-gray-500">Follow your device's light/dark mode setting</p>
                </div>
                <Switch 
                  checked={useDeviceTheme}
                  onCheckedChange={handleUseDeviceThemeToggle}
                />
              </div>
            </div>
            
            {!useDeviceTheme && (
              <div className="p-4">
                <div>
                  <h3 className="font-medium mb-2">Choose Theme</h3>
                  <RadioGroup 
                    defaultValue={isDarkTheme ? "dark" : "light"}
                    onValueChange={(value) => {
                      if ((value === "dark" && !isDarkTheme) || (value === "light" && isDarkTheme)) {
                        toggleTheme();
                      }
                    }}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light" className="flex items-center">
                        <Sun size={16} className="mr-2" />
                        Light Theme
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark" className="flex items-center">
                        <Moon size={16} className="mr-2" />
                        Dark Theme
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Settings size={18} className="mr-2 text-reachmesh-blue" />
            <h2 className="text-md font-semibold">App Settings</h2>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-xs text-gray-500">Receive push notifications</p>
                </div>
                <Switch 
                  checked={appSettings.notifications}
                  onCheckedChange={() => handleSettingToggle('notifications')}
                />
              </div>
            </div>
            
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Sound Effects</h3>
                  <p className="text-xs text-gray-500">Play sounds for notifications and actions</p>
                </div>
                <Switch 
                  checked={appSettings.soundEffects}
                  onCheckedChange={() => handleSettingToggle('soundEffects')}
                />
              </div>
            </div>
            
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Auto-play Media</h3>
                  <p className="text-xs text-gray-500">Automatically play videos in feed</p>
                </div>
                <Switch 
                  checked={appSettings.autoPlay}
                  onCheckedChange={() => handleSettingToggle('autoPlay')}
                />
              </div>
            </div>
            
            <div className="p-4">
              <div>
                <h3 className="font-medium mb-2">Language</h3>
                <Select 
                  value={appSettings.language}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Globe size={18} className="mr-2 text-reachmesh-blue" />
            <h2 className="text-md font-semibold">About</h2>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden p-4">
            <p className="text-sm mb-2">ReachMesh v1.0.0</p>
            <p className="text-xs text-gray-500">© 2025 ReachMesh. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
