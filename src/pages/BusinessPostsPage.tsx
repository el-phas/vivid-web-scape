
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
  image: string | null;
  created_at: string;
  likes_count: number;
  saves_count: number;
  comments: number;
}

const BusinessPostsPage: React.FC = () => {
  const { id: businessId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [newPostContent, setNewPostContent] = useState('');
  const [postImage, setPostImage] = useState<File | null>(null);
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
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    },
    enabled: !!businessId,
  });
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setPostImage(file);
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
      let imageUrl = null;
      
      // Upload image if there is one
      if (postImage) {
        const fileExt = postImage.name.split('.').pop();
        const fileName = `${nanoid()}.${fileExt}`;
        const filePath = `post_images/${fileName}`;
        
        // Ensure bucket exists
        const { data: buckets } = await supabase.storage.listBuckets();
        const postsBucket = buckets?.find(bucket => bucket.name === 'posts');
        
        if (!postsBucket) {
          await supabase.storage.createBucket('posts', {
            public: true
          });
        }
        
        const { error: uploadError } = await supabase.storage
          .from('posts')
          .upload(filePath, postImage);
          
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('posts')
          .getPublicUrl(filePath);
          
        imageUrl = urlData.publicUrl;
      }
      
      // Create the post
      const { error } = await supabase
        .from('posts')
        .insert([{
          content: newPostContent.trim(),
          image: imageUrl,
          business_id: businessId,
          user_id: user.id
        }]);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Post created successfully"
      });
      
      // Reset form
      setNewPostContent('');
      setPostImage(null);
      setImagePreview(null);
      
      // Refresh posts list
      queryClient.invalidateQueries({ queryKey: ['business-posts', businessId] });
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive"
      });
    } finally {
      setIsCreatingPost(false);
    }
  };
  
  const handleDeletePost = async (postId: string) => {
    if (!postId || !businessId || !user) return;
    
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)
        .eq('business_id', businessId)
        .eq('user_id', user.id);
        
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
        <button onClick={() => navigate('/business/manage')} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold">{business.name}</h1>
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
                {post.image && (
                  <AspectRatio ratio={16 / 9}>
                    <img 
                      src={post.image} 
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
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-500">
                      <Heart size={18} className="mr-1" />
                      <span>{post.likes_count || 0}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MessageCircle size={18} className="mr-1" />
                      <span>{post.comments || 0}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Save size={18} className="mr-1" />
                      <span>{post.saves_count || 0}</span>
                    </div>
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
