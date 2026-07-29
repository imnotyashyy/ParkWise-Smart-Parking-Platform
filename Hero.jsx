import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import ParkingIllustration from "@/components/ParkingIllustration";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6">
      <div className="absolute -top-40 -left-32 w-[420px] h-[420px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute top-20 right-0 w-[380px] h-[380px] rounded-full bg-sky-400/20 blur-[120px]" />
      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-semibold text-primary">
            <Sparkles className="w-3.5 h-3.5" /> Live availability in 40+ cities
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
            Find Parking <span className="text-grad">Made Simple</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Search, reserve and pay for parking in seconds.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/parking"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full grad-primary text-white font-semibold btn-lift hover:shadow-2xl hover:shadow-emerald-500/40"
            >
              Find parking <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-card border-2 border-primary text-primary font-semibold btn-lift hover:shadow-xl"
            >
              <Play className="w-4 h-4" /> See how it works
            </Link>
          </div>
          <div className="flex gap-10 pt-4">
            {[["2.4M+", "Bookings"], ["12k", "Parking spots"], ["4.9★", "Avg rating"]].map(([v, l]) => (
              <div key={l}>
                <p className="text-2xl font-bold">{v}</p>
                <p className="text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <ParkingIllustration />
        </motion.div>
      </div>
    </section>
  );
}