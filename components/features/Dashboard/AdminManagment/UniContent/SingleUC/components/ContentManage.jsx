import { Button, Image, Modal } from "antd";
import React, { useState } from "react";
import { EditFilled } from "@ant-design/icons";
import toast from "react-hot-toast";
import EBFrom from "../../../../../../Shared/Components/EBFrom";
import EBInput from "../../../../../../Shared/Components/EBInput";
import { useUpdateSingleUCMutation } from "../../../../../../redux/Api/UniContentApi";

const ContentManage = ({ content }) => {
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

const EditContent = ({ content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [updateUC, { isLoading }] = useUpdateSingleUCMutation();

  const handleSubmit = async (data) => {
    const UniContentData = { ...data };

    // return //console.log(argumentData);
    try {
      const update = await updateUC({
        UniContentId: content._id,
        UniContentData,
      });
      //console.log(create);
      if (update?.data?.success) {
        toast.success(update.data.message);
      } else if (update.error) {
        toast.error(update.error.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update UniContent!");
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
        className="bg-blue-500 text-white mt-5"
        onClick={showModal}
      >
        Edit
      </Button>
      <Modal
        title="Create Argument"
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
          // reset={true}
        >
          <EBInput type="text" name="title" label="Title" />
          <EBInput type="text" name="description" label="Description" />

          <Button disabled={isLoading | loading} htmlType="submit">
            Update
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

export default ContentManage;
