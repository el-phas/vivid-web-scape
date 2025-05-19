import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import TopNavigation from '@/components/TopNavigation';
import { nanoid } from 'nanoid';
import { useQuery } from '@tanstack/react-query';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ProfessionType {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

type ProfessionalFormData = {
  name: string;
  title: string;
  bio: string;
  image?: string;
  type_id?: string;
  working_hours?: {
    monday: { start: string; end: string; closed: boolean };
    tuesday: { start: string; end: string; closed: boolean };
    wednesday: { start: string; end: string; closed: boolean };
    thursday: { start: string; end: string; closed: boolean };
    friday: { start: string; end: string; closed: boolean };
    saturday: { start: string; end: string; closed: boolean };
    sunday: { start: string; end: string; closed: boolean };
  };
};

const ProfessionCreatePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch profession types
  const { data: professionTypes = [] } = useQuery<ProfessionType[]>({
    queryKey: ['professionTypes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profession_types')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching profession types:', error);
        return [];
      }
      return data || [];
    }
  });

  // Initialize working hours
  const defaultWorkingHours = {
    monday: { start: '09:00', end: '17:00', closed: false },
    tuesday: { start: '09:00', end: '17:00', closed: false },
    wednesday: { start: '09:00', end: '17:00', closed: false },
    thursday: { start: '09:00', end: '17:00', closed: false },
    friday: { start: '09:00', end: '17:00', closed: false },
    saturday: { start: '09:00', end: '17:00', closed: true },
    sunday: { start: '09:00', end: '17:00', closed: true },
  };

  const [workingHours, setWorkingHours] = useState(defaultWorkingHours);

  const form = useForm<ProfessionalFormData>({
    defaultValues: {
      name: '',
      title: '',
      bio: '',
      type_id: '',
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

  const handleWorkingHoursChange = (
    day: keyof typeof workingHours,
    field: 'start' | 'end' | 'closed',
    value: string | boolean
  ) => {
    setWorkingHours({
      ...workingHours,
      [day]: {
        ...workingHours[day],
        [field]: value,
      },
    });
  };

  const onSubmit = async (data: ProfessionalFormData) => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create a professional profile",
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

      // Create professional profile with type and working hours
      const { error } = await supabase.from('professionals').insert({
        user_id: user.id,
        name: data.name,
        title: data.title,
        bio: data.bio,
        image: imageUrl || null,
        type_id: data.type_id || null,
        working_hours: workingHours,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your professional profile has been created.",
      });

      navigate('/profession/manage');
    } catch (error) {
      console.error('Error creating professional profile:', error);
      toast({
        title: "Error",
        description: "Failed to create professional profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Day labels for the working hours form
  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-16">
      <div className="bg-white dark:bg-gray-800 p-4 flex items-center">
        <button onClick={() => navigate('/profession/manage')} className="mr-3 dark:text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold dark:text-white">Create Professional Profile</h1>
      </div>

      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Profile Information</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Profile Image
                </label>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                    {imagePreview ? (
                      <AspectRatio ratio={1 / 1}>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                        <span className="text-gray-400 dark:text-gray-500 text-sm">No image</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-center">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="max-w-sm text-sm dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white">Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        {...field} 
                        className="dark:bg-gray-700 dark:text-white"
                      />
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
                    <FormLabel className="dark:text-white">Professional Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. Software Engineer, Consultant, etc." 
                        {...field} 
                        className="dark:bg-gray-700 dark:text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type_id"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="dark:text-white">Profession Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full dark:bg-gray-700 dark:text-white">
                          <SelectValue placeholder="Select a profession type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:bg-gray-700">
                        {professionTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id} className="dark:text-white">
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="dark:text-white">Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell others about yourself and your professional experience..."
                        className="min-h-[120px] dark:bg-gray-700 dark:text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Card className="dark:bg-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
                  <Clock size={18} />
                  Working Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                {days.map((day) => (
                  <div key={day.key} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 last:mb-0">
                    <div className="w-24 text-gray-700 dark:text-gray-300">{day.label}</div>
                    <div className="flex items-center gap-3 flex-1">
                      <Input
                        type="time"
                        value={workingHours[day.key as keyof typeof workingHours].start}
                        onChange={(e) => handleWorkingHoursChange(day.key as keyof typeof workingHours, 'start', e.target.value)}
                        disabled={workingHours[day.key as keyof typeof workingHours].closed}
                        className="w-24 dark:bg-gray-700 dark:text-white"
                      />
                      <span className="dark:text-white">to</span>
                      <Input
                        type="time"
                        value={workingHours[day.key as keyof typeof workingHours].end}
                        onChange={(e) => handleWorkingHoursChange(day.key as keyof typeof workingHours, 'end', e.target.value)}
                        disabled={workingHours[day.key as keyof typeof workingHours].closed}
                        className="w-24 dark:bg-gray-700 dark:text-white"
                      />
                      <div className="flex items-center gap-2 ml-2">
                        <input
                          type="checkbox"
                          id={`${day.key}-closed`}
                          checked={workingHours[day.key as keyof typeof workingHours].closed}
                          onChange={(e) => handleWorkingHoursChange(day.key as keyof typeof workingHours, 'closed', e.target.checked)}
                          className="h-4 w-4"
                        />
                        <label htmlFor={`${day.key}-closed`} className="text-sm text-gray-600 dark:text-gray-300">
                          Closed
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Creating Profile...' : 'Create Professional Profile'}
            </Button>
          </form>
        </Form>
      </div>
      
      <TopNavigation activeIcon="profession" />
    </div>
  );
};

export default ProfessionCreatePage;
