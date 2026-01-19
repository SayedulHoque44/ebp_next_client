import { Button, Pagination, Select, Space, Table, Tag, Input } from "antd";
import React, { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { CiWarning } from "react-icons/ci";
import { FaCheck, FaUsers, FaSearch } from "react-icons/fa";
import { GrCompliance } from "react-icons/gr";
import { MdAttachMoney, MdMoneyOff, MdOutlineBlock } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import userImg from "../../../../assets/Images/userDefault.jpg";
import {
  useDeleteSingleUserMutation,
  useGetAllUsersQuery,
  useUpdateSingleUserMutation,
} from "../../../../redux/Api/UserManagmentApi/UserManagmentApi";
import LogOutAllDevices from "./LogOutAllDevices";

import EBSearch from "../../../../Shared/Components/EBSearch/EBSearch";
import TableSkeleton from "../../../../Shared/Components/SkeletonLoader/TableSkeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const { Search } = Input;

// Hook to detect if screen is laptop/desktop size (not tablet or mobile)
const useIsLargeScreen = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024; // lg breakpoint (laptop size)
    }
    return true;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // Only fixed on laptop/desktop
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isLargeScreen;
};

const UserManagment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isLargeScreen = useIsLargeScreen();

  // Initialize state from URL params
  const [params, setParams] = useState(() => {
    const urlParams = [];
    const searchTerm = searchParams.get("searchTerm");
    const paymentStatus = searchParams.get("paymentStatus");
    const status = searchParams.get("status");
    const role = searchParams.get("role");
    const isDeleted = searchParams.get("isDeleted");

    if (searchTerm) urlParams.push({ name: "searchTerm", value: searchTerm });
    if (paymentStatus)
      urlParams.push({ name: "paymentStatus", value: paymentStatus });
    if (status) urlParams.push({ name: "status", value: status });
    if (role) urlParams.push({ name: "role", value: role });
    if (isDeleted !== null) {
      urlParams.push({ name: "isDeleted", value: isDeleted === "true" });
    }

    return urlParams;
  });

  const [page, setPage] = useState(() => {
    const pageParam = searchParams.get("page");
    return pageParam ? parseInt(pageParam, 10) : 1;
  });

  const [limit, setLimit] = useState(() => {
    const limitParam = searchParams.get("limit");
    return limitParam ? parseInt(limitParam, 10) : 10;
  });

  const { data, isFetching, isSuccess, isLoading } = useGetAllUsersQuery([
    { name: "page", value: page },
    { name: "sort", value: "createdAt" },
    { name: "limit", value: limit },
    ...params,
  ]);

  const metaData = data?.meta;

  // Update URL params when state changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    // Add page and limit
    if (page > 1) newSearchParams.set("page", page.toString());
    if (limit !== 10) newSearchParams.set("limit", limit.toString());

    // Add filter params
    params.forEach((param) => {
      if (
        param.value !== undefined &&
        param.value !== null &&
        param.value !== ""
      ) {
        newSearchParams.set(param.name, param.value.toString());
      }
    });

    setSearchParams(newSearchParams, { replace: true });
  }, [params, page, limit, setSearchParams]);

  useEffect(() => {
    if (metaData?.totalPage < page) {
      setPage(1);
    }
  }, [isFetching, isSuccess, metaData, page]);

  const onShowSizeChange = (current, pageSize) => {
    setLimit(pageSize);
    setPage(1); // Reset to first page when changing page size
  };

  // Generic Filter Handler
  const handleFilterChange = (name, value) => {
    setParams((prev) => {
      const filtered = prev.filter((item) => item.name !== name);
      if (value === undefined || value === "" || value === null)
        return filtered;
      // Reset page to 1 when filtering
      if (name !== "page") setPage(1);
      return [...filtered, { name, value }];
    });
  };

  const onSearch = (value) => handleFilterChange("searchTerm", value);

  // Clear all filters
  const handleClearFilters = () => {
    setParams([]);
    setPage(1);
    setLimit(10);
  };

  // Get current filter values for Select components
  const getFilterValue = (name) => {
    const param = params.find((p) => p.name === name);
    if (param?.value === true || param?.value === false) {
      return param.value;
    }
    return param?.value || undefined;
  };

  const customData = useMemo(() => {
    return data?.result?.map((item, index) => ({
      key: item._id,
      NO: index + 1,
      userInfo: item,
      Group: item.group,
      ConnectedDevices: item.deviceLogin.length,
      LoginAttempts: item.logInAttempt || 0,
      Address: item.city,
    }));
  }, [data]);

  // Generate columns based on screen size
  const tableColumns = useMemo(
    () => getColumns(isLargeScreen),
    [isLargeScreen]
  );

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {isLoading ? (
          <div className="flex items-center gap-4 w-full">
            <Skeleton circle width={48} height={48} />
            <div className="flex-1">
              <Skeleton width={200} height={28} className="mb-2" />
              <Skeleton width={150} height={20} />
            </div>
            <Skeleton width={140} height={40} />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="p-3 bg-P-primary/10 rounded-full text-P-primary">
                <FaUsers size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  User Management
                </h1>
                <p className="text-gray-500 text-sm">
                  Total Users:{" "}
                  <span className="font-semibold text-gray-800">
                    {metaData?.total || 0}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <LogOutAllDevices />
            </div>
          </>
        )}
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="w-full lg:w-1/3">
            <EBSearch
              placeholder="Search by name, email, or phone..."
              allowClear
              onSearch={onSearch}
              defaultValue={getFilterValue("searchTerm") || ""}
              className="w-full"
            />
          </div>
          <div className="flex flex-wrap gap-3 w-full lg:w-2/3 justify-end">
            <Select
              placeholder="Payment Status"
              allowClear
              className="w-40"
              size="large"
              value={getFilterValue("paymentStatus")}
              onChange={(val) => handleFilterChange("paymentStatus", val)}
              options={[
                { value: "paid", label: "Paid" },
                { value: "unPaid", label: "Unpaid" },
              ]}
            />
            <Select
              placeholder="User Status"
              allowClear
              className="w-40"
              size="large"
              value={getFilterValue("status")}
              onChange={(val) => handleFilterChange("status", val)}
              options={[
                { value: "Active", label: "Active" },
                { value: "Disabled", label: "Disabled" },
                { value: "Passed", label: "Passed" },
                { value: "Block", label: "Block" },
              ]}
            />
            <Select
              placeholder="Role"
              allowClear
              className="w-40"
              size="large"
              value={getFilterValue("role")}
              onChange={(val) => handleFilterChange("role", val)}
              options={[
                { value: "Admin", label: "Admin" },
                { value: "Student", label: "Student" },
              ]}
            />
            <Select
              placeholder="Deleted Users"
              allowClear
              className="w-40"
              size="large"
              value={getFilterValue("isDeleted")}
              onChange={(val) => handleFilterChange("isDeleted", val)}
              options={[
                { value: true, label: "Deleted" },
                { value: false, label: "Not Deleted" },
              ]}
            />
            {params.length > 0 && (
              <Button onClick={handleClearFilters} type="dashed" danger>
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={10} columns={6} />
          </div>
        ) : (
          <>
            <Table
              loading={isFetching}
              columns={tableColumns}
              dataSource={customData}
              pagination={false}
              scroll={{ x: 1000 }}
              className="ant-table-custom"
            />
            <div className="p-4 flex justify-end border-t border-gray-100">
              <Pagination
                current={page}
                onChange={(value) => setPage(value)}
                onShowSizeChange={onShowSizeChange}
                total={metaData?.total}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `Total ${total} items`}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Columns Definition - Function to generate columns based on screen size
const getColumns = (isLargeScreen) => [
  {
    title: "#",
    dataIndex: "NO",
    key: "NO",
    width: 60,
    align: "center",
    ...(isLargeScreen && { fixed: "left" }),
  },
  {
    title: "User Info",
    dataIndex: "userInfo",
    key: "userInfo",
    ...(isLargeScreen && { fixed: "left" }),
    width: 300,
    render: ({
      propileImageUrl,
      name,
      email,
      phone,
      paymentStatus,
      status,
      role,
      _id: id,
    }) => (
      <div className="flex items-center gap-4">
        <Link to={`/propile/${id}`} className="avatar">
          <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
            <img
              src={propileImageUrl || userImg}
              alt="user"
              className="object-cover w-full h-full"
            />
          </div>
        </Link>
        <div className="flex flex-col">
          <span className="font-bold text-gray-800">{name}</span>
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-xs text-gray-500 hover:text-P-primary"
            >
              {email}
            </a>
          )}
          <a
            href={`tel:${phone}`}
            className="text-xs text-gray-500 hover:text-P-primary"
          >
            {phone}
          </a>

          <div className="flex gap-2 mt-1">
            {role === "Admin" ? (
              <Tag color="purple">ADMIN</Tag>
            ) : (
              <>
                <Tag
                  color={paymentStatus === "paid" ? "success" : "error"}
                  className="mr-0"
                >
                  {paymentStatus?.toUpperCase()}
                </Tag>
                <Tag
                  color={
                    status === "Active"
                      ? "processing"
                      : status === "Block"
                      ? "error"
                      : status === "Disabled"
                      ? "warning"
                      : "success"
                  }
                >
                  {status?.toUpperCase()}
                </Tag>
              </>
            )}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Group",
    dataIndex: "Group",
    key: "Group",
    width: 150,
  },
  {
    title: "Devices",
    dataIndex: "ConnectedDevices",
    key: "ConnectedDevices",
    align: "center",
    width: 100,
  },
  {
    title: "Logins",
    dataIndex: "LoginAttempts",
    key: "LoginAttempts",
    align: "center",
    width: 100,
  },
  {
    title: "Address",
    dataIndex: "Address",
    key: "Address",
    width: 200,
  },
  {
    title: "Actions",
    key: "action",
    dataIndex: "userInfo",
    // fixed: "right",
    width: 200,
    render: ({ _id: id, isDeleted }) => (
      <div className="flex gap-2">
        <Link to={`/propile/${id}`}>
          <Button size="small" type="default">
            Details
          </Button>
        </Link>
        <DeleteUser userId={id} isDeleted={isDeleted} />
      </div>
    ),
  },
];

