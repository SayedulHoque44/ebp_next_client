"use client";
import React from "react";
import Container from "@/components/ui/Container";
import BlogContainer from "../../Blog/BlogContainer";
import PLinkBtn from "@/components/shared/PLinkBtn";
import { FaArrowRight, FaBookOpen, FaSortAmountDown } from "react-icons/fa";
import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { Heading3, Body } from "@/components/ui/Typography";
import BlogHooks from "@/features/Blog/hooks/blog.hooks";
import { IBlog } from "@/features/Blog/interface/blog.interface";
const LatestBlog = () => {
  const {
    data: BlogsResponse,
    isLoading,
    isFetching,
  } = BlogHooks.useGetBlogs({
    queryKey: ["blogs"],
    params: {
      sort: "-createdAt",
      type: "Blog",
      limit: 3,
    },
  });
  const Blogs = BlogsResponse?.data?.result ?? [];

  return (
    <div
      className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      id="DL"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent-400 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-primary-200 rounded-full"></div>
      </div>

      <Container>
        <div className="relative z-10">
          {/* Section Header */}
          <SectionHeader
            badge={{
              icon: <FaSortAmountDown className="mr-2" />,
              text: "Latest Articles",
              className: "bg-primary-100 text-primary-700",
            }}
            title="Our Latest"
            subtitle="Blog Posts"
            description="Stay updated with our latest insights, tips, and success stories from our driving school community. Discover valuable information to help you on your journey to getting your Italian driving license."
            className="mb-12"
          />

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Blogs?.length > 0 &&
              Blogs?.map((blog: IBlog, index: number) => (
                <motion.div
                  key={blog?._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <BlogContainer blog={blog} />
                </motion.div>
              ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6 md:mb-6 gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0 sm:mr-4">
                  <FaBookOpen className="text-white text-lg sm:text-xl md:text-2xl" />
                </div>
                <div className="text-center sm:text-left">
                  <Heading3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                    Want More Content?
                  </Heading3>
                  <Body className="text-sm sm:text-base text-gray-600">
                    Explore our complete blog collection
                  </Body>
                </div>
              </div>

              <PLinkBtn
                link="/blogs"
                text="View All Blogs"
                size="lg"
                className="group w-full sm:w-auto !bg-gradient-to-r !from-primary-500 !to-primary-600 hover:!from-primary-600 hover:!to-primary-700 !focus:ring-primary-500"
                rightIcon={
                  <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                }
              />
            </div>
          </motion.div>
          
        </div>
      </Container>
    </div>
  );
};

export default LatestBlog;
