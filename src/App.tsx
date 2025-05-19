
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import { DirectionProvider } from '@radix-ui/react-direction';

import Index from '@/pages/Index';
import AuthPage from '@/pages/AuthPage';
import NotFound from '@/pages/NotFound';
import AccountPage from '@/pages/AccountPage';
import ProfileEditPage from '@/pages/ProfileEditPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import NetworkPage from '@/pages/NetworkPage';
import MessagesPage from '@/pages/MessagesPage';
import NotificationsPage from '@/pages/NotificationsPage';
import MapView from '@/pages/MapView';
import SearchResults from '@/pages/SearchResults';
import SavedPage from '@/pages/SavedPage';
import BusinessManagementPage from '@/pages/BusinessManagementPage';
import ProfessionManagementPage from '@/pages/ProfessionManagementPage';
import BusinessCreatePage from '@/pages/BusinessCreatePage';
import BusinessEditPage from '@/pages/BusinessEditPage';
import ProfessionCreatePage from '@/pages/ProfessionCreatePage';
import ProfessionEditPage from '@/pages/ProfessionEditPage';
import ProfessionPostPage from '@/pages/ProfessionPostPage';
import BusinessProductsPage from '@/pages/BusinessProductsPage';
import BusinessPostsPage from '@/pages/BusinessPostsPage';
import PrivacySecurityPage from '@/pages/PrivacySecurityPage';
import SettingsPage from '@/pages/SettingsPage';

function App() {
  return (
    <DirectionProvider dir="ltr">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
            <Route path="/account/edit" element={<ProtectedRoute><ProfileEditPage /></ProtectedRoute>} />
            <Route path="/network" element={<ProtectedRoute><NetworkPage /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
            <Route path="/map" element={<ProtectedRoute><MapView /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
            <Route path="/saved" element={<ProtectedRoute><SavedPage /></ProtectedRoute>} />
            
            {/* Privacy/Security and Settings routes */}
            <Route path="/account/privacy" element={<ProtectedRoute><PrivacySecurityPage /></ProtectedRoute>} />
            <Route path="/account/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            
            {/* Routes for business and profession management */}
            <Route path="/business/manage" element={<ProtectedRoute><BusinessManagementPage /></ProtectedRoute>} />
            <Route path="/business/create" element={<ProtectedRoute><BusinessCreatePage /></ProtectedRoute>} />
            <Route path="/business/edit/:id" element={<ProtectedRoute><BusinessEditPage /></ProtectedRoute>} />
            
            {/* New routes for business product and post management */}
            <Route path="/business/:id/products" element={<ProtectedRoute><BusinessProductsPage /></ProtectedRoute>} />
            <Route path="/business/:id/posts" element={<ProtectedRoute><BusinessPostsPage /></ProtectedRoute>} />
            
            <Route path="/profession/manage" element={<ProtectedRoute><ProfessionManagementPage /></ProtectedRoute>} />
            <Route path="/profession/create" element={<ProtectedRoute><ProfessionCreatePage /></ProtectedRoute>} />
            <Route path="/profession/edit/:id" element={<ProtectedRoute><ProfessionEditPage /></ProtectedRoute>} />
            <Route path="/profession-post" element={<ProtectedRoute><ProfessionPostPage /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </Router>
    </DirectionProvider>
  );
}

export default App;
