import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { BiLogoFacebook, BiLogoWhatsapp, BiLogoYoutube } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";
import CTA from "../../../Shared/Components/CTA";
import SectionHeader from "../../../Shared/Components/SectionHeader/SectionHeader";
import Container from "../../../Shared/Container/Container";
import AnimatedCounter from "../../../Shared/Components/AnimatedCounter/AnimatedCounter";
import founder from "../../../assets/Images/founder.jpg";
import {
  Heading3,
  Body,
  BengaliBody,
  Caption,
  Overline,
} from "../../../Shared/Components/Typography/Typography";
import { SocialLinks, STATS, STATS_LABELS } from "../../../Shared/Constants";
const FounderDetails = () => {
  // const socialLinks = [
  //   {
  //     name: "Facebook",
  //     link: "https://www.facebook.com/easybanglapatente2021",
  //     icon: <BiLogoFacebook />,
  //   },
  //   {
  //     name: "Youtube",
  //     link: "https://www.youtube.com/@EasyBanglaPatente",
  //     icon: <BiLogoYoutube />,
  //   },
  //   {
  //     name: "Whatsapp",
  //     link: "tel:+39 389 961 1153 ",
  //     icon: <BiLogoWhatsapp />,
  //   },
  // ];
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
    <div className="py-20 bg-gradient-to-br from-white via-gray-50 to-primary-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-300 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent-300 rounded-full"></div>
      </div>

      <Container>
        <div className="relative z-10">
          {/* Section Header */}
          <SectionHeader
            badge={{
              icon: <FaGraduationCap className="mr-2" />,
              text: "Meet Our Founder",
              className: "bg-primary-100 text-primary-700",
            }}
            title="A Perfect Driving School with"
            subtitle="Professional Instructor"
            description="Learn from the best. Our founder Nazmul Islam has been helping students pass their Italian driving license since 2021."
            className="mb-16"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Founder Story */}
            <div className="space-y-8" data-aos="fade-right">
              {/* Since 2021 Badge */}
              <div className="modern-card p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <Caption className="text-2xl font-bold text-white">
                      2021
                    </Caption>
                  </div>
                  <div>
                    <Overline className="uppercase">Since</Overline>
                    <Heading3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Started Our Journey
                    </Heading3>
                  </div>
                </div>

                <BengaliBody className="text-gray-600 leading-relaxed text-base sm:text-lg">
                  আসসালামু আলাইকুম ইজি বাংলা পাতেন্তে তে সবাইকে স্বাগতম। আমি
                  নাজমুল ইসলাম, ইতালীর মানতোভা শহর থেকে।{" "}
                  <a
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                    href="/adsView"
                  >
                    ২০২১
                  </a>{" "}
                  সালে যখন পুরো বিশ্ব তে করোনা মহামারী রোগ ছড়িয়েছিল মানুষের
                  করোনা ভাইরাসে আতঙ্ক ছিল তখন আমরা ঘরে বসে উদ্যোগ নেই কিভাবে
                  সহজে ইতালীয়ান ড্রাইভিং লাইসেন্সর থিউরি অতি সহজে ঘরে বসে শিখতে
                  পারি অনলাইন ড্রাইভিং স্কুলের মাধ্যমে। যাতে আমরা ঘরে বসে তাদের
                  অবসর সময় টিকে কাজে লাগাতে পারি এবং নতুন নতুন জিনিসগুলো
                  শিখাইতে পারি। আলহামদুলিল্লাহ ইজি বাংলা পাতেনতে শুরুর পর থেকে
                  ইতালির বিভিন্ন শহরে আমাদের স্টুডেন্টরা অতি সহজে এবং অল্প সময়
                  থিওরি কোর্স করে ইতালিয়ান ড্রাইভিং লাইসেন্স হাতে পেয়েছে।
                  এখানে আমরা খুব সহজে কুইজের, প্রশ্নের এবং ভিডিওর মাধ্যমে
                  স্টুডেন্টদেরকে শিখিয়ে থাকি। এর ফলে মানুষ খুব তাড়াতাড়ি নিজের
                  কাঙ্ক্ষিত লক্ষে চলে যেতে পারে। আশা করি আপনারাও ইজি বাংলা
                  পাতেন্তে থেকে নিজেদের স্বপ্নগুলো পূরণ করতে পারবেন।
                </BengaliBody>
              </div>

              {/* Achievement Stats */}
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  className="modern-card p-6 text-center group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <AnimatedCounter
                    end={STATS.STUDENTS_PASSED}
                    suffix="+"
                    duration={2.5}
                    className="text-3xl font-bold text-primary-600 mb-2"
                    easing="easeOutCubic"
                  />
                  <Caption className="text-gray-600">Students Helped</Caption>
                </motion.div>

                <motion.div
                  className="modern-card p-6 text-center group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <AnimatedCounter
                    end={STATS.SUCCESS_RATE}
                    suffix="%"
                    duration={2}
                    className="text-3xl font-bold text-primary-600 mb-2"
                    easing="easeOutCubic"
                  />
                  <Caption className="text-gray-600">{STATS_LABELS.SUCCESS_RATE}</Caption>
                </motion.div>
              </div>
            </div>

            {/* Founder Profile */}
            <div className="flex justify-center" data-aos="fade-left">
              <div className="modern-card p-8 max-w-sm w-full">
                {/* Founder Image */}
                <div className="relative mb-6">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      className="w-full h-80 object-cover"
                      src={founder}
                      alt="Nazmul Islam - Founder"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-large">
                    <FaGraduationCap className="text-primary-600 text-xl" />
                  </div>
                </div>

                {/* Founder Info */}
                <div className="text-center mb-6">
                  <Heading3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    Nazmul Islam
                  </Heading3>
                  <Body className="text-lg text-primary-600 font-semibold mb-4">
                    Founder & Lead Instructor
                  </Body>
                  <Body className="text-gray-600 text-sm">
                    Based in Mantova, Italy. Helping students achieve their
                    driving license dreams since 2021.
                  </Body>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4 mb-6">
                  {SocialLinks.map((item, index) => (
                    <a
                      href={item.link}
                      key={index}
                      className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 hover:scale-110 hover:shadow-medium"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex justify-center">
                  <CTA phone={`+39 389 961 1153`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FounderDetails;
