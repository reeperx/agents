"use client";

import { Bot, Brain, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

const agents = [
  {
    id: 1,
    icon: <Brain className="w-10 h-10" />,
    title: "Content Creator Pro",
    price: "$49.99",
    description:
      "Generate blog posts, social media content, and marketing copy with advanced language capabilities",
    tags: ["Content", "Marketing", "GPT-4"],
  },
  {
    id: 2,
    icon: <Cpu className="w-10 h-10" />,
    title: "Data Analyst",
    price: "$79.99",
    description:
      "Process and visualize complex datasets with AI-powered insights and recommendation engine",
    tags: ["Analytics", "Business", "Charts"],
  },
  {
    id: 3,
    icon: <Bot className="w-10 h-10" />,
    title: "Customer Support Bot",
    price: "$59.99",
    description:
      "24/7 automated customer service with sentiment analysis and escalation protocols",
    tags: ["Support", "Chat", "Multilingual"],
  },
  {
    id: 4,
    icon: <Cpu className="w-10 h-10" />,
    title: "Code Assistant Pro",
    price: "$89.99",
    description:
      "AI-powered coding assistant that helps write, debug, and optimize code across multiple languages",
    tags: ["Development", "Coding", "Debugging"],
  },
  {
    id: 5,
    icon: <Brain className="w-10 h-10" />,
    title: "Research Companion",
    price: "$69.99",
    description:
      "Accelerate research with AI-powered literature review, citation management, and insight generation",
    tags: ["Research", "Academic", "Analysis"],
  },
  {
    id: 6,
    icon: <Bot className="w-10 h-10" />,
    title: "Social Media Manager",
    price: "$54.99",
    description:
      "Schedule, create, and analyze social media content across multiple platforms with AI assistance",
    tags: ["Social", "Marketing", "Analytics"],
  },
];

export default function FeaturedAgentsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const scrollContainer = scrollerRef.current;
    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;

    let scrollPos = 0;
    const speed = 1; // pixels per frame
    let animationId: number;
    let isPaused = false;

    const scroll = () => {
      if (isPaused) {
        animationId = requestAnimationFrame(scroll);
        return;
      }

      scrollPos += speed;
      if (scrollPos >= scrollWidth / 2) {
        scrollPos = 0;
      }

      scrollContainer.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(scroll);
    };

    // Clone items for infinite scroll
    const items = Array.from(scrollContainer.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      scrollContainer.appendChild(clone);
    });

    // Start animation
    animationId = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => {
      isPaused = true;
    };
    const handleMouseLeave = () => {
      isPaused = false;
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="py-8 overflow-hidden">
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {agents.map((agent) => (
          <motion.div
            key={agent.id}
            className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 w-[350px] flex-shrink-0"
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="p-6">
              <div className="text-cyan-400 mb-4">{agent.icon}</div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">{agent.title}</h3>
                <span className="text-lg font-bold text-purple-400">
                  {agent.price}
                </span>
              </div>
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
              <motion.button
                className="w-full py-2 mt-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
