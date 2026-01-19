import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, Upload } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { LuImagePlus } from "react-icons/lu";
import { createBlogSchema } from "../../../../Schemas/Schema";
import EBFSelect from "../../../../Shared/Components/EBFSelect";
import EBFTextarea from "../../../../Shared/Components/EBFTextarea";
import EBFrom from "../../../../Shared/Components/EBFrom";
import EBInput from "../../../../Shared/Components/EBInput";
import {
  EBP_Images_CDN_BaseUrl,
  EBP_S3_Images_BUCKET_NAME,
  EBP_s3Client,
  getObjectKeyFromUrl,
} from "../../../../Util/utils";
import { useCreateBlogMutation } from "../../../../redux/Api/BlogsManagmentApi/BlogManagmentApi";
import { useUplodeSinglePart } from "../../../../Util/Media";
import { nan } from "zod";

const CreateBlogModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState("");
  const [uploadingState, setUploadingState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [createBlogQuery, { isLoading }] = useCreateBlogMutation();
  const { uplodeSinglePart, uploading } = useUplodeSinglePart();
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmitFinal = async (blogData) => {
    try {
      setLoading(true);
      if (file) {
        const folderName = "BlogImages";
        // const folderName = "testEbp";
        // Get presigned url
        const singlePartResult = await uplodeSinglePart({
          file,
          folderName,
          setUploadProgress,
        });

        //console.log(singlePartResult);

        if (singlePartResult.success && singlePartResult.Key) {
          toast.success("File Uploded Success!!");
          blogData.imageUrl = `${EBP_Images_CDN_BaseUrl}${singlePartResult.Key}`;
        }
        const create = await createBlogQuery(blogData);
        if (create?.data?.success) {
          toast.success(create.data.message);
        } else if (create.error) {
          throw new Error(create.error.data.message);
        }
      }
      //
      //now send write db query and inside server hanbdl the file deelet if needed when occurs error,
    } catch (error) {
      toast.error(error.message);
      //console.log(error);
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
        Create Blog
      </Button>
      <Modal
        title="Create Blog"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <EBFrom
          onSubmit={handleSubmitFinal}
          resolver={zodResolver(createBlogSchema)}
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
          />
          <EBInput type="text" name="tags" label="Tags" />
          <Button disabled={isLoading | loading} htmlType="submit">
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

export default CreateBlogModal;
