import { IStatusBadgeProps } from "../types";

const getStatusClasses = (value: string) => {
  const normalized = value.toLowerCase();
  if (["paid", "active", "ongoing"].includes(normalized)) {
    return "bg-green-100 text-green-800 border-green-200";
  }
  if (["unpaid", "inactive", "block", "disabled", "ended"].includes(normalized)) {
    return "bg-red-100 text-red-800 border-red-200";
  }
  if (["passed", "upcoming"].includes(normalized)) {
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  }
  return "bg-gray-100 text-gray-800 border-gray-200";
};

const StatusBadge = ({ type, status, className = "", children }: IStatusBadgeProps) => {
  const badgeValue = String(type || status || children || "Unknown");
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(
        badgeValue
      )} ${className}`}
    >
      {children || badgeValue}
    </span>
  );
};

export default StatusBadge;
