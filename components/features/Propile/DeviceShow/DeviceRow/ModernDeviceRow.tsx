import { useState } from "react";
import toast from "react-hot-toast";
import { MdInfo } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import moment from "moment-timezone";
import UserHooks from "@/features/User/hooks/user.hooks";
import { useQueryClient } from "@tanstack/react-query";
import {
  detectOS,
  parseDeviceInfo,
  getDeviceTypeIcon,
  getTimeAgo,
  renderOSIcon,
  renderDeviceTypeIcon,
} from "../../utils";
import DeviceDetailsContent from "../../components/DeviceDetailsContent";
import { IDeviceLogin } from "../../types";

interface ModernDeviceRowProps {
  index: number;
  device: IDeviceLogin;
  userId?: string;
  deviceType: string;
  variant?: "table" | "card";
}

const ModernDeviceRow = ({
  index,
  device,
  userId,
  deviceType,
  variant = "table",
}: ModernDeviceRowProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const queryClient = useQueryClient();
  const updateMutation = UserHooks.useUpdateSingleUserMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["single-user", userId] });
    },
  });
  const { createdAt, deviceInfo } = device;
  const osInfo = detectOS(deviceInfo);
  const deviceDetails = parseDeviceInfo(deviceInfo);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Remove Device?",
      text: "This device will be removed from this account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });
    if (!result.isConfirmed) return;
    try {
      if (!userId) return;
      const response = await updateMutation.mutateAsync({
        userId,
        data: { deviceLogin: [{ deviceInfo, isDeleted: true }] as any },
      });
      toast.success(response?.message || "Device removed");
      setIsDetailsOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to remove device");
    }
  };

  const deviceInfoBlock = (
    <div className="flex min-w-0 items-start gap-2 sm:items-center sm:gap-3">
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        {renderDeviceTypeIcon(getDeviceTypeIcon(deviceType))}
        {renderOSIcon(osInfo)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900">{osInfo.name}</p>
        {variant !== "card" && (
          <p
            className="max-w-xs truncate text-xs text-gray-500"
            title={deviceInfo}
          >
            {deviceInfo}
          </p>
        )}
      </div>
    </div>
  );

  const lastLoginBlock = (
    <div>
      <p className="text-sm font-medium text-gray-900">{getTimeAgo(createdAt)}</p>
      <p className="text-xs text-gray-500">
        {moment(createdAt).local().format("MMM D, YYYY HH:mm")}
      </p>
    </div>
  );

  const actionsBlock = (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={handleDelete}
        aria-label="Remove device"
        className="flex min-h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
      >
        <FaTrash />
      </button>
      <button
        type="button"
        onClick={() => setIsDetailsOpen(true)}
        aria-label="View device details"
        className="flex min-h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600"
      >
        <MdInfo />
      </button>
    </div>
  );

  const detailsPanel = isDetailsOpen && (
    <div className="max-h-[50vh] overflow-y-auto overscroll-contain">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-semibold text-gray-800">Device Details</h4>
        <button
          type="button"
          onClick={() => setIsDetailsOpen(false)}
          className="cursor-pointer text-sm text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
      <DeviceDetailsContent deviceData={{ ...deviceDetails, createdAt }} />
    </div>
  );

  if (variant === "card") {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            {deviceInfoBlock}
            <span className="shrink-0 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">
              #{index + 1}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-3">
            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Last Login
              </p>
              {lastLoginBlock}
            </div>
            {actionsBlock}
          </div>
        </div>
        {isDetailsOpen && (
          <div className="border-t border-gray-200 bg-gray-50 p-4">{detailsPanel}</div>
        )}
      </div>
    );
  }

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="whitespace-nowrap px-3 py-3 sm:px-6 sm:py-4">{index + 1}</td>
        <td className="px-3 py-3 sm:px-6 sm:py-4">{deviceInfoBlock}</td>
        <td className="whitespace-nowrap px-3 py-3 sm:px-6 sm:py-4">
          {lastLoginBlock}
        </td>
        <td className="px-3 py-3 sm:px-6 sm:py-4">{actionsBlock}</td>
      </tr>
      {isDetailsOpen && (
        <tr>
          <td colSpan={4} className="bg-gray-50 p-3 sm:p-4">
            {detailsPanel}
          </td>
        </tr>
      )}
    </>
  );
};

export default ModernDeviceRow;
