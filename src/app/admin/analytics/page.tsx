import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import AdminDashboardLayout from "@/components/admin/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Download,
  LineChart,
  PieChart,
  TrendingUp,
  Users,
} from "lucide-react";

export default async function AdminAnalytics() {
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

  return (
    <AdminDashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90">
            <Download className="mr-2 h-4 w-4" /> Export Reports
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gray-800"
            >
              <TrendingUp className="h-4 w-4 mr-2" /> Overview
            </TabsTrigger>
            <TabsTrigger
              value="sales"
              className="data-[state=active]:bg-gray-800"
            >
              <BarChart className="h-4 w-4 mr-2" /> Sales
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-gray-800"
            >
              <Users className="h-4 w-4 mr-2" /> Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <LineChart className="h-4 w-4 text-cyan-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,678</div>
                  <p className="text-xs text-green-400">
                    +22.5% from last month
                  </p>
                  <div className="mt-4 h-[80px] w-full bg-gray-700 rounded-md flex items-center justify-center text-gray-500">
                    [Revenue Chart Placeholder]
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Sales by Agent Type
                  </CardTitle>
                  <PieChart className="h-4 w-4 text-cyan-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">324 sales</div>
                  <p className="text-xs text-green-400">
                    +12.5% from last month
                  </p>
                  <div className="mt-4 h-[80px] w-full bg-gray-700 rounded-md flex items-center justify-center text-gray-500">
                    [Sales Distribution Chart Placeholder]
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    User Growth
                  </CardTitle>
                  <Users className="h-4 w-4 text-cyan-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,254 users</div>
                  <p className="text-xs text-green-400">
                    +18.2% from last month
                  </p>
                  <div className="mt-4 h-[80px] w-full bg-gray-700 rounded-md flex items-center justify-center text-gray-500">
                    [User Growth Chart Placeholder]
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle>Monthly Revenue (Last 12 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-gray-700 rounded-md flex items-center justify-center text-gray-500">
                  [Monthly Revenue Chart Placeholder]
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle>Sales by Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full bg-gray-700 rounded-md flex items-center justify-center text-gray-500">
                  [Sales by Agent Chart Placeholder]
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full bg-gray-700 rounded-md flex items-center justify-center text-gray-500">
                  [User Demographics Chart Placeholder]
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
}
