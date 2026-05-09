import { useState } from "react";
import toast from "react-hot-toast";
import { MdInfo } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import moment from "moment-timezone";
import UserHooks from "@/features/User/hooks/user.hooks";
import { useQueryClient } from "@tanstack/react-query";
import { detectOS, parseDeviceInfo, getDeviceTypeIcon, getTimeAgo, renderOSIcon, renderDeviceTypeIcon } from "../../utils";
import DeviceDetailsContent from "../../components/DeviceDetailsContent";
import { IDeviceLogin } from "../../types";

interface ModernDeviceRowProps {
  index: number;
  device: IDeviceLogin;
  userId?: string;
  deviceType: string;
}

const ModernDeviceRow = ({ index, device, userId, deviceType }: ModernDeviceRowProps) => {
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

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            {renderDeviceTypeIcon(getDeviceTypeIcon(deviceType))}
            {renderOSIcon(osInfo)}
            <div>
              <p className="text-sm font-medium text-gray-900">{osInfo.name}</p>
              <p className="max-w-xs truncate text-xs text-gray-500" title={deviceInfo}>
                {deviceInfo}
              </p>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <p className="text-sm font-medium text-gray-900">{getTimeAgo(createdAt)}</p>
          <p className="text-xs text-gray-500">{moment(createdAt).local().format("MMM D, YYYY HH:mm")}</p>
        </td>
        <td className="px-6 py-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleDelete}
              className="cursor-pointer rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
            >
              <FaTrash />
            </button>
            <button
              type="button"
              onClick={() => setIsDetailsOpen(true)}
              className="cursor-pointer rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600"
            >
              <MdInfo />
            </button>
          </div>
        </td>
      </tr>
      {isDetailsOpen && (
        <tr>
          <td colSpan={4} className="bg-gray-50 p-4">
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
          </td>
        </tr>
      )}
    </>
  );
};

export default ModernDeviceRow;
