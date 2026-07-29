import React from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, CircleParking } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function ParkingCard({ spot }) {
  return (
    <div className="group bg-card rounded-[26px] border border-border overflow-hidden shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/15">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={spot.image_url}
          alt={spot.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute top-3 left-3 px-3 py-1.5 rounded-full glass text-xs font-semibold">
          ₹{spot.price_per_hour}/hr
        </span>
        <span className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-semibold">
          {spot.available_spaces} free
        </span>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug">{spot.name}</h3>
          <span className="flex items-center gap-1 text-sm font-semibold shrink-0">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {spot.rating}
          </span>
        </div>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" /> {spot.address || spot.city} · {spot.distance_km} km
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CircleParking className="w-4 h-4 text-primary" /> {spot.available_spaces}/{spot.total_spaces} spaces
          </span>
          <Link
            to={`/booking?id=${spot.id}`}
            className="px-5 py-2.5 rounded-full grad-primary text-white text-sm font-semibold btn-lift hover:shadow-lg hover:shadow-emerald-500/30"
          >
            Reserve
          </Link>
        </div>
      </div>
    </div>
  );
}