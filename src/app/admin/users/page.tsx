import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import AdminDashboardLayout from "@/components/admin/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Ban,
  Check,
  Edit,
  Filter,
  MoreHorizontal,
  Search,
  User,
  UserPlus,
} from "lucide-react";

export default async function AdminUsers() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Check if user is admin (in a real app, you'd check a role field)
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!userData || userData.role !== "admin") {
    return redirect("/dashboard");
  }

  // Mock users data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "customer",
      status: "active",
      purchases: 3,
      joinDate: "2023-09-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "customer",
      status: "active",
      purchases: 5,
      joinDate: "2023-08-22",
    },
    {
      id: 3,
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      role: "admin",
      status: "active",
      purchases: 0,
      joinDate: "2023-07-10",
    },
    {
      id: 4,
      name: "Sarah Miller",
      email: "sarah.miller@example.com",
      role: "customer",
      status: "inactive",
      purchases: 1,
      joinDate: "2023-10-05",
    },
    {
      id: 5,
      name: "Michael Chen",
      email: "michael.chen@example.com",
      role: "customer",
      status: "active",
      purchases: 7,
      joinDate: "2023-06-18",
    },
  ];

  return (
    <AdminDashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Manage Users</h2>
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90">
            <UserPlus className="mr-2 h-4 w-4" /> Add New User
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              className="pl-8 bg-gray-800 border-gray-700 text-white w-full"
            />
          </div>
          <div className="flex gap-2 ml-auto">
            <select className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white text-sm">
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
            <select className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white text-sm">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-700"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-900">
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Purchases
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Join Date
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-700 hover:bg-gray-750"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 flex items-center justify-center bg-gray-700 rounded-full h-10 w-10">
                          <User className="h-5 w-5 text-gray-300" />
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === "admin" ? "bg-purple-900/30 text-purple-400" : "bg-blue-900/30 text-blue-400"}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === "active" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">{user.purchases}</td>
                    <td className="px-4 py-4">{user.joinDate}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-gray-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {user.status === "active" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-gray-700"
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-green-400 hover:text-green-300 hover:bg-gray-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-gray-700"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-700">
            <div className="text-sm text-gray-400">
              Showing <span className="font-medium text-white">1</span> to{" "}
              <span className="font-medium text-white">5</span> of{" "}
              <span className="font-medium text-white">5</span> users
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-700"
                disabled
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-700"
                disabled
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
