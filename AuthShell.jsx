import React from "react";
import { motion } from "framer-motion";
import ParkingIllustration from "@/components/ParkingIllustration";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="px-6 pb-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div className="hidden lg:block">
          <ParkingIllustration />
          <p className="mt-8 text-center text-sm text-muted-foreground max-w-sm mx-auto">
            Reserve your spot before you leave home. Guaranteed space, transparent pricing.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-[32px] p-8 sm:p-10 shadow-2xl shadow-blue-500/10 w-full max-w-md mx-auto"
        >
          <h1 className="text-3xl mb-2">{title}</h1>
          <p className="text-sm text-muted-foreground mb-8">{subtitle}</p>
          {children}
        </motion.div>
      </div>
    </div>
  );
}