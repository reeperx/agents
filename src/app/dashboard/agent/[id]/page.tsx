import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Bot, Brain, Check, ChevronRight, Cpu, MessageSquare, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../../../../../supabase/server";

export default async function AgentDetail({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock agent data based on ID
  const agent = {
    id: parseInt(params.id),
    title: "Content Creator Pro",
    icon: <Brain className="w-12 h-12" />,
    price: "$49.99",
    description: "Generate blog posts, social media content, and marketing copy with advanced language capabilities. This AI agent is designed to help content creators, marketers, and businesses produce high-quality written content efficiently.",
    longDescription: "Content Creator Pro is an advanced AI agent that leverages state-of-the-art language models to generate various types of content. From blog posts and articles to social media captions and marketing copy, this agent can help you create engaging content that resonates with your audience. It understands context, maintains consistent tone, and can adapt to different writing styles based on your preferences.",
    features: [
      "Blog post generation with SEO optimization",
      "Social media content creation for multiple platforms",
      "Marketing copy and ad text generation",
      "Email newsletter content creation",
      "Product descriptions and promotional material",
      "Content editing and enhancement capabilities",
      "Tone and style customization options"
    ],
    specifications: {
      version: "2.1.0",
      releaseDate: "2023-09-15",
      lastUpdated: "2023-10-10",
      compatibility: "Works with all major platforms",
      fileFormats: "PDF, JSON",
      languages: "English, Spanish, French, German"
    },
    tags: ["Content", "Marketing", "GPT-4"],
    rating: 4.8,
    reviews: 124,
    relatedAgents: [2, 3, 6]
  };

  // Mock related agents
  const relatedAgents = [
    {
      id: 2,
      title: "Data Analyst",
      icon: <Cpu className="w-10 h-10" />,
      price: "$79.99",
      description: "Process and visualize complex datasets with AI-powered insights",
      rating: 4.6
    },
    {
      id: 3,
      title: "Customer Support Bot",
      icon: <Bot className="w-10 h-10" />,
      price: "$59.99",
      description: "24/7 automated customer service with sentiment analysis",
      rating: 4.7
    },
    {
      id: 6,
      title: "Social Media Manager",
      icon: <Bot className="w-10 h-10" />,
      price: "$54.99",
      description: "Schedule, create, and analyze social media content",
      rating: 4.6
    }
  ];

  // Mock reviews
  const reviews = [
    {
      id: 1,
      user: "Alex Johnson",
      rating: 5,
      date: "2023-10-05",
      comment: "This AI agent has completely transformed my content creation process. I'm able to produce blog posts in half the time it used to take me. The quality is impressive and requires minimal editing."
    },
    {
      id: 2,
      user: "Sarah Miller",
      rating: 4,
      date: "2023-09-22",
      comment: "Great tool for generating marketing copy. It sometimes needs adjustments for brand voice, but overall it's been a huge time-saver for our marketing team."
    },
    {
      id: 3,
      user: "Michael Chen",
      rating: 5,
      date: "2023-09-18",
      comment: "The social media content this generates is engaging and drives much better interaction than what I was creating before. Definitely worth the investment."
    }
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="min-h-screen bg-gray-950 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-400 mb-6">
            <Link href="/dashboard/marketplace" className="hover:text-cyan-400 transition-colors">
              Marketplace
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-white">{agent.title}</span>
          </div>
          
          {/* Back button */}
          <Link href="/dashboard/marketplace" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Link>
          
          {/* Agent Header */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 flex items-center justify-center bg-gray-700 rounded-lg p-6 h-32 w-32">
                <div className="text-cyan-400">{agent.icon}</div>
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h1 className="text-3xl font-bold">{agent.title}</h1>
                  <div className="text-2xl font-bold text-purple-400">{agent.price}</div>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" fill="#facc15" />
                    <span className="font-medium">{agent.rating}</span>
                    <span className="text-gray-400 ml-1">({agent.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {agent.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6">{agent.description}</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="border-gray-700 hover:bg-gray-700">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Ask a Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Agent Details Tabs */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="bg-gray-900 border border-gray-800">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-gray-800">Overview</TabsTrigger>
                  <TabsTrigger value="features" className="data-[state=active]:bg-gray-800">Features</TabsTrigger>
                  <TabsTrigger value="specs" className="data-[state=active]:bg-gray-800">Specifications</TabsTrigger>
                  <TabsTrigger value="reviews" className="data-[state=active]:bg-gray-800">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">About {agent.title}</h2>
                    <p className="text-gray-300 mb-6">{agent.longDescription}</p>
                    
                    <h3 className="text-lg font-semibold mb-3">Key Benefits</h3>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Save time by automating content creation tasks</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Maintain consistent quality across all your content</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Scale your content production without increasing workload</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Overcome writer's block with AI-generated ideas and drafts</span>
                      </li>
                    </ul>
                    
                    <h3 className="text-lg font-semibold mb-3">Use Cases</h3>
                    <p className="text-gray-300">Content Creator Pro is ideal for marketing teams, content creators, social media managers, small business owners, and anyone who regularly needs to produce written content for their audience or customers.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="mt-6">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Features</h2>
                    <ul className="space-y-3">
                      {agent.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="specs" className="mt-6">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border-b border-gray-700 pb-3">
                        <div className="text-sm text-gray-400">Version</div>
                        <div>{agent.specifications.version}</div>
                      </div>
                      <div className="border-b border-gray-700 pb-3">
                        <div className="text-sm text-gray-400">Release Date</div>
                        <div>{agent.specifications.releaseDate}</div>
                      </div>
                      <div className="border-b border-gray-700 pb-3">
                        <div className="text-sm text-gray-400">Last Updated</div>
                        <div>{agent.specifications.lastUpdated}</div>
                      </div>
                      <div className="border-b border-gray-700 pb-3">
                        <div className="text-sm text-gray-400">Compatibility</div>
                        <div>{agent.specifications.compatibility}</div>
                      </div>
                      <div className="border-b border-gray-700 pb-3">
                        <div className="text-sm text-gray-400">File Formats</div>
                        <div>{agent.specifications.fileFormats}</div>
                      </div>
                      <div className="border-b border-gray-700 pb-3">
                        <div className="text-sm text-gray-400">Languages</div>
                        <div>{agent.specifications.languages}</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-6">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Customer Reviews</h2>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 mr-1" fill="#facc15" />
                        <span className="font-medium text-lg">{agent.rating}</span>
                        <span className="text-gray-400 ml-1">({agent.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-700 pb-6 last:border-0 last:pb-0">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium">{review.user}</div>
                            <div className="text-sm text-gray-400">{review.date}</div>
                          </div>
                          <div className="flex items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
