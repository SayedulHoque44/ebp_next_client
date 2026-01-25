"use client";
import React, { useContext, useState, memo, useCallback } from "react";
import { Button, message, Modal, Popconfirm, Switch } from "antd";
import { MdOutlineDeleteOutline } from "react-icons/md";
import EBForm from "@/components/shared/Form/EBFrom";
import EBInput from "@/components/shared/Form/EBInput";
import SystemManagementHooks from "@/features/System/hooks/system.hooks";
import {
  IPoster,
  IRedirectUrl,
  ISocialMedia,
} from "@/features/System/interface/system.interface";
import { SystemContext } from "../SingleSystem";

type LinkField = "redirect_url" | "social_media" | "posters";

type LinkItem = IPoster | IRedirectUrl | ISocialMedia;

interface SingleUrlProps {
  item: LinkItem;
  allLinks: LinkItem[];
  field: LinkField;
  fullWidth?: boolean;
  create?: boolean;
}

const SingleUrl = memo(
  ({ item, allLinks, field, fullWidth, create }: SingleUrlProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpen = useCallback(() => setIsModalOpen(true), []);
    const handleClose = useCallback(() => setIsModalOpen(false), []);

    const isPosterField = field === "posters";
    const isActivePoster =
      isPosterField && (item as IPoster)?.status === "Active";

    return (
      <>
        <Button
          onClick={handleOpen}
          className={`${
            fullWidth ? "w-full" : ""
          } bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-sm hover:border-P-primary/30 hover:text-P-primary flex items-center justify-between`}
        >
          <span className="truncate">{item?.name}</span>
          {isActivePoster && (
            <span className="w-2 h-2 bg-green-500 rounded-full" />
          )}
        </Button>

        <Modal
          open={isModalOpen}
          onCancel={handleClose}
          footer={null}
          title={create ? "Create New One!" : `Update "${item.name}"`}
          destroyOnClose
        >
          <ModalBody
            item={item}
            allLinks={allLinks}
            field={field}
            isPosterField={isPosterField}
            onClose={handleClose}
          />
        </Modal>
      </>
    );
  }
);

SingleUrl.displayName = "SingleUrl";

interface ModalBodyProps {
  item: LinkItem;
  allLinks: LinkItem[];
  field: LinkField;
  isPosterField: boolean;
  onClose: () => void;
}

const ModalBody = ({
  item,
  allLinks,
  field,
  isPosterField,
  onClose,
}: ModalBodyProps) => {
  const systemContext = useContext(SystemContext);
  const [posterStatus, setPosterStatus] = useState(
    isPosterField && (item as IPoster).status === "Active"
  );

  const updateSystemMutation = SystemManagementHooks.useUpdateSingleSystem();

  if (!systemContext) {
    return null;
  }

  const { system, refetch } = systemContext;

  const handleSubmit = async (data: { name: string; url: string }) => {
    const updatedItem: LinkItem = {
      ...(item as LinkItem),
      ...data,
      ...(isPosterField
        ? { status: posterStatus ? "Active" : "Inactive" }
        : {}),
    };

    const updatedLinks = allLinks.map((link) =>
      link._id === item._id ? updatedItem : link
    );

    await updateSystemMutation.mutateAsync({
      systemId: system._id,
      data: { [field]: updatedLinks } as any,
    });

    refetch();
    message.success(`${item.name} updated!`);
    onClose();
  };

  const handleConfirmDelete = async () => {
    const remainingLinks = allLinks.filter((link) => link._id !== item._id);

    await updateSystemMutation.mutateAsync({
      systemId: system._id,
      data: { [field]: remainingLinks } as any,
    });

    refetch();
    message.success(`${item.name} deleted!`);
    onClose();
  };

  return (
    <EBForm onSubmit={handleSubmit} defaultValues={item}>
      <EBInput name="name" label="Name" />
      <EBInput name="url" label="Url" />

      {isPosterField && (
        <Switch
          defaultChecked={posterStatus}
          className="bg-gray-400 mb-3"
          loading={updateSystemMutation.isPending}
          size="small"
          onChange={setPosterStatus}
        />
      )}

      <div className="flex gap-3 mt-2">
        <Button
          htmlType="submit"
          type="primary"
          loading={updateSystemMutation.isPending}
        >
          Update
        </Button>

        <Popconfirm
          title={`Delete the ${item.name}`}
          description={`Are you sure to delete this ${item.name}?`}
          onConfirm={handleConfirmDelete}
          okText={<span className="text-red-600">Ok</span>}
          cancelText="No"
        >
          <Button danger loading={updateSystemMutation.isPending}>
            {!updateSystemMutation.isPending && (
              <MdOutlineDeleteOutline size={20} />
            )}
          </Button>
        </Popconfirm>
      </div>
    </EBForm>
  );
};

export default SingleUrl;

