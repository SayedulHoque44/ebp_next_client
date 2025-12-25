"use client";
import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { ImSpinner9 } from "react-icons/im";
import { cn } from "@/lib/utils";

// Type definitions
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success"
  | "warning"
  | "link";

export type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";

// Button Props Interface
export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "disabled"
  > {
  variant?: ButtonVariant;
  size?: ButtonSize;
  ripple?: boolean;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      ripple = true,
      loading = false,
      className = "",
      children,
      leftIcon,
      rightIcon,
      onClick,
      ...rest
    },
    forwardedRef
  ) => {
    const localRef = useRef<HTMLButtonElement>(null);

    // Merge external forwarded ref with internal ref
    useImperativeHandle(forwardedRef, () => {
      if (!localRef.current) {
        throw new Error("Button ref is not available");
      }
      return localRef.current;
    });

    // Base button classes
    const baseClasses =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden whitespace-nowrap";

    // Variant styles following the design system
    const variants = {
      primary:
        "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-soft hover:shadow-medium focus:ring-primary-500",
      secondary:
        "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300 focus:ring-gray-500",
      outline:
        "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 bg-transparent",
      ghost: "text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
      danger:
        "bg-gradient-to-r from-error-500 to-error-600 hover:from-error-600 hover:to-error-700 text-white shadow-soft hover:shadow-medium focus:ring-error-500",
      success:
        "bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white shadow-soft hover:shadow-medium focus:ring-success-500",
      warning:
        "bg-gradient-to-r from-warning-500 to-warning-600 hover:from-warning-600 hover:to-warning-700 text-white shadow-soft hover:shadow-medium focus:ring-warning-500",
      link: "text-primary-600 underline-offset-4 hover:underline focus:ring-primary-500",
    };

    // Size styles
    const sizes = {
      sm: "px-3 py-2 text-sm h-8",
      md: "px-5 py-3 text-base h-10",
      lg: "px-6 py-4 text-lg h-12",
      xl: "px-8 py-5 text-xl h-14",
      icon: "w-10 h-10 p-0",
    };

    // Combine all classes
    const buttonClasses = cn(
      baseClasses,
      variants[variant] || variants.primary,
      sizes[size] || sizes.md,
      ripple && "ripple-container",
      className
    );

    /**
     * Handle click with ripple effect
     * Creates a ripple animation at the click position
     */
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && !loading) {
        const button = localRef.current;
        if (!button) return;

        const ripple = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${
          e.clientX - button.getBoundingClientRect().left - radius
        }px`;
        ripple.style.top = `${
          e.clientY - button.getBoundingClientRect().top - radius
        }px`;

        // Add appropriate class based on variant
        if (
          variant === "secondary" ||
          variant === "outline" ||
          variant === "ghost"
        ) {
          ripple.className = "ripple-effect ripple-secondary";
        } else {
          ripple.className = "ripple-effect ripple-primary";
        }

        const existing = button.getElementsByClassName("ripple-effect")[0];
        if (existing) existing.remove();

        button.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
          if (ripple.parentElement) {
            ripple.remove();
          }
        }, 600);
      }

      // Call user click handler
      if (!loading) {
        onClick?.(e);
      }
    };

    return (
      <button
        ref={localRef}
        className={buttonClasses}
        onClick={handleClick}
        disabled={loading || rest.disabled}
        {...rest}
      >
        {loading ? (
          <ImSpinner9 className="animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="button-icon-left">{leftIcon}</span>}
            {children && <span className="button-content">{children}</span>}
            {rightIcon && (
              <span className="button-icon-right">{rightIcon}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
