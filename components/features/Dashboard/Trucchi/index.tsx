"use client";
import React from "react";
import Container from "@/components/ui/Container";
import Book from "../PatenteBooks/Book";
import { motion } from "framer-motion";
import UniContentHooks from "@/features/UniContent/hooks/uniContent.hooks";
import BoxSkeleton from "@/components/shared/SkeletonLoader/BoxSkeleton";
import SectionHeader from "@/components/shared/SectionHeader";
import { Notebook } from "@phosphor-icons/react";
import { ITrucchiContentType } from "@/features/UniContent/interface/uniContent.interface";

const Trucchi: React.FC = () => {
  const { data, isFetching } = UniContentHooks.useGetUniContent({
    queryKey: ["Trucchi"],
    params: [
      { name: "sort", value: "createdAt" },
      { name: "contentType", value: "Trucchi" },
    ],
    options: {
      enabled: true,
    },
  });
  const trucchi = data?.data?.result as ITrucchiContentType[] | undefined;

  return (
    <div className="py-10">
      <Container>
        <SectionHeader
          badge={{
            icon: <Notebook className="mr-2" />,
            text: "Trucchi",
            className: "bg-primary-100 text-primary-700",
          }}
          title={"Trucchi"}
          description="Explore our comprehensive collection of Trucchi designed to help you master the Italian driving license exam."
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
          {!isFetching && trucchi && trucchi.length > 0 ? (
            trucchi.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Book
                  key={item?._id}
                  href={`/dashboard/pages/${item._id}`}
                  book={{
                    ...item,
                    coverImage: item.imageUrl,
                  }}
                />
              </motion.div>
            ))
          ) : (
            <BoxSkeleton count={3} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Trucchi;
