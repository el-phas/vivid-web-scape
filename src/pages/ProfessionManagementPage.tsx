import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import TopNavigation from '@/components/TopNavigation';
import { useQuery } from '@tanstack/react-query';
import { Tables } from '@/integrations/supabase/types'; // Import Tables type

type ProfessionalType = Tables<'professionals'>; // Use Tables type

const ProfessionManagementPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const { data: professionals = [], isLoading, refetch } = useQuery<ProfessionalType[], Error>({ // Type useQuery
    queryKey: ['user-professionals', user?.id],
    queryFn: async () => {
      if (!user) {
        // navigate('/auth'); // Consider removing
        return [];
      }

      try {
        const { data, error } = await supabase
          .from('professionals')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;
        return (data as ProfessionalType[]) || [];
      } catch (error) {
        console.error('Error fetching professionals:', error);
        toast({
          title: "Error",
          description: "Could not load your professional profile information.",
          variant: "destructive"
        });
        return [];
      }
    },
    enabled: !!user
  });

  const handleCreateProfession = () => {
    navigate('/profession/create');
  };

  const handleEditProfession = (id: string) => {
    navigate(`/profession/edit/${id}`);
  };

  const handleDeleteProfession = async (id: string) => {
    if(!user) return;
    try {
      setIsDeleting(id);
      const { error } = await supabase
        .from('professionals')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id); // Ensure only own profiles are deleted

      if (error) throw error;

      refetch();
      toast({
        title: "Professional Profile Deleted",
        description: "Your professional profile has been successfully removed.",
      });
    } catch (error) {
      console.error('Error deleting professional profile:', error);
      toast({
        title: "Error",
        description: "Could not delete the professional profile.",
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
        <h1 className="text-lg font-bold">Manage Professional Profiles</h1>
      </div>
      
      <div className="p-4">
        <Button 
          onClick={handleCreateProfession} 
          className="w-full mb-4 flex items-center justify-center"
        >
          <Plus size={18} className="mr-2" />
          Create New Professional Profile
        </Button>

        {isLoading ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          </div>
        ) : professionals.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {professionals.map((professional) => (
              <div key={professional.id} className="p-4 border-b">
                <div className="flex items-center">
                  <div className="mr-3">
                    {professional.image ? (
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img
                          src={professional.image}
                          alt={professional.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{professional.name}</h3>
                    <p className="text-xs text-gray-500">{professional.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {professional.bio || "No bio available"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProfession(professional.id)}
                      className="p-2 rounded-full bg-gray-100"
                      disabled={isDeleting === professional.id}
                    >
                      <Edit2 size={16} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteProfession(professional.id)}
                      className="p-2 rounded-full bg-red-100"
                      disabled={isDeleting === professional.id}
                    >
                      {isDeleting === professional.id ? (
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
            <p className="text-gray-500 mb-4">You haven't created any professional profiles yet.</p>
            <p className="text-sm text-gray-400">
              Create your first professional profile to get started.
            </p>
          </div>
        )}
      </div>
      
      <TopNavigation activeIcon="profession" />
    </div>
  );
};

export default ProfessionManagementPage;
