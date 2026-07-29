import React, { useState } from "react";
import { MapPin, Building2, Calendar, Clock, Car, Search } from "lucide-react";

const field =
  "w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/70 text-foreground";
const wrap =
  "flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border border-border transition-all duration-300 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15 focus-within:-translate-y-0.5";

export default function SearchBar({ value, onChange, onSearch }) {
  const [local, setLocal] = useState(value || {});
  const state = value || local;
  const set = (k, v) => {
    const next = { ...state, [k]: v };
    setLocal(next);
    onChange?.(next);
  };

  return (
    <div className="glass rounded-[28px] p-4 sm:p-5 shadow-2xl shadow-emerald-500/10">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
        <div className={wrap}>
          <Building2 className="w-4 h-4 text-primary shrink-0" />
          <input className={field} placeholder="City" value={state.city || ""} onChange={(e) => set("city", e.target.value)} />
        </div>
        <div className={wrap}>
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <input className={field} placeholder="Location or landmark" value={state.location || ""} onChange={(e) => set("location", e.target.value)} />
        </div>
        <div className={wrap}>
          <Calendar className="w-4 h-4 text-primary shrink-0" />
          <input type="date" className={field} value={state.date || ""} onChange={(e) => set("date", e.target.value)} />
        </div>
        <div className={wrap}>
          <Clock className="w-4 h-4 text-primary shrink-0" />
          <input type="time" className={field} value={state.time || ""} onChange={(e) => set("time", e.target.value)} />
        </div>
        <div className={wrap}>
          <Car className="w-4 h-4 text-primary shrink-0" />
          <select className={`${field} cursor-pointer`} value={state.vehicle || "Car"} onChange={(e) => set("vehicle", e.target.value)}>
            {["Car", "SUV", "Bike", "EV", "Truck"].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => onSearch?.(state)}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl grad-primary text-white font-semibold btn-lift hover:shadow-xl hover:shadow-blue-500/30"
        >
          <Search className="w-4 h-4" /> Search
        </button>
      </div>
    </div>
  );
}