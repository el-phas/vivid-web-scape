
import React, { useState } from 'react';
import { ArrowLeft, Check, Crown, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TopNavigation from '@/components/TopNavigation';
import { Tables } from '@/integrations/supabase/types';

type Plan = Tables<'plans'>;

const PlansPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const { data: plans = [], isLoading } = useQuery<Plan[], Error>({
    queryKey: ['plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true });

      if (error) throw error;
      return data || [];
    }
  });

  const handleSelectPlan = async (planId: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to select a plan.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    setSelectedPlan(planId);
    
    // Here you would typically integrate with a payment processor
    toast({
      title: "Plan Selected",
      description: "Redirecting to payment...",
    });

    // For now, just show success
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Your plan has been updated successfully.",
      });
      setSelectedPlan(null);
    }, 2000);
  };

  const getPlanIcon = (planName: string) => {
    const name = planName.toLowerCase();
    if (name.includes('premium') || name.includes('pro')) return Crown;
    if (name.includes('plus') || name.includes('advanced')) return Star;
    return Zap;
  };

  const getPlanColor = (index: number) => {
    const colors = ['border-gray-200', 'border-blue-200 bg-blue-50', 'border-purple-200 bg-purple-50'];
    return colors[index % colors.length] || 'border-gray-200';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 pb-16">
        <div className="bg-white p-4 flex items-center">
          <button onClick={() => navigate('/account')} className="mr-3">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold">Subscription Plans</h1>
        </div>
        
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        </div>
        
        <TopNavigation activeIcon="account" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <div className="bg-white p-4 flex items-center">
        <button onClick={() => navigate('/account')} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold">Subscription Plans</h1>
      </div>

      <div className="p-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
          <p className="text-gray-600">Select the perfect plan for your networking needs</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan, index) => {
            const PlanIcon = getPlanIcon(plan.name);
            const isPopular = index === 1; // Make middle plan popular
            
            return (
              <Card key={plan.plan_id} className={`relative ${getPlanColor(index)} ${isPopular ? 'ring-2 ring-blue-500' : ''}`}>
                {isPopular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="p-3 rounded-full bg-blue-100">
                      <PlanIcon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description || 'Perfect for getting started'}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/{plan.billing_cycle}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">{plan.max_connections || 'Unlimited'} connections</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">{plan.max_projects || 'Unlimited'} projects</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm capitalize">{plan.support_level} support</span>
                    </li>
                    {plan.billing_cycle === 'yearly' && (
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">2 months free</span>
                      </li>
                    )}
                  </ul>

                  <Button
                    onClick={() => handleSelectPlan(plan.plan_id)}
                    disabled={selectedPlan === plan.plan_id}
                    className={`w-full ${isPopular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={isPopular ? 'default' : 'outline'}
                  >
                    {selectedPlan === plan.plan_id ? 'Processing...' : 'Select Plan'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {plans.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No subscription plans available at the moment.</p>
          </div>
        )}

        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">Can I change my plan anytime?</h4>
              <p className="text-sm text-gray-600 mt-1">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900">What payment methods do you accept?</h4>
              <p className="text-sm text-gray-600 mt-1">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900">Is there a free trial?</h4>
              <p className="text-sm text-gray-600 mt-1">Yes, all new users get a 14-day free trial with full access to premium features.</p>
            </div>
          </div>
        </div>
      </div>

      <TopNavigation activeIcon="account" />
    </div>
  );
};

export default PlansPage;
