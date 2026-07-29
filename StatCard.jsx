import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export default function StatCard({ label, value, delta, icon: Icon, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass rounded-[24px] p-6 shadow-lg shadow-emerald-500/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="w-11 h-11 rounded-2xl grad-primary flex items-center justify-center shadow-lg shadow-emerald-500/25">
          <Icon className="w-5 h-5 text-white" />
        </span>
        {delta && (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-500">
            <TrendingUp className="w-3.5 h-3.5" /> {delta}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </motion.div>
  );
}