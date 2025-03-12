"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "../../../supabase/client";
import { CreditCard, Lock, PaypalIcon, ShieldCheck } from "lucide-react";
import Link from "next/link";

type CartItem = {
  id: number;
  title: string;
  price: string;
  quantity: number;
};

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Fetch cart items from local storage
  useEffect(() => {
    const fetchCartItems = () => {
      setLoading(true);
      try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Fetch user data if logged in
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Get user profile data
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (profile) {
            setFormData(prev => ({
              ...prev,
              email: user.email || '',
              firstName: profile.first_name || '',
              lastName: profile.last_name || '',
              address: profile.address || '',
              city: profile.city || '',
              state: profile.state || '',
              zipCode: profile.zip_code || '',
              country: profile.country || 'US',
            }));
          } else {
            setFormData(prev => ({
              ...prev,
              email: user.email || '',
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [supabase]);

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  // Calculate tax (assuming 8% tax rate)
  const calculateTax = () => {
    return calculateSubtotal() * 0.08;
  };

  // Calculate total
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // In a real app, you would process the payment here
      // For demonstration, we'll simulate a successful payment after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear the cart
      localStorage.removeItem('cart');

      // Redirect to success page
      router.push('/dashboard/checkout/success');
    } catch (error) {
      console.error('Error processing payment:', error);
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col">
        <DashboardNavbar />
        <main className="flex-1 container mx-auto px-4 py-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col">
        <DashboardNavbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-700">
              <CreditCard className="w-full h-full" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-gray-400 mb-6">Add some AI agents to your cart before proceeding to checkout.</p>
            <Link href="/dashboard/marketplace">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90">
                Browse Agents
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <DashboardNavbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="flex-1">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State / Province</Label>
                  <Input
                    id="state"
                    name="state"
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    name="country"
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white mt-1 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }