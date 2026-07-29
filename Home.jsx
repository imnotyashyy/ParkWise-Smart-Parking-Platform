import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, CreditCard, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import ParkingCard from "@/components/ParkingCard";
import CardSkeleton from "@/components/CardSkeleton";

const features = [
  { icon: Zap, title: "Instant reservations", text: "Lock a guaranteed spot in under 10 seconds." },
  { icon: ShieldCheck, title: "Verified spaces", text: "Every location is inspected, lit and monitored." },
  { icon: CreditCard, title: "One-tap payments", text: "Cards, UPI, wallets and QR — all supported." },
];

export default function Home() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({ vehicle: "Car" });
  const navigate = useNavigate();

  useEffect(() => {
    base44.entities.ParkingSpot.list("-rating", 6).then((r) => {
      setSpots(r);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Hero />

      <section className="px-6 -mt-4">
        <div className="max-w-5xl mx-auto">
          <SearchBar value={query} onChange={setQuery} onSearch={(q) => navigate(`/parking?city=${encodeURIComponent(q.city || "")}`)} />
        </div>
      </section>

      <section className="px-6 mt-24">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-[26px] p-7 border border-border shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <span className="w-12 h-12 rounded-2xl grad-primary flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/25">
                <f.icon className="w-5 h-5 text-white" />
              </span>
              <h3 className="text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl">Top rated parking</h2>
              <p className="text-muted-foreground mt-2">Hand-picked spaces travellers love.</p>
            </div>
            <Link to="/parking" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? [0, 1, 2].map((i) => <CardSkeleton key={i} />)
              : spots.map((s) => <ParkingCard key={s.id} spot={s} />)}
          </div>
        </div>
      </section>

      <section className="px-6 mt-28">
        <div className="max-w-6xl mx-auto rounded-[36px] grad-primary p-12 sm:p-16 text-center text-white shadow-2xl shadow-emerald-500/30">
          <h2 className="text-3xl sm:text-5xl text-white">Park smarter, starting today.</h2>
          <p className="mt-4 text-white/80 max-w-lg mx-auto">Join millions who never circle the block again.</p>
          <Link to="/signup" className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-full bg-white text-primary font-semibold btn-lift hover:shadow-2xl">
            Create free account <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}