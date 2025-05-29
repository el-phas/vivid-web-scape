
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Edit2, Tag, Image } from 'lucide-react';
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface Category {
  category_id: string;
  name: string;
  business_id: string;
}

interface Product {
  product_id: string;
  name: string;
  description: string | null;
  price: number;
  discount: number | null;
  category_id: string | null;
}

const BusinessProductsPage: React.FC = () => {
  const { id: businessId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    discount: 0,
    image: null as File | null,
    imagePreview: null as string | null,
  });
  
  // Check if user owns this business - temporarily using businesses table
  const { data: business, isLoading: businessLoading } = useQuery({
    queryKey: ['business', businessId],
    queryFn: async () => {
      if (!user || !businessId) return null;
      
      // Temporarily disabled until types are updated
      // const { data, error } = await supabase
      //   .from('businesses')
      //   .select('*')
      //   .eq('business_id', businessId)
      //   .eq('user_id', user.id)
      //   .single();
        
      // if (error) throw error;
      // return data;
      
      // Return mock data for now
      return {
        business_id: businessId,
        name: 'Sample Business',
        user_id: user.id
      };
    },
    enabled: !!businessId && !!user,
  });
  
  // Temporarily return empty arrays until types are updated
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['business-categories', businessId],
    queryFn: async () => {
      if (!businessId) return [];
      
      // Temporarily disabled until types are updated
      // const { data, error } = await supabase
      //   .from('product_categories')
      //   .select('*')
      //   .eq('business_id', businessId)
      //   .order('name');
        
      // if (error) throw error;
      // return data || [];
      
      return [];
    },
    enabled: !!businessId,
  });
  
  // Temporarily return empty arrays until types are updated
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['category-products', selectedCategoryId],
    queryFn: async () => {
      if (!selectedCategoryId) return [];
      
      // Temporarily disabled until types are updated
      // const { data, error } = await supabase
      //   .from('products')
      //   .select('*')
      //   .eq('category_id', selectedCategoryId);
        
      // if (error) throw error;
      // return data || [];
      
      return [];
    },
    enabled: !!selectedCategoryId,
  });
  
  useEffect(() => {
    // Set first category as selected by default
    if (categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(categories[0].category_id);
    }
  }, [categories, selectedCategoryId]);
  
  const handleAddCategory = async () => {
    if (!newCategoryName.trim() || !businessId || !user) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive"
      });
      return;
    }
    
    setIsAddingCategory(true);
    
    try {
      // Temporarily disabled until types are updated
      // const { data, error } = await supabase
      //   .from('product_categories')
      //   .insert([{
      //     name: newCategoryName.trim(),
      //     business_id: businessId
      //   }])
      //   .select();
        
      // if (error) throw error;
      
      toast({
        title: "Info",
        description: "Category functionality temporarily disabled - database types updating",
        variant: "default"
      });
      
      setNewCategoryName('');
      queryClient.invalidateQueries({ queryKey: ['business-categories'] });
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "destructive"
      });
    } finally {
      setIsAddingCategory(false);
    }
  };
  
  const handleDeleteCategory = async (categoryId: string) => {
    if (!categoryId || !businessId || !user) return;
    
    try {
      // Temporarily disabled until types are updated
      toast({
        title: "Info",
        description: "Delete functionality temporarily disabled - database types updating",
        variant: "default"
      });
      
      queryClient.invalidateQueries({ queryKey: ['business-categories'] });
      
      // If the deleted category was selected, reset selection
      if (selectedCategoryId === categoryId) {
        setSelectedCategoryId(null);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive"
      });
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setNewProduct({
      ...newProduct,
      image: file,
      imagePreview: URL.createObjectURL(file)
    });
  };
  
  const handleAddProduct = async () => {
    if (!selectedCategoryId || !businessId || !user) {
      toast({
        title: "Error",
        description: "Please select a category first",
        variant: "destructive"
      });
      return;
    }
    
    if (!newProduct.name.trim()) {
      toast({
        title: "Error",
        description: "Product name is required",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Temporarily disabled until types are updated
      toast({
        title: "Info",
        description: "Product functionality temporarily disabled - database types updating",
        variant: "default"
      });
      
      // Reset form
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        discount: 0,
        image: null,
        imagePreview: null
      });
      
      // Refresh products list
      queryClient.invalidateQueries({ queryKey: ['category-products', selectedCategoryId] });
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive"
      });
    }
  };
  
  const handleDeleteProduct = async (productId: string) => {
    if (!productId || !selectedCategoryId) return;
    
    try {
      // Temporarily disabled until types are updated
      toast({
        title: "Info",
        description: "Delete functionality temporarily disabled - database types updating",
        variant: "default"
      });
      
      queryClient.invalidateQueries({ queryKey: ['category-products', selectedCategoryId] });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      });
    }
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
          <p className="text-gray-600">You don't have permission to manage this business.</p>
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
          <p className="text-xs text-gray-500">Manage Products & Categories</p>
        </div>
      </div>
      
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 m-4">
        <p className="font-bold">Notice:</p>
        <p>Product and category functionality is temporarily disabled while database types are being updated to match your new backend schema.</p>
      </div>
      
      <Tabs defaultValue="categories" className="w-full">
        <div className="bg-white border-b">
          <TabsList className="w-full rounded-none h-12">
            <TabsTrigger value="categories" className="flex-1">Categories</TabsTrigger>
            <TabsTrigger value="products" className="flex-1">Products</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="categories" className="p-4">
          <div className="mb-4">
            <div className="flex mb-2">
              <Input
                placeholder="New category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="mr-2"
                disabled
              />
              <Button 
                onClick={handleAddCategory}
                disabled={true}
                size="sm"
              >
                <Plus size={16} className="mr-1" />
                Add
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500">Categories temporarily disabled.</p>
            <p className="text-sm text-gray-400 mt-1">
              Functionality will be restored once database types are updated.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="p-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500">Products temporarily disabled.</p>
            <p className="text-sm text-gray-400 mt-1">
              Functionality will be restored once database types are updated.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <TopNavigation activeIcon="business" />
    </div>
  );
};

export default BusinessProductsPage;
