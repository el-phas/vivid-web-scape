
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import TopNavigation from '@/components/TopNavigation';
import { Tables, TablesUpdate } from '@/integrations/supabase/types';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type BusinessFormData = {
  name: string;
  description: string;
};

type BusinessType = Tables<'businesses'>;

const BusinessEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [currentBusiness, setCurrentBusiness] = useState<BusinessType | null>(null);

  const form = useForm<BusinessFormData>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }
      if (!id) {
        navigate('/business/manage');
        toast({ title: "Error", description: "Business ID is missing.", variant: "destructive" });
        return;
      }

      try {
        setIsLoadingData(true);
        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .eq('business_id', parseInt(id))
          .eq('user_id', parseInt(user.id))
          .single();

        if (error) {
            if (error.code === 'PGRST116') {
                 toast({
                    title: "Not Found",
                    description: "Business not found or you don't have permission to edit it.",
                    variant: "destructive"
                });
                navigate('/business/manage');
                return;
            }
            throw error;
        }
        
        if (!data) {
          toast({
            title: "Not Found",
            description: "Business not found or you don't have permission to edit it",
            variant: "destructive"
          });
          navigate('/business/manage');
          return;
        }

        setCurrentBusiness(data as BusinessType);
        
        form.reset({
          name: data.name || '',
          description: data.description || '',
        });
      } catch (error) {
        console.error('Error fetching business:', error);
        toast({
          title: "Error",
          description: `Could not load business information: ${error instanceof Error ? error.message : String(error)}`,
          variant: "destructive"
        });
        navigate('/business/manage');
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchBusiness();
  }, [id, user, navigate, toast, form]);

  const onSubmit = async (data: BusinessFormData) => {
    if (!user || !id || !currentBusiness) {
      toast({
        title: "Error",
        description: "User not authenticated, business ID missing, or business data not loaded.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const updateData: TablesUpdate<'businesses'> = {
        name: data.name,
        description: data.description,
      };

      const { error } = await supabase
        .from('businesses')
        .update(updateData)
        .eq('business_id', parseInt(id))
        .eq('user_id', parseInt(user.id));

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Business details have been updated.",
      });
      navigate('/business/manage');
    } catch (error) {
      console.error('Error updating business:', error);
      toast({
        title: "Error",
        description: `Failed to update business: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <div className="bg-white p-4 flex items-center">
        <button onClick={() => navigate('/business/manage')} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold">Edit Business</h1>
      </div>

      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">Business Information</h2>

              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Business name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your business name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your business..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Updating Business...' : 'Update Business'}
            </Button>
          </form>
        </Form>
      </div>
      
      <TopNavigation activeIcon="business" />
    </div>
  );
};

export default BusinessEditPage;
