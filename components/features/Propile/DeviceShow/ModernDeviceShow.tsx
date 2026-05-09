import { useState } from "react";
import { FaDesktop } from "react-icons/fa";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import ModernDeviceRow from "./DeviceRow/ModernDeviceRow";
import { groupDevicesByType, getDeviceTypeIcon, getDeviceTypeLabel, renderDeviceTypeIcon } from "../utils";
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
            <FaDesktop className="text-lg text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Device Activity</h3>
            <p className="text-sm text-gray-600">{totalDevices} devices registered</p>
          </div>
        </div>
        {totalDevices > 3 && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-100 px-4 py-2"
          >
            <span className="text-sm font-medium text-gray-700">{isExpanded ? "Show Less" : "Show All"}</span>
            {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
          </button>
        )}
      </div>

      {Object.entries(deviceGroups).map(([type, devices]) => {
        if (!devices.length) return null;
        const displayDevices = isExpanded ? devices : devices.slice(0, 3);
        return (
          <div key={type} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                {renderDeviceTypeIcon(getDeviceTypeIcon(type))}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{getDeviceTypeLabel(type)} Devices</h4>
                <p className="text-sm text-gray-600">{devices.length} devices</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Device Information</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Last Login</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {displayDevices.map((device, index) => (
                    <ModernDeviceRow key={`${type}-${index}`} index={index} device={device} userId={userId} deviceType={type} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ModernDeviceShow;
