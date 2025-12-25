import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import CTA from "../../../Shared/Components/CTA";
import Container from "../../../Shared/Container/Container";
import YTVideoPlayer from "../../../Shared/Components/YTVideoPlayer";
import SectionHeader from "../../../Shared/Components/SectionHeader/SectionHeader";
import { FaCar } from "react-icons/fa";
import {
  Heading2,
  Heading3,
  Body,
  BengaliBody,
  Caption,
  Overline,
} from "../../../Shared/Components/Typography/Typography";
import VideoPlayer from "../../../Shared/Components/VideoPlayer";
const Course = () => {
  //
  useEffect(() => {
    Aos.init();
    Aos.refresh(); // Call AOS.refresh() after initialization

    return () => {
      Aos.refresh({
        // Optionally, you can pass options to AOS.refresh() within the cleanup function
        debounceDelay: 50,
        throttleDelay: 99,
      });
    };
  }, []);
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white" id="Course">
      <Container>
        <SectionHeader
          badge={{
            icon: <FaCar className="mr-2" />,
            text: "Course to drive with",
            className: "bg-primary-100 text-primary-700",
          }}
          title="Course to drive with"
          subtitle="confidence"
          description="Master Italian driving with our comprehensive online course designed for success"
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Video Section */}
          <div className="flex items-center justify-center">
            <div className="modern-card p-1 sm:p-4 w-full max-w-3xl">
              {/* <YTVideoPlayer
                YTId={"hw4o2SRcRr8"}
                coverUrl={
                  "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/Paris_Youtube_Video_COVER .png"
                }
              /> */}
              <VideoPlayer
                // pauseOnScrollOut={false}
                videoLink="https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/Paris_3rd_ADD_Video .mp4"
                coverUrl={
                  "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/Paris_Youtube_Video_COVER .png"
                }
                title="Course to drive with confidence"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="modern-card p-8 lg:p-10">
            <div className="aos-init" data-aos="fade-up">
              <Overline className="text-primary-600 font-semibold">
                Our Course
              </Overline>
              <div className="space-y-6">
                <Heading2 className="text-2xl sm:text-3xl lg:text-4xl">
                  Standard Driving Course
                </Heading2>
                <BengaliBody className="text-base sm:text-lg text-gray-600">
                  📢 ভর্তি চলছে 📢ইতালিয়ান ড্রাইভিং লাইসেন্স অনলাইন পাতেন্তে A
                  এবং B কোর্স BANGLA PATENTE
                </BengaliBody>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                      <img
                        src="https://fastwpdemo.com/newwp/udrive/wp-content/uploads/2022/06/icon-6.png"
                        alt="Theory"
                        className="w-6 h-6"
                      />
                    </div>
                    <div>
                      <Heading3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                        THEORY SESSION
                      </Heading3>
                      <Caption className="text-primary-600 font-medium">
                        150 Hours
                      </Caption>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center">
                      <img
                        src="https://fastwpdemo.com/newwp/udrive/wp-content/uploads/2022/06/icon-7.png"
                        alt="Practical"
                        className="w-6 h-6"
                      />
                    </div>
                    <div>
                      <Heading3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                        PRACTICAL SESSION
                      </Heading3>
                      <Caption className="text-accent-600 font-medium">
                        06 Hours
                      </Caption>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <CTA phone={`+39 320 608 8871`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Course;
