import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useGetCVbyPartId from "../../../../Util/Hooks/useGetCVbyPartId";
import {
  Gesture,
  MediaPlayer,
  MediaProvider,
  Poster,
  SeekButton,
} from "@vidstack/react";
// import { SeekForward10Icon } from "@vidstack/react/icons";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import PlayBtn from "../../../../Shared/Components/PlayBtn";
import { FaAdjust } from "react-icons/fa";
import { SeekForward10Icon } from "@vidstack/react/icons";
import { useGetSubContentsQuery } from "../../../../redux/Api/UniContentApi";
import { VideoLayout } from "../AdvanceVideoPlayer/VideoLayout";
import { useStore } from "zustand";
import { useSettings } from "../../../../zustand/store";
import { DayPrivateRoute } from "../../../../Util/utils";
import usePContext from "../../../../Util/Hooks/usePContext";

const VideoContainer2 = () => {
  const { partId } = useParams();
  const { CourseVideos, isLoading, refetch } = useGetCVbyPartId(partId);
  const settings = useStore(useSettings, (state) => state.settings);
  const { loggedUser, loading } = usePContext();
  //console.log(settings);
  const {
    data: CourseVideoss,
    isLoading: contentLoading,
    isFetching,
  } = useGetSubContentsQuery([
    { name: "limit", value: 100 },
    { name: "page", value: 1 },
    { name: "sort", value: "createdAt" },
    { name: "RefId", value: partId },
  ]);
  const metaData = CourseVideoss?.meta;
  //console.log(CourseVideoss);

  const [video, setVideo] = useState(null);
  const playerRef = useRef(null);

  // useEffect(() => {
  //   if (!video && CourseVideos.length > 0) {
  //     setVideo(CourseVideos[0]);
  //   }
  // }, [CourseVideos]);

  useEffect(() => {
    if (!video && CourseVideoss?.result?.length > 0) {
      setVideo(CourseVideoss.result[0]);
    }
  }, [CourseVideoss]);

  return (
    <div className="sm:pt-20  pb-20 bg-black text-white rounded-lg md:px-5 mt-5">
      {!isLoading && (
        <DayPrivateRoute
          loggedUser={loggedUser}
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
                // preload="metadata"
                // onEnded={}
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
                  loading="lazy"
                  className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
                  src="https://d1vstek0gf8y4r.cloudfront.net/Course-Video/cvc.png"
                  alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
                />
                {/* <SeekForward10Icon size={32} /> */}
                {/* <SeekButton className="vds-button" seconds={10}>
                  <SeekForward10Icon className="vds-icon" />
                </SeekButton> */}

                <VideoLayout
                  // thumbnails={video.videoLink}
                  icons={defaultLayoutIcons}
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
            {CourseVideoss?.result?.length > 0 &&
              CourseVideoss.result?.map((item, index) => (
                <div
                  key={item._id}
                  className={`flex flex-col sm:flex-row  items-center gap-2 item  rounded cursor-pointer  ${
                    item._id === video?._id
                      ? "bg-P-primary/30"
                      : "bg-slate-600/30 hover:bg-P-primary/20"
                  }`}
                  onClick={() => setVideo(item)}
                >
                  {/* <div className="col-span-1 relative  rounded bg-[url('https://d1vstek0gf8y4r.cloudfront.net/Course-Video/cvc.png')] bg-cover bg-center h-[100px] lg:h-full w-[100px] md:w-[200px]">
                    {item._id === video?._id && (
                      <>
                        <div className="bg-black/20 absolute top-0 left-0 right-0 bottom-0"></div>
                        <PlayBtn className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </>
                    )}
                  </div> */}
                  <div className="h-[96px] w-[168px] relative rounded overflow-hidden">
                    {item._id === video?._id && (
                      <>
                        <div className="bg-black/20 absolute top-0 left-0 right-0 bottom-0"></div>
                        <PlayBtn className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </>
                    )}
                    <img
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
      {/*  */}
    </div>
  );
};

export default VideoContainer2;
