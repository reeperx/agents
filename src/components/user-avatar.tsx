"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "../../supabase/client";
import { User } from "@supabase/supabase-js";

type UserAvatarProps = {
  user: User | null;
  size?: "sm" | "md" | "lg";
};

export default function UserAvatar({ user, size = "md" }: UserAvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [initials, setInitials] = useState("");
  const supabase = createClient();

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  useEffect(() => {
    if (!user) return;

    // Get user profile data including avatar URL
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("avatar_url, full_name")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (data?.avatar_url) {
          // Get the actual URL from storage
          const { data: storageData } = await supabase.storage
            .from("avatars")
            .getPublicUrl(data.avatar_url);

          setAvatarUrl(storageData.publicUrl);
        }

        // Generate initials from full name or email
        if (data?.full_name) {
          const names = data.full_name.split(" ");
          const initials = names
            .map((name) => name.charAt(0).toUpperCase())
            .join("");
          setInitials(initials.substring(0, 2));
        } else if (user.email) {
          setInitials(user.email.charAt(0).toUpperCase());
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Fallback to email initial
        if (user.email) {
          setInitials(user.email.charAt(0).toUpperCase());
        }
      }
    };

    fetchProfile();
  }, [user, supabase]);

  if (!user) return null;

  return (
    <Avatar
      className={`${sizeClasses[size]} bg-gray-800 border border-gray-700`}
    >
      <AvatarImage src={avatarUrl || undefined} alt="User" />
      <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-600 text-white font-medium">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
