import Link from "next/link";
import { Bot, Github, Mail, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Bot className="h-6 w-6 mr-2 text-cyan-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                AI Marketplace
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Discover, purchase, and deploy cutting-edge AI agents designed to
              transform your workflow and boost productivity.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com"
                target="_blank"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:contact@aimarketplace.com"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Marketplace</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard/marketplace"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Browse Agents
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/marketplace"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Featured Agents
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/marketplace"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  New Releases
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/marketplace"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Popular Agents
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sign-in"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Create Account
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/purchases"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  My Purchases
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/cart"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© {currentYear} AI Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
