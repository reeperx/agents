import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import AdminDashboardLayout from "@/components/admin/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bot,
  Brain,
  Cpu,
  Edit,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import Link from "next/link";

export default async function AdminAgents() {
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

  // Mock agents data
  const agents = [
    {
      id: 1,
      title: "Content Creator Pro",
      icon: <Brain className="w-8 h-8" />,
      price: "$49.99",
      description:
        "Generate blog posts, social media content, and marketing copy with advanced language capabilities",
      sales: 124,
      trending: true,
      status: "active",
    },
    {
      id: 2,
      title: "Data Analyst",
      icon: <Cpu className="w-8 h-8" />,
      price: "$79.99",
      description:
        "Process and visualize complex datasets with AI-powered insights and recommendation engine",
      sales: 89,
      trending: false,
      status: "active",
    },
    {
      id: 3,
      title: "Customer Support Bot",
      icon: <Bot className="w-8 h-8" />,
      price: "$59.99",
      description:
        "24/7 automated customer service with sentiment analysis and escalation protocols",
      sales: 156,
      trending: true,
      status: "active",
    },
    {
      id: 4,
      title: "Code Assistant Pro",
      icon: <Cpu className="w-8 h-8" />,
      price: "$89.99",
      description:
        "AI-powered coding assistant that helps write, debug, and optimize code across multiple languages",
      sales: 203,
      trending: true,
      status: "active",
    },
    {
      id: 5,
      title: "Research Companion",
      icon: <Brain className="w-8 h-8" />,
      price: "$69.99",
      description:
        "Accelerate research with AI-powered literature review, citation management, and insight generation",
      sales: 78,
      trending: false,
      status: "active",
    },
    {
      id: 6,
      title: "Social Media Manager",
      icon: <Bot className="w-8 h-8" />,
      price: "$54.99",
      description:
        "Schedule, create, and analyze social media content across multiple platforms with AI assistance",
      sales: 112,
      trending: false,
      status: "active",
    },
  ];

  return (
    <AdminDashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            Manage AI Agents
          </h2>
          <Link href="/admin/agents/new">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" /> Add New Agent
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search agents..."
              className="pl-8 bg-gray-800 border-gray-700 text-white w-full"
            />
          </div>
          <div className="flex gap-2 ml-auto">
            <select className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white text-sm">
              <option value="all">All Categories</option>
              <option value="content">Content Creation</option>
              <option value="data">Data Analysis</option>
              <option value="support">Customer Support</option>
              <option value="development">Development</option>
            </select>
            <select className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white text-sm">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Agents Table */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-900">
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Agent
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Sales
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Trending
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr
                    key={agent.id}
                    className="border-b border-gray-700 hover:bg-gray-750"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 flex items-center justify-center bg-gray-700 rounded-lg p-2 h-10 w-10">
                          <div className="text-cyan-400">{agent.icon}</div>
                        </div>
                        <div>
                          <div className="font-medium">{agent.title}</div>
                          <div className="text-sm text-gray-400 truncate max-w-xs">
                            {agent.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-purple-400 font-medium">
                      {agent.price}
                    </td>
                    <td className="px-4 py-4">{agent.sales}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                        {agent.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {agent.trending ? (
                        <span className="inline-flex items-center text-yellow-400">
                          <Star className="h-4 w-4 mr-1 fill-yellow-400" />{" "}
                          Trending
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/agents/${agent.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-gray-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-gray-700"
                        >
                          <Trash2 className="h-4 w-4" />
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
              <span className="font-medium text-white">6</span> of{" "}
              <span className="font-medium text-white">6</span> agents
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
