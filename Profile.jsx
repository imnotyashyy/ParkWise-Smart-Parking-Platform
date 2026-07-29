import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, MapPin, CreditCard, LogOut, Mail, Phone, User, Plus } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

export default function Profile() {
  const [bookings, setBookings] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    base44.entities.Booking.list("-created_date", 10).then(setBookings);
  }, []);

  const section = "glass rounded-[28px] p-6";

  return (
    <div className="px-6 pb-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className={`${section} flex flex-col sm:flex-row items-center gap-6`}>
          <span className="w-24 h-24 rounded-full grad-primary flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-blue-500/30">
            AS
          </span>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-3xl">Aarav Sharma</h1>
            <p className="text-muted-foreground text-sm mt-1">Member since 2024 · ParkWise Gold</p>
          </div>
          <button
            onClick={() => { toast({ title: "Logged out", description: "See you soon!" }); navigate("/login"); }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-card border-2 border-red-500/40 text-red-500 font-semibold text-sm btn-lift hover:border-red-500"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className={section}>
            <h2 className="text-lg mb-5">Personal information</h2>
            <div className="space-y-3 text-sm">
              {[[User, "Full name", "Aarav Sharma"], [Mail, "Email", "aarav@example.com"], [Phone, "Phone", "+91 98765 43210"]].map(([Icon, l, v]) => (
                <div key={l} className="flex items-center gap-3 p-3 rounded-2xl bg-card/60 border border-border/60">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground flex-1">{l}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={section}>
            <h2 className="text-lg mb-5">My vehicles</h2>
            <div className="space-y-3">
              {[["Tesla Model 3", "KA 01 AB 1234", "EV"], ["Honda City", "KA 05 XY 7788", "Car"]].map(([n, plate, t]) => (
                <div key={plate} className="flex items-center gap-3 p-3 rounded-2xl bg-card/60 border border-border/60">
                  <span className="w-10 h-10 rounded-xl grad-primary flex items-center justify-center"><Car className="w-4 h-4 text-white" /></span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{n}</p>
                    <p className="text-xs text-muted-foreground">{plate}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{t}</span>
                </div>
              ))}
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-border text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-all">
                <Plus className="w-4 h-4" /> Add vehicle
              </button>
            </div>
          </div>

          <div className={section}>
            <h2 className="text-lg mb-5">Saved locations</h2>
            <div className="space-y-3">
              {[["Home", "Indiranagar, Bengaluru"], ["Office", "Koramangala 5th Block"], ["Gym", "HSR Layout"]].map(([l, a]) => (
                <div key={l} className="flex items-center gap-3 p-3 rounded-2xl bg-card/60 border border-border/60">
                  <span className="w-10 h-10 rounded-xl bg-sky-400/20 flex items-center justify-center"><MapPin className="w-4 h-4 text-sky-500" /></span>
                  <div>
                    <p className="text-sm font-medium">{l}</p>
                    <p className="text-xs text-muted-foreground">{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={section}>
            <h2 className="text-lg mb-5">Payment methods</h2>
            <div className="space-y-3">
              {[["Visa •••• 4242", "Expires 08/28"], ["UPI · aarav@okhdfc", "Primary"], ["ParkWise Wallet", "₹1,240 balance"]].map(([l, s]) => (
                <div key={l} className="flex items-center gap-3 p-3 rounded-2xl bg-card/60 border border-border/60">
                  <span className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center"><CreditCard className="w-4 h-4 text-emerald-500" /></span>
                  <div>
                    <p className="text-sm font-medium">{l}</p>
                    <p className="text-xs text-muted-foreground">{s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={section}>
          <h2 className="text-lg mb-5">Booking history</h2>
          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-card/60 border border-border/60">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{b.spot_name}</p>
                  <p className="text-xs text-muted-foreground">{b.date} · {b.start_time} · Slot {b.slot}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold">₹{b.amount}</p>
                  <p className="text-xs capitalize text-muted-foreground">{b.status}</p>
                </div>
              </div>
            ))}
            {bookings.length === 0 && <p className="text-sm text-muted-foreground">No bookings yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}