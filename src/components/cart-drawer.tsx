"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createClient } from "../../supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export type CartItem = {
  id: number;
  title: string;
  price: string;
  image?: string;
  quantity: number;
};

export default function CartDrawer() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  // Fetch cart items from local storage or database
  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch from your database
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Update local storage when cart changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    // Optimistic update
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    // Optimistic update
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    router.push("/dashboard/checkout");
    setIsOpen(false);
  };

  const EmptyCartMessage = () => (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="w-48 h-48 mb-6">
        <svg viewBox="0 0 100 100" className="text-gray-400">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="#1f2937"
            stroke="#4b5563"
            strokeWidth="2"
          />
          <path
            d="M30,40 Q50,20 70,40"
            stroke="#22d3ee"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="35" cy="40" r="5" fill="#22d3ee" />
          <circle cx="65" cy="40" r="5" fill="#22d3ee" />
          <path
            d="M40,60 Q50,70 60,60"
            stroke="#4b5563"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M20,80 L30,70 L70,70 L80,80"
            fill="#1f2937"
            stroke="#4b5563"
            strokeWidth="2"
          />
          <path
            d="M35,70 L40,80 L60,80 L65,70"
            fill="#1f2937"
            stroke="#4b5563"
            strokeWidth="2"
          />
          <path
            d="M45,80 L45,90 L55,90 L55,80"
            fill="#1f2937"
            stroke="#4b5563"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="#4b5563"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <path
            d="M40,50 L60,50 M50,40 L50,60"
            stroke="#4b5563"
            strokeWidth="1"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
      <p className="text-gray-400 mb-6">
        Looks like you haven't added any AI agents to your cart yet.
      </p>
      <Button
        onClick={() => {
          setIsOpen(false);
          router.push("/dashboard/marketplace");
        }}
        className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90"
      >
        Browse Agents
      </Button>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-300 hover:text-white"
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-gray-900 border-gray-800 text-white">
        <SheetHeader className="border-b border-gray-800 pb-4">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-white text-xl">Your Cart</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : cartItems.length === 0 ? (
          <EmptyCartMessage />
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto py-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center py-4 border-b border-gray-800"
                >
                  <div className="h-16 w-16 bg-gray-800 rounded-md flex items-center justify-center mr-4 flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="rounded-md"
                      />
                    ) : (
                      <div className="text-cyan-400">
                        <ShoppingCart className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/dashboard/agent/${item.id}`}
                      className="font-medium hover:text-cyan-400 transition-colors"
                    >
                      {item.title}
                    </Link>
                    <div className="text-purple-400 font-bold">
                      {item.price}
                    </div>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-md border-gray-700 text-gray-400"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <span className="mx-2 text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-md border-gray-700 text-gray-400"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-red-400"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-800 pt-4 mt-auto">
              <div className="flex justify-between mb-4">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-bold">${calculateTotal()}</span>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full mt-2 border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
