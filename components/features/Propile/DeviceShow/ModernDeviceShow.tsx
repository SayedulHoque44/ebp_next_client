import { useState } from "react";
import { FaDesktop } from "react-icons/fa";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import ModernDeviceRow from "./DeviceRow/ModernDeviceRow";
import {
  groupDevicesByType,
  getDeviceTypeIcon,
  getDeviceTypeLabel,
  renderDeviceTypeIcon,
} from "../utils";
import { IDeviceLogin } from "../types";

interface ModernDeviceShowProps {
  userAllDevice: IDeviceLogin[];
  userId?: string;
}

const ModernDeviceShow = ({ userAllDevice, userId }: ModernDeviceShowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const deviceGroups = groupDevicesByType(userAllDevice || []);
  const totalDevices = userAllDevice?.length || 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 sm:h-10 sm:w-10 sm:rounded-xl">
            <FaDesktop className="text-base text-blue-600 sm:text-lg" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-gray-900 sm:text-lg">
              Device Activity
            </h3>
            <p className="text-xs text-gray-600 sm:text-sm">
              {totalDevices} devices registered
            </p>
          </div>
        </div>
        {totalDevices > 3 && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 sm:w-auto sm:py-2"
          >
            <span className="text-sm font-medium text-gray-700">
              {isExpanded ? "Show Less" : "Show All"}
            </span>
            {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
          </button>
        )}
      </div>

      {Object.entries(deviceGroups).map(([type, devices]) => {
        if (!devices.length) return null;
        const displayDevices = isExpanded ? devices : devices.slice(0, 3);
        const scrollableList = displayDevices.length > 3 || isExpanded;

        return (
          <div key={type} className="space-y-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 sm:h-8 sm:w-8">
                {renderDeviceTypeIcon(getDeviceTypeIcon(type))}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 sm:text-base">
                  {getDeviceTypeLabel(type)} Devices
                </h4>
                <p className="text-xs text-gray-600 sm:text-sm">
                  {devices.length} devices
                </p>
              </div>
            </div>

            {/* Mobile: card layout with vertical scroll */}
            <div
              className={`space-y-3 md:hidden ${
                scrollableList
                  ? "max-h-[min(70vh,640px)] overflow-y-auto overscroll-contain pr-1"
                  : ""
              }`}
            >
              {displayDevices.map((device, index) => (
                <ModernDeviceRow
                  key={`${type}-card-${index}`}
                  index={index}
                  device={device}
                  userId={userId}
                  deviceType={type}
                  variant="card"
                />
              ))}
            </div>

            {/* Tablet & desktop: scrollable table */}
            <div className="hidden rounded-xl border border-gray-200 bg-white md:block">
              <div
                className={`overflow-x-auto overscroll-contain [-webkit-overflow-scrolling:touch] ${
                  scrollableList
                    ? "max-h-[min(70vh,720px)] overflow-y-auto"
                    : ""
                }`}
              >
                <table className="w-full min-w-[640px]">
                  <thead className="sticky top-0 z-10 bg-gray-50 shadow-sm">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 lg:px-6">
                        #
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 lg:px-6">
                        Device Information
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 lg:px-6">
                        Last Login
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 lg:px-6">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {displayDevices.map((device, index) => (
                      <ModernDeviceRow
                        key={`${type}-row-${index}`}
                        index={index}
                        device={device}
                        userId={userId}
                        deviceType={type}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ModernDeviceShow;
