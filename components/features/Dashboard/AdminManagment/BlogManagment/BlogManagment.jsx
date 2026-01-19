import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Modal, Pagination, Select, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaBlog } from "react-icons/fa";
import { BsFillFilePostFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import EBFSelect from "../../../../Shared/Components/EBFSelect";
import EBFrom from "../../../../Shared/Components/EBFrom";
import EBInput from "../../../../Shared/Components/EBInput";
import {
  EBP_Images_CDN_BaseUrl,
  EBP_S3_Images_BUCKET_NAME,
  EBP_s3Client,
  getObjectKeyFromUrl,
} from "../../../../Util/utils";
import {
  useDeleteSingleBlogMutation,
  useGetBlogsQuery,
  useUpdateSingleBlogMutation,
} from "../../../../redux/Api/BlogsManagmentApi/BlogManagmentApi";
import CreateBlogModal from "./CreateBlogModal";
import DeleteItemById from "../UniContent/SingleUC/components/DeleteUniContentItem";
import Button from "../../../../Shared/Components/Button/Button";
import EBSearch from "../../../../Shared/Components/EBSearch/EBSearch";
import TableSkeleton from "../../../../Shared/Components/SkeletonLoader/TableSkeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogManagment = () => {
  const [params, setParams] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data: Blogs,
    isLoading,
    isFetching,
  } = useGetBlogsQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
    { name: "sort", value: "-createdAt" },
    ...params,
  ]);

  const [deleteSingleBlogQuery, { isLoading: isDelSingleBlogLoading }] =
    useDeleteSingleBlogMutation();

  const metaData = Blogs?.meta;

  // SearchTerm
  const onSearch = (value) => {
    const searchItemRemove = params.filter(
      (item) => item.name !== "searchTerm"
    );
    setParams([...searchItemRemove, { name: "searchTerm", value }]);
  };

  // select Blogs type
  const handleBlogTypeSelect = (value) => {
    const blogsTypeRemove = params.filter((item) => item.name !== "type");
    if (value !== undefined) {
      setParams([...blogsTypeRemove, { name: "type", value }]);
    } else {
      setParams([...blogsTypeRemove]);
    }
  };

  const onChange = (_pagination, filters, _sorter, extra) => {
    if (extra.action === "filter") {
      const queryParams = [];

      filters.pin?.forEach((item) =>
        queryParams.push({ name: "pin", value: item })
      );
      setParams(queryParams);
    }
  };

  const onShowSizeChange = (current, pageSize) => {
    setLimit(pageSize);
  };

  const customData = Blogs?.result?.map((item) => {
    return {
      key: item._id,
      title: item.title,
      description: item.description,
      type: item.type,
      imageUrl: item.imageUrl,
      pin: item.pin,
    };
  });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      fixed: "left",
      render: (text) => (
        <span className="font-medium text-gray-800">{text}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (desc) => {
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

      render: (type) => {
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
      render: (pin) => {
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
      render: (item) => {
        //console.log(item);
        return (
          <Space>
            <Link to={`/blogs/${item.key}`}>
              <Button size="small">Details</Button>
            </Link>
            <EditBlogsModal BlogInfo={item} />
            {/* <DeleteBlog blogId={item.key} imageUrl={item.imageUrl} /> */}
            <DeleteItemById
              objectCDNfullUrl={item.imageUrl}
              itemId={item.key}
              deleteFromDB={deleteSingleBlogQuery}
            />
          </Space>
        );
      },
    },
  ];

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
              <Button onClick={() => setParams([])} type="dashed" danger>
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

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
                onChange={(value) => setPage(value)}
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

const EditBlogsModal = ({ BlogInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateBlogs, { isLoading }] = useUpdateSingleBlogMutation();

  const handleSubmit = async (data) => {
    const update = await updateBlogs({ blogId: BlogInfo.key, blogData: data });
    if (update.data.success) {
      toast.success(update.data.message);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Edit</Button>
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
          }}
        >
          <EBInput type="text" name="title" label="Title" />
          <EBInput type="text" name="description" label="Title" />
          <EBFSelect
            label="Type"
            name="type"
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
            defaultValue={BlogInfo.type}
          />
          <EBFSelect
            label="Pin The Blog"
            name="pin"
            options={[
              {
                value: true,
                label: "Pinned",
              },
              {
                value: false,
                label: "Not Pinned",
              },
            ]}
            defaultValue={BlogInfo.pin}
          />
          <Button htmlType="submit" disabled={isLoading}>
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

//  delete a single Blog
const DeleteBlog = ({ blogId, imageUrl }) => {
  const [deleteSingleBlogQuery, { isLoading: isDelSingleBlogLoading }] =
    useDeleteSingleBlogMutation();
  const [loading, setLoading] = useState(false);

  const objectKey = getObjectKeyFromUrl(EBP_Images_CDN_BaseUrl, imageUrl);

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
        setLoading(true);
        try {
          if (objectKey) {
            const params = {
              Bucket: EBP_S3_Images_BUCKET_NAME,
              Key: objectKey,
            };
            const command = new DeleteObjectCommand(params);
            await EBP_s3Client.send(command);
            //console.log("Object deleted successfully");
          }
          const deletedBlog = await deleteSingleBlogQuery(blogId);

          if (deletedBlog.data.success) {
            toast.success(deletedBlog.data.message);
          }
        } catch (error) {
          toast.error(
            "something went wrong deleting the blog Please Contact To Developer!"
          );
          //console.log(error);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <Button
      title={imageUrl}
      disabled={isDelSingleBlogLoading | loading}
      onClick={handleDelete}
      type="primary"
      danger
    >
      Delete Blog
    </Button>
  );
};

export default BlogManagment;
