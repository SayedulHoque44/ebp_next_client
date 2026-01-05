"use client";
import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import BlogContainer from "../../Blog/BlogContainer";
import { FaGraduationCap, FaArrowRight } from "react-icons/fa";
import { Heading3, Body } from "@/components/ui/Typography";
import PLinkBtn from "@/components/shared/PLinkBtn";
import BlogHooks from "@/features/Blog/hooks/blog.hooks";
import { IBlog } from "@/features/Blog/interface/blog.interface";

const DrivingLicence = () => {
  const { data: BlogsResponse } = BlogHooks.useGetBlogs({
    queryKey: ["blogs"],
    params: {
      sort: "-createdAt",
      type: "Congratulate",
      limit: 3,
    },
  });
  const Blogs = BlogsResponse?.data?.result ?? [];

  return (
    <div
      className="py-20 bg-linear-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden"
      id="DL"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-300 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent-300 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100 rounded-full"></div>
      </div>

      <Container>
        <div className="relative z-10">
          <SectionHeader
            badge={{
              icon: <FaGraduationCap className="mr-2" />,
              text: "Success Stories",
              className: "bg-primary-100 text-primary-700",
            }}
            title="Our Success"
            subtitle="Students"
            description="Meet our successful students who have achieved their Italian driving license with our proven teaching methods. These real stories showcase the effectiveness of our approach and inspire others to follow their dreams."
            className="mb-16"
          />

          {/* Blog Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Blogs.length > 0 &&
                Blogs.map((blog: IBlog, index: number) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <BlogContainer blog={blog} />
                  </motion.div>
                ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6 md:mb-4 gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-linear-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center shrink-0 sm:mr-4">
                  <FaGraduationCap className="text-white text-lg sm:text-xl md:text-2xl" />
                </div>
                <div className="text-center sm:text-left">
                  <Heading3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">
                    More Success Stories
                  </Heading3>
                  <Body className="text-sm sm:text-base text-gray-600">
                    Read all student testimonials and experiences
                  </Body>
                </div>
              </div>

              <PLinkBtn
                link="/blogs"
                text="View All Stories"
                size="lg"
                className="group w-full sm:w-auto bg-linear-to-r! from-primary-500! to-primary-600! hover:from-primary-600! hover:to-primary-700! focus:ring-primary-500!"
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

export default DrivingLicence;
