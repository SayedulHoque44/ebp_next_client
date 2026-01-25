"use client";
import React, { useCallback, useMemo, memo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  homeImg,
  adminMImg,
  simulazioneEsameImg,
  quizPerArgomentiImg,
  theoryimg,
  cercaimg,
  YTVideoImg,
  patenteBookImg,
  courseVideoImg,
  QNAPdfImg,
  bookImg,
  quiz_2,
  QNABookImg,
  ripassoErroriImg,
} from "@/constants/dashboardIcons";
import { paidGurdRoute } from "@/utils/utils";
import { AppShowCase } from "../../AppPage";
import { IUser } from "@/features/User/interface/user.interface";
import useAuth from "@/features/Auth/hooks/useAuth";

interface DashboardCardProps {
  path: string;
  isPaidGuard: boolean;
  title: string;
  icon: string;
  iconAlt: string;
  description?: string;
  bgColorClass: string;
  hoverBgColorClass: string;
  onRoute: (path: string, isPaidGuard: boolean) => void;
}

const DashboardCard = memo(
  ({
    path,
    isPaidGuard,
    title,
    icon,
    iconAlt,
    description,
    bgColorClass,
    hoverBgColorClass,
    onRoute,
  }: DashboardCardProps) => {
    const handleClick = useCallback(() => {
      onRoute(path, isPaidGuard);
    }, [path, isPaidGuard, onRoute]);

    return (
      <div
        onClick={handleClick}
        className="group flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer transform hover:-translate-y-1"
      >
        <div
          className={`p-4 ${bgColorClass} rounded-full ${hoverBgColorClass} transition-colors duration-300`}
        >
          <Image
            src={icon}
            alt={iconAlt}
            width={48}
            height={48}
            className="object-contain"
            
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 group-hover:text-P-primary transition-colors text-center">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-gray-500 text-center">{description}</p>
        )}
      </div>
    );
  }
);

DashboardCard.displayName = "DashboardCard";

interface DashboradContentProps {
  user: IUser;
}

interface DashboardMenuItem {
  path: string;
  isPaidGuard: boolean;
  title: string;
  icon: string;
  iconAlt: string;
  description?: string;
  bgColorClass: string;
  hoverBgColorClass: string;
  showForAdminOnly?: boolean;
}

