import {
  FaDesktop,
  FaMobile,
  FaTablet,
  FaQuestionCircle,
} from "react-icons/fa";
import { AiFillAndroid, AiFillApple, AiFillWindows } from "react-icons/ai";
import { MdOutlineDesktopMac } from "react-icons/md";
import { VscWorkspaceUnknown } from "react-icons/vsc";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaDesktop,
  FaMobile,
  FaTablet,
  FaQuestionCircle,
  AiFillAndroid,
  AiFillApple,
  AiFillWindows,
  MdOutlineDesktopMac,
  VscWorkspaceUnknown,
};

export const renderIcon = (iconType: string, iconClass = "") => {
  const IconComponent = iconMap[iconType];
  if (!IconComponent) return null;
  return <IconComponent className={iconClass} />;
};

export const renderOSIcon = (osInfo: { iconType: string; iconClass?: string }) =>
  renderIcon(osInfo.iconType, osInfo.iconClass);

export const renderDeviceTypeIcon = (typeInfo: { iconType: string; iconClass?: string }) =>
  renderIcon(typeInfo.iconType, typeInfo.iconClass);
