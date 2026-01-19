import React from "react";
import { useLocation } from "react-router-dom";
import { useGetUniContentQuery } from "../../../../../redux/Api/UniContentApi";
import { Image } from "antd";
import ContentManage from "./components/ContentManage";
import PagesManagment from "./components/PagesManagment";
import LoaderCircleWithBar from "../../../../../Shared/Components/LoaderCircleWithBar";

import VideoManagment from "./components/VideoManagment";
import YTVideoManagment from "./components/YTVideoManagment";
import { contentTypeObj } from "../../../../../Shared/Constants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleUc = () => {
  const location = useLocation();
  const { data, isLoading, isFetching } = useGetUniContentQuery([
    { name: "_id", value: location.state.UniContentId },
  ]);

  const CheckType = (type) => {
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
        break;
    }
  };

  const content = data?.result[0];

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
            {CheckType(content?.contentType)}
          </h2>
          {CheckType(content?.contentType) === "Pages" && (
            <PagesManagment content={content} />
          )}
          {CheckType(content?.contentType) === "Videos" && (
            <VideoManagment content={content} />
          )}
          {CheckType(content?.contentType) === "YTVideo" && (
            <YTVideoManagment content={content} />
          )}
        </>
      )}
    </div>
  );
};

export default SingleUc;
