import React from "react";
import { Link } from "react-router-dom";
import { CircleParking, Mail, Phone, MapPin, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/60 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl grad-primary flex items-center justify-center">
              <CircleParking className="w-5 h-5 text-white" />
            </span>
            <span className="font-heading font-bold text-lg">ParkWise</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Smart parking for modern cities. Search, reserve and pay in seconds — no circling, no stress.
          </p>
          <div className="flex gap-2 pt-2">
            {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
              <span key={i} className="w-9 h-9 rounded-full glass flex items-center justify-center btn-lift hover:text-primary cursor-pointer">
                <Icon className="w-4 h-4" />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {[["Find Parking", "/parking"], ["Dashboard", "/dashboard"], ["Profile", "/profile"], ["Sign Up", "/signup"]].map(([l, to]) => (
              <li key={to}>
                <Link to={to} className="hover:text-primary transition-colors">{l}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Company</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {["About us", "Careers", "Partners", "Press"].map((l) => (
              <li key={l} className="hover:text-primary transition-colors cursor-pointer">{l}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> hello@parkwise.app</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Bengaluru, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ParkWise. All rights reserved.
      </div>
    </footer>
  );
}