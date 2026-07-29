import React from "react";

export default function FloatingInput({ label, icon: Icon, type = "text", value, onChange, ...rest }) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-4 w-4 h-4 text-muted-foreground peer-focus:text-primary" />}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={`peer w-full ${Icon ? "pl-11" : "pl-4"} pr-4 pt-5 pb-2 rounded-2xl bg-card border border-border text-sm font-medium outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/15`}
        {...rest}
      />
      <label
        className={`pointer-events-none absolute ${Icon ? "left-11" : "left-4"} top-1 text-[11px] font-medium text-muted-foreground transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-[11px] peer-focus:text-primary`}
      >
        {label}
      </label>
    </div>
  );
}