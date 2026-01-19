import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure, {
  handleAxiosResponseError,
} from "../../../../../Util/Hooks/useAxiosSecure";

const DeleteUser = ({ id, name, refetch }) => {
  const { localSecureNewAxios } = useAxiosSecure();

  const handleDelete = async (userId) => {
    Swal.fire({
      title: `Are You Sure Delete ${name}`,
      text: "After Delete You won't Revert It!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleteUser = await localSecureNewAxios.delete(
            `/users/${userId}`
          );
          toast.success(deleteUser.data.message);
          refetch();
        } catch (error) {
          handleAxiosResponseError(error);
        }
      }
    });
  };

  return (
    <button
      onClick={() => handleDelete(id)}
      className="btn btn-ghost bg-error btn-xs">
      Delete
    </button>
  );
};

export default DeleteUser;
