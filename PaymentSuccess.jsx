import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function PaymentSuccess({ amount, spotName, slot }) {
  return (
    <div className="max-w-md mx-auto text-center glass rounded-[32px] p-10 shadow-2xl shadow-emerald-500/10">
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 14 }}
        className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/40"
      >
        <Check className="w-10 h-10 text-white" strokeWidth={3} />
      </motion.span>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <h1 className="text-3xl mt-6">Payment successful</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          ₹{amount} paid · {spotName} · Slot {slot}
        </p>
        <div className="grid gap-3 mt-8">
          <Link to="/dashboard" className="py-3.5 rounded-full grad-primary text-white font-semibold btn-lift hover:shadow-xl">
            View my bookings
          </Link>
          <Link to="/parking" className="py-3.5 rounded-full bg-card border-2 border-primary text-primary font-semibold btn-lift">
            Book another spot
          </Link>
        </div>
      </motion.div>
    </div>
  );
}