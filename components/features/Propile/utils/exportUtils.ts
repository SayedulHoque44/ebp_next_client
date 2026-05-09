import { IUser } from "@/features/User/interface/user.interface";
import { safeGet, formatDate } from "./profileFormatters";

export const downloadFile = (
  content: string,
  mimeType: string,
  extension: string,
  filename: string
) => {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${safeGet(filename, "user")}_profile_data.${extension}`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToCSV = (userData: Partial<IUser>, loggedUser?: Partial<IUser>) => {
  const rows = [
    ["Field", "Value"],
    ["User ID", safeGet(userData._id)],
    ["Name", safeGet(userData.name)],
    ["Email", safeGet(userData.email)],
    ["Phone", safeGet(userData.phone)],
    ["City", safeGet(userData.city)],
    ["Role", safeGet(userData.role)],
    ["Status", safeGet(userData.status)],
    ["Payment Status", safeGet(userData.paymentStatus)],
    ["Created At", formatDate(userData.createdAt)],
    ["Exported By", safeGet(loggedUser?.name, "Admin")],
  ];
  return rows.map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
};

export const exportToJSON = (userData: Partial<IUser>, loggedUser?: Partial<IUser>) =>
  JSON.stringify(
    { user: userData, exportInfo: { exportedAt: new Date().toISOString(), exportedBy: loggedUser?.name || "Admin" } },
    null,
    2
  );
