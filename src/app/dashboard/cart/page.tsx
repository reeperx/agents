import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import {
  Brain,
  CreditCard,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import Link from "next/link";

export default async function Cart() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock cart data
  const cartItems = [
    {
      id: 1,
      title: "Content Creator Pro",
      price: 49.99,
      quantity: 1,
      description:
        "Generate blog posts, social media content, and marketing copy with advanced language capabilities",
    },
    {
      id: 3,
      title: "Customer Support Bot",
      price: 59.99,
      quantity: 1,
      description:
        "24/7 automated customer service with sentiment analysis and escalation protocols",
    },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <>
      <DashboardNavbar />
      <main className="min-h-screen bg-gray-950 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

          {cartItems.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="md:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col sm:flex-row gap-4"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center bg-gray-700 rounded-lg p-4 h-20 w-20">
                      <Brain className="h-10 w-10 text-cyan-400" />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <span className="font-bold text-purple-400">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">
                        {item.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-gray-700 hover:bg-gray-700"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-gray-700 hover:bg-gray-700"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-gray-700"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 h-fit">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 mb-3">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Checkout with PayPal
                </Button>

                <Link href="/dashboard/marketplace">
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 hover:bg-gray-700"
                  >
                    Continue Shopping
                  </Button>
                </Link>

                <div className="mt-6 text-xs text-gray-400">
                  <p className="mb-2">
                    By completing your purchase you agree to our{" "}
                    <a href="#" className="text-cyan-400 hover:underline">
                      Terms of Service
                    </a>
                    .
                  </p>
                  <p>
                    All transactions are secure and encrypted. Payment
                    processing by PayPal.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-900 rounded-xl border border-gray-800">
              <ShoppingBag className="h-16 w-16 mx-auto text-gray-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-400 mb-6">
                Looks like you haven't added any AI agents to your cart yet.
              </p>
              <Link href="/dashboard/marketplace">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90">
                  Browse Marketplace
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
