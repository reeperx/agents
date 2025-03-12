"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type MotionProps = {
  children: ReactNode;
  className?: string;
  [key: string]: any;
};

export function MotionDiv({ children, className, ...props }: MotionProps) {
  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  );
}

export function MotionNav({ children, className, ...props }: MotionProps) {
  return (
    <motion.nav className={className} {...props}>
      {children}
    </motion.nav>
  );
}

export function MotionButton({ children, className, ...props }: MotionProps) {
  return (
    <motion.button className={className} {...props}>
      {children}
    </motion.button>
  );
}

export function MotionP({ children, className, ...props }: MotionProps) {
  return (
    <motion.p className={className} {...props}>
      {children}
    </motion.p>
  );
}

export function MotionH2({ children, className, ...props }: MotionProps) {
  return (
    <motion.h2 className={className} {...props}>
      {children}
    </motion.h2>
  );
}

export function MotionMain({ children, className, ...props }: MotionProps) {
  return (
    <motion.main className={className} {...props}>
      {children}
    </motion.main>
  );
}

export function MotionAside({ children, className, ...props }: MotionProps) {
  return (
    <motion.aside className={className} {...props}>
      {children}
    </motion.aside>
  );
}
