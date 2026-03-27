"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { pageTransition } from "@/lib/animations";

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
