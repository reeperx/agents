import { ReactNode } from "react";
import Link from "next/link";
import {
  BarChart3,
  Bot,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Users,
} from "lucide-react";
import { ThemeSwitcher } from "../theme-switcher";
import { MotionAside, MotionMain } from "../motion-wrapper";

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <MotionAside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-64 bg-gray-900 border-r border-gray-800 p-4 hidden md:block"
      >
        <div className="flex items-center gap-2 mb-8">
          <Bot className="h-6 w-6 text-cyan-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Admin Panel
          </span>
        </div>

        <nav className="space-y-1">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/agents"
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
          >
            <Package className="h-5 w-5" />
            Agents
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
          >
            <Users className="h-5 w-5" />
            Users
          </Link>
          <Link
            href="/admin/analytics"
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
          >
            <BarChart3 className="h-5 w-5" />
            Analytics
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Theme</span>
            <ThemeSwitcher />
          </div>
          <Link
            href="/sign-in"
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Link>
        </div>
      </MotionAside>

      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900 border-b border-gray-800 p-4 w-full fixed top-0 z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-cyan-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Admin
            </span>
          </div>
          <ThemeSwitcher />
        </div>
      </div>

      {/* Main Content */}
      <MotionMain
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 md:ml-64 md:mt-0 mt-16"
      >
        {children}
      </MotionMain>
    </div>
  );
}
