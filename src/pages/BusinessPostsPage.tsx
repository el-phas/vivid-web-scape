
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import TopNavigation from '@/components/TopNavigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface Post {
  post_id: number;
  content: string;
  created_at: string;
  user_id: number;
}

const BusinessPostsPage: React.FC = () => {
  const { id: businessIdParam } = useParams<{ id: string }>();
  const businessId = businessIdParam ? parseInt(businessIdParam) : null;
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [newPostContent, setNewPostContent] = useState('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  
  // Check if user owns this business
  const { data: business, isLoading: businessLoading } = useQuery({
    queryKey: ['business', businessId],
    queryFn: async () => {
      if (!user || !businessId) return null;
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('business_id', businessId)
        .eq('user_id', parseInt(user.id))
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: !!businessId && !!user,
  });
  
  // Fetch posts for this business - simplified to just get user posts for now
  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ['business-posts', businessId],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('posts') 
        .select('*')
        .eq('user_id', parseInt(user.id))
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching posts:", error);
        throw error;
      }
      return (data as Post[]) || [];
    },
    enabled: !!user,
  });
  
  const handleCreatePost = async () => {
    if (!newPostContent.trim() || !user) {
      toast({
        title: "Error",
        description: "Post content is required",
        variant: "destructive"
      });
      return;
    }
    
    setIsCreatingPost(true);
    
    try {
      const newPostData = {
        content: newPostContent.trim(),
        user_id: parseInt(user.id)
      };

      const { error } = await supabase
        .from('posts')
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
  
  const handleDeletePost = async (postId: number) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('posts') 
        .delete()
        .eq('post_id', postId)
        .eq('user_id', parseInt(user.id));
        
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
              <Card key={post.post_id} className="overflow-hidden">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500 mb-2">
                    {formatDate(post.created_at)}
                  </p>
                  <p className="whitespace-pre-wrap">{post.content}</p>
                </CardContent>
                
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <div className="flex items-center space-x-4">
                  </div>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeletePost(post.post_id)}
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
