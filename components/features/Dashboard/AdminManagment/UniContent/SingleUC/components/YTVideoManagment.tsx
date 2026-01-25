"use client";
import {
  EditFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";
import React, { useRef, useState, useMemo } from "react";
import TableSkeleton from "@/components/shared/SkeletonLoader/TableSkeleton";
import UniContentHooks from "@/features/UniContent/hooks/uniContent.hooks";
import { ISubContentGetSubContentsRequest, ISubContent } from "@/features/UniContent/interface/uniContent.interface";
import toast from "react-hot-toast";
import EBInput from "@/components/shared/Form/EBInput";
import EBFrom from "@/components/shared/Form/EBFrom";
import EBFTextarea from "@/components/shared/Form/EBFTextarea";
import DeleteItemById from "./DeleteUniContentItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ReactPlayer from "react-player";
import { IUniContent } from "@/features/UniContent/interface/uniContent.interface";
import { QUERY_KEY } from "@/constants/constendData";
import { useQueryClient } from "@tanstack/react-query";

interface YTVideoManagmentProps {
  content: IUniContent;
}

const YTVideoManagment = ({ content }: YTVideoManagmentProps) => {
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
        title: item.title,
        info: item.info,
        SL: item.index,
      })) || [],
    [pages?.data?.result]
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
        title: "Video",
        dataIndex: "item",
        fixed: "left" as const,
        key: "item",
        render: ({ url }: ISubContent) => (
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
        render: (title: string) => {
          return <span>{title}</span>;
        },
      },
      {
        title: "info",
        key: "info",
        dataIndex: "info",
        render: (info: string) => {
          return <span>{info || "...."}</span>;
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
              <UpdateSubContentModal RefId={typeof item.RefId === 'string' ? item.RefId : item.RefId._id} SubContent={item} />
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<any>(null);
  const queryClient = useQueryClient();

  const { mutateAsync: createSubContent, isPending: isLoading } =
    UniContentHooks.useCreateSubContent({
      onSuccess: (response) => {
        if (response?.success) {
          if (formRef.current) {
            formRef.current.reset();
          }
          toast.success(response.message);
          setIsModalOpen(false);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.SUB_CONTENTS, RefId],
          });
        }
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to create Video!"
        );
      },
    });

  const handleSubmit = async (data: Partial<ISubContent>) => {
    try {
      setLoading(true);
      const SubContentData = { RefId, ...data };
      await createSubContent(SubContentData);
    } catch (error: any) {
      toast.error(error?.message || "Failed to create Video!");
      setError(error?.message || "Failed to create Video!");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setError("");
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
            {/* Loading spinner can be added here */}
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

          <Button disabled={isLoading || loading} htmlType="submit">
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

interface UpdateSubContentModalProps {
  RefId: string;
  SubContent: ISubContent;
}

const UpdateSubContentModal = ({
  RefId,
  SubContent,
}: UpdateSubContentModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: updateSubContent, isPending: isLoading } =
    UniContentHooks.useUpdateSingleSubContent({
      onSuccess: (response) => {
        if (response?.success) {
          toast.success(response.message);
          setIsModalOpen(false);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.SUB_CONTENTS, RefId],
          });
        }
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to update Video!"
        );
      },
    });

  const handleSubmit = async (data: Partial<ISubContent>) => {
    try {
      setLoading(true);
      await updateSubContent({
        subContentId: SubContent._id,
        data: { ...data },
      });
    } catch (error: any) {
      toast.error(error?.message || "Failed to update Video!");
      setError(error?.message || "Failed to update Video!");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setError("");
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
              url: z.string({ required_error: "URL is required!" }),
              info: z.string({ required_error: "Info is required!" }),
            })
          )}
        >
          <EBInput type="text" name="title" label="Title" />
          <EBInput type="text" name="url" label="Youtube Url" />
          <EBFTextarea type="text" name="info" label="Info" />
          <Button disabled={isLoading || loading} htmlType="submit">
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

export default YTVideoManagment;
