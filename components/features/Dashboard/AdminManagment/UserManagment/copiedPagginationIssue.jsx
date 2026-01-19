import { Button, Pagination, Select, Space, Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiWarning } from "react-icons/ci";
import { FaCheck, FaUsers } from "react-icons/fa";
import { GrCompliance } from "react-icons/gr";
import { MdAttachMoney, MdMoneyOff, MdOutlineBlock } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import userImg from "../../../../assets/Images/userDefault.jpg";
import {
  useDeleteSingleUserMutation,
  useGetAllUsersQuery,
} from "../../../../redux/Api/UserManagmentApi/UserManagmentApi";

const UserManagment = () => {
  const [params, setParams] = useState([]);

  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  const [queryParams, setQueryParams] = useState([
    { name: "page", value: 1 },
    { name: "sort", value: "createdAt" },
    { name: "limit", value: 10 },
  ]);
  const { data, isFetching } = useGetAllUsersQuery([...queryParams, ...params]);
  // const { data, isFetching } = useGetAllUsersQuery([
  //   { name: "page", value: page },
  //   { name: "sort", value: "createdAt" },
  //   { name: "limit", value: limit },
  //   ...params,
  // ]);

  const onShowSizeChange = (current, pageSize) => {
    // setLimit(pageSize);
    //console.log(pageSize);
  };
  const handlePageValue = (value) => {
    const pageRemove = queryParams.filter((item) => item.name !== "page");

    setQueryParams([...pageRemove, { name: "page", value }]);
  };
  //console.log(queryParams);
  // set current page fn for the pagination
  const handleCurrentPage = () => {
    const pageValueObj = queryParams.find((obj) => obj.name === "page");

    return pageValueObj ? pageValueObj.value : 1;
  };

  //console.log(handleCurrentPage());

  // SearchTerm
  const onSearch = (value) => {
    const searchItemRemove = params.filter(
      (item) => item.name !== "searchTerm"
    );
    setParams([...searchItemRemove, { name: "searchTerm", value }]);
  };

  // select paymentStatus
  const handlePaymentStatusSelect = (value) => {
    //console.log(params);

    const paymantStatusRemove = params.filter(
      (item) => item.name !== "paymentStatus"
    );
    if (value !== undefined) {
      setParams([...paymantStatusRemove, { name: "paymentStatus", value }]);
    } else {
      setParams([...paymantStatusRemove]);
    }
  };

  // select user status
  const handlestatusSelect = (value) => {
    const statusRemove = params.filter((item) => item.name !== "status");

    if (value !== undefined) {
      setParams([...statusRemove, { name: "status", value }]);
    } else {
      setParams([...statusRemove]);
    }
  };

  // select user role
  const handleRoleSelect = (value) => {
    const statusRemove = params.filter((item) => item.name !== "role");

    if (value !== undefined) {
      setParams([...statusRemove, { name: "role", value }]);
    } else {
      setParams([...statusRemove]);
    }
  };

  const metaData = data?.meta;

  //console.log(data?.result);
  const customData = data?.result?.map((item, index) => {
    return {
      key: item._id,
      NO: index + 1,
      userInfo: item,
      Group: item.group,
      ConnectedDevices: item.deviceLogin.length,
      LoginAttempts: item.logInAttempt || 0,
      Address: item.city,
    };
  });

  const columns = [
    {
      title: "No.",
      dataIndex: "NO",
      key: "NO",
    },
    {
      title: "User Info",
      dataIndex: "userInfo",
      key: "userInfo",
      render: ({
        propileImageUrl,
        name,
        email,
        phone,
        paymentStatus,
        status,
        role,
      }) => (
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={propileImageUrl || userImg}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold ">{name}</div>
            {email && (
              <a href={`mailto:${email}`} className="text-sm opacity-50 block">
                {email}
              </a>
            )}
            <a href={`tel:${phone}`} className="text-sm opacity-50">
              {phone}
            </a>
            {role !== "Admin" ? (
              <div className="flex gap-2">
                <Tag
                  className="flex gap-1 items-center"
                  icon={
                    paymentStatus === "paid" ? (
                      <MdAttachMoney />
                    ) : (
                      <MdMoneyOff />
                    )
                  }
                  color={`${paymentStatus === "paid" ? "success" : "red"}`}
                >
                  {paymentStatus}
                </Tag>
                <Tag
                  className="flex gap-1 items-center"
                  icon={
                    status === "Active" ? (
                      <FaCheck />
                    ) : status === "Block" ? (
                      <MdOutlineBlock />
                    ) : status === "Disabled" ? (
                      <CiWarning />
                    ) : (
                      <GrCompliance />
                    )
                  }
                  color={
                    status === "Active"
                      ? "purple"
                      : status === "Block"
                      ? "error"
                      : status === "Disabled"
                      ? "warning"
                      : "success"
                  }
                >
                  {status}
                </Tag>
              </div>
            ) : (
              <div>
                <Tag color="geekblue">{role}</Tag>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Group",
      dataIndex: "Group",
      key: "Group",
    },
    {
      title: "ConnectedDevices",
      dataIndex: "ConnectedDevices",
      key: "ConnectedDevices",
    },
    {
      title: "LoginAttempts",
      dataIndex: "LoginAttempts",
      key: "LoginAttempts",
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        //console.log(item);
        return (
          <Space>
            <Link to={`/propile/${item.key}`}>
              <Button>Edit / Details</Button>
            </Link>
            <DeleteUser userId={item.key} />
          </Space>
        );
      },
    },
  ];

  return (
    <div className="py-10">
      <div className="mb-5 flex justify-between gap-2">
        <div className="flex gap-2 items-center">
          <span> Total User: </span>{" "}
          <span className="flex gap-1 items-center font-semibold">
            {metaData?.total} <FaUsers />
          </span>
        </div>
        <div className="flex gap-3 items-center">
          <Search
            className="bg-blue-500"
            style={{ width: 360 }}
            placeholder="Search Users"
            loading={false}
            onSearch={onSearch}
            enterButton
          />
          {params.length > 0 && (
            <Button
              className="bg-blue-500"
              type="primary"
              onClick={() => setParams([])}
            >
              SHOW ALL
            </Button>
          )}
        </div>
        <div className="flex justify-center">
          <Space wrap>
            <Select
              showSearch
              allowClear
              placeholder="Select Payment Type"
              optionFilterProp="children"
              onChange={handlePaymentStatusSelect}
              options={[
                {
                  value: "paid",
                  label: "PAID",
                },
                {
                  value: "unPaid",
                  label: "UNPAID",
                },
              ]}
            />

            <Select
              showSearch
              allowClear
              placeholder="Select User Status"
              optionFilterProp="children"
              onChange={handlestatusSelect}
              options={[
                {
                  value: "Active",
                  label: "ACTIVE",
                },
                {
                  value: "Disabled",
                  label: "DISABLED",
                },
                {
                  value: "Passed",
                  label: "PASSED",
                },
                {
                  value: "Block",
                  label: "BLOCK",
                },
              ]}
            />

            <Select
              showSearch
              allowClear
              placeholder="Select User Role"
              optionFilterProp="children"
              onChange={handleRoleSelect}
              options={[
                {
                  value: "Admin",
                  label: "ADMIN",
                },
                {
                  value: "Student",
                  label: "STUDENT",
                },
              ]}
            />
          </Space>
        </div>
      </div>

      <Table
        loading={isFetching}
        columns={columns}
        pagination={false}
        dataSource={customData}
      />

      <Pagination
        current={handleCurrentPage()}
        onChange={handlePageValue}
        onShowSizeChange={onShowSizeChange}
        total={metaData?.total}
      />
    </div>
  );
};

//  delete a single user
const DeleteUser = ({ userId }) => {
  const [deleteSingleUserQuery, { isLoading: isDelSingleUserLoading }] =
    useDeleteSingleUserMutation();

  const handleDelete = async () => {
    Swal.fire({
      title: `Are You Sure Delete User!`,
      text: "After Delete You won't Revert It!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deletedUser = await deleteSingleUserQuery(userId);
        if (deletedUser.data.success) {
          toast.success(deletedUser.data.message);
        }
      }
    });
  };

  return (
    <Button
      disabled={isDelSingleUserLoading}
      onClick={handleDelete}
      type="primary"
      danger
    >
      Delete User
    </Button>
  );
};

export default UserManagment;
