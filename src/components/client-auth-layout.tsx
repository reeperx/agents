"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ClientAuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: ReactNode;
  illustration: ReactNode;
}

export default function ClientAuthLayout({
  children,
  title,
  subtitle,
  illustration,
}: ClientAuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      {/* Left side - Illustration */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 p-12 items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-[128px] opacity-20"></div>

        <div className="relative z-10 max-w-md">{illustration}</div>
      </motion.div>

      {/* Right side - Form */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              <div className="text-gray-400">{subtitle}</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-xl"
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
