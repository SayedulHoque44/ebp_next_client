import React from "react";
import Container from "../../../Shared/Container/Container";
import Book from "../PatenteBooks/Book";
import { useGetUniContentQuery } from "../../../redux/Api/UniContentApi";
import BoxSkeleton from "../../../Shared/Components/SkeletonLoader/BoxSkeleton";
import Warning from "../../../Shared/Components/Alert/Warning";
import userDefault from "../../../assets/Images/userDefault.jpg";

import SectionHeader from "../../../Shared/Components/SectionHeader/SectionHeader";
import { NotePencil } from "@phosphor-icons/react";
import { motion } from "framer-motion";
const STDNotes = () => {
  const { data, isFetching } = useGetUniContentQuery([
    { name: "sort", value: "createdAt" },
    { name: "contentType", value: "STDNotes" },
  ]);
  const trucchi = data?.result;
  //console.log(data);
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
          // subtitle={title[1]}
          description="Explore our comprehensive collection of Student Notes designed to help you master the Italian driving license exam."
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
          {isFetching && <BoxSkeleton count={3} />}

          {trucchi?.length > 0 &&
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
                    coverImage: item.imageUrl || userDefault,
                  }}
                />
              </motion.div>
            ))}
        </div>
        {!isFetching && trucchi?.length === 0 && (
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
