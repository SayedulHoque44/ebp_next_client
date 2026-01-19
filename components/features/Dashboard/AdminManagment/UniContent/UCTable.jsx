import { Button, Image, Space, Table, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import DeleteItemById from "./SingleUC/components/DeleteUniContentItem";
import { useDeleteSingleUniContentMutation } from "../../../../redux/Api/UniContentApi";
import { createStyles } from "antd-style";
const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const UCTable = ({ UniContents, isFetching }) => {
  const { styles } = useStyle();
  const [deleteFromDB] = useDeleteSingleUniContentMutation();
  const customData = UniContents?.map((item) => {
    return {
      key: item._id,
      item: item,
      description: item.description,
      contentType: item.contentType,
    };
  });
  //
  const columns = [
    {
      title: "Info",
      dataIndex: "item",
      width: 300,
      fixed: "left",
      key: "item",
      render: ({ title, imageUrl, _id }) => (
        <div className="">
          <h2 className="font-semibold text-xl">{title}</h2>
          <h2 className="mb-1">{_id}</h2>
          {imageUrl && <Image src={imageUrl} height={200} />}
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 300,
      key: "description",
      render: (description) => {
        return <span>{description ? description : "....."}</span>;
      },
    },
    {
      title: "Content Type",
      key: "contentType",
      dataIndex: "contentType",
      render: (contentType) => {
        return (
          <span>
            <Tag color={"purple"}>{contentType.toUpperCase()}</Tag>
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
            <Link to={`single`} state={{ UniContentId: item._id }}>
              <Button>Details</Button>
            </Link>
            {/* <EditContentsModal ContentInfo={item} />
                <DeleteContent ContentId={item.key} imageUrl={item.imageUrl} /> */}
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <Table
        className={styles.customTable}
        loading={isFetching}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
        dataSource={customData}
      />
    </div>
  );
};

export default UCTable;
