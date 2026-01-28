"use client";
import React from "react";
import Container from "@/components/ui/Container";
import Book from "../PatenteBooks/Book";
import UniContentHooks from "@/features/UniContent/hooks/uniContent.hooks";
import BoxSkeleton from "@/components/shared/SkeletonLoader/BoxSkeleton";
import Warning from "@/components/shared/Alert/Warning";
import SectionHeader from "@/components/shared/SectionHeader";
import { NotePencil } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { IStdNotesContentType } from "@/features/UniContent/interface/uniContent.interface";
import { mediaProvider } from "@/constants/mediaProvider";

const STDNotes: React.FC = () => {
  const { data, isFetching } = UniContentHooks.useGetUniContent({
    queryKey: ["STDNotes"],
    params: [
      { name: "sort", value: "createdAt" },
      { name: "contentType", value: "STDNotes" },
    ],
    options: {
      enabled: true,
    },
  });
  const trucchi = data?.data?.result as IStdNotesContentType[] | undefined;

  return (
    <div className="py-10">
      <Container>
        <SectionHeader
          badge={{
            icon: <NotePencil className="mr-2" />,
            text: "Student Notes",
            className: "bg-primary-100 text-primary-700",
          }}
          title={"Student Notes"}
          description="Explore our comprehensive collection of Student Notes designed to help you master the Italian driving license exam."
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
          {isFetching && <BoxSkeleton count={3} />}

          {trucchi && trucchi.length > 0 &&
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
                    coverImage: item.imageUrl as string || mediaProvider.userImg.src as string,
                  }}
                />
              </motion.div>
            ))}
        </div>
        {!isFetching && (!trucchi || trucchi.length === 0) && (
          <Warning
            title={"Student Note are Empty"}
            info={"Please try again later"}
          />
        )}
      </Container>
    </div>
  );
};

export default STDNotes;
