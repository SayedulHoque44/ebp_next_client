"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import CourseVideoHooks from "@/features/CourseVideo/hooks/courseVideo.hooks";
import {
  MediaPlayer,
  MediaProvider,
  Poster,
} from "@vidstack/react";
import {
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import PlayBtn from "@/components/shared/PlayBtn";
import UniContentHooks from "@/features/UniContent/hooks/uniContent.hooks";
import { VideoLayout } from "../AdvanceVideoPlayer/VideoLayout";
import { useStore } from "zustand";
import { useSettings } from "@/features/User/store/user.store";
import { DayPrivateRoute } from "@/utils/utils";
import useAuth from "@/features/Auth/hooks/useAuth";
import Image from "next/image";

interface VideoItem {
  _id: string;
  title: string;
  url: string;
}

const VideoContainer2: React.FC = () => {
  const params = useParams();
  const partId = params?.partId as string;
  const {
    data: courseVideosData,
    isLoading,
    refetch,
  } = CourseVideoHooks.useGetCourseVideosByPartId({
    queryKey: [],
    partId,
    options: {
      enabled: !!partId,
    },
  });

  const CourseVideos = courseVideosData?.data || [];
  const settings = useStore(useSettings, (state) => state.settings);
  const { user } = useAuth();
  
  const {
    data: CourseVideoss,
    isLoading: contentLoading,
    isFetching,
  } = UniContentHooks.useGetSubContents({
    queryKey: [partId],
    params: [
      { name: "limit", value: 100 },
      { name: "page", value: 1 },
      { name: "sort", value: "createdAt" },
      { name: "RefId", value: partId },
    ],
    options: {
      enabled: !!partId,
    },
  });
  const metaData = CourseVideoss?.data?.meta;

  const [video, setVideo] = useState<VideoItem | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!video && CourseVideoss?.data?.result?.length && CourseVideoss?.data?.result?.length > 0) {
      setVideo(CourseVideoss.data.result[0] as VideoItem);
    }
  }, [CourseVideoss, video]);

  return (
    <div className="sm:pt-20  pb-20 bg-black text-white rounded-lg md:px-5 mt-5">
      {!isLoading && (
        <DayPrivateRoute
          loggedUser={user}
          dayCount={0}
          redirectUrl={"/dashboard/courseVideo"}
        />
      )}
      {/* Video Constainer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 ">
        {/*  */}
        <div className=" lg:col-span-6 xl:col-span-7  2xl:col-span-8">
          <div className=" p-2 border-2 border-slate-800 rounded h-full">
            {video && (
              <MediaPlayer
                autoPlay={false}
                ref={playerRef}
                viewType="video"
                streamType="on-demand"
                logLevel="warn"
                playsInline
                title={video.title}
                src={video.url}
                poster="https://d1vstek0gf8y4r.cloudfront.net/Course-Video/cvc.png"
              >
                <MediaProvider />
                <Poster
                  className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
                  src="https://d1vstek0gf8y4r.cloudfront.net/Course-Video/cvc.png"
                  alt="Course video poster"
                />
                <VideoLayout
                  thumbnails={defaultLayoutIcons}
                />
              </MediaPlayer>
            )}
          </div>
        </div>
        {/*  */}
        <div className=" lg:col-span-6 xl:col-span-5  2xl:col-span-4 flex flex-col h-full">
          <h2 className="text-xl border-l-4 border-white pl-2 mb-3">Lecture</h2>
          <div
            className={`border-2 flex-grow border-slate-800 p-5 mt-5 flex flex-col gap-5 max-h-[590px]  min-h-[590px] flex-1 overflow-y-scroll rounded relative shadow-inner-custom`}
          >
            {CourseVideoss?.data?.result?.length && CourseVideoss?.data?.result?.length > 0 &&
              CourseVideoss.data.result?.map((item: VideoItem, index: number) => (
                <div
                  key={item._id}
                  className={`flex flex-col sm:flex-row  items-center gap-2 item  rounded cursor-pointer  ${
                    item._id === video?._id
                      ? "bg-P-primary/30"
                      : "bg-slate-600/30 hover:bg-P-primary/20"
                  }`}
                  onClick={() => setVideo(item)}
                >
                  <div className="h-[96px] w-[168px] relative rounded overflow-hidden">
                    {item._id === video?._id && (
                      <>
                        <div className="bg-black/20 absolute top-0 left-0 right-0 bottom-0"></div>
                        <PlayBtn className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </>
                    )}
                    <Image
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                      src={
                        "https://d1vstek0gf8y4r.cloudfront.net/Course-Video/cvc.png"
                      }
                      alt="img"
                    />
                  </div>
                  <div className="flex flex-1 gap-2 py-3 px-2 col-span-2 font-light text-slate-300 ">
                    <h2>{index + 1}.</h2>
                    <p className="">{item.title}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoContainer2;
