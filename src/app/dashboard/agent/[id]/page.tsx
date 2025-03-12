"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Brain,
  Check,
  Cpu,
  Download,
  FileJson,
  FileText,
  Heart,
  Share,
  ShoppingCart,
  Star,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type Agent = {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  price: string;
  salePrice?: string;
  icon: React.ReactNode;
  tags: string[];
  trending?: boolean;
  featured?: boolean;
  category: string;
  features: string[];
  specifications: {
    version: string;
    releaseDate: string;
    lastUpdated: string;
    compatibility: string;
    fileFormats: string;
    languages: string;
  };
  reviews: {
    id: number;
    user: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
  }[];
};

export default function AgentDetails() {
  const params = useParams();
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch the agent data from your API
    const fetchAgent = async () => {
      setLoading(true);
      try {
        // Mock data for demonstration
        const mockAgent: Agent = {
          id: parseInt(params.id as string),
          title: "Content Creator Pro",
          description:
            "Generate blog posts, social media content, and marketing copy with advanced language capabilities",
          longDescription: `<p>Content Creator Pro is an advanced AI agent that leverages state-of-the-art language models to generate various types of content. From blog posts and articles to social media captions and marketing copy, this agent can help you create engaging content that resonates with your audience.</p>
          <p>With its intuitive interface and powerful features, Content Creator Pro makes it easy to generate high-quality content in seconds. Simply provide a topic or brief description, and the agent will do the rest.</p>
          <p>Whether you're a content marketer, social media manager, or business owner, Content Creator Pro can help you save time and resources while producing professional-grade content that drives results.</p>`,
          price: "$49.99",
          salePrice: params.id === "4" ? "$39.99" : undefined,
          icon:
            params.id === "1" || params.id === "5" || params.id === "8" ? (
              <Brain className="w-16 h-16" />
            ) : params.id === "2" || params.id === "4" ? (
              <Cpu className="w-16 h-16" />
            ) : (
              <Bot className="w-16 h-16" />
            ),
          tags: ["Content", "Marketing", "GPT-4"],
          trending: true,
          featured: true,
          category: "content",
          features: [
            "Blog post generation with SEO optimization",
            "Social media content creation for multiple platforms",
            "Marketing copy and ad text generation",
            "Email newsletter content creation",
            "Product descriptions and promotional material",
          ],
          specifications: {
            version: "2.1.0",
            releaseDate: "2023-09-15",
            lastUpdated: "2023-10-10",
            compatibility: "Works with all major platforms",
            fileFormats: "PDF, JSON",
            languages: "English, Spanish, French, German",
          },
          reviews: [
            {
              id: 1,
              user: "John Smith",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
              rating: 5,
              date: "2023-10-15",
              comment:
                "This AI agent has completely transformed my content creation process. I'm able to generate high-quality blog posts in minutes instead of hours.",
            },
            {
              id: 2,
              user: "Sarah Johnson",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
              rating: 4,
              date: "2023-10-10",
              comment:
                "Great tool for generating social media content. The only reason I'm not giving 5 stars is because I wish it had more templates for different platforms.",
            },
            {
              id: 3,
              user: "Michael Brown",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
              rating: 5,
              date: "2023-09-28",
              comment:
                "As a small business owner, this has been a game-changer for my marketing efforts. The content it generates is engaging and converts well.",
            },
          ],
        };

        setAgent(mockAgent);
      } catch (error) {
        console.error("Error fetching agent:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [params.id]);

  // Add to cart functionality
  const addToCart = () => {
    if (!agent) return;

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

    // Navigate to cart page
    router.push("/dashboard/cart");
  };

  // Toggle wishlist
  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    // In a real app, you would update the wishlist in your database
  };

  // Share functionality
  const shareAgent = () => {
    if (navigator.share) {
      navigator.share({
        title: agent?.title,
        text: agent?.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col">
        <DashboardNavbar />
        <main className="flex-1 container mx-auto px-4 py-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col">
        <DashboardNavbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Agent Not Found</h2>
            <p className="text-gray-400 mb-6">
              The agent you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/dashboard/marketplace">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90">
                Back to Marketplace
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <DashboardNavbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-400 mb-6">
          <Link
            href="/dashboard/marketplace"
            className="hover:text-white transition-colors"
          >
            Marketplace
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/dashboard/marketplace?category=${agent.category}`}
            className="hover:text-white transition-colors capitalize"
          >
            {agent.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{agent.title}</span>
        </div>

        {/* Agent Header */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 flex items-center justify-center bg-gray-800 rounded-xl p-6 h-32 w-32 md:h-48 md:w-48">
              <div className="text-cyan-400">{agent.icon}</div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{agent.title}</h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="bg-gray-800 text-cyan-400 border-gray-700 hover:border-cyan-500"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {agent.trending && (
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30">
                        <Star className="h-3 w-3 mr-1 fill-amber-400" />{" "}
                        Trending
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= 4.5 ? "text-amber-400 fill-amber-400" : "text-gray-600"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-400">
                      (32 reviews)
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4 max-w-2xl">
                    {agent.description}
                  </p>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 md:min-w-[240px]">
                  <div className="mb-4">
                    {agent.salePrice ? (
                      <div>
                        <span className="text-gray-400 line-through text-lg">
                          {agent.price}
                        </span>
                        <div className="flex items-center">
                          <span className="text-3xl font-bold text-purple-400">
                            {agent.salePrice}
                          </span>
                          <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">
                            Save{" "}
                            {Math.round(
                              (1 -
                                parseFloat(agent.salePrice.replace("$", "")) /
                                  parseFloat(agent.price.replace("$", ""))) *
                                100,
                            )}
                            %
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <span className="text-3xl font-bold text-purple-400">
                        {agent.price}
                      </span>
                    )}
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 mb-2"
                    onClick={addToCart}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700"
                      onClick={toggleWishlist}
                    >
                      <Heart
                        className={`mr-2 h-4 w-4 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`}
                      />
                      Wishlist
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700"
                      onClick={shareAgent}
                    >
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Details Tabs */}
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gray-800"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="features"
              className="data-[state=active]:bg-gray-800"
            >
              Features
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="data-[state=active]:bg-gray-800"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-gray-800"
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">About {agent.title}</h2>
              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: agent.longDescription }}
              ></div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <FileText className="h-10 w-10 text-cyan-400" />,
                    title: "PDF Documentation",
                    description:
                      "Comprehensive guide on how to use the agent effectively",
                  },
                  {
                    icon: <FileJson className="h-10 w-10 text-cyan-400" />,
                    title: "JSON Configuration",
                    description:
                      "Easily customize the agent to fit your specific needs",
                  },
                  {
                    icon: <Download className="h-10 w-10 text-cyan-400" />,
                    title: "Instant Download",
                    description: "Get immediate access after purchase",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col items-center text-center"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="mb-3">{item.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agent.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 bg-cyan-500/20 rounded-full p-1">
                      <Check className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">{feature}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">
                Technical Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {Object.entries(agent.specifications).map(
                  ([key, value], index) => (
                    <div key={index} className="border-b border-gray-800 pb-3">
                      <div className="text-sm text-gray-400 mb-1 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                      <div className="font-medium">{value}</div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold">Customer Reviews</h2>
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90">
                  Write a Review
                </Button>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <div className="text-4xl font-bold">4.5</div>
                    <div className="ml-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= 4 ? "text-amber-400 fill-amber-400" : star <= 4.5 ? "text-amber-400 fill-amber-400 opacity-50" : "text-gray-600"}`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-400">
                        Based on 32 reviews
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 max-w-md">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div
                        key={rating}
                        className="flex items-center gap-2 mb-1"
                      >
                        <div className="text-xs text-gray-400 w-2">
                          {rating}
                        </div>
                        <div className="flex-1 bg-gray-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-cyan-400 h-full rounded-full"
                            style={{
                              width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : 2}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {agent.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-800 pb-6"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-10 h-10 rounded-full bg-gray-800"
                      />
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h4 className="font-medium">{review.user}</h4>
                          <div className="flex sm:ml-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${star <= review.rating ? "text-amber-400 fill-amber-400" : "text-gray-600"}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Agents */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((id) => (
              <motion.div
                key={id}
                className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href={`/dashboard/agent/${id}`} className="block p-6">
                  <div className="text-cyan-400 mb-4">
                    {id % 3 === 0 ? (
                      <Bot className="w-10 h-10" />
                    ) : id % 3 === 1 ? (
                      <Brain className="w-10 h-10" />
                    ) : (
                      <Cpu className="w-10 h-10" />
                    )}
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold hover:text-cyan-400 transition-colors">
                      {id === 1
                        ? "Social Media Manager"
                        : id === 2
                          ? "Data Analyst"
                          : id === 3
                            ? "Customer Support Bot"
                            : "SEO Optimizer"}
                    </h3>
                  </div>
                  <div className="text-lg font-bold text-purple-400 mb-2">
                    $
                    {id === 1
                      ? "54.99"
                      : id === 2
                        ? "79.99"
                        : id === 3
                          ? "59.99"
                          : "49.99"}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      id === 1
                        ? "Social"
                        : id === 2
                          ? "Analytics"
                          : id === 3
                            ? "Support"
                            : "SEO",
                      id === 1
                        ? "Marketing"
                        : id === 2
                          ? "Business"
                          : id === 3
                            ? "Chat"
                            : "Content",
                    ].map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
