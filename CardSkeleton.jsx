import React from "react";

export default function CardSkeleton() {
  return (
    <div className="bg-card rounded-[26px] border border-border overflow-hidden animate-pulse">
      <div className="h-48 bg-muted" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-3/4 bg-muted rounded-full" />
        <div className="h-3 w-1/2 bg-muted rounded-full" />
        <div className="h-9 w-28 bg-muted rounded-full ml-auto" />
      </div>
    </div>
  );
}