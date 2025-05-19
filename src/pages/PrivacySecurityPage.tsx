
import React, { useState } from 'react';
import { ArrowLeft, Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const PrivacySecurityPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    showOnlineStatus: true,
    showProfileToPublic: true,
    allowLocationSharing: false,
    allowMessagesFromNonConnections: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    rememberDevices: true,
  });

  const handlePrivacyToggle = (setting: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    
    toast({
      title: "Setting updated",
      description: "Your privacy preference has been saved."
    });
  };
  
  const handleSecurityToggle = (setting: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    
    toast({
      title: "Setting updated",
      description: "Your security preference has been saved."
    });
  };
  
  const handlePasswordReset = async () => {
    setLoading(true);
    try {
      if (!user?.email) {
        toast({
          title: "Error",
          description: "Could not find your email address.",
          variant: "destructive"
        });
        return;
      }
      
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/account/reset-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password reset email sent",
        description: "Check your inbox for instructions to reset your password."
      });
    } catch (error) {
      console.error("Error requesting password reset:", error);
      toast({
        title: "Error",
        description: "Could not send password reset email. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white p-4 flex items-center">
        <button onClick={() => navigate('/account')} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold">Privacy & Security</h1>
      </div>
      
      <div className="p-4">
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Shield size={18} className="mr-2 text-reachmesh-blue" />
            <h2 className="text-md font-semibold">Privacy Settings</h2>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Show Online Status</h3>
                  <p className="text-xs text-gray-500">Allow others to see when you're online</p>
                </div>
                <Switch 
                  checked={privacySettings.showOnlineStatus}
                  onCheckedChange={() => handlePrivacyToggle('showOnlineStatus')}
                />
              </div>
            </div>
            
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Public Profile</h3>
                  <p className="text-xs text-gray-500">Make your profile visible to everyone</p>
                </div>
                <Switch 
                  checked={privacySettings.showProfileToPublic}
                  onCheckedChange={() => handlePrivacyToggle('showProfileToPublic')}
                />
              </div>
            </div>
            
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Location Sharing</h3>
                  <p className="text-xs text-gray-500">Share your precise location</p>
                </div>
                <Switch 
                  checked={privacySettings.allowLocationSharing}
                  onCheckedChange={() => handlePrivacyToggle('allowLocationSharing')}
                />
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Messages From Non-Connections</h3>
                  <p className="text-xs text-gray-500">Allow people you don't know to message you</p>
                </div>
                <Switch 
                  checked={privacySettings.allowMessagesFromNonConnections}
                  onCheckedChange={() => handlePrivacyToggle('allowMessagesFromNonConnections')}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Lock size={18} className="mr-2 text-reachmesh-blue" />
            <h2 className="text-md font-semibold">Security Settings</h2>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-xs text-gray-500">Add an extra layer of security</p>
                </div>
                <Switch 
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={() => handleSecurityToggle('twoFactorAuth')}
                />
              </div>
            </div>
            
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Login Notifications</h3>
                  <p className="text-xs text-gray-500">Get notified of new logins to your account</p>
                </div>
                <Switch 
                  checked={securitySettings.loginNotifications}
                  onCheckedChange={() => handleSecurityToggle('loginNotifications')}
                />
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Remember Devices</h3>
                  <p className="text-xs text-gray-500">Stay logged in on devices you use regularly</p>
                </div>
                <Switch 
                  checked={securitySettings.rememberDevices}
                  onCheckedChange={() => handleSecurityToggle('rememberDevices')}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <EyeOff size={18} className="mr-2 text-reachmesh-blue" />
            <h2 className="text-md font-semibold">Account Security</h2>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden p-4">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handlePasswordReset}
              disabled={loading}
            >
              {loading ? "Processing..." : "Change Password"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySecurityPage;
