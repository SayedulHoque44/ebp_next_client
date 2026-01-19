import { EditFilled, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Pagination, Space, Table, Upload } from "antd";
import React, { useRef, useState } from "react";
import TableSkeleton from "../../../../../../Shared/Components/SkeletonLoader/TableSkeleton";

import {
  useCreateSubContentMutation,
  useDeleteSingleSubContentMutation,
  useGetSubContentsQuery,
  useUpdateSingleSubContentMutation,
} from "../../../../../../redux/Api/UniContentApi";
import toast from "react-hot-toast";
import EBInput from "../../../../../../Shared/Components/EBInput";
import EBFrom from "../../../../../../Shared/Components/EBFrom";
import { LuImagePlus } from "react-icons/lu";
import { EBP_Images_CDN_BaseUrl } from "../../../../../../Util/utils";

import DeleteItemById from "./DeleteUniContentItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Player } from "video-react";
import { useUplodeSinglePart } from "../../../../../../Util/Media";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

const VideoManagment = ({ content }) => {
  const [deleteFromDB] = useDeleteSingleSubContentMutation();
  const [params, setParams] = useState([]);
  const [page, setPage] = useState(1);
  const {
    data: pages,
    isLoading,
    isFetching,
  } = useGetSubContentsQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    { name: "sort", value: "createdAt" },
    { name: "RefId", value: content._id },
    ...params,
  ]);
  const metaData = pages?.meta;

  const customData = pages?.result?.map((item) => {
    return {
      key: item._id,
      item: item,
      title: item.title,
      SL: item.index,
    };
  });

  //
  const columns = [
    {
      title: "SL",
      dataIndex: "SL",
      key: "SL",
      render: (SL) => <span>{SL}</span>,
      fixed: "left",
    },
    {
      title: "Video",
      dataIndex: "item",
      key: "item",
      fixed: "left",
      render: ({ url, title }) => (
        <div className="w-56">
          {/* <Player preload="auto" autoPlay={false}>
            <source src={url} />
          </Player> */}
          {/* <MediaPlayer title={item} src={url}>
            <MediaProvider />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
          </MediaPlayer> */}

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
      render: (title) => {
        return <span>{title}</span>;
      },
    },
    {
      title: "Action",
      key: "x",
      render: ({ item }) => {
        //console.log(item);
        return (
          <Space>
            <DeleteItemById
              objectCDNfullUrl={item.url}
              itemId={item._id}
              deleteFromDB={deleteFromDB}
            />
            <UpdateSubContentModal RefId={item.RefId} SubContent={item} />
          </Space>
        );
      },
    },
  ];
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

const UpdateSubContentModal = ({ RefId, SubContent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const { uplodeSinglePart, uploading } = useUplodeSinglePart();
  const [updateSubContent, { isLoading }] = useUpdateSingleSubContentMutation();

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      //
      if (file) {
        // const folderName = "Course-Video";
        const folderName = "testEbp";
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

      const updated = await updateSubContent({
        subContentId: SubContent._id,
        subContentData: data,
      });
      if (updated?.data?.success) {
        toast.success(updated.data.message);
      } else if (updated.error) {
        throw new Error(updated.error.data.message);
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
          {/* <EBFTextarea type="text" name="description" label="Description" /> */}
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
                {file ? `Replacing with: ${file.name}` : "Update video?"}
              </Button>
            </Upload>
          </div>

          <div className="p-1 border-2 border-red-400 mb-5">
            <Player preload="auto" autoPlay={false}>
              <source src={SubContent.url} />
            </Player>
          </div>
          <Button disabled={isLoading || loading} htmlType="submit">
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

const CreateVideoModal = ({ RefId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const { uplodeSinglePart, uploading } = useUplodeSinglePart();
  const [createSubContent, { isLoading }] = useCreateSubContentMutation();

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      if (!file) {
        throw new Error("Please Select a File");
      }
      //
      if (file) {
        const folderName = "Course-Video";
        // const folderName = "testEbp";
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
        const SubContent = { RefId, ...data };
        const create = await createSubContent(SubContent);
        if (create?.data?.success) {
          toast.success(create.data.message);
        } else if (create.error) {
          throw new Error(create.error.data.message);
        }
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
              //    {...props}
              beforeUpload={() => false}
              onChange={(e) => setFile(e.fileList[0]?.originFileObj)}
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
          <Button disabled={loading} htmlType="submit">
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

export default VideoManagment;