const DashboradContent = ({ user }: DashboradContentProps) => {
  // const { loggedUser: user } = useAuth();
  const router = useRouter();

  const handleRoutes = useCallback(
    (path: string, isPaidGuard: boolean) => {
      if (isPaidGuard) {
        paidGurdRoute(path, user);
      } else {
        router.push(path);
      }
    },
    [user, router]
  );

  const menuItems = useMemo<DashboardMenuItem[]>(
    () => [
      {
        path: "/",
        isPaidGuard: false,
        title: "Home",
        icon: homeImg,
        iconAlt: "Home",
        bgColorClass: "bg-blue-50",
        hoverBgColorClass: "group-hover:bg-blue-100",
      },
      {
        path: "/dashboard/adminManagment/userManagment",
        isPaidGuard: true,
        title: "Admin Management",
        icon: adminMImg,
        iconAlt: "Admin",
        bgColorClass: "bg-purple-50",
        hoverBgColorClass: "group-hover:bg-purple-100",
        showForAdminOnly: true,
      },
      {
        path: "/dashboard/simulazioneEsame",
        isPaidGuard: false,
        title: "Simulazione Esame",
        icon: simulazioneEsameImg,
        iconAlt: "Simulazione Esame",
        bgColorClass: "bg-green-50",
        hoverBgColorClass: "group-hover:bg-green-100",
      },
      {
        path: "/dashboard/quizPerArgument",
        isPaidGuard: false,
        title: "Quiz Per Argomenti",
        icon: quizPerArgomentiImg,
        iconAlt: "Quiz Per Argomenti",
        bgColorClass: "bg-green-50",
        hoverBgColorClass: "group-hover:bg-green-100",
      },
      {
        path: "/dashboard/theory",
        isPaidGuard: false,
        title: "Theory Con Quiz",
        icon: theoryimg,
        iconAlt: "Theory",
        bgColorClass: "bg-green-50",
        hoverBgColorClass: "group-hover:bg-green-100",
      },
      {
        path: "/dashboard/ripassoErrori",
        isPaidGuard: false,
        title: "Ripasso Errori",
        icon: ripassoErroriImg,
        iconAlt: "Ripasso Errori",
        bgColorClass: "bg-green-50",
        hoverBgColorClass: "group-hover:bg-green-100",
      },
      {
        path: "/dashboard/cerca",
        isPaidGuard: true,
        title: "Cerca Quiz",
        icon: cercaimg,
        iconAlt: "Search",
        description: "এখানে ৭০০০+ কুইজ থেকে সার্চ করে পরতে পারবেন",
        bgColorClass: "bg-orange-50",
        hoverBgColorClass: "group-hover:bg-orange-100",
      },
      {
        path: "/dashboard/PrivateVideos",
        isPaidGuard: false,
        title: "Basic Free Videos",
        icon: YTVideoImg,
        iconAlt: "Videos",
        bgColorClass: "bg-red-50",
        hoverBgColorClass: "group-hover:bg-red-100",
      },
      {
        path: "/dashboard/patenteBooks",
        isPaidGuard: false,
        title: "Patente Books",
        icon: patenteBookImg,
        iconAlt: "Books",
        bgColorClass: "bg-indigo-50",
        hoverBgColorClass: "group-hover:bg-indigo-100",
      },
      {
        path: "/dashboard/courseVideo",
        isPaidGuard: false,
        title: "Course Videos",
        icon: courseVideoImg,
        iconAlt: "Course Videos",
        bgColorClass: "bg-teal-50",
        hoverBgColorClass: "group-hover:bg-teal-100",
      },
      {
        path: "/dashboard/QNAPdf",
        isPaidGuard: true,
        title: "SCHEDE ESAME PATENTE (QNA)",
        icon: QNAPdfImg,
        iconAlt: "QNA",
        description:
          "আমাদের স্কুল থেকে যত জন স্টুডেন্ট পাস করেছেন, তাদের পরীক্ষার প্রশ্ন এবং উত্তর গুলো PDF ফাইল এর মাধ্যমে দেওয়া আছে।",
        bgColorClass: "bg-yellow-50",
        hoverBgColorClass: "group-hover:bg-yellow-100",
      },
      {
        path: "/dashboard/quizBook",
        isPaidGuard: true,
        title: "Quiz Book",
        icon: bookImg,
        iconAlt: "Quiz Book",
        description: "এই বই এ সকল কুইজ এর প্রশ্ন এবং উত্তর পাবেন (৭০০০+ কুইজ)।",
        bgColorClass: "bg-pink-50",
        hoverBgColorClass: "group-hover:bg-pink-100",
      },
      {
        path: "/dashboard/trucchi",
        isPaidGuard: false,
        title: "Trucchi",
        icon: quiz_2,
        iconAlt: "Trucchi",
        bgColorClass: "bg-cyan-50",
        hoverBgColorClass: "group-hover:bg-cyan-100",
      },
      {
        path: "/dashboard/studentNotes",
        isPaidGuard: false,
        title: "Student Note&apos;s",
        icon: QNABookImg,
        iconAlt: "Notes",
        bgColorClass: "bg-emerald-50",
        hoverBgColorClass: "group-hover:bg-emerald-100",
      },
    ],
    []
  );

  const filteredMenuItems = useMemo(
    () =>
      menuItems.filter(
        (item) => !item.showForAdminOnly || user?.role === "Admin"
      ),
    [menuItems, user?.role]
  );

  return (
    <>
      <AppShowCase
        id={2}
        title={"Quiz Bangla Patente App"}
        info={"Our Android & IOS Quiz Latest App 😍"}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
        {filteredMenuItems.map((item) => (
          <DashboardCard
            key={item.path}
            path={item.path}
            isPaidGuard={item.isPaidGuard}
            title={item.title}
            icon={item.icon}
            iconAlt={item.iconAlt}
            description={item.description}
            bgColorClass={item.bgColorClass}
            hoverBgColorClass={item.hoverBgColorClass}
            onRoute={handleRoutes}
          />
        ))}
      </div>
      {/* <AdSense.Google
        client="ca-pub-9434932401811333"
        slot="3670158091"
        style={{ display: "block" }}
        format="auto"
        responsive="true"
        layoutKey="-gw-1+2a-9x+5c"
      /> */}
    </>
  );
};

export default DashboradContent;
