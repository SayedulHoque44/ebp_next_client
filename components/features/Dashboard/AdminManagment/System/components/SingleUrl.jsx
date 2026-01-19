import React, { useContext, useState } from "react";
import CustomModal from "../../../../../Shared/Components/CustomModal";
import EBFrom from "../../../../../Shared/Components/EBFrom";
import EBInput from "../../../../../Shared/Components/EBInput";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Button, Checkbox, message, Popconfirm, Switch } from "antd";
import { useUpdateSingleSystemMutation } from "../../../../../redux/Api/SystemManagmentApi";
import { SystemContext } from "../SingleSystem";
const SingleUrl = ({ item, allLinks, create, field, fullWidth }) => {
  return (
    <>
      <CustomModal
        btnText={
          <div
            className={`flex items-center justify-between gap-2 ${
              fullWidth ? "w-full" : ""
            }`}
          >
            <span className="truncate">{item?.name}</span>
            {item.status === "Active" && field === "posters" && (
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            )}
          </div>
        }
        btnClass={`
            ${fullWidth ? "w-full" : ""} 
            bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 
            px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
            hover:shadow-sm hover:border-P-primary/30 hover:text-P-primary
            flex items-center justify-center
        `}
        modalTitle={create ? "Create New One!" : `Update "${item.name}"`}
        ModalBody={
          <ModalBody
            item={item}
            allLinks={allLinks}
            create={create}
            field={field}
          />
        }
      />
    </>
  );
};

const ModalBody = ({ item, allLinks, create, field }) => {
  const [updateSystemMutation, { isLoading: isUpdating }] =
    useUpdateSingleSystemMutation();
  const [posterStatus, setPosterStatus] = useState(
    item.status === "Active" ? true : false
  );
  const { system, refetch } = useContext(SystemContext);
  const handleSubmit = async (data) => {
    if (field === "posters") {
      data.status = posterStatus ? "Active" : "Inactive";
    }
    const updatedUrl = allLinks.map((ele) => {
      if (ele._id === item._id) {
        return { _id: item._id, ...data };
      }
      return ele;
    });
    const systemData = {
      [field]: updatedUrl,
    };
    //console.log(systemData);
    const res = await updateSystemMutation({
      systemId: system._id,
      systemData,
    });
    refetch();
    message.success(`${item.name} updated!`);
  };
  const handleConfirm = async () => {
    const deleteFromPosters = allLinks.filter((i) => i._id !== item._id);
    const systemData = {
      [field]: deleteFromPosters,
    };
    //console.log(systemData);
    // const res = await updateSystemMutation({
    //   systemId: system._id,
    //   systemData,
    // });
    // refetch();
    message.success(`${item.name} Deleted!`);
  };
  return (
    <EBFrom
      onSubmit={handleSubmit}
      // resolver={zodResolver(createBlogSchema)}

      defaultValues={item}
    >
      <EBInput type="text" name="name" label="Name" />
      <EBInput type="text" name="url" label="Url" />
      {field === "posters" && (
        <Switch
          defaultChecked={posterStatus}
          className="bg-gray-400 mb-3"
          loading={isUpdating}
          size="small"
          onChange={(e) => setPosterStatus(e)}
        />
      )}

      <div className="flex gap-3">
        <Button htmlType="submit" loading={isUpdating}>
          {create ? "Create" : "Update"}
        </Button>

        <Popconfirm
          title={`Delete the ${item.name} `}
          description={`Are you sure to delete this ${item.name} ?`}
          onConfirm={handleConfirm}
          okText={<span className="text-red-600">Ok</span>}
          cancelText="No"
        >
          <Button danger loading={isUpdating}>
            {!isUpdating && <MdOutlineDeleteOutline size={20} />}
          </Button>
        </Popconfirm>
      </div>
    </EBFrom>
  );
};

export default SingleUrl;
