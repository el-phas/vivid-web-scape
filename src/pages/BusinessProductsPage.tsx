
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
  id: string;
  name: string;
  business_id: string;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
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
  
  // Fetch categories for this business
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['business-categories', businessId],
    queryFn: async () => {
      if (!businessId) return [];
      
      const { data, error } = await supabase
        .from('product_categories')
        .select('*')
        .eq('business_id', businessId)
        .order('name');
        
      if (error) throw error;
      return data || [];
    },
    enabled: !!businessId,
  });
  
  // Fetch products for selected category
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['category-products', selectedCategoryId],
    queryFn: async () => {
      if (!selectedCategoryId) return [];
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', selectedCategoryId);
        
      if (error) throw error;
      return data || [];
    },
    enabled: !!selectedCategoryId,
  });
  
  useEffect(() => {
    // Set first category as selected by default
    if (categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(categories[0].id);
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
      const { data, error } = await supabase
        .from('product_categories')
        .insert([{
          name: newCategoryName.trim(),
          business_id: businessId
        }])
        .select();
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Category added successfully"
      });
      
      setNewCategoryName('');
      queryClient.invalidateQueries({ queryKey: ['business-categories'] });
      
      // Select the newly created category
      if (data && data.length > 0) {
        setSelectedCategoryId(data[0].id);
      }
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
      // First delete all products in this category
      await supabase
        .from('products')
        .delete()
        .eq('category_id', categoryId);
        
      // Then delete the category
      const { error } = await supabase
        .from('product_categories')
        .delete()
        .eq('id', categoryId);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Category and its products deleted"
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
      let imageUrl = null;
      
      // Upload image if there is one
      if (newProduct.image) {
        const fileExt = newProduct.image.name.split('.').pop();
        const fileName = `${nanoid()}.${fileExt}`;
        const filePath = `product_images/${fileName}`;
        
        // Ensure bucket exists
        const { data: buckets } = await supabase.storage.listBuckets();
        const productsBucket = buckets?.find(bucket => bucket.name === 'products');
        
        if (!productsBucket) {
          await supabase.storage.createBucket('products', {
            public: true
          });
        }
        
        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(filePath, newProduct.image);
          
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);
          
        imageUrl = urlData.publicUrl;
      }
      
      // Add the product
      const { error } = await supabase
        .from('products')
        .insert([{
          name: newProduct.name.trim(),
          description: newProduct.description.trim() || null,
          price: newProduct.price,
          discount: newProduct.discount || 0,
          image: imageUrl,
          business_id: businessId,
          category_id: selectedCategoryId
        }]);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Product added successfully"
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
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Product deleted successfully"
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
              />
              <Button 
                onClick={handleAddCategory}
                disabled={isAddingCategory}
                size="sm"
              >
                <Plus size={16} className="mr-1" />
                Add
              </Button>
            </div>
          </div>
          
          {categoriesLoading ? (
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
            </div>
          ) : categories.length > 0 ? (
            <div className="space-y-2">
              {categories.map((category) => (
                <Card key={category.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Tag size={16} className="mr-2 text-gray-500" />
                        <CardTitle className="text-base">{category.name}</CardTitle>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500">No categories yet.</p>
              <p className="text-sm text-gray-400 mt-1">
                Create a category to start adding products.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="products" className="p-4">
          {categories.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500">No categories available.</p>
              <p className="text-sm text-gray-400 mt-1">
                Please create a category first in the Categories tab.
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <Label className="block mb-1">Select Category</Label>
                <select 
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={selectedCategoryId || ''}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              {selectedCategoryId && (
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full mb-4">
                        <Plus size={16} className="mr-2" />
                        Add New Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>
                          Add a new product to the selected category.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="mb-4">
                          <Label className="block mb-1">Product Image</Label>
                          <div className="flex items-center justify-center mb-2">
                            <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                              {newProduct.imagePreview ? (
                                <AspectRatio ratio={1 / 1}>
                                  <img
                                    src={newProduct.imagePreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                  />
                                </AspectRatio>
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                  <Image className="h-8 w-8 text-gray-400" />
                                </div>
                              )}
                            </div>
                          </div>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="text-sm"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              placeholder="Product name"
                              value={newProduct.name}
                              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="description" className="text-right">
                              Description
                            </Label>
                            <Textarea
                              id="description"
                              placeholder="Product description (optional)"
                              value={newProduct.description}
                              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="price" className="text-right">
                                Price ($)
                              </Label>
                              <Input
                                id="price"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})}
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="discount" className="text-right">
                                Discount (%)
                              </Label>
                              <Input
                                id="discount"
                                type="number"
                                min="0"
                                max="100"
                                placeholder="0"
                                value={newProduct.discount}
                                onChange={(e) => setNewProduct({...newProduct, discount: parseFloat(e.target.value) || 0})}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="button" onClick={handleAddProduct}>Add Product</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {productsLoading ? (
                    <div className="flex justify-center my-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                    </div>
                  ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {products.map((product) => (
                        <Card key={product.id} className="overflow-hidden">
                          <div className="relative">
                            <AspectRatio ratio={16 / 9}>
                              {product.image ? (
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-400">No Image</span>
                                </div>
                              )}
                            </AspectRatio>
                            {product.discount && product.discount > 0 && (
                              <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                                {product.discount}% OFF
                              </span>
                            )}
                          </div>
                          
                          <CardHeader className="p-4 pb-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-base">{product.name}</CardTitle>
                                {product.description && (
                                  <CardDescription className="mt-1 line-clamp-2">
                                    {product.description}
                                  </CardDescription>
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="p-4 pt-2 pb-0">
                            <div className="flex items-baseline">
                              <span className="text-lg font-bold">
                                ${((product.price * (100 - (product.discount || 0))) / 100).toFixed(2)}
                              </span>
                              {product.discount && product.discount > 0 && (
                                <span className="ml-2 text-sm line-through text-gray-400">
                                  ${product.price.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </CardContent>
                          
                          <CardFooter className="p-4 flex justify-between">
                            <Button 
                              size="sm" 
                              variant="outline"
                              // onClick={() => handleEditProduct(product.id)}
                            >
                              <Edit2 size={14} className="mr-1" />
                              Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 size={14} className="mr-1" />
                              Delete
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                      <p className="text-gray-500">No products in this category yet.</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Click "Add New Product" to create one.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <TopNavigation activeIcon="business" />
    </div>
  );
};

export default BusinessProductsPage;
