"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Agent = {
  id: number;
  title: string;
  description: string;
  price: string;
  icon: string;
  tags: string[];
};

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Agent[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Mock data - in a real app, you would fetch this from your API
  const agents = [
    {
      id: 1,
      title: "Content Creator Pro",
      description:
        "Generate blog posts, social media content, and marketing copy with advanced language capabilities",
      price: "$49.99",
      icon: "Brain",
      tags: ["Content", "Marketing", "GPT-4"],
    },
    {
      id: 2,
      title: "Data Analyst",
      description:
        "Process and visualize complex datasets with AI-powered insights and recommendation engine",
      price: "$79.99",
      icon: "Cpu",
      tags: ["Analytics", "Business", "Charts"],
    },
    {
      id: 3,
      title: "Customer Support Bot",
      description:
        "24/7 automated customer service with sentiment analysis and escalation protocols",
      price: "$59.99",
      icon: "Bot",
      tags: ["Support", "Chat", "Multilingual"],
    },
    {
      id: 4,
      title: "Code Assistant Pro",
      description:
        "AI-powered coding assistant that helps write, debug, and optimize code across multiple languages",
      price: "$89.99",
      icon: "Cpu",
      tags: ["Development", "Coding", "Debugging"],
    },
    {
      id: 5,
      title: "Research Companion",
      description:
        "Accelerate research with AI-powered literature review, citation management, and insight generation",
      price: "$69.99",
      icon: "Brain",
      tags: ["Research", "Academic", "Analysis"],
    },
    {
      id: 6,
      title: "Social Media Manager",
      description:
        "Schedule, create, and analyze social media content across multiple platforms with AI assistance",
      price: "$54.99",
      icon: "Bot",
      tags: ["Social", "Marketing", "Analytics"],
    },
  ];

  // Handle search input change
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      const results = agents.filter(
        (agent) =>
          agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/dashboard/marketplace?search=${encodeURIComponent(searchQuery)}`,
      );
      setShowResults(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 w-full md:w-64 lg:w-80"
      >
        <Search className="h-4 w-4 text-gray-400 mr-2" />
        <Input
          type="text"
          placeholder="Search agents..."
          className="bg-transparent border-none text-white text-sm focus:outline-none w-full h-8 px-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (searchQuery.trim() !== "") {
              setShowResults(true);
            }
          }}
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-400 hover:text-white"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
          >
            {isSearching ? (
              <div className="flex justify-center items-center p-4">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-cyan-500"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="p-2">
                {searchResults.map((agent) => (
                  <Link
                    key={agent.id}
                    href={`/dashboard/agent/${agent.id}`}
                    className="block p-3 hover:bg-gray-700 rounded-md transition-colors"
                    onClick={() => setShowResults(false)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{agent.title}</div>
                      <div className="text-purple-400 font-bold">
                        {agent.price}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                      {agent.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {agent.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-gray-700 rounded-full text-xs text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-400">
                No results found for "{searchQuery}"
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="p-2 border-t border-gray-700">
                <Button
                  variant="ghost"
                  className="w-full justify-center text-sm text-cyan-400 hover:text-cyan-300 hover:bg-gray-700"
                  onClick={handleSearch}
                >
                  View all results
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
