"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  Bot,
  Home,
  Package,
  Search,
  ShoppingCart,
  UserCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();

  return (
    <nav className="w-full border-b border-gray-800 bg-gray-900 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
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
          <div className="hidden md:flex items-center space-x-4 ml-8">
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Browse
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Featured
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Categories
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              My Agents
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 w-64">
          <Search className="h-4 w-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search agents..."
            className="bg-transparent border-none text-white text-sm focus:outline-none w-full"
          />
        </div>

        <div className="flex gap-4 items-center">
          <Link
            href="#"
            className="relative text-gray-300 hover:text-white transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white"
              >
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-gray-800 border-gray-700 text-gray-200"
            >
              <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
                <Package className="mr-2 h-4 w-4" />
                My Purchases
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer"
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.refresh();
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
