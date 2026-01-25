"use client";
import { Button, Image, Space, Table, Tag } from "antd";
import React, { useMemo } from "react";
import Link from "next/link";
import DeleteItemById from "./SingleUC/components/DeleteUniContentItem";
import UniContentHooks from "@/features/UniContent/hooks/uniContent.hooks";
import { IUniContent } from "@/features/UniContent/interface/uniContent.interface";
import { createStyles } from "antd-style";
import { QUERY_KEY } from "@/constants/constendData";
import { useQueryClient } from "@tanstack/react-query";

const useStyle = createStyles(({ css, token }: { css: any, token: any }) => {
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

interface UCTableProps {
  UniContents?: IUniContent[];
  isFetching: boolean;
}

const UCTable = ({ UniContents, isFetching }: UCTableProps) => {
  const queryClient = useQueryClient();
  const { styles } = useStyle();

  const deleteUniContentMutation = UniContentHooks.useDeleteSingleUniContent({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.UNI_CONTENT] });
    },
    onError: () => {
      // Error handled by DeleteItemById
    },
  });

  const customData = useMemo(
    () =>
      UniContents?.map((item) => ({
        key: item._id,
        item: item,
        description: item.description,
        contentType: item.contentType,
      })) || [],
    [UniContents]
  );

  const columns = useMemo(
    () => [
      {
        title: "Info",
        dataIndex: "item",
        width: 300,
        fixed: "left" as const,
        key: "item",
        render: ({ title, imageUrl, _id }: IUniContent) => (
          <div>
            <h2 className="font-semibold text-xl">{title}</h2>
            <h2 className="mb-1">{_id}</h2>
            {imageUrl && <Image src={imageUrl} height={200} alt={title} />}
          </div>
        ),
      },
      {
        title: "Description",
        dataIndex: "description",
        width: 300,
        key: "description",
        render: (description: string) => {
          return <span>{description ? description : "....."}</span>;
        },
      },
      {
        title: "Content Type",
        key: "contentType",
        dataIndex: "contentType",
        render: (contentType: string) => {
          return (
            <span>
              <Tag color="purple">{contentType.toUpperCase()}</Tag>
            </span>
          );
        },
      },
      {
        title: "Action",
        key: "x",
        render: ({ item }: { item: IUniContent }) => {
          return (
            <Space>
              <Link href={`/dashboard/adminManagment/uniContent/single?UniContentId=${item._id}`}>
                <Button aria-label={`View details for ${item.title}`}>Details</Button>
              </Link>
              <DeleteItemById
                objectCDNfullUrl={item.imageUrl}
                itemId={item._id}
                deleteFromDB={async (id: string) => {
                  const response = await deleteUniContentMutation.mutateAsync({ UniContentId: id });
                  return {
                    data: {
                      success: response.success,
                      message: response.message,
                    },
                  };
                }}
              />
            </Space>
          );
        },
      },
    ],
    [deleteUniContentMutation]
  );

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
