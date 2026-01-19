import React from "react";
import UserRow from "../userRow/userRow";

const UserTable = ({ users, refetch }) => {
  return (
    <div className="max-h-[800px] min-h-[800px] overflow-y-scroll relative">
      <table className="table relative">
        {/* head */}
        <thead className="bg-P-Black text-white sticky top-0 left-0 right-0 z-[1]">
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Group</th>
            <th>ConnectedDevices</th>
            <th>loginAttempts</th>
            <th>Address</th>
            <th>Action</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {/* row  */}
          {users.map((user, index) => (
            <UserRow
              index={index}
              key={user._id}
              user={user}
              refetch={refetch}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
