"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Body } from "@/components/ui/Typography";

interface LoginFormActionsProps {
  isSubmitting: boolean;
  isLoading: boolean;
}

/**
 * LoginFormActions Component (Client Component)
 * 
 * Form actions (forgot PIN link, submit button, register link)
 * Client component for interactions
 */
export const LoginFormActions: React.FC<LoginFormActionsProps> = ({
  isSubmitting,
  isLoading,
}) => {
  return (
    <>
      {/* Forgot PIN Link */}
      <div className="text-center">
        <a
          href="tel:+393206088871"
          className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
        >
          Forgot PIN? Contact us: +39 320 608 8871
        </a>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        loading={isSubmitting || isLoading}
        className="w-full"
      >
        Sign In
      </Button>

      {/* Register Link */}
      <div className="text-center pt-4">
        <Body className="text-gray-600 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Register Now
          </Link>
        </Body>
      </div>
    </>
  );
};
