"use client";
import React, { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Congratulation from "./Congratulation/Congratulation";
import EndedCourseTime from "./EndedCourseTime/EndedCourseTime";
import OnGoingCourseTime from "./OnGoingCourseTime/OnGoingCourseTime";
import UpComingCourseTime from "./UpComingCourseTime/UpComingCourseTime";
import useAuth from "@/features/Auth/hooks/useAuth";
import { IUserCourse } from "@/features/User/interface/user.interface";

interface DashboardWrapperProps {
  children: React.ReactNode;
}

const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const SingleUser = user;

  // Memoize course status checks
  const courseTimes = SingleUser?.courseTimes;
  const courseStatuses = useMemo(() => {
    if (!courseTimes) {
      return {
        isThereAnyOnGoingCourse: null,
        isThereEndedCourse: null,
        isThereUpcoming: null,
      };
    }

    return {
      isThereAnyOnGoingCourse:
        courseTimes.find(
          (courseTimeEle: IUserCourse) => courseTimeEle.status === "ONGOING"
        ) || null,
      isThereEndedCourse:
        courseTimes.find(
          (courseTimeEle: IUserCourse) => courseTimeEle.status === "ENDED"
        ) || null,
      isThereUpcoming:
        courseTimes.find(
          (courseTimeEle: IUserCourse) => courseTimeEle.status === "UPCOMING"
        ) || null,
    };
  }, [courseTimes]);

  const { isThereAnyOnGoingCourse, isThereEndedCourse, isThereUpcoming } =
    courseStatuses;

  const isDashboardPage = useMemo(() => pathname === "/dashboard", [pathname]);

  // Handle redirects using Next.js router
  useEffect(() => {
    if (!SingleUser || isLoading) return;

    // is user blocked courseTime
    if (SingleUser.status === "Block") {
      router.push("/dashboard");
      return;
    }

    // if ther user is not admin and is active --> now is  ongoing course is finished and still user is not active.
    if (SingleUser.role !== "Admin" && SingleUser.status === "Active") {
      if (!isThereAnyOnGoingCourse) {
        router.push("/dashboard");
        return;
      }
    } else if (
      SingleUser.role !== "Admin" &&
      SingleUser.status === "Disabled"
    ) {
      // if ther user is not admin and is disabled -> now is any ongoing course updated for this user and user still disabled
      if (isThereAnyOnGoingCourse) {
        router.push("/dashboard");
        return;
      }
    }
  }, [
    SingleUser,
    isLoading,
    isThereAnyOnGoingCourse,
    router,
  ]);
  return (
    <>
      {isDashboardPage && (
        <div className="flex flex-col items-center justify-center py-10 space-y-3">
          {isLoading ? (
            <div className="w-full max-w-2xl flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <Skeleton width={200} height={48} />
                <Skeleton width={120} height={48} />
                <Skeleton width={32} height={32} circle />
              </div>
              <Skeleton width={500} height={24} />
            </div>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight text-center">
                Welcome back,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-P-primary to-purple-600">
                  {user?.name}
                </span>
                <span className="inline-block animate-bounce-gentle ml-2">
                  👋
                </span>
              </h1>
              <p className="text-lg text-gray-500 font-medium text-center max-w-2xl">
                Ready to continue your learning journey? Let&apos;s achieve your
                goals today!
              </p>
            </>
          )}
        </div>
      )}
      {/* show course information */}
      {isDashboardPage && (
        <>
          {isLoading ? (
            <div className="flex justify-center mt-4 px-4">
              <div className="w-full max-w-[600px]">
                <Skeleton width="100%" height={120} className="rounded-xl" />
              </div>
            </div>
          ) : (
            user?.role !== "Admin" &&
            SingleUser?.status !== "Passed" && (
              <div className="w-full max-w-4xl mx-auto px-4 my-6">
                {isThereAnyOnGoingCourse ? (
                  <OnGoingCourseTime courseDuration={isThereAnyOnGoingCourse} />
                ) : isThereUpcoming ? (
                  <UpComingCourseTime courseDuration={isThereUpcoming} />
                ) : isThereEndedCourse ? (
                  <EndedCourseTime courseDuration={isThereEndedCourse} />
                ) : null}
              </div>
            )
          )}
        </>
      )}

      {/* congratulation */}
      {SingleUser?.status === "Passed" && (
        <div className="w-full max-w-4xl mx-auto px-4 mt-6">
          <Congratulation />
        </div>
      )}
      {/* DashBorad Content */}
      {/* {isDashboardPage && (
        <>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
              <CardSkeleton count={9} />
            </div>
          ) : (
            SingleUser && <DashboradContent user={SingleUser} />
          )}
        </>
      )} */}
      {children}
    </>
  );
};

export default DashboardWrapper;
