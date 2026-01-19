import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LoaderCircleWithBar from "../../../Shared/Components/LoaderCircleWithBar";
import Container from "../../../Shared/Container/Container";
import useAxiosSecure, {
  handleAxiosResponseError,
} from "../../../Util/Hooks/useAxiosSecure";
import useGetUsers from "../../../Util/Hooks/useGetUsers";
import UserTable from "./UserTable/UserTable";

const AllUsers = () => {
  const [users, refetch, isLoading] = useGetUsers();
  const { localSecureNewAxios } = useAxiosSecure();

  const handleLogoutDevices = () => {
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
        try {
          const deleteUser = await localSecureNewAxios.patch(
            `/users/device/deleteDevices`
          );
          toast.success(deleteUser.data.message);
        } catch (error) {
          //console.log(error);
          handleAxiosResponseError(error);
        }
      }
    });
  };
  return (
    <div className="py-10 w-full overflow-hidden ">
      <Container>
        <h1 className="text-4xl my-5 text-center">
          All Users {users?.length > 0 && `(${users.length})`}
        </h1>
        {/*  */}
        {isLoading ? (
          <LoaderCircleWithBar />
        ) : (
          users?.length > 0 && (
            <>
              <button
                onClick={handleLogoutDevices}
                className="btn btn-error px-5 py-4  text-white block ml-auto mb-2"
              >
                logout of all session
              </button>
              <UserTable users={users} refetch={refetch} />
            </>
          )
        )}
      </Container>
    </div>
  );
};

export default AllUsers;
