import React, { useEffect, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { Player } from "video-react";
import LoaderCircleWithBar from "../../../../Shared/Components/LoaderCircleWithBar";
import "./ESPVideo.css";
const ESPVideo = ({ videoId }) => {
  const [video, setVideo] = useState();
  const [loading, setLoading] = useState(true);
  // const { CourseVideo, isLoading } = useGetCVbyId(videoId);

  //console.log(videoId);
  useEffect(() => {
    //console.log(videoId);
    if (videoId) {
      setLoading(true);
      fetch(
        `https://easy-bangla-patente-server-sayedulhoque44.vercel.app/CourseVideosSingle/${videoId}`
      )
        .then((res) => res.json())
        .then((data) => {
          setVideo(data);
          setLoading(false);
        });
    }
  }, [videoId]);

  return (
    <div>
      <div className="w-full  mx-auto border-2  border-P-primary p-1">
        {loading && <LoaderCircleWithBar className={"items-center h-full"} />}
        {!loading && video && (
          <Player
            // onPlay={() => //console.log("dd")}
            // onEnded={() => //console.log("ff")}
            // onPause={() => //console.log("aa")}
            preload="auto"
            autoPlay={false}
          >
            <source src={video?.videoLink} />
          </Player>
        )}
      </div>
      {!loading && video && (
        <p className="text-md font-semibold text-P-Black mt-2 flex gap-2 items-center">
          <BsFillPlayFill size={20} /> {video.title}
        </p>
      )}
    </div>
  );
};

export default ESPVideo;
