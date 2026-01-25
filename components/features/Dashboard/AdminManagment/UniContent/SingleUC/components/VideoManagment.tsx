"use client";
import { EditFilled, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Pagination, Space, Table, Upload } from "antd";
import React, { useRef, useState, useMemo } from "react";
import TableSkeleton from "@/components/shared/SkeletonLoader/TableSkeleton";
import UniContentHooks from "@/features/UniContent/hooks/uniContent.hooks";
import { ISubContentGetSubContentsRequest, ISubContent } from "@/features/UniContent/interface/uniContent.interface";
import toast from "react-hot-toast";
import EBInput from "@/components/shared/Form/EBInput";
import EBFrom from "@/components/shared/Form/EBFrom";
import { LuImagePlus } from "react-icons/lu";
import { EBP_Images_CDN_BaseUrl } from "@/utils/utils";
import DeleteItemById from "./DeleteUniContentItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Player } from "video-react";
import { useUplodeSinglePart } from "@/hooks/media.hooks";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { IUniContent } from "@/features/UniContent/interface/uniContent.interface";
import { QUERY_KEY } from "@/constants/constendData";
import { useQueryClient } from "@tanstack/react-query";
import type { UploadFile } from "antd/es/upload/interface";

interface VideoManagmentProps {
  content: IUniContent;
}

const VideoManagment = ({ content }: VideoManagmentProps) => {
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
        fixed: "left" as const,
      },
      {
        title: "Video",
        dataIndex: "item",
        key: "item",
        fixed: "left" as const,
        render: ({ url, title }: ISubContent) => (
          <div className="w-56">
            <MediaPlayer title={title} src={url}>
              <MediaProvider />
              <DefaultVideoLayout icons={defaultLayoutIcons} />
            </MediaPlayer>
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
        title: "Action",
        key: "x",
        render: ({ item }: { item: ISubContent }) => {
          return (
            <Space>
              <DeleteItemById
                objectCDNfullUrl={item.url}
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
        <CreateVideoModal RefId={content._id} />
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={8} columns={3} />
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

interface UpdateSubContentModalProps {
  RefId: string;
  SubContent: ISubContent & { youtubeUrl?: string };
}

const UpdateSubContentModal = ({
  RefId,
  SubContent,
}: UpdateSubContentModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { uplodeSinglePart, uploading } = useUplodeSinglePart();
  const queryClient = useQueryClient();

  const { mutateAsync: updateSubContent, isPending: isLoading } =
    UniContentHooks.useUpdateSingleSubContent({
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
          error?.response?.data?.message || "Failed to update video"
        );
      },
    });

  const handleSubmit = async (data: Partial<ISubContent>) => {
    try {
      setLoading(true);
      if (file) {
        const folderName = "Course-Video";
        const singlePartResult = await uplodeSinglePart({
          file,
          folderName,
        });
        if (singlePartResult.success && singlePartResult.Key) {
          toast.success("File Uploded Success!!");
          data.url = `${EBP_Images_CDN_BaseUrl}${singlePartResult.Key}`;
        } else {
          throw new Error("Faild to file uplode!!");
        }
      }

      await updateSubContent({
        subContentId: SubContent._id,
        data,
      });
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
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
            youtubeUrl: SubContent?.youtubeUrl,
          }}
          resolver={zodResolver(
            z.object({
              title: z.string({ required_error: "Title is required!" }),
              youtubeUrl: z.string().optional(),
            })
          )}
        >
          <EBInput type="text" name="title" label="Title" />
          <EBInput type="text" name="youtubeUrl" label="Youtube Url" />
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
                {file ? `Replacing with: ${file.name}` : "Update video?"}
              </Button>
            </Upload>
          </div>

          <div className="p-1 border-2 border-red-400 mb-5">
            <Player preload="auto" autoPlay={false}>
              <source src={SubContent.url} />
            </Player>
          </div>
          <Button disabled={isLoading || loading || uploading} htmlType="submit">
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

interface CreateVideoModalProps {
  RefId: string;
}

const CreateVideoModal = ({ RefId }: CreateVideoModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<any>(null);
  const { uplodeSinglePart, uploading } = useUplodeSinglePart();
  const queryClient = useQueryClient();

  const { mutateAsync: createSubContent, isPending: isCreating } =
    UniContentHooks.useCreateSubContent({
      onSuccess: (response) => {
        if (response?.success) {
          if (formRef.current) {
            formRef.current.reset();
          }
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
          error?.response?.data?.message || "Failed to create video"
        );
      },
    });

  const handleSubmit = async (data: Partial<ISubContent>) => {
    try {
      setLoading(true);
      if (!file) {
        throw new Error("Please Select a File");
      }

      const folderName = "Course-Video";
      const singlePartResult = await uplodeSinglePart({
        file,
        folderName,
      });
      if (singlePartResult.success && singlePartResult.Key) {
        toast.success("File Uploded Success!!");
        data.url = `${EBP_Images_CDN_BaseUrl}${singlePartResult.Key}`;
        const SubContent = { RefId, ...data };
        await createSubContent(SubContent as Partial<ISubContent>);
      } else {
        throw new Error("Faild to file uplode!!");
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
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
      >
        <EBFrom
          ref={formRef}
          onSubmit={handleSubmit}
          resolver={zodResolver(
            z.object({
              title: z
                .string({ required_error: "Title is required!" })
                .min(1, "Title is required!"),
            })
          )}
        >
          <EBInput type="text" name="title" label="Title" />
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
              accept="video/*"
            >
              <Button className="flex items-center gap-1">
                <LuImagePlus />
                {file ? `Replace : ${file.name}` : "Uplode"}
              </Button>
            </Upload>
          </div>
          <Button disabled={loading || uploading || isCreating} htmlType="submit">
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

export default VideoManagment;
