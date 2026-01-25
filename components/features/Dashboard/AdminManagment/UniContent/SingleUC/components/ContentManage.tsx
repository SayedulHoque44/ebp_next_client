"use client";
import { Button, Image, Modal } from "antd";
import React, { useState } from "react";
import { EditFilled } from "@ant-design/icons";
import toast from "react-hot-toast";
import EBFrom from "@/components/shared/Form/EBFrom";
import EBInput from "@/components/shared/Form/EBInput";
import EBFTextarea from "@/components/shared/Form/EBFTextarea";
import UniContentHooks from "@/features/UniContent/hooks/uniContent.hooks";
import { IUniContent } from "@/features/UniContent/interface/uniContent.interface";
import { QUERY_KEY } from "@/constants/constendData";
import { useQueryClient } from "@tanstack/react-query";

interface ContentManageProps {
  content: IUniContent;
}

const ContentManage = ({ content }: ContentManageProps) => {
  return (
    <div className="flex  gap-3">
      {content.imageUrl && (
        <div>
          <Image src={content.imageUrl} width={200} />
        </div>
      )}
      <div>
        <h2 className="text-xl font-semibold">Title:</h2>
        <p>{content.title}</p>
        <h2 className="text-xl font-semibold mt-4">Description:</h2>
        <p>{content.description}</p>

        {/* manage */}
        <EditContent content={content} />
      </div>
    </div>
  );
};

interface EditContentProps {
  content: IUniContent;
}

const EditContent = ({ content }: EditContentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: updateUC, isPending: isLoading } =
    UniContentHooks.useUpdateSingleUC({
      onSuccess: (response) => {
        if (response?.success) {
          toast.success(response.message);
          setIsModalOpen(false);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.SINGLE_UNI_CONTENT, content._id],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.UNI_CONTENT],
          });
        }
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to update UniContent!"
        );
      },
    });

  const handleSubmit = async (data: Partial<IUniContent>) => {
    await updateUC({
      UniContentId: content._id,
      data,
    });
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
        className="bg-blue-500 text-white mt-5"
        onClick={showModal}
      >
        Edit
      </Button>
      <Modal
        title="Update Content"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <EBFrom
          onSubmit={handleSubmit}
          defaultValues={{
            title: content.title,
            description: content.description,
          }}
        >
          <EBInput type="text" name="title" label="Title" />
          <EBFTextarea  name="description" label="Description" />

          <Button disabled={isLoading} htmlType="submit">
            Update
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

export default ContentManage;