// Delete User Component
const DeleteUser = ({ userId, isDeleted }) => {
  const [deleteSingleUserQuery, { isLoading: isDelLoading }] =
    useDeleteSingleUserMutation();
  const [updateUserMutation, { isLoading: isUpdLoading }] =
    useUpdateSingleUserMutation();

  const handleDelete = () => {
    Swal.fire({
      title: isDeleted ? "Restore User?" : "Delete User?",
      text: isDeleted
        ? "User will be active again."
        : "User will be moved to trash.",
      icon: isDeleted ? "question" : "warning",
      showCancelButton: true,
      confirmButtonColor: isDeleted ? "#10B981" : "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: isDeleted ? "Restore" : "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let res;
          if (isDeleted) {
            res = await updateUserMutation({
              userId,
              userData: { isDeleted: false },
            });
          } else {
            res = await deleteSingleUserQuery(userId);
          }

          if (res?.data?.success) {
            toast.success(res.data.message);
          } else {
            toast.error("Something went wrong");
          }
        } catch (error) {
          toast.error("Action failed");
        }
      }
    });
  };

  return (
    <Button
      onClick={handleDelete}
      loading={isDelLoading || isUpdLoading}
      size="small"
      danger={!isDeleted}
      type={isDeleted ? "primary" : "primary"}
      className={isDeleted ? "bg-green-600 hover:bg-green-700" : ""}
    >
      {isDeleted ? "Restore" : "Delete"}
    </Button>
  );
};

export default UserManagment;
