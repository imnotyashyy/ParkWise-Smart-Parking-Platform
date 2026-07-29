import React from "react";
import { MapPin, Car, Navigation } from "lucide-react";

export default function ParkingIllustration() {
  return (
    <div className="relative w-full aspect-square max-w-[520px] mx-auto">
      <div className="absolute inset-6 rounded-[40px] grad-primary opacity-20 blur-3xl" />
      <div className="absolute inset-0 glass rounded-[36px] overflow-hidden shadow-2xl">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="road" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <rect width="400" height="400" fill="url(#road)" />
          {[60, 140, 220, 300].map((y) => (
            <line key={y} x1="20" y1={y} x2="380" y2={y} stroke="#38BDF8" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="14 12" />
          ))}
          {[80, 200, 320].map((x) => (
            <line key={x} x1={x} y1="20" y2="380" x2={x} stroke="#2563EB" strokeOpacity="0.18" strokeWidth="2" strokeDasharray="10 14" />
          ))}
          <path d="M20 340 C120 340 140 200 240 200 S340 90 380 60" fill="none" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 10" />
        </svg>
      </div>

      <div className="absolute top-8 left-6 animate-float">
        <div className="glass rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl grad-primary flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Nearest spot</p>
            <p className="text-sm font-semibold">120 m away</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 right-4 animate-float-delay">
        <div className="glass rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center">
            <Car className="w-4 h-4 text-white" />
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Slots free</p>
            <p className="text-sm font-semibold">18 available</p>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 -right-2 animate-float">
        <div className="glass rounded-full px-4 py-2 shadow-xl flex items-center gap-2 text-sm font-semibold">
          <Navigation className="w-4 h-4 text-sky-500" /> 4 min
        </div>
      </div>
    </div>
  );
}