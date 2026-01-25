"use client";
import { Button } from "antd";
import React, { useCallback, memo } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import UserHooks from "@/features/User/hooks/user.hooks";

const LogOutAllDevices = memo(() => {
  const logoutDevicesMutation = UserHooks.useLogoutAllDevicesMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
      }
    },
    onError: () => {
      toast.error("Failed to logout all devices");
    },
  });

  const handleDelete = useCallback(async () => {
    const result = await Swal.fire({
      title: "Are You Sure Logout All Devices!",
      text: "After Delete You won&apos;t Revert It!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      try {
        await logoutDevicesMutation.mutateAsync(undefined);
      } catch (error) {
        // Error handled by mutation callbacks
      }
    }
  }, [logoutDevicesMutation]);

  return (
    <Button
      disabled={logoutDevicesMutation.isPending}
      onClick={handleDelete}
      type="primary"
      danger
      aria-label="Logout all devices"
    >
      Log-out All Devices
    </Button>
  );
});

LogOutAllDevices.displayName = "LogOutAllDevices";

export default LogOutAllDevices;
