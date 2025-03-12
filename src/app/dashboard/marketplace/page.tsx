import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bot,
  Brain,
  Cpu,
  Filter,
  Grid3X3,
  List,
  Search,
  ShoppingCart,
  Star,
  Tag,
} from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";

export default async function Marketplace() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for AI agents
  const agents = [
    {
      id: 1,
      title: "Content Creator Pro",
      icon: <Brain className="w-10 h-10" />,
      price: "$49.99",
      description:
        "Generate blog posts, social media content, and marketing copy with advanced language capabilities",
      tags: ["Content", "Marketing", "GPT-4"],
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      title: "Data Analyst",
      icon: <Cpu className="w-10 h-10" />,
      price: "$79.99",
      description:
        "Process and visualize complex datasets with AI-powered insights and recommendation engine",
      tags: ["Analytics", "Business", "Charts"],
      rating: 4.6,
      reviews: 89,
    },
    {
      id: 3,
      title: "Customer Support Bot",
      icon: <Bot className="w-10 h-10" />,
      price: "$59.99",
      description:
        "24/7 automated customer service with sentiment analysis and escalation protocols",
      tags: ["Support", "Chat", "Multilingual"],
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      title: "Code Assistant Pro",
      icon: <Cpu className="w-10 h-10" />,
      price: "$89.99",
      description:
        "AI-powered coding assistant that helps write, debug, and optimize code across multiple languages",
      tags: ["Development", "Coding", "Debugging"],
      rating: 4.9,
      reviews: 203,
    },
    {
      id: 5,
      title: "Research Companion",
      icon: <Brain className="w-10 h-10" />,
      price: "$69.99",
      description:
        "Accelerate research with AI-powered literature review, citation management, and insight generation",
      tags: ["Research", "Academic", "Analysis"],
      rating: 4.5,
      reviews: 78,
    },
    {
      id: 6,
      title: "Social Media Manager",
      icon: <Bot className="w-10 h-10" />,
      price: "$54.99",
      description:
        "Schedule, create, and analyze social media content across multiple platforms with AI assistance",
      tags: ["Social", "Marketing", "Analytics"],
      rating: 4.6,
      reviews: 112,
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
              <h1 className="text-3xl font-bold mb-2">AI Agent Marketplace</h1>
              <p className="text-gray-400">
                Discover and purchase powerful AI agents to enhance your
                workflow
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-300 hover:text-white transition-colors cursor-pointer" />
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </div>
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90">
                My Purchases
              </Button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 w-full md:w-96">
                <Search className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search for AI agents..."
                  className="bg-transparent border-none text-white focus:outline-none w-full"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Tag className="h-4 w-4 mr-2" />
                  Categories
                </Button>
                <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-none border-r border-gray-700 text-cyan-400"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-none text-gray-400"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="bg-gray-900 border border-gray-800">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gray-800"
              >
                All Agents
              </TabsTrigger>
              <TabsTrigger
                value="featured"
                className="data-[state=active]:bg-gray-800"
              >
                Featured
              </TabsTrigger>
              <TabsTrigger
                value="new"
                className="data-[state=active]:bg-gray-800"
              >
                New Releases
              </TabsTrigger>
              <TabsTrigger
                value="popular"
                className="data-[state=active]:bg-gray-800"
              >
                Popular
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                  <Card
                    key={agent.id}
                    className="bg-gray-800 border-gray-700 overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="text-cyan-400">{agent.icon}</div>
                        <div className="text-lg font-bold text-purple-400">
                          {agent.price}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mt-2">
                        {agent.title}
                      </h3>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-gray-400 mb-4">{agent.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {agent.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Star
                          className="h-4 w-4 text-yellow-400 mr-1"
                          fill="#facc15"
                        />
                        <span className="font-medium text-white">
                          {agent.rating}
                        </span>
                        <span className="mx-1">•</span>
                        <span>{agent.reviews} reviews</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90">
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        className="border-gray-700 hover:bg-gray-700"
                      >
                        Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="featured">
              <div className="text-center py-12 text-gray-400">
                Featured agents will be displayed here
              </div>
            </TabsContent>

            <TabsContent value="new">
              <div className="text-center py-12 text-gray-400">
                New releases will be displayed here
              </div>
            </TabsContent>

            <TabsContent value="popular">
              <div className="text-center py-12 text-gray-400">
                Popular agents will be displayed here
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
