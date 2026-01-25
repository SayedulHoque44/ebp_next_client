"use client";
import { Button, Pagination, Select, Table, Tag } from "antd";
import React, { useEffect, useState, useMemo, useCallback, memo, startTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaUsers } from "react-icons/fa";
import { mediaProvider } from "@/constants/mediaProvider";
import UserHooks from "@/features/User/hooks/user.hooks";
import { IUser, IUserGetAllUsersRequest } from "@/features/User/interface/user.interface";
import { QUERY_KEY } from "@/constants/constendData";
import LogOutAllDevices from "./LogOutAllDevices";
import EBSearch from "@/components/shared/EBSearch";
import TableSkeleton from "@/components/shared/SkeletonLoader/TableSkeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQueryClient } from "@tanstack/react-query";

interface FilterParam {
  name: string;
  value: string | boolean | number | null | undefined;
}

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
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isLargeScreen;
};

const UserManagment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLargeScreen = useIsLargeScreen();

  // Initialize state from URL params
  const [params, setParams] = useState<FilterParam[]>(() => {
    const urlParams: FilterParam[] = [];
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

  // Convert params array to IUserGetAllUsersRequest object
  const queryParams = useMemo<IUserGetAllUsersRequest>(() => {
    const requestParams: IUserGetAllUsersRequest = {
      page,
      limit,
      sort: "createdAt",
    };

    params.forEach((param) => {
      if (param.value !== undefined && param.value !== null && param.value !== "") {
        if (param.name === "searchTerm") {
          requestParams.searchTerm = param.value as string;
        } else if (param.name === "paymentStatus") {
          requestParams.paymentStatus = param.value as string;
        } else if (param.name === "status") {
          requestParams.status = param.value as string;
        } else if (param.name === "role") {
          requestParams.role = param.value as string;
        } else if (param.name === "isDeleted") {
          requestParams.isDeleted = param.value as boolean;
        }
      }
    });

    return requestParams;
  }, [params, page, limit]);

  // Create stable query key from queryParams
  const queryKey = useMemo(
    () => [
      QUERY_KEY.ALL_USERS,
      page,
      limit,
      ...params.map((p) => `${p.name}:${p.value}`),
    ],
    [page, limit, params]
  );

  const { data, isFetching, isLoading } = UserHooks.useGetAllUsersQuery({
    queryKey,
    params: queryParams,
    options: {
      enabled: true,
    },
  });

  const metaData = useMemo(() => data?.data?.meta, [data?.data?.meta]);
  const users = useMemo(() => data?.data?.result || [], [data?.data?.result]);
console.log(metaData);
  // Update URL params when state changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    // Always add page and limit for consistency
    newSearchParams.set("page", page.toString());
    newSearchParams.set("limit", limit.toString());

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

    const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
    const currentUrl = `${window.location.pathname}${window.location.search}`;
    
    // Only update URL if it's different to avoid unnecessary updates
    if (newUrl !== currentUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [params, page, limit, router]);

  useEffect(() => {
    if (metaData?.totalPages && metaData.totalPages > 0 && metaData.totalPages < page) {
      startTransition(() => {
        setPage(1);
      });
    }
  }, [metaData?.totalPages, page]);

  const handlePageChange = useCallback((value: number) => {
    setPage(value);
  }, []);

  const onShowSizeChange = useCallback((current: number, pageSize: number) => {
    setLimit(pageSize);
    setPage(1);
  }, []);

  // Generic Filter Handler
  const handleFilterChange = useCallback((name: string, value: string | number | boolean | null | undefined) => {
    setParams((prev) => {
      const filtered = prev.filter((item) => item.name !== name);
      if (value === undefined || value === "" || value === null) return filtered;
      // Reset page to 1 when filtering
      if (name !== "page") setPage(1);
      return [...filtered, { name, value }];
    });
  }, []);

  const onSearch = useCallback(
    (value: string) => handleFilterChange("searchTerm", value),
    [handleFilterChange]
  );

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setParams([]);
    setPage(1);
    setLimit(10);
  }, []);

  // Get current filter values for Select components
  const getFilterValue = useCallback(
    (name: string) => {
      const param = params.find((p) => p.name === name);
      if (param?.value === true || param?.value === false) {
        return param.value;
      }
      return param?.value || undefined;
    },
    [params]
  );

  const customData = useMemo(() => {
    return users.map((item, index) => ({
      key: item._id,
      NO: index + 1,
      userInfo: item,
      Group: item.group,
      ConnectedDevices: item.deviceLogin?.length || 0,
      LoginAttempts: item.logInAttempt || 0,
      Address: item.city,
    }));
  }, [users]);

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
              defaultValue={getFilterValue("searchTerm") as string || ""}
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
                pageSize={limit}
                onChange={handlePageChange}
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
const getColumns = (isLargeScreen: boolean) => [
  {
    title: "#",
    dataIndex: "NO",
    key: "NO",
    width: 60,
    align: "center" as const,
    ...(isLargeScreen && { fixed: "left" as const }),
  },
  {
    title: "User Info",
    dataIndex: "userInfo",
    key: "userInfo",
    ...(isLargeScreen && { fixed: "left" as const }),
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
    }: IUser) => (
      <div className="flex items-center gap-4">
        <Link href={`/propile/${id}`} className="avatar">
          <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
            <Image
              src={propileImageUrl || mediaProvider.userImg}
              alt={`${name}'s avatar`}
              width={48}
              height={48}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>
        </Link>
        <div className="flex flex-col">
          <span className="font-bold text-gray-800">{name}</span>
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-xs text-gray-500 hover:text-P-primary"
              aria-label={`Send email to ${email}`}
            >
              {email}
            </a>
          )}
          <a
            href={`tel:${phone}`}
            className="text-xs text-gray-500 hover:text-P-primary"
            aria-label={`Call ${phone}`}
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
    align: "center" as const,
    width: 100,
  },
  {
    title: "Logins",
    dataIndex: "LoginAttempts",
    key: "LoginAttempts",
    align: "center" as const,
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
    width: 200,
    render: ({ _id: id, isDeleted }: IUser) => (
      <div className="flex gap-2">
        <Link href={`/propile/${id}`}>
          <Button size="small" type="default" aria-label={`View details for user ${id}`}>
            Details
          </Button>
        </Link>
        <DeleteUser userId={id} isDeleted={isDeleted} />
      </div>
    ),
  },
];

