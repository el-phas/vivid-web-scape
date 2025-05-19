import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Image, MessageCircle, Save, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import TopNavigation from '@/components/TopNavigation';
import { nanoid } from 'nanoid';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface Post {
  id: string;
  content: string;
  image_url: string | null; // Changed from image to image_url
  created_at: string;
  business_id: string; // Added to match table schema
  user_id: string; // Added to match table schema
  post_type?: string | null; // Added to match table schema
}

const BusinessPostsPage: React.FC = () => {
  const { id: businessId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [newPostContent, setNewPostContent] = useState('');
  const [postImageFile, setPostImageFile] = useState<File | null>(null); // Renamed for clarity
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  
  // Check if user owns this business
  const { data: business, isLoading: businessLoading } = useQuery({
    queryKey: ['business', businessId],
    queryFn: async () => {
      if (!user || !businessId) return null;
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', businessId)
        .eq('user_id', user.id)
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: !!businessId && !!user,
  });
  
  // Fetch posts for this business
  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ['business-posts', businessId],
    queryFn: async () => {
      if (!businessId) return [];
      
      // Querying the 'posts' table now
      const { data, error } = await supabase
        .from('posts') 
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching posts:", error);
        throw error;
      }
      return (data as Post[]) || []; // Cast to Post[]
    },
    enabled: !!businessId,
  });
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setPostImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };
  
  const handleCreatePost = async () => {
    if (!newPostContent.trim() || !businessId || !user) {
      toast({
        title: "Error",
        description: "Post content is required",
        variant: "destructive"
      });
      return;
    }
    
    setIsCreatingPost(true);
    
    try {
      let publicImageUrl = null; // Renamed for clarity
      
      if (postImageFile) {
        const fileExt = postImageFile.name.split('.').pop();
        const fileName = `${nanoid()}.${fileExt}`;
        // Using a more specific path for business post images
        const filePath = `business_posts/${businessId}/${fileName}`;
        
        const { data: buckets } = await supabase.storage.listBuckets();
        const postsBucketExists = buckets?.find(bucket => bucket.name === 'posts_images'); // Consider a more specific bucket name
        
        if (!postsBucketExists) {
          await supabase.storage.createBucket('posts_images', { // Bucket name for post images
            public: true 
          });
        }
        
        const { error: uploadError } = await supabase.storage
          .from('posts_images') // Use the specific bucket
          .upload(filePath, postImageFile);
          
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('posts_images') // Use the specific bucket
          .getPublicUrl(filePath);
          
        publicImageUrl = urlData.publicUrl;
      }
      
      const newPostData = {
        content: newPostContent.trim(),
        image_url: publicImageUrl, // Storing the public URL
        business_id: businessId,
        user_id: user.id
        // post_type could be added here if there's UI for it
      };

      const { error } = await supabase
        .from('posts') // Inserting into 'posts' table
        .insert([newPostData]);
        
      if (error) {
        console.error("Error creating post in DB:", error);
        throw error;
      }
      
      toast({
        title: "Success",
        description: "Post created successfully"
      });
      
      setNewPostContent('');
      setPostImageFile(null);
      setImagePreview(null);
      
      queryClient.invalidateQueries({ queryKey: ['business-posts', businessId] });
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error creating post",
        description: (error as Error).message || "Failed to create post. Check console for details.",
        variant: "destructive"
      });
    } finally {
      setIsCreatingPost(false);
    }
  };
  
  const handleDeletePost = async (postId: string) => {
    if (!postId || !businessId || !user) return;
    
    try {
      // Deleting from 'posts' table
      const { error } = await supabase
        .from('posts') 
        .delete()
        .eq('id', postId)
        .eq('business_id', businessId) // Ensure it's for this business
        .eq('user_id', user.id); // Ensure user owns this post (redundant if RLS handles but good for safety)
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Post deleted successfully"
      });
      
      queryClient.invalidateQueries({ queryKey: ['business-posts', businessId] });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive"
      });
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (businessLoading || !businessId) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }
  
  if (!business) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to manage posts for this business.</p>
          <Button 
            onClick={() => navigate('/business/manage')} 
            className="mt-4"
          >
            Go to My Businesses
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <div className="bg-white p-4 flex items-center">
        <button onClick={() => navigate(`/business/manage/${businessId}`)} className="mr-3"> {/* Corrected navigation path */}
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold">{business?.name || 'Business Posts'}</h1>
          <p className="text-xs text-gray-500">Manage Posts</p>
        </div>
      </div>
      
      <div className="p-4">
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <h2 className="text-lg font-semibold">Create New Post</h2>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="What's new with your business?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="min-h-[120px] mb-4"
            />
            
            {imagePreview && (
              <div className="mb-4">
                <AspectRatio ratio={16 / 9} className="rounded-md overflow-hidden bg-gray-100">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            )}
            
            <div className="flex items-center mt-2">
              <Label 
                htmlFor="post-image" 
                className="cursor-pointer flex items-center text-gray-500 hover:text-gray-700"
              >
                <Image size={18} className="mr-1" />
                <span>Add Image</span>
              </Label>
              <Input 
                id="post-image" 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleCreatePost}
              disabled={isCreatingPost || !newPostContent.trim()}
              className="w-full"
            >
              <Plus size={16} className="mr-1" />
              {isCreatingPost ? 'Creating Post...' : 'Create Post'}
            </Button>
          </CardFooter>
        </Card>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Your Posts</h2>
        </div>
        
        {postsLoading ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                {post.image_url && ( // Changed from post.image to post.image_url
                  <AspectRatio ratio={16 / 9}>
                    <img 
                      src={post.image_url} // Changed from post.image to post.image_url
                      alt="Post" 
                      className="object-cover w-full h-full" 
                    />
                  </AspectRatio>
                )}
                
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500 mb-2">
                    {formatDate(post.created_at)}
                  </p>
                  <p className="whitespace-pre-wrap">{post.content}</p>
                </CardContent>
                
                <CardFooter className="p-4 pt-0 flex justify-between">
                  {/* Removed likes, comments, saves display as these fields are not in the new posts table */}
                  {/* We can add these features back later if needed */}
                  <div className="flex items-center space-x-4">
                     {/* Example: if you want to show post type
                     {post.post_type && <span className="text-xs text-gray-400">{post.post_type}</span>} 
                     */}
                  </div>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500">No posts yet.</p>
            <p className="text-sm text-gray-400 mt-1">
              Create your first post to engage with your customers.
            </p>
          </div>
        )}
      </div>
      
      <TopNavigation activeIcon="business" />
    </div>
  );
};

export default BusinessPostsPage;
