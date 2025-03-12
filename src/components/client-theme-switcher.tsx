"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ClientThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 18;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={"sm"}
          className="text-gray-300 hover:text-white"
        >
          <motion.div
            whileHover={{ rotate: 45 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {theme === "light" ? (
              <Sun key="light" size={ICON_SIZE} />
            ) : theme === "dark" ? (
              <Moon key="dark" size={ICON_SIZE} />
            ) : (
              <Laptop key="system" size={ICON_SIZE} />
            )}
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-content bg-gray-800 border-gray-700 text-white"
        align="end"
      >
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(e) => setTheme(e)}
        >
          <DropdownMenuRadioItem
            className="flex gap-2 hover:bg-gray-700 focus:bg-gray-700 cursor-pointer"
            value="light"
          >
            <Sun size={ICON_SIZE} className="text-gray-300" />
            <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="flex gap-2 hover:bg-gray-700 focus:bg-gray-700 cursor-pointer"
            value="dark"
          >
            <Moon size={ICON_SIZE} className="text-gray-300" />
            <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="flex gap-2 hover:bg-gray-700 focus:bg-gray-700 cursor-pointer"
            value="system"
          >
            <Laptop size={ICON_SIZE} className="text-gray-300" />
            <span>System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
