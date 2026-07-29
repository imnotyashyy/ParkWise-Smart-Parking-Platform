import React, { useState } from "react";
import { CreditCard, Smartphone, Wallet, QrCode, Tag, Lock } from "lucide-react";
import { base44 } from "@/api/base44Client";
import FloatingInput from "@/components/FloatingInput";
import PaymentSuccess from "@/components/PaymentSuccess";
import { useToast } from "@/components/ui/use-toast";

const methods = [
  { key: "card", label: "Card", icon: CreditCard },
  { key: "upi", label: "UPI", icon: Smartphone },
  { key: "wallet", label: "Wallet", icon: Wallet },
  { key: "qr", label: "QR", icon: QrCode },
];

export default function Payment() {
  const urlParams = new URLSearchParams(window.location.search);
  const booking = {
    spot_id: urlParams.get("spot_id") || "",
    spot_name: urlParams.get("spot_name") || "ParkWise spot",
    city: urlParams.get("city") || "",
    date: urlParams.get("date") || new Date().toISOString().slice(0, 10),
    start_time: urlParams.get("start_time") || "10:00",
    hours: Number(urlParams.get("hours") || 2),
    vehicle_type: urlParams.get("vehicle_type") || "Car",
    slot: urlParams.get("slot") || "A-01",
  };
  const amount = Number(urlParams.get("amount") || 0);

  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upi, setUpi] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const payable = Math.max(0, amount - discount);

  const applyCode = () => {
    if (code.trim().toUpperCase() === "PARK10") {
      setDiscount(Math.round(amount * 0.1));
      toast({ title: "Coupon applied", description: "10% off your booking." });
    } else {
      toast({ title: "Invalid coupon", description: "Try PARK10.", variant: "destructive" });
    }
  };

  const pay = async () => {
    setLoading(true);
    await base44.entities.Booking.create({ ...booking, amount: payable, payment_method: method, status: "upcoming" });
    setLoading(false);
    setDone(true);
  };

  if (done) return <div className="px-6 pb-10"><PaymentSuccess amount={payable} spotName={booking.spot_name} slot={booking.slot} /></div>;

  return (
    <div className="px-6 pb-10">
      <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-6">
          <h1 className="text-4xl">Checkout</h1>

          <div className="glass rounded-[28px] p-6">
            <h2 className="text-lg mb-4">Payment method</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {methods.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMethod(m.key)}
                  className={`flex flex-col items-center gap-2 py-4 rounded-2xl border text-sm font-semibold transition-all duration-300 ${
                    method === m.key
                      ? "grad-primary text-white border-transparent shadow-lg shadow-emerald-500/30 -translate-y-0.5"
                      : "bg-card border-border hover:border-primary hover:-translate-y-0.5"
                  }`}
                >
                  <m.icon className="w-5 h-5" /> {m.label}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              {method === "card" && (
                <>
                  <FloatingInput label="Card number" icon={CreditCard} value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} />
                  <FloatingInput label="Name on card" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} />
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingInput label="MM / YY" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} />
                    <FloatingInput label="CVV" type="password" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} />
                  </div>
                </>
              )}
              {method === "upi" && (
                <FloatingInput label="UPI ID (name@bank)" icon={Smartphone} value={upi} onChange={(e) => setUpi(e.target.value)} />
              )}
              {method === "wallet" && (
                <div className="grid sm:grid-cols-3 gap-3">
                  {["ParkWise Wallet · ₹1,240", "Paytm", "Amazon Pay"].map((w) => (
                    <div key={w} className="p-4 rounded-2xl bg-card border border-border text-sm font-medium hover:border-primary cursor-pointer transition-all">{w}</div>
                  ))}
                </div>
              )}
              {method === "qr" && (
                <div className="flex flex-col items-center gap-3 py-4">
                  <div className="w-40 h-40 rounded-3xl bg-card border border-border flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Scan with any UPI app to pay ₹{payable}</p>
                </div>
              )}
            </div>
          </div>

          <div className="glass rounded-[28px] p-6">
            <h2 className="text-lg mb-4">Have a discount code?</h2>
            <div className="flex gap-3">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border border-border focus-within:border-primary transition-all">
                <Tag className="w-4 h-4 text-primary" />
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code (PARK10)" className="w-full bg-transparent text-sm outline-none" />
              </div>
              <button onClick={applyCode} className="px-6 rounded-2xl bg-card border-2 border-primary text-primary font-semibold text-sm btn-lift">Apply</button>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-28 h-fit glass rounded-[28px] p-6 space-y-5">
          <h2 className="text-lg">Booking summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Spot</span><span className="font-medium text-right">{booking.spot_name}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Slot</span><span className="font-medium">{booking.slot}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{booking.date}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{booking.start_time} · {booking.hours}h</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Vehicle</span><span className="font-medium">{booking.vehicle_type}</span></div>
          </div>
          <div className="pt-4 border-t border-border/60 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>₹{amount}</span></div>
            {discount > 0 && <div className="flex justify-between text-emerald-500"><span>Discount</span><span>-₹{discount}</span></div>}
            <div className="flex justify-between text-2xl font-bold pt-2"><span>Total</span><span>₹{payable}</span></div>
          </div>
          <button onClick={pay} disabled={loading} className="w-full py-3.5 rounded-full grad-primary text-white font-semibold btn-lift hover:shadow-xl hover:shadow-emerald-500/30 disabled:opacity-60">
            {loading ? "Processing…" : `Pay ₹${payable}`}
          </button>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> Secured with 256-bit encryption
          </p>
        </div>
      </div>
    </div>
  );
}