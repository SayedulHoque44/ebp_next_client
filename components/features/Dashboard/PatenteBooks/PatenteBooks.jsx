import React from "react";
import { motion } from "framer-motion";
import Container from "../../../Shared/Container/Container";
import Book from "../PatenteBooks/Book";
import { useGetUniContentQuery } from "../../../redux/Api/UniContentApi";
import BoxSkeleton from "../../../Shared/Components/SkeletonLoader/BoxSkeleton";
import Warning from "../../../Shared/Components/Alert/Warning";
import userDefault from "../../../assets/Images/userDefault.jpg";
import { EBP_Images_CDN_BaseUrl } from "../../../Util/utils";
import AdSense from "react-adsense";
import { BookBookmark } from "@phosphor-icons/react";
import SectionHeader from "../../../Shared/Components/SectionHeader/SectionHeader";

const PatenteBooks = () => {
  const { data, isFetching } = useGetUniContentQuery([
    { name: "sort", value: "createdAt" },
    { name: "contentType", value: "PatenteBook" },
  ]);
  const trucchi = data?.result;
  //console.log(data);
  return (
    <div className="py-10">
      <Container>
        <SectionHeader
          badge={{
            icon: <BookBookmark className="mr-2" />,
            text: "Patente Books",
            className: "bg-primary-100 text-primary-700",
          }}
          title={"Patente Books"}
          // subtitle={title[1]}
          description="Explore our comprehensive collection of educational books designed to help you master the Italian driving license exam."
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

          {/* Manual Entry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: trucchi?.length * 0.1 }}
            className="group"
          >
            <Book
              book={{
                title: "পাতেন্তের বাংলা বই",
                description: "এখানে পুরো থিওরি বাংলাতে ব্যাখ্যা করা আছে|",
                route: "PDFBook",
                coverImage: `${EBP_Images_CDN_BaseUrl}pages/patente-book-pdf-1.png`,
              }}
            />
          </motion.div>
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

export default PatenteBooks;
