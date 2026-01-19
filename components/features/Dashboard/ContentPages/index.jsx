import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSubContentsQuery,
  useGetUniContentQuery,
} from "../../../redux/Api/UniContentApi";
import BoxSkeleton from "../../../Shared/Components/SkeletonLoader/BoxSkeleton";
import Warning from "../../../Shared/Components/Alert/Warning";
import { Image, Pagination, Skeleton } from "antd";
import { useIntersectionObserver } from "@uidotdev/usehooks";

const ContentPages = () => {
  const { uniContentId } = useParams();
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetUniContentQuery([
    { name: "sort", value: "createdAt" },
    { name: "_id", value: uniContentId },
  ]);

  const { data: PagesResult, isFetching: isPageFetching } =
    useGetSubContentsQuery([
      { name: "sort", value: "createdAt" },
      { name: "limit", value: 10 },
      { name: "page", value: page },
      { name: "RefId", value: uniContentId },
    ]);

  const Pages = PagesResult?.result;
  const metaData = PagesResult?.meta;
  const UniContent = data?.result[0];
  //console.log(PagesResult);
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
            onChange={(value) => {
              setPage(value);
            }}
            pageSize={metaData?.limit}
            total={metaData?.total}
          />
        </div>

        {!isPageFetching &&
          Pages.length > 0 &&
          Pages.map((item) => (
            <ImagCompo key={item._id} imageUrl={item?.imageUrl} />
          ))}

        {!isPageFetching && Pages.length === 0 && (
          <Warning
            title={"Student Note are Empty"}
            info={"Please try again later"}
          />
        )}
      </div>
    </div>
  );
};

const ImagCompo = ({ imageUrl }) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });
  return (
    <span ref={ref}>
      {entry?.isIntersecting && (
        <Image src={imageUrl} alt="page" className="block mx-auto" />
      )}
    </span>
  );
};

export default ContentPages;
