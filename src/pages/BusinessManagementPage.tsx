
import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, Package, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import TopNavigation from '@/components/TopNavigation';
import { useQuery } from '@tanstack/react-query';
import { Tables } from '@/integrations/supabase/types';

type BusinessType = Tables<'businesses'>;

const BusinessManagementPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const { data: businesses = [], isLoading, refetch } = useQuery<BusinessType[], Error>({
    queryKey: ['user-businesses', user?.id],
    queryFn: async () => {
      if (!user) {
        return [];
      }

      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .eq('user_id', parseInt(user.id)); // Convert string to number

        if (error) throw error;
        return (data as BusinessType[]) || [];
      } catch (error) {
        console.error('Error fetching businesses:', error);
        toast({
          title: "Error",
          description: "Could not load your business information.",
          variant: "destructive"
        });
        return [];
      }
    },
    enabled: !!user
  });

  const handleCreateBusiness = () => {
    navigate('/business/create');
  };

  const handleEditBusiness = (businessId: number) => {
    navigate(`/business/edit/${businessId}`);
  };

  const handleManageProducts = (businessId: number) => {
    navigate(`/business/${businessId}/products`);
  };
  
  const handleManagePosts = (businessId: number) => {
    navigate(`/business/${businessId}/posts`);
  };

  const handleDeleteBusiness = async (businessId: number) => {
    if (!user) return;
    try {
      setIsDeleting(businessId);
      const { error } = await supabase
        .from('businesses')
        .delete()
        .eq('business_id', businessId)
        .eq('user_id', parseInt(user.id));

      if (error) throw error;

      refetch();
      toast({
        title: "Business Deleted",
        description: "Your business has been successfully removed.",
      });
    } catch (error) {
      console.error('Error deleting business:', error);
      toast({
        title: "Error",
        description: "Could not delete the business.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <div className="bg-white p-4 flex items-center">
        <button onClick={() => navigate('/account')} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold">Manage Businesses</h1>
      </div>
      
      <div className="p-4">
        <Button 
          onClick={handleCreateBusiness} 
          className="w-full mb-4 flex items-center justify-center"
        >
          <Plus size={18} className="mr-2" />
          Create New Business
        </Button>

        {isLoading ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          </div>
        ) : businesses.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {businesses.map((business) => (
              <div key={business.business_id} className="p-4 border-b">
                <div className="flex items-center">
                  <div className="mr-3">
                    <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{business.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {business.description || "No description available"}
                    </p>
                    
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button 
                        onClick={() => handleManageProducts(business.business_id)}
                        className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded flex items-center"
                      >
                        <Package size={14} className="mr-1" />
                        Products
                      </button>
                      
                      <button 
                        onClick={() => handleManagePosts(business.business_id)}
                        className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded flex items-center"
                      >
                        <FileText size={14} className="mr-1" />
                        Posts
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditBusiness(business.business_id)}
                      className="p-2 rounded-full bg-gray-100"
                      disabled={isDeleting === business.business_id}
                    >
                      <Edit2 size={16} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteBusiness(business.business_id)}
                      className="p-2 rounded-full bg-red-100"
                      disabled={isDeleting === business.business_id}
                    >
                       {isDeleting === business.business_id ? (
                        <div className="h-4 w-4 border-2 border-t-red-500 rounded-full animate-spin" />
                      ) : (
                        <Trash2 size={16} className="text-red-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500 mb-4">You haven't created any businesses yet.</p>
            <p className="text-sm text-gray-400">
              Create your first business to get started.
            </p>
          </div>
        )}
      </div>
      
      <TopNavigation activeIcon="business" />
    </div>
  );
};

export default BusinessManagementPage;
