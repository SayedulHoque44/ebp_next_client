"use client";
import {
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Image,
  Modal,
  Pagination,
  Space,
  Table,
  Tag,
  Upload,
} from "antd";
import React, { useState, useMemo, useCallback } from "react";
import TableSkeleton from "@/components/shared/SkeletonLoader/TableSkeleton";
import UniContentHooks from "@/features/UniContent/hooks/uniContent.hooks";
import { ISubContentGetSubContentsRequest } from "@/features/UniContent/interface/uniContent.interface";
import toast from "react-hot-toast";
import EBInput from "@/components/shared/Form/EBInput";
import EBFrom from "@/components/shared/Form/EBFrom";
import { LuImagePlus } from "react-icons/lu";
import { EBP_Images_CDN_BaseUrl } from "@/utils/utils";
import DeleteItemById from "./DeleteUniContentItem";
import { useUplodeSinglePart } from "@/hooks/media.hooks";
import { IUniContent, ISubContent } from "@/features/UniContent/interface/uniContent.interface";
import { QUERY_KEY } from "@/constants/constendData";
import { useQueryClient } from "@tanstack/react-query";
import type { UploadFile } from "antd/es/upload/interface";

interface PagesManagmentProps {
  content: IUniContent;
}

const PagesManagment = ({ content }: PagesManagmentProps) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const queryParams = useMemo<ISubContentGetSubContentsRequest>(() => ({
    RefId: content._id,
    limit: 10,
    page,
    sort: "createdAt",
  }), [content._id, page]);

  const queryKey = useMemo(
    () => [QUERY_KEY.SUB_CONTENTS, content._id, page],
    [content._id, page]
  );

  const { data: pages, isLoading, isFetching } =
    UniContentHooks.useGetSubContents({
      queryKey: queryKey as any,
      params: queryParams,
    });

  const metaData = useMemo(
    () => pages?.data?.meta || { total: 0, limit: 10 },
    [pages?.data?.meta]
  );

  const { mutateAsync: deleteFromDB } =
    UniContentHooks.useDeleteSingleSubContent({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.SUB_CONTENTS, content._id],
        });
      },
    });

  const customData = useMemo(
    () =>
      pages?.data?.result?.map((item) => ({
        key: item._id,
        item: item,
        topic: content.title,
        SL: item.index,
      })) || [],
    [pages?.data?.result, content.title]
  );

  const columns = useMemo(
    () => [
      {
        title: "SL",
        dataIndex: "SL",
        key: "SL",
        render: (SL: number) => <span>{SL}</span>,
      },
      {
        title: "Page",
        dataIndex: "item",
        key: "item",
        render: ({ imageUrl }: ISubContent) => (
          <div>
            <Image src={imageUrl} height={200} />
          </div>
        ),
      },
      {
        title: "Topic",
        key: "topic",
        dataIndex: "topic",
        render: (topic: string) => {
          return (
            <span>
              <Tag color={"purple"}>{topic.toUpperCase()}</Tag>
            </span>
          );
        },
      },
      {
        title: "Action",
        key: "x",
        render: ({ item }: { item: ISubContent }) => {
          return (
            <Space>
              <DeleteItemById
                objectCDNfullUrl={item.imageUrl}
                itemId={item._id}
                deleteFromDB={async (id: string) => {
                  const response = await deleteFromDB({ Id: id });
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
    [deleteFromDB]
  );

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

interface CreatePageModalProps {
  RefId: string;
}

const CreatePageModal = ({ RefId }: CreatePageModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { uplodeSinglePart, uploading } = useUplodeSinglePart();
  const queryClient = useQueryClient();

  const { mutateAsync: createPage, isPending: isCreating } =
    UniContentHooks.useCreateSubContent({
      onSuccess: (response) => {
        if (response?.success) {
          toast.success(response.message);
          setIsModalOpen(false);
          setFile(null);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.SUB_CONTENTS, RefId],
          });
        }
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to create page"
        );
      },
    });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!file) {
        throw new Error("Please Select a File");
      }

      const folderName = "pages";
      const singlePartResult = await uplodeSinglePart({
        file,
        folderName,
      });
      if (singlePartResult.success && singlePartResult.Key) {
        toast.success("File Uploded Success!!");
        const pageData = {
          RefId,
          imageUrl: `${EBP_Images_CDN_BaseUrl}${singlePartResult.Key}`,
        };
        await createPage(pageData);
      } else {
        throw new Error("Faild to file uplode!!");
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
      setError(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFile(null);
    setError("");
  };

  return (
    <>
      <Button
        icon={<PlusCircleOutlined />}
        className="bg-blue-500 text-white my-5"
        onClick={showModal}
      >
        Create Page
      </Button>
      <Modal
        title="Create Page"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="mb-5">
          <h2 className="mb-2">File Uplode :</h2>
          <Upload
            beforeUpload={() => false}
            onChange={(e) => {
              const fileList = e.fileList;
              if (fileList.length > 0) {
                const originFile = fileList[0]?.originFileObj;
                if (originFile) {
                  setFile(originFile);
                }
              } else {
                setFile(null);
              }
            }}
            listType="picture"
            maxCount={1}
          >
            <Button className="flex items-center gap-1">
              <LuImagePlus />
              {file ? `Replace : ${file.name}` : "Uplode"}
            </Button>
          </Upload>
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <Button
          disabled={loading || uploading || isCreating}
          htmlType="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal>
    </>
  );
};

export default PagesManagment;
