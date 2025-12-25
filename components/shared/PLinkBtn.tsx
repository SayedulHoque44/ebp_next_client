import React from "react";
import Link from "next/link";
import useNavigateWithScroll from "@/hooks/useNavigateWithScroll";
import Button, { ButtonSize, ButtonVariant } from "@/components/ui/Button";

const PLinkBtn = ({
  link,
  text,
  className = "",
  variant = "primary",
  size = "md",
  scrollToTop = true,
  leftIcon,
  rightIcon,
  onClick,
  ...rest
}: {
  link: string;
  text: string;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  scrollToTop?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const navigateWithScroll = useNavigateWithScroll({ scrollToTop });

  const handleClick = (e: any) => {
    if (onClick) {
      onClick(e);
    }
    if (scrollToTop) {
      navigateWithScroll(link);
    }
  };

  return (
    <Link href={link} onClick={handleClick}>
      <Button
        variant={variant}
        size={size}
        className={className}
        ripple={true}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        {...rest}
      >
        {text}
      </Button>
    </Link>
  );
};

export default PLinkBtn;
