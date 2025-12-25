import React from "react";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import Button from "@/components/ui/Button";

const CTA = ({
  phone,
  className = "",
  outlined = false,
}: {
  phone: string;
  className?: string;
  outlined?: boolean;
}) => {
  const icon = (
    <span className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary-500 text-white text-xl sm:text-2xl shadow-md transition-all duration-300 group-hover:bg-primary-600 group-hover:scale-110">
      <BsFillTelephoneForwardFill />
    </span>
  );

  const handleClick = () => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <Button
      variant={outlined ? "outline" : "primary"}
      size="lg"
      className={`group rounded-full w-full sm:w-auto ${className}`}
      leftIcon={<BsFillTelephoneForwardFill />}
      ripple={true}
      onClick={handleClick}
    >
      <span className="tracking-wide">{phone}</span>
    </Button>
  );
};

export default CTA;
