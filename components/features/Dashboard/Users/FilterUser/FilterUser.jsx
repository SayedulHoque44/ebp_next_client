import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { patenteAxios } from "../../../../Util/Hooks/useAxiosSecure";
import Button from "./Button/Button";

export const filerContext = createContext();

const FilterUser = ({ users, submitToFilterProccess, refetch }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [filterShow, setFilterShow] = useState();
  const [activeFilter, setActiveFilter] = useState("All");

  //
  const handleDeleteAllDevice = () => {
    Swal.fire({
      title: `Are You Sure Delete All Devices`,
      text: "After Delete You won't Revert It!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await patenteAxios.delete("/DeviceUsers");
        //console.log(res);
        toast.success(`Total ${res.data.deletedCount} Deleted`);
        refetch();
      }
    });
  };

  // Uniq property list {title:"",list:[]}
  function generatePropertyList(data, properties) {
    const result = [];

    properties.forEach((propertyName) => {
      const values = new Set();

      data.forEach((user) => {
        const value = user[propertyName];

        if (value !== undefined && value !== null) {
          values.add(value);
        }
      });

      result.push({
        title: propertyName,
        list: Array.from(values),
      });
    });

    return result;
  }

  //
  useEffect(() => {
    const propertyNames = [
      "All",
      "status",
      "type",
      "name",
      "email",
      "group",
      "city",
      "phone",
      "verified",
    ];
    if (users.length > 0) {
      const resultArray = generatePropertyList(users, propertyNames);
      setAllUsers(resultArray);
    }
  }, []);

  // update filterData
  const handleOnchange = (title, value) => {
    setFilterShow({ ...filterShow, [title]: value });
  };

  return (
    <filerContext.Provider
      value={{
        handleOnchange,
        filterShow,
        setFilterShow,
        submitToFilterProccess,
      }}
    >
      <div className="py-5">
        <ul className="flex gap-5 flex-wrap">
          {allUsers.map(({ title, list }, index) => (
            <li key={index}>
              <Button
                users={users}
                setActiveFilter={setActiveFilter}
                isActive={activeFilter === title}
                title={title}
                lists={list}
              />
            </li>
          ))}
          <li
            onClick={handleDeleteAllDevice}
            className="rounded-full bg-red-500 text-white border-2 py-2 px-8 flex ml-auto"
          >
            <button>LogOut Of All User Device</button>
          </li>
        </ul>
      </div>
    </filerContext.Provider>
  );
};

export default FilterUser;
