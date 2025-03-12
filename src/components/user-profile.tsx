"use client";
import { Package, Settings, UserCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { createClient } from "../../supabase/client";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const supabase = createClient();
  const router = useRouter();

  return (
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
        <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          Account Settings
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
  );
}
