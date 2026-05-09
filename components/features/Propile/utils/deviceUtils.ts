import { IDeviceLogin } from "../types";

export const detectOS = (userAgent: string) => {
  const ua = userAgent?.toLowerCase() || "";
  if (/windows/.test(ua)) return { name: "Windows", iconType: "AiFillWindows", iconClass: "text-blue-600", type: "desktop" };
  if (/mac os x/.test(ua)) return { name: "macOS", iconType: "MdOutlineDesktopMac", iconClass: "text-gray-600", type: "desktop" };
  if (/iphone|ipod/.test(ua)) return { name: "iPhone", iconType: "AiFillApple", iconClass: "text-gray-800", type: "mobile" };
  if (/ipad/.test(ua)) return { name: "iPad", iconType: "AiFillApple", iconClass: "text-gray-800", type: "tablet" };
  if (/android/.test(ua)) return { name: "Android", iconType: "AiFillAndroid", iconClass: "text-green-600", type: "mobile" };
  return { name: "Unknown", iconType: "VscWorkspaceUnknown", iconClass: "text-gray-500", type: "unknown" };
};

export const parseDeviceInfo = (userAgent: string) => {
  const ua = userAgent?.toLowerCase() || "";
  const osInfo = detectOS(userAgent);
  let browser = "Unknown";
  if (/chrome/.test(ua) && !/edge/.test(ua)) browser = "Chrome";
  else if (/firefox/.test(ua)) browser = "Firefox";
  else if (/safari/.test(ua) && !/chrome/.test(ua)) browser = "Safari";
  else if (/edge/.test(ua)) browser = "Edge";
  return { browser, deviceType: osInfo.type, resolution: "Unknown", fullUserAgent: userAgent, os: osInfo.name, osType: osInfo.type };
};

export const getDeviceTypeIcon = (type: string) => {
  switch (type) {
    case "desktop": return { iconType: "FaDesktop", iconClass: "text-blue-500" };
    case "mobile": return { iconType: "FaMobile", iconClass: "text-green-500" };
    case "tablet": return { iconType: "FaTablet", iconClass: "text-purple-500" };
    default: return { iconType: "FaQuestionCircle", iconClass: "text-gray-500" };
  }
};

export const getDeviceTypeLabel = (type: string) => type.charAt(0).toUpperCase() + type.slice(1);

export const groupDevicesByType = (devices: IDeviceLogin[]) => {
  const groups: Record<string, IDeviceLogin[]> = { desktop: [], mobile: [], tablet: [], unknown: [] };
  devices.forEach((d) => {
    const type = detectOS(d.deviceInfo).type;
    groups[type] = groups[type] || [];
    groups[type].push(d);
  });
  return groups;
};
