"use client";
import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Container from "@/components/ui/Container";
import VideoPlayer from "@/components/features/Home/common/VideoPlayer";
import Image from "next/image";
import YTVideoPlayer from "../common/YTVideoPlayer";

const CourseInfo = () => {
  const liItems = [
    "২৫ টি অধ্যায়ের লাইভ জুম ক্লাস প্রধান করা হয়।",
    "কুইজ অ্যাপস।",
    "ক্লাসের রেকর্ড ভিডিও প্রদান করা হয়।",
    "ইতালিয়ান শব্দের বাংলা অর্থ (PDF)।",
    "জটিল কুইজ এর বাংলা টিপস এন্ড ট্রিকস।",
    "১ বছরের জন্য আনলিমিটেড ক্লাস এর সুবিধা প্রদান করা হবে।",
    "পাতেন্তের বই (PDF)।",
  ];

  //
  useEffect(() => {
    Aos.init();
    Aos.refresh(); // Call AOS.refresh() after initialization

    return () => {
      Aos.refresh();
    };
  }, []);
  return (
    <div className="py-10" id="Assets">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div className="overflow-hidden">
            <Image
              width={500}
              height={500}
              className="mx-auto aos-init h-full w-full"
              src="https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/car-driving.png"
              alt=""
              data-aos="fade-up-left"
            />
          </div>
          <div className="space-y-5 overflow-hidden">
            {/* <div className="small-title">Assets</div>
            <h2 className="text-xl md:text-3xl mr-10">
              আমাদের প্রাইভেট কোর্স এ যা যা থাকচেঃ
            </h2>
            <ul data-aos="fade-up-right" className="aos-init">
              {liItems.map((item, index) => (
                <li className="flex items-center gap-2 mb-2" key={index}>
                  <BsFillArrowRightCircleFill color="green" /> {item}
                </li>
              ))}
            </ul> */}
            <YTVideoPlayer
              coverUrl={
                "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/EBP_NEW_ADD_Cover 28.09.25.png"
              }
              YTId={"57PHv-PCbxg"}
            />
            {/* <div className="w-full h-[500px]  mx-auto rounded-lg hidden">
              <div className="bg-black absolute"></div>
              <ReactPlayer
                url={"https://youtu.be/4jBnXOCdBRA?si=Z6w58ywFpaQTBAxd"}
                width={"100%"}
                // playing={true}
                loop={true}
                height={"100%"}
                style={{
                  border: "2px solid #8319f4",
                  padding: "20px",
                  borderRadius: "20px",
                }}
                controls={true}
              />
            </div> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CourseInfo;
