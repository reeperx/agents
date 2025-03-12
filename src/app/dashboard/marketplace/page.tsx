"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bot,
  Brain,
  Cpu,
  Filter,
  Grid,
  List,
  Search,
  SlidersHorizontal,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type Agent = {
  id: number;
  title: string;
  description: string;
  price: string;
  salePrice?: string;
  icon: React.ReactNode;
  tags: string[];
  trending?: boolean;
  featured?: boolean;
  category: string;
};

export default function Marketplace() {
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);

  // Mock data - in a real app, you would fetch this from your API
  const agents: Agent[] = [
    {
      id: 1,
      title: "Content Creator Pro",
      description:
        "Generate blog posts, social media content, and marketing copy with advanced language capabilities",
      price: "$49.99",
      icon: <Brain className="w-10 h-10" />,
      tags: ["Content", "Marketing", "GPT-4"],
      trending: true,
      featured: true,
      category: "content",
    },
    {
      id: 2,
      title: "Data Analyst",
      description:
        "Process and visualize complex datasets with AI-powered insights and recommendation engine",
      price: "$79.99",
      icon: <Cpu className="w-10 h-10" />,
      tags: ["Analytics", "Business", "Charts"],
      category: "data",
    },
    {
      id: 3,
      title: "Customer Support Bot",
      description:
        "24/7 automated customer service with sentiment analysis and escalation protocols",
      price: "$59.99",
      icon: <Bot className="w-10 h-10" />,
      tags: ["Support", "Chat", "Multilingual"],
      trending: true,
      category: "support",
    },
    {
      id: 4,
      title: "Code Assistant Pro",
      description:
        "AI-powered coding assistant that helps write, debug, and optimize code across multiple languages",
      price: "$89.99",
      salePrice: "$69.99",
      icon: <Cpu className="w-10 h-10" />,
      tags: ["Development", "Coding", "Debugging"],
      trending: true,
      featured: true,
      category: "development",
    },
    {
      id: 5,
      title: "Research Companion",
      description:
        "Accelerate research with AI-powered literature review, citation management, and insight generation",
      price: "$69.99",
      icon: <Brain className="w-10 h-10" />,
      tags: ["Research", "Academic", "Analysis"],
      category: "research",
    },
    {
      id: 6,
      title: "Social Media Manager",
      description:
        "Schedule, create, and analyze social media content across multiple platforms with AI assistance",
      price: "$54.99",
      icon: <Bot className="w-10 h-10" />,
      tags: ["Social", "Marketing", "Analytics"],
      featured: true,
      category: "social",
    },
    {
      id: 7,
      title: "Email Marketing Assistant",
      description:
        "Create, optimize, and analyze email campaigns with AI-powered subject line testing and content suggestions",
      price: "$39.99",
      icon: <Bot className="w-10 h-10" />,
      tags: ["Email", "Marketing", "Analytics"],
      category: "content",
    },
    {
      id: 8,
      title: "SEO Optimizer",
      description:
        "Analyze and improve website content for better search engine rankings with AI-powered recommendations",
      price: "$59.99",
      icon: <Brain className="w-10 h-10" />,
      tags: ["SEO", "Content", "Analytics"],
      category: "content",
    },
  ];

  // All available tags from agents
  const allTags = Array.from(new Set(agents.flatMap((agent) => agent.tags)));

  // All available categories from agents
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "content", name: "Content Creation" },
    { id: "data", name: "Data Analysis" },
    { id: "support", name: "Customer Support" },
    { id: "development", name: "Development" },
    { id: "research", name: "Research" },
    { id: "social", name: "Social Media" },
  ];

  // Filter agents based on search, category, price range, and tags
  useEffect(() => {
    let results = [...agents];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (agent) =>
          agent.title.toLowerCase().includes(query) ||
          agent.description.toLowerCase().includes(query) ||
          agent.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      results = results.filter((agent) => agent.category === selectedCategory);
    }

    // Filter by price range
    results = results.filter((agent) => {
      const price = parseFloat(
        (agent.salePrice || agent.price).replace("$", ""),
      );
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filter by selected tags
    if (selectedTags.length > 0) {
      results = results.filter((agent) =>
        selectedTags.some((tag) => agent.tags.includes(tag)),
      );
    }

    setFilteredAgents(results);
  }, [searchQuery, selectedCategory, priceRange, selectedTags, agents]);

  // Handle adding/removing tags from filter
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  // Add to cart functionality
  const addToCart = (agent: Agent) => {
    // Get existing cart from localStorage
    const existingCart = localStorage.getItem("cart");
    const cart = existingCart ? JSON.parse(existingCart) : [];

    // Check if item already exists in cart
    const existingItem = cart.find((item: any) => item.id === agent.id);

    if (existingItem) {
      // Increment quantity if already in cart
      existingItem.quantity += 1;
    } else {
      // Add new item to cart
      cart.push({
        id: agent.id,
        title: agent.title,
        price: agent.salePrice || agent.price,
        quantity: 1,
      });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Show success message or update UI
    alert(`${agent.title} added to cart!`);
  };

  // Grid view for agents
  const GridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredAgents.map((agent) => (
        <motion.div
          key={agent.id}
          className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="p-6">
            <div className="text-cyan-400 mb-4">{agent.icon}</div>
            <div className="flex justify-between items-start mb-3">
              <Link
                href={`/dashboard/agent/${agent.id}`}
                className="text-xl font-semibold hover:text-cyan-400 transition-colors"
              >
                {agent.title}
              </Link>
              <div>
                {agent.salePrice ? (
                  <div className="text-right">
                    <span className="text-gray-400 line-through text-sm">
                      {agent.price}
                    </span>
                    <span className="text-lg font-bold text-purple-400 block">
                      {agent.salePrice}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-purple-400">
                    {agent.price}
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-400 mb-4 line-clamp-2">
              {agent.description}
            </p>
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
            <div className="flex gap-2">
              <Button
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90"
                onClick={() => addToCart(agent)}
              >
                Add to Cart
              </Button>
              <Link href={`/dashboard/agent/${agent.id}`} className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-700"
                >
                  Details
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // List view for agents
  const ListView = () => (
    <div className="space-y-4">
      {filteredAgents.map((agent) => (
        <motion.div
          key={agent.id}
          className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 p-4 flex gap-4"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex-shrink-0 flex items-center justify-center bg-gray-700 rounded-lg p-4 h-20 w-20">
            <div className="text-cyan-400">{agent.icon}</div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <Link
                href={`/dashboard/agent/${agent.id}`}
                className="text-xl font-semibold hover:text-cyan-400 transition-colors"
              >
                {agent.title}
              </Link>
              <div>
                {agent.salePrice ? (
                  <div className="text-right">
                    <span className="text-gray-400 line-through text-sm">
                      {agent.price}
                    </span>
                    <span className="text-lg font-bold text-purple-400 block">
                      {agent.salePrice}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-purple-400">
                    {agent.price}
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-400 mb-2 line-clamp-1">
              {agent.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {agent.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90"
                onClick={() => addToCart(agent)}
              >
                Add to Cart
              </Button>
              <Link href={`/dashboard/agent/${agent.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-700"
                >
                  Details
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <DashboardNavbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">AI Agent Marketplace</h1>
            <p className="text-gray-400">
              Discover and purchase powerful AI agents to transform your
              workflow
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`border-gray-700 ${viewMode === "grid" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`border-gray-700 ${viewMode === "list" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"}`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`border-gray-700 md:hidden ${showFilters ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar - hidden on mobile unless toggled */}
          <div
            className={`md:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden md:block"}`}
          >
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sticky top-20">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search agents..."
                    className="pl-9 bg-gray-800 border-gray-700 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Categories
                </h4>
                <Tabs
                  defaultValue={selectedCategory}
                  onValueChange={(value) => setSelectedCategory(value)}
                >
                  <TabsList className="grid grid-cols-2 h-auto bg-gray-800 border border-gray-700">
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        className="data-[state=active]:bg-gray-700 py-1.5 text-xs"
                      >
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Price Range</h4>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    className="bg-gray-800 border-gray-700 text-white"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([
                        parseInt(e.target.value) || 0,
                        priceRange[1],
                      ])
                    }
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    min="0"
                    max="1000"
                    className="bg-gray-800 border-gray-700 text-white"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([
                        priceRange[0],
                        parseInt(e.target.value) || 100,
                      ])
                    }
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      className={`text-xs py-1 px-2 h-auto ${
                        selectedTags.includes(tag)
                          ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                          : "border-gray-700 text-gray-400 hover:text-white"
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              {(searchQuery ||
                selectedCategory !== "all" ||
                selectedTags.length > 0 ||
                priceRange[0] > 0 ||
                priceRange[1] < 100) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-6 border-gray-700 text-gray-300 hover:bg-gray-700"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedTags([]);
                    setPriceRange([0, 100]);
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {filteredAgents.length === 0 ? (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
                <div className="w-24 h-24 mx-auto mb-4 text-gray-700">
                  <Search className="w-full h-full" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No agents found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-700"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedTags([]);
                    setPriceRange([0, 100]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-gray-400">
                    Showing{" "}
                    <span className="text-white font-medium">
                      {filteredAgents.length}
                    </span>{" "}
                    agents
                  </p>
                  <select
                    className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    defaultValue="featured"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>

                {viewMode === "grid" ? <GridView /> : <ListView />}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
