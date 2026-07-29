import React, { useEffect, useState } from "react";
import { CircleParking, CalendarCheck, IndianRupee, Gauge, Bell } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { base44 } from "@/api/base44Client";
import StatCard from "@/components/StatCard";

const earnings = [
  { day: "Mon", amount: 4200 }, { day: "Tue", amount: 5100 }, { day: "Wed", amount: 3900 },
  { day: "Thu", amount: 6400 }, { day: "Fri", amount: 8200 }, { day: "Sat", amount: 9600 }, { day: "Sun", amount: 7300 },
];

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    base44.entities.Booking.list("-created_date", 20).then(setBookings);
    base44.entities.ParkingSpot.list("-rating", 20).then(setSpots);
  }, []);

  const available = spots.reduce((a, s) => a + (s.available_spaces || 0), 0);
  const total = spots.reduce((a, s) => a + (s.total_spaces || 0), 0);
  const revenue = bookings.reduce((a, b) => a + (b.amount || 0), 0);
  const occupancy = total ? Math.round(((total - available) / total) * 100) : 0;

  const utilisation = spots.slice(0, 6).map((s) => ({
    name: s.name?.split(" ")[0] || "Spot",
    used: (s.total_spaces || 0) - (s.available_spaces || 0),
  }));

  return (
    <div className="px-6 pb-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl sm:text-5xl">Dashboard</h1>
          <p className="text-muted-foreground mt-3">Live overview of your parking network.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard index={0} label="Available parking" value={available} delta="+6%" icon={CircleParking} />
          <StatCard index={1} label="Bookings today" value={bookings.length} delta="+12%" icon={CalendarCheck} />
          <StatCard index={2} label="Revenue" value={`₹${revenue.toLocaleString("en-IN")}`} delta="+18%" icon={IndianRupee} />
          <StatCard index={3} label="Occupancy rate" value={`${occupancy}%`} delta="+3%" icon={Gauge} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="glass rounded-[28px] p-6 lg:col-span-2">
            <h2 className="text-lg mb-6">Weekly earnings</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earnings}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#16A34A" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 6" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 16, border: "none", background: "hsl(var(--card))", color: "hsl(var(--card-foreground))" }} />
                  <Area type="monotone" dataKey="amount" stroke="#16A34A" strokeWidth={3} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass rounded-[28px] p-6">
            <h2 className="text-lg mb-6 flex items-center gap-2"><Bell className="w-4 h-4 text-primary" /> Notifications</h2>
            <ul className="space-y-4">
              {[
                ["Slot B-12 released", "2 min ago"],
                ["Payment of ₹240 received", "18 min ago"],
                ["Occupancy above 90% at MG Road", "1 hr ago"],
                ["New 5★ review", "3 hrs ago"],
              ].map(([t, s]) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full grad-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium leading-snug">{t}</p>
                    <p className="text-xs text-muted-foreground">{s}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-[28px] p-6">
            <h2 className="text-lg mb-6">Parking statistics</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={utilisation}>
                  <CartesianGrid strokeDasharray="4 6" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 16, border: "none", background: "hsl(var(--card))", color: "hsl(var(--card-foreground))" }} />
                  <Bar dataKey="used" fill="#38BDF8" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass rounded-[28px] p-6">
            <h2 className="text-lg mb-6">Booking history</h2>
            <div className="space-y-3">
              {bookings.slice(0, 6).map((b) => (
                <div key={b.id} className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-card/60 border border-border/60">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{b.spot_name}</p>
                    <p className="text-xs text-muted-foreground">{b.date} · {b.start_time} · {b.hours}h</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold">₹{b.amount}</p>
                    <p className="text-xs text-emerald-500 capitalize">{b.status}</p>
                  </div>
                </div>
              ))}
              {bookings.length === 0 && <p className="text-sm text-muted-foreground">No bookings yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}