import React from "react";
import { IoMdDoneAll } from "react-icons/io";
import { MdDelete, MdOutlineHideSource } from "react-icons/md";
import useFuntionality from "../../../../Util/Hooks/useFuntionality";

const UserAction = ({ user, refetch }) => {
  const { handleDeleteUser, handleStatusUser } = useFuntionality();
  const { status } = user;
  return (
    <>
      {status === "Disabled" ? (
        <button
          onClick={() => handleStatusUser(user, { status: "Active" }, refetch)}
          title="Active"
          className="btn hover:bg-green-400 btn-xs mr-3">
          <IoMdDoneAll size={18} />
        </button>
      ) : (
        <button
          onClick={() =>
            handleStatusUser(user, { status: "Disabled" }, refetch)
          }
          title="Disable"
          className="btn hover:bg-gray-400 btn-xs mr-3">
          <MdOutlineHideSource size={18} />
        </button>
      )}

      <button
        title="Delete"
        className="btn hover:bg-red-300 btn-xs"
        onClick={() => handleDeleteUser(user, refetch)}>
        <MdDelete size={18} className="text-red-700" />
      </button>
    </>
  );
};

export default UserAction;
