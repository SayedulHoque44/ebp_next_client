import { useEffect, useRef, useState } from "react";
import Container from "../../../Shared/Container/Container";
import useGetAllPart from "../../../Util/Hooks/useGetAllPart";
import { useGetUniContentQuery } from "../../../redux/Api/UniContentApi";
import BoxSkeleton from "../../../Shared/Components/SkeletonLoader/BoxSkeleton";
import { Link } from "react-router-dom";
import { DayPrivateRoute, EBP_Images_CDN_BaseUrl } from "../../../Util/utils";
import Warning from "../../../Shared/Components/Alert/Warning";
import { contentTypeObj } from "../../../Shared/Constants";
import usePContext from "../../../Util/Hooks/usePContext";
import SectionHeader from "../../../Shared/Components/SectionHeader/SectionHeader";
import { Video } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
const CourseVideo = () => {
  // const { videParts, refetch } = useGetAllPart();
  const { loggedUser, loading } = usePContext();
  const {
    data: Contents,
    isLoading,
    isFetching,
  } = useGetUniContentQuery([
    { name: "page", value: 1 },
    { name: "limit", value: 1000 },
    { name: "sort", value: "createdAt" },
    {
      name: "contentType",
      value: contentTypeObj.CourseVideo,
    },
  ]);
  const metaData = Contents?.meta;

  return (
    <div className="py-10 relative">
      {!isLoading && <DayPrivateRoute loggedUser={loggedUser} dayCount={0} />}

      <Container>
        <SectionHeader
          badge={{
            icon: <Video className="mr-2" />,
            text: "Course Video",
            className: "bg-primary-100 text-primary-700",
          }}
          title={"Course Video"}
          description="ভিডিও এর মাধ্যমে ছাত্রদের গুরুত্বপূর্ণ প্রত্যেক অধ্যায়/বিষয়বস্তু ভাগ করে ধরে ধরে সব শিখানো হবে।"
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {isFetching && <BoxSkeleton count={3} />}

          {Contents?.result?.length > 0 &&
            Contents.result.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <Link
                  to={`${item._id}/part`}
                  className="block relative aspect-[9/16] w-full"
                >
                  {/* Background Image */}
                  <img
                    src={`${EBP_Images_CDN_BaseUrl}Course-Video/CVBannar.png`}
                    alt="Course Banner"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Content Overlay - Positioned at 56% from top */}
                  <div className="absolute top-[56%] left-0 right-0 px-6 flex flex-col items-center text-center">
                    {/* Title */}
                    <div className="mb-4 transform group-hover:-translate-y-2 transition-transform duration-500">
                      <h2 className="inline-block px-4 py-2 bg-P-primary/30 backdrop-blur-sm text-white md:font-bold text-base md:text-lg rounded-lg shadow-lg">
                        {item.title}
                      </h2>
                    </div>

                    {/* Description */}
                    <div className="transform group-hover:-translate-y-2 transition-transform duration-500 delay-75">
                      <p className="text-slate-100 text-sm font-medium leading-relaxed drop-shadow-md line-clamp-4 px-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>
        {!isFetching && Contents?.result?.length === 0 && (
          <Warning
            title={"Course Video are Empty"}
            info={"Please try again later"}
          />
        )}
      </Container>
    </div>
  );
};

export default CourseVideo;
