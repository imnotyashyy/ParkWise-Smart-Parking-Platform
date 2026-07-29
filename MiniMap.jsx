import React from "react";
import { MapPin, Navigation } from "lucide-react";

export default function MiniMap({ name }) {
  return (
    <div className="relative h-64 rounded-[24px] overflow-hidden border border-border">
      <svg viewBox="0 0 400 260" className="w-full h-full">
        <rect width="400" height="260" fill="hsl(var(--muted))" />
        {[40, 100, 160, 220].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="hsl(var(--border))" strokeWidth="8" />
        ))}
        {[70, 190, 310].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="260" stroke="hsl(var(--border))" strokeWidth="8" />
        ))}
        <path d="M20 240 C90 240 120 140 190 140 S300 60 380 40" fill="none" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
        <span className="w-10 h-10 rounded-full grad-primary flex items-center justify-center shadow-xl animate-float">
          <MapPin className="w-5 h-5 text-white" />
        </span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 glass rounded-2xl px-4 py-3 flex items-center justify-between">
        <p className="text-sm font-medium truncate">{name}</p>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-primary shrink-0">
          <Navigation className="w-3.5 h-3.5" /> Directions
        </span>
      </div>
    </div>
  );
}