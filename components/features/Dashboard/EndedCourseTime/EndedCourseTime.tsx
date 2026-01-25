"use client";
import React, { useState, useEffect, useMemo, memo } from "react";
import moment from "moment-timezone";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CheckCircle } from "@phosphor-icons/react";
import { IUserCourse } from "@/features/User/interface/user.interface";

interface EndedCourseTimeProps {
  courseDuration: IUserCourse;
}

const EndedCourseTime = memo(({ courseDuration }: EndedCourseTimeProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const endDate = courseDuration?.endDate;
  const formattedDate = useMemo(() => {
    if (!endDate) return "";
    return moment(endDate).local().format("MMMM D, YYYY");
  }, [endDate]);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-linear-to-br from-red-50 via-rose-50 to-pink-50 border-2 border-red-200 rounded-2xl shadow-lg p-6 md:p-8">
      {isLoading ? (
        <div className="flex justify-center">
          <div className="w-full max-w-[450px]">
            <Skeleton width="100%" height={80} className="rounded-lg" />
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <CheckCircle size={24} weight="bold" className="text-red-600" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Course Completed
            </h2>
          </div>
          <div className="mt-4">
            <p className="text-base md:text-lg text-gray-700 font-medium mb-2">
              Your course ended on:
            </p>
            <p className="text-lg md:text-xl font-bold text-red-700 bg-red-100 px-4 py-3 rounded-xl inline-block">
              {formattedDate}
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

EndedCourseTime.displayName = "EndedCourseTime";

export default EndedCourseTime;
