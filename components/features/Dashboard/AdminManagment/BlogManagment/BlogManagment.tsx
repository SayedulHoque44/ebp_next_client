"use client";
import { Modal, Pagination, Select, Space, Table, Tag, Button } from "antd";
import React, {
  useState,
  useMemo,
  useCallback,
  memo,
  startTransition,
} from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaBlog } from "react-icons/fa";
import Swal from "sweetalert2";
import EBFSelect from "@/components/shared/Form/EBFSelect";
import EBFrom from "@/components/shared/Form/EBFrom";
import EBInput from "@/components/shared/Form/EBInput";
import BlogHooks from "@/features/Blog/hooks/blog.hooks";
import {
  IBlog,
  IBlogGetBlogsRequest,
  BlogType,
} from "@/features/Blog/interface/blog.interface";
import { QUERY_KEY } from "@/constants/constendData";
import CreateBlogModal from "./CreateBlogModal";
import DeleteItemById from "../UniContent/SingleUC/components/DeleteUniContentItem";
import EBSearch from "@/components/shared/EBSearch";
import TableSkeleton from "@/components/shared/SkeletonLoader/TableSkeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQueryClient } from "@tanstack/react-query";

interface FilterParam {
  name: string;
  value: string | boolean | number | null | undefined;
}

interface BlogTableData {
  key: string;
  title: string;
  description: string;
  type: BlogType;
  imageUrl: string;
  pin: boolean;
}

interface EditBlogsModalProps {
  BlogInfo: BlogTableData;
}

