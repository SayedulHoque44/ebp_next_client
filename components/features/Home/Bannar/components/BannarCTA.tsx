"use client";
import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import CTA from "@/components/shared/CTA";

/**
 * BannarCTA Component (Client Component)
 * 
 * Call-to-action buttons with interactivity.
 * Client component for hover effects and interactions.
 */
const BannarCTA = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Link href="/dashboard">
        <Button
          variant="primary"
          size="lg"
          className="group w-full sm:w-auto"
        >
          Start Learning Now
        </Button>
      </Link>
      <CTA phone="+39 320 608 8871" outlined={true} />
    </div>
  );
};

export default BannarCTA;
