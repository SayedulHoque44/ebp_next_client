import {
  CheckCircleFilled,
  CheckSquareTwoTone,
  EditFilled,
  FacebookFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Image,
  Modal,
  Pagination,
  Space,
  Table,
  Tag,
  Upload,
} from "antd";
import React, { useRef, useState } from "react";
import TableSkeleton from "../../../../../../Shared/Components/SkeletonLoader/TableSkeleton";

import {
  useCreateSubContentMutation,
  useDeleteSingleSubContentMutation,
  useGetSubContentsQuery,
  useUpdateSingleSubContentMutation,
} from "../../../../../../redux/Api/UniContentApi";
import toast from "react-hot-toast";
import EBInput from "../../../../../../Shared/Components/EBInput";
import EBFrom from "../../../../../../Shared/Components/EBFrom";
import { LuImagePlus } from "react-icons/lu";
import {
  EBP_Images_CDN_BaseUrl,
  EBP_S3_Images_BUCKET_NAME,
  EBP_s3Client,
  generateUniqImageID,
  getObjectKeyFromUrl,
} from "../../../../../../Util/utils";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Link } from "react-router-dom";
import DeleteItemById from "./DeleteUniContentItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Player } from "video-react";
import EBFTextarea from "../../../../../../Shared/Components/EBFTextarea";
import ReactPlayer from "react-player";
import { ImSpinner, ImSpinner2, ImSpinner3, ImSpinner4 } from "react-icons/im";

const YTVideoManagment = ({ content }) => {
  const [deleteFromDB] = useDeleteSingleSubContentMutation();
  const [params, setParams] = useState([]);
  const [page, setPage] = useState(1);
  const {
    data: pages,
    isLoading,
    isFetching,
  } = useGetSubContentsQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    { name: "sort", value: "createdAt" },
    { name: "RefId", value: content._id },
    ...params,
  ]);
  const metaData = pages?.meta;

  //console.log(pages?.result);
  const customData = pages?.result?.map((item) => {
    return {
      key: item._id,
      item: item,
      title: item.title,
      info: item.info,
      SL: item.index,
    };
  });

  //
  const columns = [
    {
      title: "SL",
      dataIndex: "SL",
      key: "SL",
      render: (SL) => <span>{SL}</span>,
    },
    {
      title: "Video",
      dataIndex: "item",
      fixed: "left",
      key: "item",
      render: ({ url }) => (
        <div className="w-[400px]">
          <a href={url} className="font-semibold my-2">
            {url}
          </a>
          <ReactPlayer url={url} width={"100%"} controls={true} loop={true} />
        </div>
      ),
    },

    {
      title: "title",
      key: "title",
      dataIndex: "title",
      render: (title) => {
        return <span>{title}</span>;
      },
    },

    {
      title: "info",
      key: "info",
      dataIndex: "info",
      render: (info) => {
        return <span>{info || "...."}</span>;
      },
    },
    {
      title: "Action",
      key: "x",
      render: ({ item }) => {
        //console.log(item);
        return (
          <Space>
            <DeleteItemById
              objectCDNfullUrl={item.imageUrl}
              itemId={item._id}
              deleteFromDB={deleteFromDB}
            />
            <UpdateSubContentModal RefId={item.RefId} SubContent={item} />
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <div>
        <CreatePageModal RefId={content._id} />
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={8} columns={4} />
          </div>
        ) : (
          <Table
            loading={isFetching}
            columns={columns}
            pagination={false}
            scroll={{ x: "max-content" }}
            dataSource={customData}
          />
        )}
      </div>
      <Pagination
        current={page}
        onChange={(value) => {
          setPage(value);
        }}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

const CreatePageModal = ({ RefId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const [createSubContent, { isLoading }] = useCreateSubContentMutation();

  const handleSubmit = async (data) => {
    const SubContentData = { RefId, ...data };
    // create blog in database
    try {
      const create = await createSubContent(SubContentData);
      if (create?.data?.success) {
        formRef.current.reset();
        toast.success(create.data.message);
      } else if (create.error) {
        toast.error(create.error.data.message);
      }
    } catch (error) {
      toast.error("Failed to create Video!");
    } finally {
      setLoading(false);
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
      <Button
        icon={<PlusCircleOutlined />}
        className="bg-blue-500 text-white my-5"
        onClick={showModal}
      >
        Create Video
      </Button>
      <Modal
        title="Create Video"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="relative"
      >
        {isLoading && (
          <div className="absolute top-0 right-0 left-0 bottom-0 bg-white/50 z-10 flex items-center justify-center">
            {/* <ImSpinner2 size={35} className="animate-spin text-P-primary" /> */}
          </div>
        )}
        <EBFrom
          ref={formRef}
          onSubmit={handleSubmit}
          resolver={zodResolver(
            z.object({
              title: z.string({ required_error: "Title is required!" }),
              info: z.string().optional(),
              url: z.string({ required_error: "YoutTube Url is required!" }),
            })
          )}
        >
          <EBInput type="text" name="title" label="Title" />
          <EBInput type="text" name="url" label="Youtube Url" />
          <EBFTextarea type="text" name="info" label="Info" />

          <Button disabled={isLoading} htmlType="submit">
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

const UpdateSubContentModal = ({ RefId, SubContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [updateSubContent, { isLoading }] = useUpdateSingleSubContentMutation();

  const handleSubmit = async (data) => {
    try {
      const updated = await updateSubContent({
        subContentId: SubContent._id,
        subContentData: { ...data },
      });
      if (updated?.data?.success) {
        toast.success(updated.data.message);
      } else if (updated.error) {
        toast.error(updated.error.data.message);
      }
    } catch (error) {
      toast.error("Failed to update Video!");
    } finally {
      setLoading(false);
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
      <Button
        icon={<EditFilled />}
        className="bg-blue-500 text-white my-5"
        onClick={showModal}
      >
        Update Video
      </Button>
      <Modal
        title="Update Video"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <EBFrom
          onSubmit={handleSubmit}
          defaultValues={{
            title: SubContent?.title,
            url: SubContent?.url,
            info: SubContent?.info,
          }}
          resolver={zodResolver(
            z.object({
              title: z.string({ required_error: "Title is required!" }),
              url: z.string({ required_error: "Title is required!" }),
              info: z.string({ required_error: "Title is required!" }),
            })
          )}
        >
          <EBInput type="text" name="title" label="Title" />
          <EBInput type="text" name="url" label="Youtube Url" />
          <EBFTextarea type="text" name="info" label="Info" />
          <Button disabled={isLoading | loading} htmlType="submit">
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

export default YTVideoManagment;
