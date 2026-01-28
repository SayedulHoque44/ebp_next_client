"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import UniContentHooks from "@/features/UniContent/hooks/uniContent.hooks";
import { Image, Pagination, Skeleton } from "antd";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import Warning from "@/components/shared/Alert/Warning";

interface PageItem {
  _id: string;
  imageUrl: string;
}

interface ImagCompoProps {
  imageUrl: string;
}

const ContentPages: React.FC = () => {
  const params = useParams();
  const uniContentId = params?.uniContentId as string;
  const [page, setPage] = useState<number>(1);
  const { data, isFetching } = UniContentHooks.useGetUniContent({
    queryKey: [uniContentId],
    params: [
      { name: "sort", value: "createdAt" },
      { name: "_id", value: uniContentId },
    ],
    options: {
      enabled: !!uniContentId,
    },
  });

  const { data: PagesResult, isFetching: isPageFetching } =
    UniContentHooks.useGetSubContents({
      queryKey: [uniContentId, page],
      params: [
        { name: "sort", value: "createdAt" },
        { name: "limit", value: 10 },
        { name: "page", value: page },
        { name: "RefId", value: uniContentId },
      ],
      options: {
        enabled: !!uniContentId,
      },
    });

  const Pages = (PagesResult?.data?.result as PageItem[]) || [];
  const metaData = PagesResult?.data?.meta;
  const UniContent = data?.data?.result?.[0];

  return (
    <div className="no-scrollbar">
      <div className="my-20  border-l-4 border-P-primary pl-5">
        <p className="text-lg text-P-gry">{UniContent?.description}</p>
        <h2 className="text-6xl text-P-primary font-semibold">
          {UniContent?.title}
        </h2>
      </div>

      <div className="gap-10 flex flex-col items-center">
        {isPageFetching && <Skeleton className="h-[500px]" />}

        <div className="fixed z-10 bottom-0  bg-white p-3 w-full flex justify-center">
          <Pagination
            current={page}
            onChange={(value: number) => {
              setPage(value);
            }}
            pageSize={metaData?.limit}
            total={metaData?.total}
          />
        </div>

        {!isPageFetching &&
          Pages &&
          Pages.length > 0 &&
          Pages.map((item) => (
            <ImagCompo key={item._id} imageUrl={item?.imageUrl} />
          ))}

        {!isPageFetching && (!Pages || Pages.length === 0) && (
          <Warning
            title={"Student Note are Empty"}
            info={"Please try again later"}
          />
        )}
      </div>
    </div>
  );
};

const ImagCompo: React.FC<ImagCompoProps> = ({ imageUrl }) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });
  return (
    <span ref={ref as any}>
      {entry?.isIntersecting && (
        <Image src={imageUrl} alt="page" className="block mx-auto" />
      )}
    </span>
  );
};

export default ContentPages;
