import React, { useEffect, useRef, useState } from "react";
import {
  useCreateUniContentMutation,
  useGetUniContentQuery,
} from "../../../../redux/Api/UniContentApi";
import { BsFillFilePostFill } from "react-icons/bs";
import { BiSolidBookContent } from "react-icons/bi";

import { Button, Modal, Select, Space, Table, Tag, Upload } from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import UCTable from "./UCTable";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EBP_Images_CDN_BaseUrl,
  EBP_S3_Images_BUCKET_NAME,
  EBP_s3Client,
} from "../../../../Util/utils";
import toast from "react-hot-toast";
import EBFrom from "../../../../Shared/Components/EBFrom";
import {
  createBlogSchema,
  createUniContentSchema,
} from "../../../../Schemas/Schema";
import EBFSelect from "../../../../Shared/Components/EBFSelect";
import EBInput from "../../../../Shared/Components/EBInput";
import EBFTextarea from "../../../../Shared/Components/EBFTextarea";
import { LuImagePlus } from "react-icons/lu";
import { useStore } from "zustand";
import { useUserUXSetting } from "../../../../zustand/store";
import { contentTypeObj } from "../../../../Shared/Constants";
import { useUplodeSinglePart } from "../../../../Util/Media";

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
  const [params, setParams] = useState([
    {
      name: "contentType",
      value: userSetting?.uniContentSelect || contentTypeObj.CourseVideo,
    },
  ]);
  const [page, setPage] = useState(1);
  const {
    data: Contents,
    isLoading,
    isFetching,
  } = useGetUniContentQuery([
    { name: "page", value: page },
    { name: "limit", value: 1000 },
    { name: "sort", value: "createdAt" },
    ...params,
  ]);
  const metaData = Contents?.meta;

  const onSearch = (value) => {
    const searchItemRemove = params.filter(
      (item) => item.name !== "searchTerm"
    );
    setSelectedType(value);
    setParams([...searchItemRemove, { name: "searchTerm", selectedType }]);
  };

  // select Contents type
  const handleContentTypeSelect = (value) => {
    const ContentsTypeRemove = params.filter(
      (item) => item.name !== "contentType"
    );
    if (value !== undefined) {
      updateUserSettings("uniContentSelect", value);
      setParams([...ContentsTypeRemove, { name: "contentType", value }]);
    } else {
      setParams([...ContentsTypeRemove]);
    }
  };

  //

  const OnlyContentType = params.filter((item) => item.name === "contentType");

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
        <UCTable UniContents={Contents?.result} isFetching={isFetching} />
      </div>
    </div>
  );
};

const CreateUniContetnModal = ({ uniContentOption }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [createUniContent, { isLoading }] = useCreateUniContentMutation();
  const formRef = useRef();
  const userSetting = useStore(useUserUXSetting, (state) => state.userSetting);
  const { uplodeSinglePart, uploading } = useUplodeSinglePart();

  const handleSubmit = async (data) => {
    try {
      throw new Error("Somthing went wrong!!");
      setLoading(true);
      if (file) {
        const folderName = "pages";
        // const folderName = "testEbp";
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

      const create = await createUniContent(data);
      if (create?.data?.success) {
        formRef.current.reset();
        toast.success(create.data.message);
      } else if (create.error) {
        throw new Error(create.error.data.message);
      }
    } catch (error) {
      toast.error(error.message);
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
      <Button className="bg-blue-500 text-white" onClick={showModal}>
        Create Content
      </Button>
      <Modal
        title="Basic Modal"
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
          <EBFTextarea type="text" name="description" label="Description" />

          <div className="mb-5">
            <h2 className="mb-2">File Uplode :</h2>
            <Upload
              //    {...props}
              beforeUpload={() => false}
              onChange={(e) => setFile(e.fileList[0]?.originFileObj)}
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
          <Button disabled={loading} htmlType="submit">
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

export default UniContent;
