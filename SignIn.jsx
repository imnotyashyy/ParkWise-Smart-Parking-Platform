import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import AuthShell from "@/components/AuthShell";
import FloatingInput from "@/components/FloatingInput";
import SocialAuthButtons from "@/components/SocialAuthButtons";
import { useToast } from "@/components/ui/use-toast";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Welcome back!", description: "You're signed in to ParkWise." });
      navigate("/dashboard");
    }, 900);
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to manage your bookings and saved spots.">
      <form onSubmit={submit} className="space-y-4">
        <FloatingInput label="Email address" icon={Mail} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <FloatingInput label="Password" icon={Lock} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer text-muted-foreground">
            <input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} className="w-4 h-4 rounded accent-blue-600" />
            Remember me
          </label>
          <span className="text-primary font-medium cursor-pointer hover:underline">Forgot password?</span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-full grad-primary text-white font-semibold btn-lift hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Login"}
        </button>
      </form>
      <SocialAuthButtons />
      <p className="text-center text-sm text-muted-foreground mt-6">
        New to ParkWise? <Link to="/signup" className="text-primary font-semibold hover:underline">Create an account</Link>
      </p>
    </AuthShell>
  );
}