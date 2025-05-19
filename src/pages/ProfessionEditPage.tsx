
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

type ProfessionalFormData = {
  name: string;
  title: string;
  bio: string;
  image?: string;
};

const ProfessionEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profession, setProfession] = useState<any>(null);

  const form = useForm<ProfessionalFormData>({
    defaultValues: {
      name: '',
      title: '',
      bio: '',
    },
  });

  useEffect(() => {
    const fetchProfession = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      if (!id) {
        navigate('/profession/manage');
        return;
      }

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('professionals')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        if (!data) {
          toast({
            title: "Not Found",
            description: "Professional profile not found or you don't have permission to edit it",
            variant: "destructive"
          });
          navigate('/profession/manage');
          return;
        }

        setProfession(data);
        setImagePreview(data.image || null);
        
        form.reset({
          name: data.name || '',
          title: data.title || '',
          bio: data.bio || '',
        });
      } catch (error) {
        console.error('Error fetching professional profile:', error);
        toast({
          title: "Error",
          description: "Could not load professional profile information",
          variant: "destructive"
        });
        navigate('/profession/manage');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfession();
  }, [id, user, navigate, toast, form]);

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

  const onSubmit = async (data: ProfessionalFormData) => {
    if (!user || !id) {
      toast({
        title: "Error",
        description: "You must be logged in and have a valid profile ID",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      let imageUrl = profession?.image || '';

      // Upload new image if selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${nanoid()}.${fileExt}`;
        const filePath = `professional_images/${fileName}`;

        // Ensure the storage bucket exists
        const { data: buckets } = await supabase.storage.listBuckets();
        const profBucket = buckets?.find(bucket => bucket.name === 'professionals');
        
        if (!profBucket) {
          // Create the bucket if it doesn't exist
          const { error: createBucketError } = await supabase.storage.createBucket('professionals', {
            public: true
          });
          
          if (createBucketError) {
            console.error('Error creating bucket:', createBucketError);
          }
        }

        const { error: uploadError } = await supabase.storage
          .from('professionals')
          .upload(filePath, imageFile);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from('professionals')
          .getPublicUrl(filePath);

        imageUrl = urlData.publicUrl;
      }

      // Update professional profile
      const { error } = await supabase
        .from('professionals')
        .update({
          name: data.name,
          title: data.title,
          bio: data.bio,
          image: imageUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Professional profile has been updated.",
      });

      navigate('/profession/manage');
    } catch (error) {
      console.error('Error updating professional profile:', error);
      toast({
        title: "Error",
        description: "Failed to update professional profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <div className="bg-white p-4 flex items-center">
        <button onClick={() => navigate('/profession/manage')} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold">Edit Professional Profile</h1>
      </div>

      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
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
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Professional Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Software Engineer, Consultant, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell others about yourself and your professional experience..."
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
              {isSubmitting ? 'Updating Profile...' : 'Update Professional Profile'}
            </Button>
          </form>
        </Form>
      </div>
      
      <TopNavigation activeIcon="profession" />
    </div>
  );
};

export default ProfessionEditPage;
