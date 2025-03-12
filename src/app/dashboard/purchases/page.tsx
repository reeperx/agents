import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bot,
  Brain,
  Download,
  FileJson,
  FileText,
  Search,
  ShoppingBag,
} from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import Link from "next/link";

export default async function Purchases() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock purchased agents data
  const purchasedAgents = [
    {
      id: 1,
      title: "Content Creator Pro",
      icon: <Brain className="w-10 h-10" />,
      purchaseDate: "2023-10-15",
      description:
        "Generate blog posts, social media content, and marketing copy with advanced language capabilities",
      version: "2.1.0",
    },
    {
      id: 3,
      title: "Customer Support Bot",
      icon: <Bot className="w-10 h-10" />,
      purchaseDate: "2023-09-28",
      description:
        "24/7 automated customer service with sentiment analysis and escalation protocols",
      version: "1.3.5",
    },
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="min-h-screen bg-gray-950 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Purchases</h1>
              <p className="text-gray-400">
                Manage and download your purchased AI agents
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
                <Search className="h-4 w-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search purchases..."
                  className="bg-transparent border-none text-white focus:outline-none w-full"
                />
              </div>
              <Link href="/dashboard/marketplace">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90">
                  Browse More Agents
                </Button>
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="bg-gray-900 border border-gray-800">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gray-800"
              >
                All Purchases
              </TabsTrigger>
              <TabsTrigger
                value="recent"
                className="data-[state=active]:bg-gray-800"
              >
                Recent
              </TabsTrigger>
              <TabsTrigger
                value="updates"
                className="data-[state=active]:bg-gray-800"
              >
                Updates Available
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {purchasedAgents.length > 0 ? (
                <div className="space-y-6">
                  {purchasedAgents.map((agent) => (
                    <div
                      key={agent.id}
                      className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0 flex items-center justify-center bg-gray-700 rounded-lg p-4 h-24 w-24">
                          <div className="text-cyan-400">{agent.icon}</div>
                        </div>

                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row justify-between mb-2">
                            <h3 className="text-xl font-semibold">
                              {agent.title}
                            </h3>
                            <div className="text-sm text-gray-400">
                              Purchased on{" "}
                              {new Date(
                                agent.purchaseDate,
                              ).toLocaleDateString()}
                            </div>
                          </div>

                          <p className="text-gray-400 mb-4">
                            {agent.description}
                          </p>

                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="text-sm text-gray-400">
                              Version:{" "}
                              <span className="text-cyan-400">
                                {agent.version}
                              </span>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                className="border-gray-700 hover:bg-gray-700"
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                Download PDF
                              </Button>
                              <Button
                                variant="outline"
                                className="border-gray-700 hover:bg-gray-700"
                              >
                                <FileJson className="mr-2 h-4 w-4" />
                                Download JSON
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-900 rounded-xl border border-gray-800">
                  <ShoppingBag className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">
                    No purchases yet
                  </h2>
                  <p className="text-gray-400 mb-6">
                    You haven't purchased any AI agents yet.
                  </p>
                  <Link href="/dashboard/marketplace">
                    <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90">
                      Browse Marketplace
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            <TabsContent value="recent">
              <div className="text-center py-12 text-gray-400">
                Your recent purchases will be displayed here
              </div>
            </TabsContent>

            <TabsContent value="updates">
              <div className="text-center py-12 text-gray-400">
                Agents with available updates will be displayed here
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
