"use client";
import { cn } from "@/lib/utils";
import React, { forwardRef, ElementType } from "react";

// Type definitions
const variants = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  span: "span",
  div: "div",
  label: "label",
  caption: "p",
  overline: "p",
  button: "span",
};

const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
  "8xl": "text-8xl",
  "9xl": "text-9xl",
};

const weights = {
  thin: "font-thin",
  extralight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
};

const alignments = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const colors = {
  primary: "text-primary-600",
  secondary: "text-secondary-600",
  accent: "text-accent-600",
  success: "text-green-600",
  warning: "text-yellow-600",
  error: "text-red-600",
  info: "text-blue-600",
  muted: "text-gray-500",
  mutedForeground: "text-gray-400",
  foreground: "text-gray-900",
  background: "text-white",
  destructive: "text-red-600",
};

const lineHeights = {
  none: "leading-none",
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
};

const letterSpacings = {
  tighter: "tracking-tighter",
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
  widest: "tracking-widest",
};

// Responsive size mapping for mobile-first approach
const responsiveSizes = {
  xs: "text-xs sm:text-xs",
  sm: "text-sm sm:text-sm",
  base: "text-base sm:text-lg",
  lg: "text-lg sm:text-xl",
  xl: "text-xl sm:text-2xl",
  "2xl": "text-2xl sm:text-3xl md:text-4xl",
  "3xl": "text-3xl sm:text-4xl md:text-5xl",
  "4xl": "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
  "5xl": "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
  "6xl": "text-6xl sm:text-7xl md:text-8xl lg:text-9xl",
  "7xl": "text-7xl sm:text-8xl md:text-9xl",
  "8xl": "text-8xl sm:text-9xl",
  "9xl": "text-9xl sm:text-9xl",
};

// Predefined typography styles for design system consistency
const typographyStyles = {
  // Headings
  "heading-1":
    "text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight",
  "heading-2":
    "text-xl sm:text-2xl md:text-3xl font-bold leading-tight tracking-tight",
  "heading-3":
    "text-lg sm:text-xl md:text-2xl font-semibold leading-snug tracking-tight",
  "heading-4": "text-base sm:text-lg md:text-xl font-semibold leading-snug",
  "heading-5": "text-sm sm:text-base md:text-lg font-semibold leading-snug",
  "heading-6": "text-xs sm:text-sm md:text-base font-semibold leading-snug",

  // Body text
  "body-large": "text-base sm:text-lg leading-relaxed",
  body: "text-sm sm:text-base leading-relaxed",
  "body-small": "text-xs sm:text-sm leading-relaxed",

  // Captions and labels
  caption: "text-xs sm:text-sm leading-normal text-muted-foreground",
  overline:
    "text-xs font-medium uppercase tracking-widest text-muted-foreground",
  label: "text-xs sm:text-sm font-medium leading-none",

  // Special text
  lead: "text-base leading-relaxed text-muted-foreground",
  large: "text-base font-semibold",
  small: "text-xs leading-normal text-muted-foreground",
  muted: "text-xs text-muted-foreground",

  // Bengali text support
  "bengali-heading-1":
    "text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight font-bengali",
  "bengali-heading-2":
    "text-xl sm:text-2xl md:text-3xl font-bold leading-tight tracking-tight font-bengali",
  "bengali-heading-3":
    "text-lg sm:text-xl md:text-2xl font-semibold leading-snug tracking-tight font-bengali",
  "bengali-body": "text-sm sm:text-base leading-relaxed font-bengali",
  "bengali-caption":
    "text-xs sm:text-sm leading-normal text-muted-foreground font-bengali",
} as const;

// Type definitions
type VariantKey = keyof typeof variants;
type SizeKey = keyof typeof sizes;
type ResponsiveSizeKey = keyof typeof responsiveSizes;
type WeightKey = keyof typeof weights;
type ColorKey = keyof typeof colors;
type AlignmentKey = keyof typeof alignments;
type LineHeightKey = keyof typeof lineHeights;
type LetterSpacingKey = keyof typeof letterSpacings;

