import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import AdminDashboardLayout from "@/components/admin/dashboard-layout";
import {
  Activity,
  ArrowUp,
  CreditCard,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function AdminDashboard() {
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

  // Mock analytics data
  const analyticsData = {
    totalSales: "$12,456",
    salesGrowth: "+12.5%",
    totalAgents: 24,
    agentsGrowth: "+4.3%",
    totalUsers: 1254,
    usersGrowth: "+18.2%",
    totalRevenue: "$45,678",
    revenueGrowth: "+22.5%",
    recentSales: [
      {
        id: 1,
        agent: "Content Creator Pro",
        customer: "John Doe",
        amount: "$49.99",
        status: "completed",
        date: "2023-11-15",
      },
      {
        id: 2,
        agent: "Data Analyst",
        customer: "Jane Smith",
        amount: "$79.99",
        status: "completed",
        date: "2023-11-14",
      },
      {
        id: 3,
        agent: "Customer Support Bot",
        customer: "Alex Johnson",
        amount: "$59.99",
        status: "completed",
        date: "2023-11-14",
      },
      {
        id: 4,
        agent: "Code Assistant Pro",
        customer: "Sarah Miller",
        amount: "$89.99",
        status: "completed",
        date: "2023-11-13",
      },
      {
        id: 5,
        agent: "Research Companion",
        customer: "Michael Chen",
        amount: "$69.99",
        status: "completed",
        date: "2023-11-12",
      },
    ],
  };

  return (
    <AdminDashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-md hover:opacity-90 transition-all">
              Download Reports
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.totalRevenue}
              </div>
              <p className="text-xs text-green-400 flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                {analyticsData.revenueGrowth} from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.totalSales}
              </div>
              <p className="text-xs text-green-400 flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                {analyticsData.salesGrowth} from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.totalUsers}
              </div>
              <p className="text-xs text-green-400 flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                {analyticsData.usersGrowth} from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Agents
              </CardTitle>
              <Package className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.totalAgents}
              </div>
              <p className="text-xs text-green-400 flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                {analyticsData.agentsGrowth} from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Sales */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription className="text-gray-400">
                You made {analyticsData.recentSales.length} sales this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {analyticsData.recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {sale.customer}
                      </p>
                      <p className="text-sm text-gray-400">{sale.agent}</p>
                    </div>
                    <div className="ml-auto font-medium">{sale.amount}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Overview */}
          <Card className="col-span-3 bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
              <CardDescription className="text-gray-400">
                Activity for the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 text-cyan-400 mr-2" />
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">
                      New Agents Added
                    </p>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-400">5 new agents</p>
                      <p className="text-sm text-green-400">+25%</p>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 h-full rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <ShoppingCart className="h-4 w-4 text-cyan-400 mr-2" />
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">
                      Sales Completed
                    </p>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-400">28 sales</p>
                      <p className="text-sm text-green-400">+12%</p>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 h-full rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users className="h-4 w-4 text-cyan-400 mr-2" />
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">
                      New User Registrations
                    </p>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-400">42 users</p>
                      <p className="text-sm text-green-400">+18%</p>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 h-full rounded-full"
                        style={{ width: "82%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
