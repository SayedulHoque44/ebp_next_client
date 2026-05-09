import {
  FaCar,
  FaUsers,
  FaAward,
  FaClock,
} from "react-icons/fa";
import { STATS, STATS_LABELS } from "@/constants/ui_constent";

export interface FooterLink {
  name: string;
  link: string;
  external: boolean;
}

export interface FooterLinksConfig {
  main: FooterLink[];
  apps: FooterLink[];
  resources: FooterLink[];
}

export interface FooterStat {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  label: string;
}

/**
 * Footer Configuration
 * 
 * Configuration data for footer links and stats
 * Server-side configuration for SEO
 */
export const FOOTER_LINKS: FooterLinksConfig = {
  main: [
    { name: "Home", link: "/", external: false },
    { name: "Blogs", link: "/blogs", external: false },
    { name: "Free Video", link: "/YTFreevideo", external: false },
    { name: "Success Stories", link: "/feedback", external: false },
  ],
  apps: [
    { name: "EBP App", link: "/App/1", external: false },
    { name: "Latest App", link: "/App/2", external: false },
    { name: "Dashboard", link: "/dashboard", external: false },
    { name: "Profile", link: "/propile", external: false },
  ],
  resources: [
    { name: "Privacy Policy", link: "/privacy-policy", external: false },
  ],
};

export const FOOTER_STATS: FooterStat[] = [
  {
    icon: FaUsers,
    number: `${STATS.STUDENTS_PASSED}+`,
    label: "Students Trained",
  },
  {
    icon: FaAward,
    number: `${STATS.SUCCESS_RATE}%`,
    label: "Pass Rate",
  },
  {
    icon: FaCar,
    number: `${STATS.YEARS_EXPERIENCE}+`,
    label: STATS_LABELS.YEARS_EXPERIENCE,
  },
  {
    icon: FaClock,
    number: "24/7",
    label: "Support Available",
  },
];

export const FOOTER_CONTACT = {
  phone: "+39 320 608 8871",
  email: "info@easybanglapatente.com",
  location: "Italy",
} as const;

export const FOOTER_COMPANY_DESCRIPTION =
  "Easy Bangla Patente - Your trusted partner for Italian driving license preparation. We provide comprehensive training, study materials, and guidance to help you become a confident and safe driver. Join thousands of successful students who passed their driving test with our expert guidance.";

export const FOOTER_HERO_TITLE = {
  main: "We Give Best Guidance To Each Student, That's Why We Produce",
  highlight: "Confident & Safe Drivers",
} as const;

export const FOOTER_NEWSLETTER = {
  title: "Stay Updated",
  description:
    "Subscribe to our newsletter for the latest driving test tips, course updates, and success stories from our students.",
  placeholder: "Enter your email",
} as const;

export const FOOTER_COPYRIGHT = {
  text: "Copyright © 2023 - All right reserved by Sayedul Hoque",
} as const;
