import moment from "moment-timezone";

export const formatDate = (dateString?: string, format = "MMM D, YYYY") => {
  if (!dateString) return "Not available";
  return moment(dateString).local().format(format);
};

export const getTimeAgo = (date: string) => {
  const now = moment();
  const target = moment(date);
  const diffInMinutes = now.diff(target, "minutes");
  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = now.diff(target, "hours");
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = now.diff(target, "days");
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return target.format("MMM D, YYYY");
};

export const safeGet = <T>(value: T | null | undefined, fallback: string = "N/A") =>
  value !== null && value !== undefined ? String(value) : fallback;

export const formatMemberSince = (createdAt?: string) => {
  if (!createdAt) return "Not available";
  return new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
