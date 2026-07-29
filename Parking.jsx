import React, { useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import SearchBar from "@/components/SearchBar";
import ParkingCard from "@/components/ParkingCard";
import CardSkeleton from "@/components/CardSkeleton";

export default function Parking() {
  const urlParams = new URLSearchParams(window.location.search);
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({ city: urlParams.get("city") || "", vehicle: "Car" });
  const [applied, setApplied] = useState(query);

  useEffect(() => {
    base44.entities.ParkingSpot.list("-rating", 60).then((r) => {
      setSpots(r);
      setLoading(false);
    });
  }, []);

  const results = useMemo(() => {
    const c = (applied.city || "").toLowerCase();
    const l = (applied.location || "").toLowerCase();
    return spots.filter(
      (s) =>
        (!c || (s.city || "").toLowerCase().includes(c)) &&
        (!l || `${s.name} ${s.address}`.toLowerCase().includes(l))
    );
  }, [spots, applied]);

  return (
    <div className="px-6 pb-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl">Find your <span className="text-grad">perfect spot</span></h1>
        <p className="text-muted-foreground mt-3 mb-8">Live availability, real prices, instant reservation.</p>
        <SearchBar value={query} onChange={setQuery} onSearch={setApplied} />

        <p className="text-sm text-muted-foreground mt-8 mb-6">
          {loading ? "Loading spaces…" : `${results.length} parking spaces available`}
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? [0, 1, 2, 3, 4, 5].map((i) => <CardSkeleton key={i} />)
            : results.map((s) => <ParkingCard key={s.id} spot={s} />)}
        </div>
        {!loading && results.length === 0 && (
          <div className="glass rounded-[26px] p-12 text-center">
            <p className="font-semibold">No spaces match your search</p>
            <p className="text-sm text-muted-foreground mt-2">Try a different city or clear the filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}