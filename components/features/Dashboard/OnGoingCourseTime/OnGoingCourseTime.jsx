import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { Timecheckers } from "../../../Util/Hooks/useFuntionality";
import TimerSkeleton from "../../../Shared/Components/SkeletonLoader/TimerSkeleton";
import { Clock } from "@phosphor-icons/react";

const OnGoingCourseTime = ({ courseDuration }) => {
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    // Calculate remaining time when the endDate and durationMonths change
    const calculateRemainingTime = () => {
      const now = moment();
      const end = moment(courseDuration.endDate);
      const timeRemaining = moment.duration(end.diff(now));
      setRemainingTime(timeRemaining);
    };

    calculateRemainingTime();

    // Update the remaining time every second (1000 milliseconds)
    const intervalId = setInterval(calculateRemainingTime, 1000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [courseDuration.endDate]);

  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 rounded-2xl shadow-lg p-6 md:p-8">
      {remainingTime === null ? (
        <TimerSkeleton />
      ) : (
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Clock size={24} weight="bold" className="text-green-600" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Course Remaining Time
            </h2>
          </div>
          <div className="mt-4">
            {Timecheckers(
              courseDuration.startDate,
              courseDuration.endDate,
              remainingTime
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OnGoingCourseTime;
