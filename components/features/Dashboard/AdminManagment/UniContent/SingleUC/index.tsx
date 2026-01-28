"use client";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import UniContentHooks from "@/features/UniContent/hooks/uniContent.hooks";
import ContentManage from "./components/ContentManage";
import PagesManagment from "./components/PagesManagment";
import LoaderCircleWithBar from "@/components/shared/LoaderCircleWithBar";
import VideoManagment from "./components/VideoManagment";
import YTVideoManagment from "./components/YTVideoManagment";
import { contentTypeObj } from "@/constants/ui_constent";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { QUERY_KEY } from "@/constants/constendData";

const SingleUc = () => {
  const searchParams = useSearchParams();
  const UniContentId = searchParams.get("UniContentId");

  // Use array format for query params to support _id parameter
  const queryParams = useMemo(() => [
    { name: "_id", value: UniContentId || "" },
  ], [UniContentId]);

  const queryKey = useMemo(
    () => [QUERY_KEY.SINGLE_UNI_CONTENT, UniContentId],
    [UniContentId]
  );

  const { data, isLoading, isFetching } = UniContentHooks.useGetUniContent({
    queryKey: queryKey as any,
    params: queryParams,
    options: {
      enabled: !!UniContentId,
    },
  });

  const CheckType = (type: string) => {
    switch (type) {
      case contentTypeObj.Trucchi:
      case contentTypeObj.PatenteBook:
      case contentTypeObj.STDNotes:
        return "Pages";
      case contentTypeObj.CourseVideo:
        return "Videos";
      case contentTypeObj.FeedbackVideo:
      case contentTypeObj.YTFreeVideo:
        return "YTVideo";
      default:
        return "Contents";
    }
  };

  const content = useMemo(() => {
    if (data?.data?.result && Array.isArray(data.data.result) && data.data.result.length > 0) {
      return data.data.result[0];
    }
    return null;
  }, [data]);

  return (
    <div className="py-10">
      {isLoading ? (
        <div className="space-y-8">
          <Skeleton width={300} height={48} />
          <Skeleton height={200} className="rounded-2xl" />
          <Skeleton width={300} height={48} />
          <Skeleton height={400} className="rounded-2xl" />
        </div>
      ) : (
        <>
          {/* Single content of Unicontent */}
          <h2 className="text-4xl font-semibold mb-5">
            {content?.contentType}
          </h2>
          {content && <ContentManage content={content} />}
          {/* pages / video management */}
          <h2 className="text-4xl font-semibold mt-10 mb-5">
            {CheckType(content?.contentType || "")}
          </h2>
          {content && CheckType(content.contentType || "") === "Pages" && (
            <PagesManagment content={content} />
          )}
          {content && CheckType(content.contentType || "") === "Videos" && (
            <VideoManagment content={content} />
          )}
          {content && CheckType(content.contentType || "") === "YTVideo" && (
            <YTVideoManagment content={content} />
          )}
        </>
      )}
    </div>
  );
};

export default SingleUc;
