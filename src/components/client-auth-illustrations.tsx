"use client";

import { Bot, Brain, Cpu, Lock, Mail, User } from "lucide-react";
import { motion } from "framer-motion";

export function SignInIllustration() {
  return (
    <div className="text-center">
      <motion.div
        className="mb-8 inline-block"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
      >
        <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
          <Lock className="h-16 w-16 text-white" />
        </div>
      </motion.div>

      <motion.h2
        className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Welcome Back
      </motion.h2>

      <motion.p
        className="text-gray-300 text-lg mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Sign in to access your AI agents and continue transforming your workflow
        with cutting-edge technology.
      </motion.p>

      <div className="flex justify-center space-x-4">
        {[Bot, Brain, Cpu].map((Icon, index) => (
          <motion.div
            key={index}
            className="p-3 bg-gray-800 rounded-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
          >
            <Icon className="h-8 w-8 text-cyan-400" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function SignUpIllustration() {
  return (
    <div className="text-center">
      <motion.div
        className="mb-8 inline-block"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
      >
        <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
          <User className="h-16 w-16 text-white" />
        </div>
      </motion.div>

      <motion.h2
        className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Join Our Community
      </motion.h2>

      <motion.p
        className="text-gray-300 text-lg mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Create an account to discover and purchase powerful AI agents that will
        revolutionize your workflow.
      </motion.p>

      <div className="grid grid-cols-2 gap-4">
        {[Bot, Brain, Cpu, Mail].map((Icon, index) => (
          <motion.div
            key={index}
            className="p-3 bg-gray-800 rounded-lg"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 + index * 0.1 }}
          >
            <Icon className="h-8 w-8 text-cyan-400 mx-auto" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ForgotPasswordIllustration() {
  return (
    <div className="text-center">
      <motion.div
        className="mb-8 inline-block"
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
      >
        <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
          <Mail className="h-16 w-16 text-white" />
        </div>
      </motion.div>

      <motion.h2
        className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Password Recovery
      </motion.h2>

      <motion.p
        className="text-gray-300 text-lg mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Don't worry, we'll send you a link to reset your password and get you
        back to exploring AI agents.
      </motion.p>

      <motion.div
        className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <p className="text-gray-300 text-sm">
          Check your email inbox after submitting your request. If you don't see
          the email, check your spam folder.
        </p>
      </motion.div>
    </div>
  );
}
