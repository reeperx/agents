"use client";

import { ReactNode, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface InfiniteCarouselProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export default function InfiniteCarousel({
  children,
  direction = "left",
  speed = 20,
  pauseOnHover = true,
  className = "",
}: InfiniteCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current || !containerRef.current) return;

    const scrollerContent = Array.from(scrollerRef.current.children);

    // Duplicate items for seamless scrolling
    scrollerContent.forEach((item) => {
      const duplicate = item.cloneNode(true);
      scrollerRef.current?.appendChild(duplicate);
    });

    return () => {
      // Cleanup duplicated nodes when component unmounts
      if (scrollerRef.current) {
        const originalLength = scrollerContent.length;
        for (let i = 0; i < originalLength; i++) {
          scrollerRef.current.lastChild &&
            scrollerRef.current.removeChild(scrollerRef.current.lastChild);
        }
      }
    };
  }, [children]);

  const baseVelocity = direction === "left" ? -speed : speed;

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.div
        ref={scrollerRef}
        className="flex whitespace-nowrap"
        animate={{
          x: direction === "left" ? "-50%" : "0%",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        }}
        {...(pauseOnHover && {
          whileHover: { animationPlayState: "paused" },
        })}
      >
        {children}
      </motion.div>
    </div>
  );
}
