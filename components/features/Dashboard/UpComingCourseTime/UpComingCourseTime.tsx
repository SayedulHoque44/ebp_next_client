"use client";
import React, { useEffect, useState, useMemo, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import moment from "moment-timezone";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Calendar } from "@phosphor-icons/react";
import { IUserCourse } from "@/features/User/interface/user.interface";

interface UpComingCourseTimeProps {
  courseDuration: IUserCourse;
}

const UpComingCourseTime = memo(
  ({ courseDuration }: UpComingCourseTimeProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const startDate = courseDuration?.startDate;
    const formattedDate = useMemo(() => {
      if (!startDate) return "";
      const courseStartTime = new Date(startDate).getTime();
      return moment(courseStartTime).local().format("D MMMM, h:mm A YYYY");
    }, [startDate]);

    const checkCourseTimeStarted = useCallback(() => {
      if (!startDate) return;
      if (new Date(startDate).getTime() <= new Date().getTime()) {
        router.push("/dashboard");
      }
    }, [startDate, router]);

    useEffect(() => {
      // Simulate loading state
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);

      // Check if course has started every second
      const intervalId = setInterval(checkCourseTimeStarted, 1000);

      // Cleanup the interval and timeout when the component unmounts
      return () => {
        clearInterval(intervalId);
        clearTimeout(timer);
      };
    }, [checkCourseTimeStarted]);

    return (
      <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-200 rounded-2xl shadow-lg p-6 md:p-8">
        {isLoading ? (
          <div className="flex justify-center">
            <div className="w-full max-w-[500px]">
              <Skeleton width="100%" height={80} className="rounded-lg" />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Calendar size={24} weight="bold" className="text-amber-600" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Course Starting Soon
              </h2>
            </div>
            <div className="mt-4">
              <p className="text-base md:text-lg text-gray-700 font-medium mb-2">
                Your course will start on:
              </p>
              <p className="text-lg md:text-xl font-bold text-amber-700 bg-amber-100 px-4 py-3 rounded-xl inline-block">
                {formattedDate}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

UpComingCourseTime.displayName = "UpComingCourseTime";

export default UpComingCourseTime;
