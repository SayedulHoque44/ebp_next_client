import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Timechecker } from "../../../Util/Hooks/useFuntionality";

function CourseTimer({ user }) {
  const [remainingTime, setRemainingTime] = useState(null); // Countdown timer
  const [allowed, setAllowed] = useState(true);
  const { courseDuration } = user;

  //
  useEffect(() => {
    // Calculate remaining time when the endDate and durationMonths change
    const calculateRemainingTime = () => {
      const now = moment();
      const end = moment(courseDuration.courseEndDate);
      const timeRemaining = moment.duration(end.diff(now));
      setRemainingTime(timeRemaining);
    };

    calculateRemainingTime();

    // Update the remaining time every second (1000 milliseconds)
    const intervalId = setInterval(calculateRemainingTime, 1000);

    // user allowed for here
    if (!allowed) {
      window.location.href = "/dashboard/courseVideo";
    }

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [allowed]);

  //console.log(allowed);
  return (
    <div className="text-center mt-4">
      {remainingTime !== null && (
        <>
          {Timechecker(
            courseDuration.courseStartDate,
            courseDuration.courseEndDate,
            remainingTime,
            setAllowed,
            user
          )}
        </>
      )}
    </div>
  );
}

//

export default CourseTimer;
