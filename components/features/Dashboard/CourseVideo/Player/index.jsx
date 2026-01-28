import React, { useEffect, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import LoaderCircleWithBar from "../../../../Shared/Components/LoaderCircleWithBar";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

const EBPPlayer = ({ videoId }) => {
  const [video, setVideo] = useState();
  const [loading, setLoading] = useState(true);

  //console.log(videoId);
  useEffect(() => {
    //console.log(videoId);
    if (videoId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
          //   <Player
          // onPlay={() => //console.log("dd")}
          // onEnded={() => //console.log("ff")}
          // onPause={() => //console.log("aa")}
          //     preload="auto"
          //     autoPlay={false}>
          //     <source src={video?.videoLink} />
          //   </Player>
          <MediaPlayer title="Sprite Fight" src={video?.videoLink}>
            <MediaProvider />
            <DefaultVideoLayout
              thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
              icons={defaultLayoutIcons}
            />
          </MediaPlayer>
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

export default EBPPlayer;
