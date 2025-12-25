import { BiLogoFacebook, BiLogoWhatsapp, BiLogoYoutube } from "react-icons/bi";
export const contentTypeObj = {
  Trucchi: "Trucchi",
  PatenteBook: "PatenteBook",
  STDNotes: "STDNotes",
  CourseVideo: "CourseVideo",
  FeedbackVideo: "FeedbackVideo",
  YTFreeVideo: "YTFreeVideo",
};
export const SocialLinks = [
  {
    name: "Facebook",
    link: "https://www.facebook.com/easybanglapatente2021",
    icon: <BiLogoFacebook />,
    color: "hover:text-blue-400",
  },
  {
    name: "Youtube",
    link: "https://www.youtube.com/@QUIZBANGLAPATENTE",
    icon: <BiLogoYoutube />,
    color: "hover:text-red-400",
  },
  {
    name: "Whatsapp",
    link: "tel:+39 389 961 1153 ",
    icon: <BiLogoWhatsapp />,
    color: "hover:text-green-400",
  },
];

// Stats Constants
export const STATS = {
  STUDENTS_PASSED: 5000,
  SUCCESS_RATE: 95,
  YEARS_EXPERIENCE: 15,
};

export const STATS_LABELS = {
  STUDENTS_PASSED: "Students Passed",
  SUCCESS_RATE: "Success Rate",
  YEARS_EXPERIENCE: "Years Experience",
};
