import React from "react";
import { Apple, Chrome } from "lucide-react";

export default function SocialAuthButtons() {
  return (
    <>
      <div className="flex items-center gap-3 my-6">
        <span className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">or continue with</span>
        <span className="flex-1 h-px bg-border" />
      </div>
      <div className="grid gap-3">
        <button className="flex items-center justify-center gap-2 py-3 rounded-full bg-card border-2 border-primary/30 text-sm font-semibold btn-lift hover:border-primary hover:shadow-lg">
          <Chrome className="w-4 h-4 text-primary" /> Continue with Google
        </button>
        <button className="flex items-center justify-center gap-2 py-3 rounded-full bg-card border-2 border-border text-sm font-semibold btn-lift hover:shadow-lg">
          <Apple className="w-4 h-4" /> Continue with Apple
        </button>
      </div>
    </>
  );
}