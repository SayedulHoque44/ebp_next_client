"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import LoaderCircleWithBar from "@/components/shared/LoaderCircleWithBar";
import VideoSlide from "@/components/shared/VideoSlide";
import SectionHeader from "@/components/shared/SectionHeader";
import Pagination from "@/components/shared/Pagination";
import Container from "@/components/ui/Container";
import {
  FaPlay,
  FaVideo,
  FaFilter,
  FaSortAmountDown,
  FaSearch,
} from "react-icons/fa";
import UniContentHooks from "@/features/UniContent/hooks/uniContent.hooks";
import { ISubContent } from "@/features/UniContent/interface/uniContent.interface";

const VideoShowSection = ({
  id,
  title,
  sorting,
}: {
  id: string;
  title: string[];
  sorting: string;
}) => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(sorting || "createdAt");
  const hiddenLinkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = () => {
    if (hiddenLinkRef.current) {
      (hiddenLinkRef.current as HTMLAnchorElement).click();
    }
  };

  const {
    data: subContentsResponse,
    isLoading,
    isFetching,
  } = UniContentHooks.useGetSubContents({
    queryKey: ["subcontents",id],
    params: {
      sort: sortBy,
      page: page,
      limit: itemsPerPage,
      RefId: id,
    },
  });
  const metaData = subContentsResponse?.data?.meta;
  //   console.log(subContentsResponse?.data.result);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    handleClick();
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1); // Reset to first page when changing items per page
  };

  // Filter videos based on search term
  const filteredVideos =
    subContentsResponse?.data?.result?.filter(
      (video: ISubContent) =>
        video.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const sortOptions = [
    { value: "createdAt", label: "Latest First", icon: <FaSortAmountDown /> },
    {
      value: "-createdAt",
      label: "Oldest First",
      icon: <FaSortAmountDown className="rotate-180" />,
    },
    { value: "title", label: "Title A-Z", icon: <FaVideo /> },
    { value: "-title", label: "Title Z-A", icon: <FaVideo /> },
  ];
  console.log(filteredVideos);
  return (
    <div className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-300 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent-300 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100 rounded-full"></div>
      </div>

      <Container>
        <div className="relative z-10">
          <span id="top"></span>

          {/* Modern Header */}
          <SectionHeader
            badge={{
              icon: <FaPlay className="mr-2" />,
              text: "Video Library",
              className: "bg-primary-100 text-primary-700",
            }}
            title={title[0]}
            subtitle={title[1]}
            description="Explore our comprehensive collection of educational videos designed to help you master the Italian driving license exam."
            className="mb-12"
          />

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white/50 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 min-w-[200px]"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Video Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            {isFetching ? (
              <div className="flex justify-center py-12">
                <LoaderCircleWithBar />
              </div>
            ) : filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVideos.map((video, index) => (
                  <motion.div
                    key={video._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <VideoSlide video={video} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaVideo className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No Videos Found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm
                      ? `No videos match "${searchTerm}". Try a different search term.`
                      : "No videos available at the moment. Please check back later."}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Pagination */}
          {metaData && filteredVideos.length > 0 && (
            <Pagination
              currentPage={page}
              totalItems={metaData.total}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              maxVisiblePages={5}
              showInfo={true}
              showArrows={true}
              showPerPageSelector={true}
              perPageOptions={[6, 12, 24, 48]}
              scrollToTop={true}
              className="mt-8"
            />
          )}

          {/* <a ref={hiddenLinkRef} href="#top" className="hidden">
            Go to top
          </a> */}
        </div>
      </Container>
    </div>
  );
};

export default VideoShowSection;
