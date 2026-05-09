"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface RegisterFormActionsProps {
  isSubmitting: boolean;
  isLoading: boolean;
}

/**
 * RegisterFormActions Component (Client Component)
 * 
 * Form actions (submit button, login link)
 * Client component for interactions
 */
export const RegisterFormActions: React.FC<RegisterFormActionsProps> = ({
  isSubmitting,
  isLoading,
}) => {
  return (
    <>
      {/* Submit Button */}
      <Button
        type="submit"
        loading={isSubmitting || isLoading}
        className="w-full"
        size="lg"
      >
        Create Account
      </Button>

      {/* Login Link */}
      <div className="text-center pt-4">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Log In
          </Link>
        </p>
      </div>
    </>
  );
};
