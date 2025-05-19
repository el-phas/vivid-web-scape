
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import TopNavigation from '@/components/TopNavigation';
import { nanoid } from 'nanoid';

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
import { AspectRatio } from '@/components/ui/aspect-ratio';

type BusinessFormData = {
  name: string;
  description: string;
  contactEmail?: string;
  contactPhone?: string;
};

const BusinessCreatePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BusinessFormData>({
    defaultValues: {
      name: '',
      description: '',
      contactEmail: '',
      contactPhone: '',
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

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
      let imageUrl = '';

      // Upload image if selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${nanoid()}.${fileExt}`;
        const filePath = `business_images/${fileName}`;

        // Ensure the storage bucket exists
        const { data: buckets } = await supabase.storage.listBuckets();
        const businessBucket = buckets?.find(bucket => bucket.name === 'businesses');
        
        if (!businessBucket) {
          // Create the bucket if it doesn't exist
          const { error: createBucketError } = await supabase.storage.createBucket('businesses', {
            public: true
          });
          
          if (createBucketError) {
            console.error('Error creating bucket:', createBucketError);
          }
        }

        const { error: uploadError } = await supabase.storage
          .from('businesses')
          .upload(filePath, imageFile);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from('businesses')
          .getPublicUrl(filePath);

        imageUrl = urlData.publicUrl;
      }

      // Create contact info JSON
      const contactInfo = {
        email: data.contactEmail || null,
        phone: data.contactPhone || null,
      };

      // Create business
      const { error } = await supabase.from('businesses').insert({
        user_id: user.id,
        name: data.name,
        description: data.description,
        image: imageUrl || null,
        contact_info: contactInfo,
      });

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
        description: "Failed to create business. Please try again.",
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
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Logo/Image
                </label>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                    {imagePreview ? (
                      <AspectRatio ratio={1 / 1}>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400 text-sm">No image</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-center">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="max-w-sm text-sm"
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="name"
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

              <div className="mt-6">
                <h3 className="text-md font-medium mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="contact@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
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
