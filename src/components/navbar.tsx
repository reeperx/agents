import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Bot, ShoppingCart } from "lucide-react";
import UserProfile from "./user-profile";
import { ThemeSwitcher } from "./theme-switcher";
import { MotionNav } from "./motion-wrapper";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <MotionNav
      className="w-full border-b border-gray-800 bg-gray-900 dark:bg-gray-900 py-4 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          prefetch
          className="text-xl font-bold text-white flex items-center"
        >
          <Bot className="h-6 w-6 mr-2 text-cyan-400" />
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            AI Marketplace
          </span>
        </Link>
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Browse Agents
              </Link>
              <Link
                href="/dashboard/cart"
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Link>
              <UserProfile />
            </>
          ) : (
            <Link
              href="/sign-up"
              className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-md hover:opacity-90 transition-all"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </MotionNav>
  );
}
