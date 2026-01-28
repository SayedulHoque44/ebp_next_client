"use client";
import React from "react";
import Container from "@/components/ui/Container";
import UniContentHooks from "@/features/UniContent/hooks/uniContent.hooks";
import BoxSkeleton from "@/components/shared/SkeletonLoader/BoxSkeleton";
import Link from "next/link";
import { DayPrivateRoute, EBP_Images_CDN_BaseUrl } from "@/utils/utils";
import Warning from "@/components/shared/Alert/Warning";
import { contentTypeObj } from "@/constants/constendData";
import SectionHeader from "@/components/shared/SectionHeader";
import { Video } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { ICourseVideoContentType } from "@/features/UniContent/interface/uniContent.interface";
import useAuth from "@/features/Auth/hooks/useAuth";
import Image from "next/image";

const CourseVideo: React.FC = () => {
  const { user } = useAuth();
  const {
    data: Contents,
    isLoading,
    isFetching,
  } = UniContentHooks.useGetUniContent({
    queryKey: [contentTypeObj.CourseVideo],
    params: [
      { name: "page", value: 1 },
      { name: "limit", value: 1000 },
      { name: "sort", value: "createdAt" },
      {
        name: "contentType",
        value: contentTypeObj.CourseVideo,
      },
    ],
    options: {
      enabled: true,
    },
  });

  return (
    <div className="py-10 relative">
      {!isLoading && <DayPrivateRoute loggedUser={user} dayCount={0} />}

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

          {Contents?.data?.result?.length && Contents?.data?.result?.length > 0 &&
            Contents.data.result.map((item: ICourseVideoContentType, index: number) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <Link
                  href={`/dashboard/courseVideo/${item._id}/part`}
                  className="block relative aspect-[9/16] w-full"
                >
                  {/* Background Image */}
                  <Image
                    fill
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
        {!isFetching && Contents?.data?.result?.length === 0 && (
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
