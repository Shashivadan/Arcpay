"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, filter: "blur(100px)", scale: 0.9 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        exit={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
        transition={{
          duration: 0.2,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
