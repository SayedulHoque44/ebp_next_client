"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, Upload } from "antd";
import React, { useState, useCallback, useMemo, memo } from "react";
import toast from "react-hot-toast";
import { LuImagePlus } from "react-icons/lu";
import type { UploadFile, RcFile } from "antd/es/upload/interface";
import { createBlogSchema } from "@/utils/Schemas";
import EBFSelect from "@/components/shared/Form/EBFSelect";
import EBFTextarea from "@/components/shared/Form/EBFTextarea";
import EBFrom from "@/components/shared/Form/EBFrom";
import EBInput from "@/components/shared/Form/EBInput";
import { EBP_Images_CDN_BaseUrl } from "@/utils/utils";
import BlogHooks from "@/features/Blog/hooks/blog.hooks";
import { IBlog, BlogType } from "@/features/Blog/interface/blog.interface";
import { QUERY_KEY } from "@/constants/constendData";
import { useQueryClient } from "@tanstack/react-query";
import { useUplodeSinglePart } from "@/hooks/media.hooks";

interface CreateBlogFormData extends Partial<Omit<IBlog, "_id" | "imageUrl">> {
  imageUrl?: string;
}

const CreateBlogModal = memo(() => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { uplodeSinglePart, uploading } = useUplodeSinglePart();

  const createBlogMutation = BlogHooks.useCreateBlog({
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BLOGS] });
        toast.success(response.message);
        setIsModalOpen(false);
        setFile(null);
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create blog");
    },
  });

  const handleSubmitFinal = useCallback(
    async (blogData: CreateBlogFormData) => {
      try {
        setLoading(true);
        if (file) {
          const folderName = "BlogImages";
          const singlePartResult = await uplodeSinglePart({
            file,
            folderName,
            setUploadProgress: () => {}, // Optional callback
          });

          if (singlePartResult.success && singlePartResult.Key) {
            toast.success("File Uploaded Successfully!");
            blogData.imageUrl = `${EBP_Images_CDN_BaseUrl}${singlePartResult.Key}`;
          } else {
            throw new Error("Failed to upload file");
          }
        }

        await createBlogMutation.mutateAsync(blogData);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [file, uplodeSinglePart, createBlogMutation]
  );

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    setFile(null);
  }, []);

  const handleFileChange = useCallback(
    (info: { fileList: UploadFile[] }) => {
      const fileObj = info.fileList[0]?.originFileObj;
      if (fileObj instanceof File) {
        setFile(fileObj);
      } else {
        setFile(null);
      }
    },
    []
  );

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

  return (
    <>
      <Button
        className="bg-blue-500 text-white"
        onClick={showModal}
        aria-label="Create new blog"
      >
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
          <EBFTextarea name="description" label="Description" />

          <div className="mb-5">
            <h2 className="mb-2">File Upload:</h2>
            <Upload
              beforeUpload={() => false}
              onChange={handleFileChange}
              listType="picture"
              maxCount={1}
            >
              <Button
                className="flex items-center gap-1"
                aria-label="Upload blog image"
              >
                <LuImagePlus />
                {file ? `Replace: ${file.name}` : "Upload"}
              </Button>
            </Upload>
          </div>
          <EBFSelect
            label="Type"
            name="type"
            options={blogTypeOptions}
          />
          <EBInput type="text" name="tags" label="Tags" />
          <Button
            disabled={createBlogMutation.isPending || loading || (uploading ?? false)}
            htmlType="submit"
            aria-label="Submit blog creation"
          >
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
});

CreateBlogModal.displayName = "CreateBlogModal";

export default CreateBlogModal;
