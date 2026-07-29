import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, ShieldCheck } from "lucide-react";
import AuthShell from "@/components/AuthShell";
import FloatingInput from "@/components/FloatingInput";
import SocialAuthButtons from "@/components/SocialAuthButtons";
import { useToast } from "@/components/ui/use-toast";

const strengthMeta = [
  { label: "Too weak", color: "bg-red-500", width: "w-1/4" },
  { label: "Weak", color: "bg-orange-400", width: "w-2/4" },
  { label: "Good", color: "bg-sky-400", width: "w-3/4" },
  { label: "Strong", color: "bg-emerald-500", width: "w-full" },
];

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const score = useMemo(() => {
    const p = form.password;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return Math.max(0, s - 1);
  }, [form.password]);

  const submit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Account created", description: "Welcome to ParkWise!" });
      navigate("/dashboard");
    }, 900);
  };

  const meta = strengthMeta[score];

  return (
    <AuthShell title="Create your account" subtitle="Reserve parking in seconds, anywhere you drive.">
      <form onSubmit={submit} className="space-y-4">
        <FloatingInput label="Full name" icon={User} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <FloatingInput label="Email address" icon={Mail} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <FloatingInput label="Phone number" icon={Phone} type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        <FloatingInput label="Password" icon={Lock} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        {form.password && (
          <div className="space-y-1.5">
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div className={`h-full ${meta.color} ${meta.width} rounded-full transition-all duration-500`} />
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Password strength: <span className="font-semibold">{meta.label}</span>
            </p>
          </div>
        )}
        <FloatingInput label="Confirm password" icon={Lock} type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-full grad-primary text-white font-semibold btn-lift hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>
      <SocialAuthButtons />
      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
      </p>
    </AuthShell>
  );
}