// Base Typography Props
export interface TypographyProps {
  variant?: VariantKey;
  size?: SizeKey;
  responsiveSize?: ResponsiveSizeKey;
  weight?: WeightKey;
  color?: ColorKey;
  align?: AlignmentKey;
  lineHeight?: LineHeightKey;
  letterSpacing?: LetterSpacingKey;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  as?: ElementType;
  truncate?: boolean;
  noWrap?: boolean;
}

// Union type for all possible element types
type TypographyElement =
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLDivElement
  | HTMLLabelElement;

const Typography = forwardRef<TypographyElement, TypographyProps>(
  (
    {
      variant = "p",
      size,
      responsiveSize,
      weight,
      color = "foreground",
      align,
      lineHeight,
      letterSpacing,
      className,
      children,
      style,
      as,
      truncate = false,
      noWrap = false,
      ...props
    },
    ref
  ) => {
    const Component = as || variants[variant];

    // Determine size classes
    let sizeClasses = "";
    if (responsiveSize) {
      sizeClasses = responsiveSizes[responsiveSize] || "";
    } else if (size) {
      sizeClasses = sizes[size] || "";
    }

    // Build className
    const classes = cn(
      // Base styles
      "text-render-fix",

      // Size
      sizeClasses,

      // Weight
      weight && weights[weight],

      // Color
      color && colors[color],

      // Alignment
      align && alignments[align],

      // Line height
      lineHeight && lineHeights[lineHeight],

      // Letter spacing
      letterSpacing && letterSpacings[letterSpacing],

      // Text behavior
      truncate && "truncate",
      noWrap && "whitespace-nowrap",

      // Custom className
      className
    );

    return (
      <Component
        ref={ref as any}
        className={classes}
        style={style}
        {...(props as any)}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = "Typography";

// Predefined Typography Components for Design System
export interface PredefinedTypographyProps
  extends Omit<TypographyProps, "variant" | "size" | "responsiveSize"> {
  className?: string;
  children?: React.ReactNode;
}

const Heading1 = forwardRef<HTMLHeadingElement, PredefinedTypographyProps>(
  ({ className, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="h1"
      className={cn(typographyStyles["heading-1"], className)}
      {...props}
    />
  )
);
Heading1.displayName = "Heading1";

const Heading2 = forwardRef<HTMLHeadingElement, PredefinedTypographyProps>(
  ({ className, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="h2"
      className={cn(typographyStyles["heading-2"], className)}
      {...props}
    />
  )
);
Heading2.displayName = "Heading2";

const Heading3 = forwardRef<HTMLHeadingElement, PredefinedTypographyProps>(
  ({ className, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="h3"
      className={cn(typographyStyles["heading-3"], className)}
      {...props}
    />
  )
);
Heading3.displayName = "Heading3";

const Heading4 = forwardRef<HTMLHeadingElement, PredefinedTypographyProps>(
  ({ className, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="h4"
      className={cn(typographyStyles["heading-4"], className)}
      {...props}
    />
  )
);
Heading4.displayName = "Heading4";

const Heading5 = forwardRef<HTMLHeadingElement, PredefinedTypographyProps>(
  ({ className, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="h5"
      className={cn(typographyStyles["heading-5"], className)}
      {...props}
    />
  )
);
Heading5.displayName = "Heading5";

const Heading6 = forwardRef<HTMLHeadingElement, PredefinedTypographyProps>(
  ({ className, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="h6"
      className={cn(typographyStyles["heading-6"], className)}
      {...props}
    />
  )
);
Heading6.displayName = "Heading6";

const BodyLarge = forwardRef<HTMLParagraphElement, PredefinedTypographyProps>(
  ({ className, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="p"
      className={cn(typographyStyles["body-large"], className)}
      {...props}
    />
  )
);
BodyLarge.displayName = "BodyLarge";

const Body = forwardRef<HTMLParagraphElement, PredefinedTypographyProps>(
  ({ className, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="p"
      className={cn(typographyStyles["body"], className)}
      {...props}
    />
  )
);
Body.displayName = "Body";

const BodySmall = forwardRef<HTMLParagraphElement, PredefinedTypographyProps>(
  ({ className, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="p"
      className={cn(typographyStyles["body-small"], className)}
      {...props}
    />
  )
);
BodySmall.displayName = "BodySmall";

const Caption = forwardRef<HTMLParagraphElement, PredefinedTypographyProps>(
  ({ className, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="p"
      className={cn(typographyStyles["caption"], className)}
      {...props}
    />
  )
);
Caption.displayName = "Caption";

const Overline = forwardRef<HTMLParagraphElement, PredefinedTypographyProps>(
  ({ className, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="p"
      className={cn(typographyStyles["overline"], className)}
      {...props}
    />
  )
);
Overline.displayName = "Overline";

const Label = forwardRef<
  HTMLLabelElement | HTMLParagraphElement,
  PredefinedTypographyProps
>(({ className, ...props }, ref) => (
  <Typography
    ref={ref}
    variant="label"
    className={cn(typographyStyles["label"], className)}
    {...props}
  />
));
Label.displayName = "Label";

const Lead = forwardRef<HTMLParagraphElement, PredefinedTypographyProps>(
  ({ className, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="p"
      className={cn(typographyStyles["lead"], className)}
      {...props}
    />
  )
);
Lead.displayName = "Lead";

const Large = forwardRef<HTMLParagraphElement, PredefinedTypographyProps>(
  ({ className, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="p"
      className={cn(typographyStyles["large"], className)}
      {...props}
    />
  )
);
Large.displayName = "Large";

const Small = forwardRef<HTMLParagraphElement, PredefinedTypographyProps>(
  ({ className, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="p"
      className={cn(typographyStyles["small"], className)}
      {...props}
    />
  )
);
Small.displayName = "Small";

const Muted = forwardRef<HTMLParagraphElement, PredefinedTypographyProps>(
  ({ className, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="p"
      className={cn(typographyStyles["muted"], className)}
      {...props}
    />
  )
);
Muted.displayName = "Muted";

// Bengali Typography Components
const BengaliHeading1 = forwardRef<
  HTMLHeadingElement,
  PredefinedTypographyProps
>(({ className, ...props }, ref) => (
  <Typography
    ref={ref}
    variant="h1"
    className={cn(typographyStyles["bengali-heading-1"], className)}
    {...props}
  />
));
BengaliHeading1.displayName = "BengaliHeading1";

const BengaliHeading2 = forwardRef<
  HTMLHeadingElement,
  PredefinedTypographyProps
>(({ className, ...props }, ref) => (
  <Typography
    ref={ref}
    variant="h2"
    className={cn(typographyStyles["bengali-heading-2"], className)}
    {...props}
  />
));
BengaliHeading2.displayName = "BengaliHeading2";

const BengaliHeading3 = forwardRef<
  HTMLHeadingElement,
  PredefinedTypographyProps
>(({ className, ...props }, ref) => (
  <Typography
    ref={ref}
    variant="h3"
    className={cn(typographyStyles["bengali-heading-3"], className)}
    {...props}
  />
));
BengaliHeading3.displayName = "BengaliHeading3";

const BengaliBody = forwardRef<HTMLParagraphElement, PredefinedTypographyProps>(
  ({ className, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="p"
      className={cn(typographyStyles["bengali-body"], className)}
      {...props}
    />
  )
);
BengaliBody.displayName = "BengaliBody";

const BengaliCaption = forwardRef<
  HTMLParagraphElement,
  PredefinedTypographyProps
>(({ className, ...props }, ref) => (
  <Typography
    ref={ref}
    variant="p"
    className={cn(typographyStyles["bengali-caption"], className)}
    {...props}
  />
));
BengaliCaption.displayName = "BengaliCaption";

// Export types (interfaces are already exported above)
export type {
  VariantKey,
  SizeKey,
  ResponsiveSizeKey,
  WeightKey,
  ColorKey,
  AlignmentKey,
  LineHeightKey,
  LetterSpacingKey,
};

export {
  Typography,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  BodyLarge,
  Body,
  BodySmall,
  Caption,
  Overline,
  Label,
  Lead,
  Large,
  Small,
  Muted,
  BengaliHeading1,
  BengaliHeading2,
  BengaliHeading3,
  BengaliBody,
  BengaliCaption,
  variants,
  sizes,
  weights,
  alignments,
  colors,
  lineHeights,
  letterSpacings,
  responsiveSizes,
  typographyStyles,
};
