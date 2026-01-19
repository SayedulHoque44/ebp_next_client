import {
  CheckCircleFilled,
  CheckSquareTwoTone,
  EditFilled,
  FacebookFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Image,
  Modal,
  Pagination,
  Space,
  Table,
  Tag,
  Upload,
} from "antd";
import React, { useState } from "react";
import TableSkeleton from "../../../../../../Shared/Components/SkeletonLoader/TableSkeleton";

import {
  useCreateSubContentMutation,
  useDeleteSingleSubContentMutation,
  useGetSubContentsQuery,
} from "../../../../../../redux/Api/UniContentApi";
import toast from "react-hot-toast";
import EBInput from "../../../../../../Shared/Components/EBInput";
import EBFrom from "../../../../../../Shared/Components/EBFrom";
import { LuImagePlus } from "react-icons/lu";
import {
  EBP_Images_CDN_BaseUrl,
  EBP_S3_Images_BUCKET_NAME,
  EBP_s3Client,
  generateUniqImageID,
  getObjectKeyFromUrl,
} from "../../../../../../Util/utils";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Link } from "react-router-dom";
import DeleteItemById from "./DeleteUniContentItem";
import { useUplodeSinglePart } from "../../../../../../Util/Media";

const PagesManagment = ({ content }) => {
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
      topic: content.title,
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
    },
    {
      title: "Page",
      dataIndex: "item",
      key: "item",
      render: ({ imageUrl }) => (
        <div>
          {/* <h2 className="font-semibold text-xl">{title}</h2> */}
          <Image src={imageUrl} height={200} />
        </div>
      ),
    },

    {
      title: "Topic",
      key: "topic",
      dataIndex: "topic",
      render: (topic) => {
        return (
          <span>
            <Tag color={"purple"}>{topic.toUpperCase()}</Tag>
          </span>
        );
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
              objectCDNfullUrl={item.imageUrl}
              itemId={item._id}
              deleteFromDB={deleteFromDB}
            />
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <div>
        <CreatePageModal RefId={content._id} />
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={8} columns={4} />
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

const CreatePageModal = ({ RefId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [createPage, { isLoading }] = useCreateSubContentMutation();
  const { uplodeSinglePart, uploading } = useUplodeSinglePart();

  const handleSubmit = async () => {
    //
    try {
      setLoading(true);
      if (!file) {
        throw new Error("Please Select a File");
      }
      //
      if (file) {
        const folderName = "pages";
        // const folderName = "testEbp";
        const singlePartResult = await uplodeSinglePart({
          file,
          folderName,
        });
        if (singlePartResult.success && singlePartResult.Key) {
          toast.success("File Uploded Success!!");
          const pageData = { RefId };
          pageData.imageUrl = `${EBP_Images_CDN_BaseUrl}${singlePartResult.Key}`;
          const create = await createPage(pageData);
          if (create?.data?.success) {
            toast.success(create.data.message);
          } else if (create.error) {
            throw new Error(create.error.data.message);
          }
        } else {
          throw new Error("Faild to file uplode!!");
        }

        // create blog in database
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
        Create Page
      </Button>
      <Modal
        title="Create Page"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
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
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <Button disabled={loading} htmlType="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal>
    </>
  );
};

export default PagesManagment;