const BlogManagment = () => {
  const queryClient = useQueryClient();
  const [params, setParams] = useState<FilterParam[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Convert params array to IBlogGetBlogsRequest object
  const queryParams = useMemo<IBlogGetBlogsRequest>(() => {
    const requestParams: IBlogGetBlogsRequest = {
      page,
      limit,
      sort: "-createdAt",
    };

    params.forEach((param) => {
      if (param.value !== undefined && param.value !== null && param.value !== "") {
        if (param.name === "searchTerm") {
          requestParams.searchTerm = param.value as string;
        } else if (param.name === "type") {
          requestParams.type = param.value as BlogType;
        } else if (param.name === "pin") {
          requestParams.pin = param.value === "true" || param.value === true;
        }
      }
    });

    return requestParams;
  }, [params, page, limit]);

  // Create stable query key
  const queryKey = useMemo(
    () => [
      QUERY_KEY.BLOGS,
      page,
      limit,
      ...params.map((p) => `${p.name}:${p.value}`),
    ],
    [page, limit, params]
  );

  const { data, isFetching, isLoading } = BlogHooks.useGetBlogs({
    queryKey,
    params: queryParams,
    options: {
      enabled: true,
    },
  });

  const metaData = useMemo(() => data?.data?.meta, [data?.data?.meta]);
  const blogs = useMemo(() => data?.data?.result || [], [data?.data?.result]);

  // Delete mutation for use with DeleteItemById (handles its own success/error)
  const deleteBlogMutationForTable = BlogHooks.useDeleteSingleBlog({
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BLOGS] });
      }
    },
  });

  // Search handler
  const onSearch = useCallback((value: string) => {
    setParams((prev) => {
      const filtered = prev.filter((item) => item.name !== "searchTerm");
      if (!value) return filtered;
      startTransition(() => {
        setPage(1);
      });
      return [...filtered, { name: "searchTerm", value }];
    });
  }, []);

  // Blog type select handler
  const handleBlogTypeSelect = useCallback((value: BlogType | undefined) => {
    setParams((prev) => {
      const filtered = prev.filter((item) => item.name !== "type");
      if (value !== undefined) {
        startTransition(() => {
          setPage(1);
        });
        return [...filtered, { name: "type", value }];
      }
      return filtered;
    });
  }, []);

  // Table filter handler
  const onChange = useCallback(
    (
      _pagination: unknown,
      filters: { pin?: (string | number | boolean)[] },
      _sorter: unknown,
      extra: { action: string }
    ) => {
      if (extra.action === "filter") {
        const queryParams: FilterParam[] = [];
        filters.pin?.forEach((item) =>
          queryParams.push({ name: "pin", value: item })
        );
        setParams(queryParams);
      }
    },
    []
  );

  const onShowSizeChange = useCallback((_current: number, pageSize: number) => {
    setLimit(pageSize);
    startTransition(() => {
      setPage(1);
    });
  }, []);

  const handlePageChange = useCallback((value: number) => {
    setPage(value);
  }, []);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setParams([]);
    startTransition(() => {
      setPage(1);
      setLimit(10);
    });
  }, []);

  // Get current filter values
  const getFilterValue = useCallback(
    (name: string) => {
      const param = params.find((p) => p.name === name);
      return param?.value || undefined;
    },
    [params]
  );

  const customData = useMemo<BlogTableData[]>(() => {
    return blogs.map((item) => ({
      key: item._id,
      title: item.title,
      description: item.description,
      type: item.type,
      imageUrl: item.imageUrl,
      pin: item.pin,
    }));
  }, [blogs]);

  // Generate columns
  const columns = useMemo(
    () => [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        fixed: "left" as const,
        render: (text: string) => (
          <span className="font-medium text-gray-800">{text}</span>
        ),
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: (desc: string) => {
          return (
            <span className="text-gray-500">
              {desc.substring(0, 50) + "......."}
            </span>
          );
        },
      },
      {
        title: "Type",
        key: "type",
        dataIndex: "type",
        render: (type: BlogType) => {
          return (
            <span>
              <Tag color={type === "Announcement" ? "purple" : "green"}>
                {type.toUpperCase()}
              </Tag>
            </span>
          );
        },
      },
      {
        title: "Pinned",
        key: "pin",
        dataIndex: "pin",
        filters: [
          {
            text: "PINNED",
            value: "true",
          },
          {
            text: "NOT PINNED",
            value: "false",
          },
        ],
        render: (pin: boolean) => {
          return (
            <span>
              <Tag color={pin === true ? "green" : "red"}>
                {pin === true ? "PINNED" : "NOT PINNED"}
              </Tag>
            </span>
          );
        },
      },
      {
        title: "Action",
        key: "x",
        render: (item: BlogTableData) => {
          return (
            <Space>
              <Link href={`/blogs/${item.key}`}>
                <Button size="small" aria-label={`View details for blog ${item.key}`}>
                  Details
                </Button>
              </Link>
              <EditBlogsModal BlogInfo={item} />
              <DeleteItemById
                objectCDNfullUrl={item.imageUrl}
                itemId={item.key}
                deleteFromDB={async (blogId: string) => {
                  const response = await deleteBlogMutationForTable.mutateAsync({ blogId });
                  // Wrap response to match DeleteItemById expected structure
                  return {
                    data: {
                      success: response.success,
                      message: response.message,
                    },
                  };
                }}
              />
            </Space>
          );
        },
      },
    ],
    [deleteBlogMutationForTable]
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
            <Skeleton width={120} height={40} />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="p-3 bg-P-primary/10 rounded-full text-P-primary">
                <FaBlog size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Blog Management
                </h1>
                <p className="text-gray-500 text-sm">
                  Total Blogs:{" "}
                  <span className="font-semibold text-gray-800">
                    {metaData?.total || 0}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <CreateBlogModal />
            </div>
          </>
        )}
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="w-full lg:w-1/3">
            <EBSearch
              placeholder="Search Blogs..."
              allowClear
              onSearch={onSearch}
              defaultValue={getFilterValue("searchTerm") as string || ""}
              className="w-full"
            />
          </div>
          <div className="flex flex-wrap gap-3 w-full lg:w-2/3 justify-end">
            <Select
              showSearch
              allowClear
              placeholder="Select Blogs Type"
              optionFilterProp="children"
              onChange={handleBlogTypeSelect}
              value={getFilterValue("type") as BlogType | undefined}
              className="w-48"
              size="large"
              options={[
                {
                  value: "Announcement",
                  label: "Announcement",
                },
                {
                  value: "Congratulate",
                  label: "Congratulate",
                },
                {
                  value: "Blog",
                  label: "Blog",
                },
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
            <TableSkeleton rows={10} columns={5} />
          </div>
        ) : (
          <>
            <Table
              onChange={onChange}
              loading={isFetching}
              columns={columns}
              pagination={false}
              scroll={{ x: "max-content" }}
              dataSource={customData}
              className="ant-table-custom"
            />
            <div className="p-4 flex justify-end border-t border-gray-100">
              <Pagination
                current={page}
                onChange={handlePageChange}
                onShowSizeChange={onShowSizeChange}
                pageSize={limit}
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

const EditBlogsModal = memo(({ BlogInfo }: EditBlogsModalProps) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateBlogMutation = BlogHooks.useUpdateSingleBlog({
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BLOGS] });
        toast.success(response.message);
        setIsModalOpen(false);
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: () => {
      toast.error("Action failed");
    },
  });

  const handleSubmit = useCallback(
    async (data: Partial<IBlog>) => {
      await updateBlogMutation.mutateAsync({
        blogId: BlogInfo.key,
        data,
      });
    },
    [BlogInfo.key, updateBlogMutation]
  );

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const blogTypeOptions = useMemo(
    () => [
      {
        value: "Announcement" as BlogType,
        label: "Announcement",
      },
      {
        value: "Congratulate" as BlogType,
        label: "Congratulate",
      },
      {
        value: "Blog" as BlogType,
        label: "Blog",
      },
    ],
    []
  );

  const pinOptions = useMemo(
    () => [
      {
        value: true,
        label: "Pinned",
      },
      {
        value: false,
        label: "Not Pinned",
      },
    ],
    []
  );

  return (
    <>
      <Button onClick={showModal} aria-label={`Edit blog ${BlogInfo.title}`}>
        Edit
      </Button>
      <Modal
        title={`Update ${BlogInfo.title}`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <EBFrom
          onSubmit={handleSubmit}
          defaultValues={{
            title: BlogInfo.title,
            description: BlogInfo.description,
            type: BlogInfo.type,
            pin: BlogInfo.pin,
          }}
        >
          <EBInput type="text" name="title" label="Title" />
          <EBInput type="text" name="description" label="Description" />
          <EBFSelect
            label="Type"
            name="type"
            options={blogTypeOptions}
            defaultValue={BlogInfo.type}
          />
          <EBFSelect
            label="Pin The Blog"
            name="pin"
            options={pinOptions}
            defaultValue={BlogInfo.pin}
          />
          <Button
            htmlType="submit"
            disabled={updateBlogMutation.isPending}
            aria-label="Submit blog update"
          >
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
});

EditBlogsModal.displayName = "EditBlogsModal";

export default BlogManagment;
