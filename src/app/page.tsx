import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  Bot,
  Brain,
  Cpu,
  Download,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] opacity-20"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold mb-8 tracking-tight">
              The Future of AI{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Agent Marketplace
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover, purchase, and deploy cutting-edge AI agents designed to
              transform your workflow and boost productivity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg hover:opacity-90 transition-all text-lg font-medium"
              >
                Explore Marketplace
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="/sign-up"
                className="inline-flex items-center px-8 py-4 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-all text-lg font-medium"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Agents Preview */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Featured AI Agents</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse our collection of premium AI agents ready to revolutionize
              your workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-10 h-10" />,
                title: "Content Creator Pro",
                price: "$49.99",
                description:
                  "Generate blog posts, social media content, and marketing copy with advanced language capabilities",
                tags: ["Content", "Marketing", "GPT-4"],
              },
              {
                icon: <Cpu className="w-10 h-10" />,
                title: "Data Analyst",
                price: "$79.99",
                description:
                  "Process and visualize complex datasets with AI-powered insights and recommendation engine",
                tags: ["Analytics", "Business", "Charts"],
              },
              {
                icon: <Bot className="w-10 h-10" />,
                title: "Customer Support Bot",
                price: "$59.99",
                description:
                  "24/7 automated customer service with sentiment analysis and escalation protocols",
                tags: ["Support", "Chat", "Multilingual"],
              },
            ].map((agent, index) => (
              <div
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
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
                  <button className="w-full py-2 mt-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
            >
              View All Agents
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-950 relative">
        {/* Background accent */}
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Our Marketplace
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We're revolutionizing the way you discover and deploy AI with
              cutting-edge technology and unparalleled service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Instant Deployment",
                description:
                  "Download and integrate AI agents into your workflow in minutes",
              },
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "Secure Transactions",
                description:
                  "Bank-grade encryption and secure PayPal integration",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Premium Quality",
                description: "Curated collection of high-performance AI agents",
              },
              {
                icon: <Download className="w-6 h-6" />,
                title: "Multiple Formats",
                description:
                  "Download agents in PDF and JSON formats for maximum flexibility",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gray-800 border border-gray-700 rounded-xl hover:border-cyan-500/50 transition-all"
              >
                <div className="text-cyan-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-gray-300">AI Agents Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-gray-300">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-gray-300">Uptime Guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Find the Perfect AI Agent</h2>
          <div className="max-w-2xl mx-auto relative">
            <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg p-2">
              <Search className="ml-2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for AI agents..."
                className="w-full bg-transparent border-none text-white px-4 py-2 focus:outline-none"
              />
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors">
                Search
              </button>
            </div>
            <p className="text-gray-400 mt-3 text-sm">
              Popular searches: Content Creation, Data Analysis, Customer
              Support, Code Assistant
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-950 relative">
        {/* Background accent */}
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-[128px] opacity-10"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users who are leveraging AI agents to
            boost productivity and innovation.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg hover:opacity-90 transition-all text-lg font-medium"
          >
            Explore the Marketplace
            <ArrowUpRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
