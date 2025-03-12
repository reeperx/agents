import Link from "next/link";
import { ArrowUpRight, Bot, Check, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gray-950 text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-950 to-cyan-900/20" />

      {/* Animated glow effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-[128px] opacity-20 animate-pulse"></div>

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-sm text-cyan-400">
                <Sparkles className="mr-2 h-4 w-4" />
                Next-Generation AI Marketplace
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold mb-8 tracking-tight">
              Discover and Deploy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Advanced AI Agents
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Browse our curated marketplace of specialized AI agents designed
              to transform your workflow, boost productivity, and unlock new
              possibilities.
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

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-cyan-400" />
                <span>Secure PayPal payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-cyan-400" />
                <span>Instant downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-cyan-400" />
                <span>PDF & JSON formats</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
