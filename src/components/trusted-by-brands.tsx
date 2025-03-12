"use client";

import InfiniteCarousel from "./infinite-carousel";
import { motion } from "framer-motion";

const brands = [
  {
    id: 1,
    name: "Microsoft",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=MS&backgroundColor=0078D4&textColor=ffffff",
  },
  {
    id: 2,
    name: "Google",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=G&backgroundColor=4285F4&textColor=ffffff",
  },
  {
    id: 3,
    name: "Amazon",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=AMZ&backgroundColor=FF9900&textColor=000000",
  },
  {
    id: 4,
    name: "Apple",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=APL&backgroundColor=000000&textColor=ffffff",
  },
  {
    id: 5,
    name: "Meta",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=META&backgroundColor=1877F2&textColor=ffffff",
  },
  {
    id: 6,
    name: "IBM",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=IBM&backgroundColor=0530AD&textColor=ffffff",
  },
  {
    id: 7,
    name: "Oracle",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=ORC&backgroundColor=C74634&textColor=ffffff",
  },
  {
    id: 8,
    name: "Intel",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=INT&backgroundColor=0071C5&textColor=ffffff",
  },
];

export default function TrustedByBrands() {
  return (
    <div className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 mb-10 text-center">
        <motion.h2
          className="text-3xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Trusted by Industry Leaders
        </motion.h2>
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Join thousands of companies using our AI agents to transform their
          workflows
        </motion.p>
      </div>

      <InfiniteCarousel direction="left" speed={25}>
        {brands.map((brand) => (
          <motion.div
            key={brand.id}
            className="mx-8 flex items-center justify-center h-20 w-40 flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-16 w-16 rounded-lg opacity-70 hover:opacity-100 transition-opacity"
            />
            <span className="ml-3 text-gray-400 font-medium">{brand.name}</span>
          </motion.div>
        ))}
      </InfiniteCarousel>
    </div>
  );
}
