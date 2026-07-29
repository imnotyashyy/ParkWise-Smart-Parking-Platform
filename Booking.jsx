import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, Calendar, Car, ShieldCheck } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";
import MiniMap from "@/components/MiniMap";

const slots = ["A-01", "A-02", "A-03", "B-04", "B-05", "B-06", "C-07", "C-08", "C-09"];
const taken = ["A-02", "B-05", "C-09"];

export default function Booking() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const [spot, setSpot] = useState(null);
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    start_time: "10:00",
    hours: 2,
    vehicle_type: "Car",
    slot: "A-01",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) base44.entities.ParkingSpot.get(id).then(setSpot);
    else base44.entities.ParkingSpot.list("-rating", 1).then((r) => setSpot(r[0]));
  }, [id]);

  if (!spot) {
    return (
      <div className="px-6 max-w-6xl mx-auto">
        <div className="h-72 rounded-[28px] bg-muted animate-pulse" />
      </div>
    );
  }

  const base = (spot.price_per_hour || 0) * form.hours;
  const fee = Math.round(base * 0.05);
  const total = base + fee;

  const proceed = () => {
    const params = new URLSearchParams({
      spot_id: spot.id,
      spot_name: spot.name,
      city: spot.city || "",
      ...form,
      hours: String(form.hours),
      amount: String(total),
    });
    navigate(`/payment?${params.toString()}`);
  };

  return (
    <div className="px-6 pb-10">
      <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-[28px] overflow-hidden border border-border h-72">
            <Image src={spot.image_url} alt={spot.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl">{spot.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {spot.rating} ({spot.reviews} reviews)</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {spot.address} · {spot.distance_km} km</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {(spot.amenities || []).map((a) => (
                <span key={a} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{a}</span>
              ))}
            </div>
          </div>

          <MiniMap name={spot.address || spot.name} />

          <div className="glass rounded-[28px] p-6">
            <h2 className="text-lg mb-4">Available slots</h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {slots.map((s) => {
                const busy = taken.includes(s);
                const active = form.slot === s;
                return (
                  <button
                    key={s}
                    disabled={busy}
                    onClick={() => setForm({ ...form, slot: s })}
                    className={`py-3 rounded-2xl text-sm font-semibold border transition-all duration-300 ${
                      busy
                        ? "bg-muted text-muted-foreground/50 border-transparent cursor-not-allowed line-through"
                        : active
                        ? "grad-primary text-white border-transparent shadow-lg shadow-emerald-500/30 -translate-y-0.5"
                        : "bg-card border-border hover:border-primary hover:-translate-y-0.5"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-28 h-fit glass rounded-[28px] p-6 space-y-5 shadow-2xl shadow-blue-500/10">
          <h2 className="text-lg">Reserve your slot</h2>

          <label className="block space-y-2">
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Date</span>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-card border border-border text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all" />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-2">
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Start</span>
              <input type="time" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-card border border-border text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all" />
            </label>
            <label className="block space-y-2">
              <span className="text-xs font-medium text-muted-foreground">Hours</span>
              <select value={form.hours} onChange={(e) => setForm({ ...form, hours: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-2xl bg-card border border-border text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all">
                {[1, 2, 3, 4, 5, 6, 8, 12, 24].map((h) => <option key={h} value={h}>{h} h</option>)}
              </select>
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Car className="w-3.5 h-3.5" /> Vehicle type</span>
            <select value={form.vehicle_type} onChange={(e) => setForm({ ...form, vehicle_type: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-card border border-border text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all">
              {["Car", "SUV", "Bike", "EV", "Truck"].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </label>

          <div className="pt-4 border-t border-border/60 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>₹{spot.price_per_hour} × {form.hours} h</span><span>₹{base}</span>
            </div>
            <div className="flex justify-between text-muted-foreground"><span>Service fee</span><span>₹{fee}</span></div>
            <div className="flex justify-between text-lg font-bold pt-2"><span>Total</span><span>₹{total}</span></div>
          </div>

          <button onClick={proceed} className="w-full py-3.5 rounded-full grad-primary text-white font-semibold btn-lift hover:shadow-xl hover:shadow-emerald-500/30">
            Continue to payment
          </button>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Free cancellation up to 1 hour before
          </p>
        </div>
      </div>
    </div>
  );
}