"use client";
import React, { useRef, useState, useMemo, useCallback } from "react";
import { BiSolidBookContent } from "react-icons/bi";
import { Button, Modal, Select, Upload } from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import UCTable from "./UCTable";
import { zodResolver } from "@hookform/resolvers/zod";
import { EBP_Images_CDN_BaseUrl } from "@/utils/utils";
import toast from "react-hot-toast";
import EBFrom from "@/components/shared/Form/EBFrom";
import { createUniContentSchema } from "@/utils/Schemas";
import EBFSelect from "@/components/shared/Form/EBFSelect";
import EBInput from "@/components/shared/Form/EBInput";
import EBFTextarea from "@/components/shared/Form/EBFTextarea";
import { LuImagePlus } from "react-icons/lu";
import { useStore } from "zustand";
import { contentTypeObj } from "@/constants/ui_constent";
import { useUplodeSinglePart } from "@/hooks/media.hooks";
import UniContentHooks from "@/features/UniContent/hooks/uniContent.hooks";
import { IUniContentGetUniContentRequest, IUniContent } from "@/features/UniContent/interface/uniContent.interface";
import { QUERY_KEY } from "@/constants/constendData";
import { useQueryClient } from "@tanstack/react-query";
import type { UploadFile } from "antd/es/upload/interface";
import { useUserUXSetting } from "@/features/User/store/user.store";

export const contentTypeOptions = [
  {
    value: contentTypeObj.Trucchi,
    label: contentTypeObj.Trucchi,
  },
  {
    value: contentTypeObj.PatenteBook,
    label: contentTypeObj.PatenteBook,
  },
  {
    value: contentTypeObj.STDNotes,
    label: contentTypeObj.STDNotes,
  },
  {
    value: contentTypeObj.CourseVideo,
    label: contentTypeObj.CourseVideo,
  },
  {
    value: contentTypeObj.FeedbackVideo,
    label: contentTypeObj.FeedbackVideo,
  },
  {
    value: contentTypeObj.YTFreeVideo,
    label: contentTypeObj.YTFreeVideo,
  },
];

const UniContent = () => {
  const userSetting = useStore(useUserUXSetting, (state) => state.userSetting);
  const updateUserSettings = useStore(
    useUserUXSetting,
    (state) => state.updateUserSetting
  );
  const [filterParams, setFilterParams] = useState<Array<{ name: string; value: string | number | boolean }>>([
    {
      name: "contentType",
      value: userSetting?.uniContentSelect || contentTypeObj.CourseVideo,
    },
  ]);
  const [page, setPage] = useState(1);

  // Convert filter params to request object
  const queryParams = useMemo<IUniContentGetUniContentRequest>(() => {
    const requestParams: IUniContentGetUniContentRequest = {
      page,
      limit: 1000,
      sort: "createdAt",
    };

    filterParams.forEach((param) => {
      if (param.name === "contentType") {
        requestParams.contentType = param.value as any;
      } else if (param.name === "searchTerm") {
        requestParams.searchTerm = param.value as string;
      }
    });

    return requestParams;
  }, [page, filterParams]);

  // Create stable query key
  const queryKey = useMemo(
    () => [
      QUERY_KEY.UNI_CONTENT,
      page,
      ...filterParams.map((p) => `${p.name}:${p.value}`),
    ],
    [page, filterParams]
  );

  const { data: Contents, isLoading, isFetching } =
    UniContentHooks.useGetUniContent({
      queryKey: queryKey as any,
      params: queryParams,
    });

  const metaData = useMemo(
    () => Contents?.data?.meta || { total: 0 },
    [Contents?.data?.meta]
  );
  const result = useMemo(
    () => Contents?.data?.result || [],
    [Contents?.data?.result]
  );

  // select Contents type
  const handleContentTypeSelect = useCallback(
    (value: string | undefined) => {
      setFilterParams((prev) => {
        const ContentsTypeRemove = prev.filter(
          (item) => item.name !== "contentType"
        );
        if (value !== undefined) {
          updateUserSettings("uniContentSelect", value);
          return [...ContentsTypeRemove, { name: "contentType", value }];
        } else {
          return [...ContentsTypeRemove];
        }
      });
    },
    [updateUserSettings]
  );

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {isLoading ? (
          <div className="flex items-center gap-4 w-full">
            <Skeleton circle width={48} height={48} />
            <div className="flex-1">
              <Skeleton width={220} height={28} className="mb-2" />
              <Skeleton width={150} height={20} />
            </div>
            <Skeleton width={140} height={40} />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="p-3 bg-P-primary/10 rounded-full text-P-primary">
                <BiSolidBookContent size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Content Management</h1>
                <p className="text-gray-500 text-sm">
                  Total Content: <span className="font-semibold text-gray-800">{metaData?.total || 0}</span>
                </p>
              </div>
            </div>
            <div>
              <CreateUniContetnModal
                uniContentOption={contentTypeObj.CourseVideo}
              />
            </div>
          </>
        )}
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-end items-center">
          <div className="flex flex-wrap gap-3 w-full lg:w-2/3 justify-end">
            <Select
              className="w-60"
              size="large"
              placeholder="Select Contents Type"
              optionFilterProp="children"
              onChange={handleContentTypeSelect}
              defaultValue={userSetting?.uniContentSelect}
              options={contentTypeOptions}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-4">
        <UCTable UniContents={result} isFetching={isFetching} />
      </div>
    </div>
  );
};

interface CreateUniContetnModalProps {
  uniContentOption: string;
}

const CreateUniContetnModal = ({
  uniContentOption,
}: CreateUniContetnModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<any>(null);
  const userSetting = useStore(useUserUXSetting, (state) => state.userSetting);
  const { uplodeSinglePart, uploading } = useUplodeSinglePart();
  const queryClient = useQueryClient();

  const { mutateAsync: createUniContent, isPending: isCreating } =
    UniContentHooks.useCreateUniContent({
      onSuccess: (response) => {
        if (response?.success) {
          if (formRef.current) {
            formRef.current.reset();
          }
          toast.success(response.message);
          setIsModalOpen(false);
          setFile(null);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.UNI_CONTENT],
          });
        }
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to create content"
        );
      },
    });

  const handleSubmit = async (
    data: Partial<Omit<IUniContent, "_id" | "createdAt" | "updatedAt">>
  ) => {
    try {
      setLoading(true);
      if (file) {
        const folderName = "pages";
        const singlePartResult = await uplodeSinglePart({
          file,
          folderName,
        });

        if (singlePartResult.success && singlePartResult.Key) {
          toast.success("File Uploded Success!!");
          data.imageUrl = `${EBP_Images_CDN_BaseUrl}${singlePartResult.Key}`;
        } else {
          throw new Error("Faild to file uplode!!");
        }
      }

      await createUniContent(data);
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
      <Button className="bg-blue-500 text-white" onClick={showModal}>
        Create Content
      </Button>
      <Modal
        title="Create Content"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <EBFrom
          onSubmit={handleSubmit}
          resolver={zodResolver(createUniContentSchema)}
          ref={formRef}
        >
          <EBInput type="text" name="title" label="Title" />
          <EBFTextarea  name="description" label="Description" />

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
          </div>
          <EBFSelect
            label="Content Type"
            name="contentType"
            defaultValue={uniContentOption}
            options={contentTypeOptions}
          />
          <Button disabled={loading || uploading || isCreating} htmlType="submit">
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

export default UniContent;
