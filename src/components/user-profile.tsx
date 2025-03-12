"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../supabase/client";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Package, Settings, LogOut, User, ShieldCheck } from "lucide-react";
import UserAvatar from "./user-avatar";
import { User as SupabaseUser } from "@supabase/supabase-js";

export default function UserProfile() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          // Check if user is admin
          const { data: userData } = await supabase
            .from("users")
            .select("role")
            .eq("id", user.id)
            .single();

          setIsAdmin(userData?.role === "admin");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);

      if (session?.user) {
        // Check if user is admin
        const { data: userData } = await supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .single();

        setIsAdmin(userData?.role === "admin");
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };

  if (loading) {
    return (
      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
        <div className="h-5 w-5 rounded-full bg-gray-700 animate-pulse"></div>
      </Button>
    );
  }

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-8 w-8 overflow-hidden"
        >
          <UserAvatar user={user} size="sm" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-gray-800 border-gray-700 text-white"
      >
        <div className="flex items-center justify-start p-2 gap-2">
          <UserAvatar user={user} size="sm" />
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm font-medium">
              {user.user_metadata.full_name || user.email}
            </p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700"
          onClick={() => router.push("/dashboard/profile")}
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700"
          onClick={() => router.push("/dashboard/purchases")}
        >
          <Package className="mr-2 h-4 w-4" />
          My Purchases
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700"
          onClick={() => router.push("/dashboard/settings")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>

        {isAdmin && (
          <>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem
              className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700"
              onClick={() => router.push("/admin/dashboard")}
            >
              <ShieldCheck className="mr-2 h-4 w-4 text-cyan-400" />
              Admin Dashboard
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700 text-red-400 hover:text-red-300"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
