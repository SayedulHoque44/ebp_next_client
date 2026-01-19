import React, { useEffect, useState } from "react";
import AdSense from "react-adsense";
import { AiFillPlayCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import LoaderCircleWithBar from "../../../../Shared/Components/LoaderCircleWithBar";
import Container from "../../../../Shared/Container/Container";
import useGetCVbyPartId from "../../../../Util/Hooks/useGetCVbyPartId";
import ESPVideo from "../ESPVideo/ESPVideo";
import AddVideoInPart from "./AddVideoInPart";
import EBPPlayer from "../Player";

const VideoContainerLayout = () => {
  const { partId } = useParams();
  const { CourseVideos, isLoading, refetch } = useGetCVbyPartId(partId);
  const [videoId, setvideoId] = useState("");

  useEffect(() => {
    setvideoId(CourseVideos[0]?._id);
  }, [isLoading]);
  return (
    <div className="py-10">
      <Container>
        {isLoading ? (
          <LoaderCircleWithBar />
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2">
            <ESPVideo videoId={videoId} />
            {/* <EBPPlayer videoId={videoId} /> */}
            <ul className="overflow-hidden mt-5 xl:mt-0 bg-P-Black p-5 xl:ml-5 overflow-y-scroll max-h-[350px] xl:max-h-fit">
              {CourseVideos.map((video) => (
                <li
                  className="p-3 text-sm font-light bg-P-primary cursor-pointer mb-3 rounded text-white flex gap-2 items-center"
                  onClick={() => setvideoId(video._id)}
                  key={video._id}
                >
                  <AiFillPlayCircle size={20} /> {video.title}
                </li>
              ))}
              <div className="h-3 w-full bg-red-700"></div>
              {/* google ads */}
              <AdSense.Google
                client="ca-pub-9434932401811333"
                slot="2140830604"
                style={{ display: "block" }}
                format="auto"
                responsive="true"
                layoutKey="-gw-1+2a-9x+5c"
              />
            </ul>
          </div>
        )}
        {"f" === "t" && <AddVideoInPart refetch={refetch} partId={partId} />}
        {/* <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-9434932401811333"
          data-ad-slot="8186938209"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins> */}
      </Container>
    </div>
  );
};

export default VideoContainerLayout;
