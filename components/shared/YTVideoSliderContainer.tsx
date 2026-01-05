"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import VideoSlide from "./VideoSlide";
import UniContentHooks from "@/features/UniContent/hooks/uniContent.hooks";
import { ISubContent } from "@/features/UniContent/interface/uniContent.interface";
import { IYTVideo } from "@/features/YTVideo/interface/yTVideo.interface";

const YTVideoSliderContainer = ({
  RefId,
  limit,
  sorting,
}: {
  RefId: string;
  limit: number;
  sorting: string;
}) => {
  const [videoPlay, setVideoPlay] = useState(false);
  const { data, isLoading, isFetching } = UniContentHooks.useGetSubContents({
    queryKey: ["subcontents"],
    params: {
      limit: limit,
      sort: sorting,
      RefId: RefId,
    },
  });

  const autoPlayProps = {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  };

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        loop={true}
        autoplay={videoPlay ? false : autoPlayProps}
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper"
      >
        {data?.data?.result?.map((item: ISubContent) => (
          <SwiperSlide key={item?._id}>
            <VideoSlide video={item as IYTVideo} setVideoPlay={setVideoPlay} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default YTVideoSliderContainer;
