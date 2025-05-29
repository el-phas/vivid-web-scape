
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import TopNavigation from '@/components/TopNavigation';
import { TablesInsert } from '@/integrations/supabase/types';

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

const BusinessCreatePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BusinessFormData>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (data: BusinessFormData) => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create a business",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    try {
      setIsSubmitting(true);

      const businessData: TablesInsert<'businesses'> = {
        user_id: parseInt(user.id), // Convert string to number
        name: data.name,
        description: data.description,
      };

      const { error } = await supabase.from('businesses').insert(businessData);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your business has been created.",
      });

      navigate('/business/manage');
    } catch (error) {
      console.error('Error creating business:', error);
      toast({
        title: "Error",
        description: `Failed to create business: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <div className="bg-white p-4 flex items-center">
        <button onClick={() => navigate('/business/manage')} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold">Create Business</h1>
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
              {isSubmitting ? 'Creating Business...' : 'Create Business'}
            </Button>
          </form>
        </Form>
      </div>
      
      <TopNavigation activeIcon="business" />
    </div>
  );
};

export default BusinessCreatePage;
