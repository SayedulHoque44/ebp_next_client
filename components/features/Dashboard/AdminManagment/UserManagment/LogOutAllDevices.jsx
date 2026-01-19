import { Button } from "antd";
import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useLogOutAllDevicesMutation } from "../../../../redux/Api/UserManagmentApi/UserManagmentApi";

const LogOutAllDevices = () => {
  const [logoutDevicesQuery, { isLoading }] = useLogOutAllDevicesMutation();

  const handleDelete = async () => {
    Swal.fire({
      title: `Are You Sure Logout All Devices!`,
      text: "After Delete You won't Revert It!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deletedUser = await logoutDevicesQuery();
        if (deletedUser?.data?.success) {
          toast.success(deletedUser.data.message);
        }
      }
    });
  };

  return (
    <Button disabled={isLoading} onClick={handleDelete} type="primary" danger>
      Log-out All Devices
    </Button>
  );
};

export default LogOutAllDevices;