// Delete User Component
interface DeleteUserProps {
  userId: string;
  isDeleted?: boolean;
}

const DeleteUser = memo(({ userId, isDeleted }: DeleteUserProps) => {
  const queryClient = useQueryClient();
  const deleteUserMutation = UserHooks.useDeleteSingleUserMutation({
    onSuccess: async (data) => {
      if (data.success) {
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ALL_USERS] });
        toast.success(data.message);
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: () => {
      toast.error("Action failed");
    },
  });

  const updateUserMutation = UserHooks.useUpdateSingleUserMutation({
    onSuccess: async (data) => {
      if (data.success) {
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ALL_USERS] });
        toast.success(data.message);
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: () => {
      toast.error("Action failed");
    },
  });

  const handleDelete = useCallback(async () => {
    const result = await Swal.fire({
      title: isDeleted ? "Restore User?" : "Delete User?",
      text: isDeleted
        ? "User will be active again."
        : "User will be moved to trash.",
      icon: isDeleted ? "question" : "warning",
      showCancelButton: true,
      confirmButtonColor: isDeleted ? "#10B981" : "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: isDeleted ? "Restore" : "Delete",
    });

    if (result.isConfirmed) {
      try {
        if (isDeleted) {
          await updateUserMutation.mutateAsync({
            userId,
            data: { isDeleted: false },
          });
        } else {
          await deleteUserMutation.mutateAsync({ userId });
        }
      } catch (error) {
        // Error handled by mutation callbacks
      }
    }
  }, [isDeleted, userId, deleteUserMutation, updateUserMutation]);

  return (
    <Button
      onClick={handleDelete}
      loading={deleteUserMutation.isPending || updateUserMutation.isPending}
      size="small"
      danger={!isDeleted}
      type="primary"
      className={isDeleted ? "bg-green-600 hover:bg-green-700" : ""}
      aria-label={isDeleted ? `Restore user ${userId}` : `Delete user ${userId}`}
    >
      {isDeleted ? "Restore" : "Delete"}
    </Button>
  );
});

DeleteUser.displayName = "DeleteUser";

export default UserManagment;
