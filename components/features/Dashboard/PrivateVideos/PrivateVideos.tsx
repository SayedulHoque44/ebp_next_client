"use client";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { FaPlay, FaSortAmountDown, FaVideo } from "react-icons/fa";
import VideoSlide from "@/components/shared/VideoSlide";
import LoaderCircleWithBar from "@/components/shared/LoaderCircleWithBar";
import Pagination from "@/components/shared/Pagination";
import UniContentHooks from "@/features/UniContent/hooks/uniContent.hooks";
import SectionHeader from "@/components/shared/SectionHeader";

const PrivateVideos: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const hiddenLinkRef = useRef<HTMLAnchorElement | null>(null);

  const handleClick = () => {
    if (hiddenLinkRef.current) {
      hiddenLinkRef.current.click();
    }
  };

  const {
    data: data,
    isLoading,
    isFetching,
  } = UniContentHooks.useGetSubContents({
    queryKey: ["private-videos"],
    params: [
      { name: "sort", value: sortBy },
      { name: "page", value: page },
      { name: "limit", value: itemsPerPage },
      { name: "RefId", value: "66a5f14fcef6bbd5277663da" },
    ],
    options: {
      enabled: true,
    },
  });
  const metaData = data?.data?.meta;

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
    data?.data?.result?.filter(
      (video: { title?: string; description?: string }) =>
        video.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="py-10">
      <SectionHeader
        badge={{
          icon: <FaPlay className="mr-2" />,
          text: "Video Library",
          className: "bg-primary-100 text-primary-700",
        }}
        title={"Chapter Explaination Videos"}
        description="Explore our comprehensive collection of educational videos designed to help you master the Italian driving license exam."
        className="mb-12"
      />
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
            {filteredVideos.map((video: any, index: number) => (
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
    </div>
  );
};

export default PrivateVideos;
