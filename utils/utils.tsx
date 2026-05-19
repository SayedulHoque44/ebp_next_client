import moment from "moment-timezone";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import {
  MdOutlineDesktopAccessDisabled,
  MdOutlineSmartphone,
} from "react-icons/md";

export const minimizeText = (text: string, mobile: boolean) => {
  const textSize = mobile ? 100 : 200;
  let minText = text;
  let minifay = false;
  if (text.length > textSize) {
    minText = text.substring(0, textSize);
    minifay = true;
  }
  return { minText, minifay };
};

// get object key
export const getObjectKeyFromUrl = (cdnUrl: string, imageUrl: string) => {
  if (imageUrl) {
    return imageUrl?.substring(imageUrl?.indexOf(cdnUrl) + cdnUrl.length);
  }
  return "";
};
// get object key
export const getFileNameFromCdnUrl = (
  cdnUrl: string,
  folderName: string,
  imageUrl: string,
) => {
  if (imageUrl) {
    return imageUrl.substring(cdnUrl.length + folderName.length);
  }
  return "";
};

// paid gurd

export const paidGurdRoute = (path: string, loggedUser: any) => {
  if (loggedUser?.role === "Admin") {
    return (window.location.href = path);
  }
  if (loggedUser.status === "Passed") {
    return toast.error("You are already passed!");
  }
  // user active and paid
  if (loggedUser?.status === "Active" && loggedUser?.paymentStatus === "paid") {
    return (window.location.href = path);
  } else if (loggedUser?.status === "Active") {
    return toast.error("কিছু সম্যসা হয়েছে !");
  } else if (loggedUser?.paymentStatus === "paid") {
    return toast.error(
      "আপনার কোর্স টাইম শেষ হয়ে গিয়েছে, টাইম বাডানোর জন্য যোগাযোগ করুন।",
    );
  } else {
    return toast.error("আপনাকে কোর্সটা কিনতে হবে।");
  }
};

export const generateUniqImageID = (fileName: string) => {
  const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const nameParts = fileName.split(".");
  const extension = nameParts.pop();
  const name = nameParts.join(".");

  return `${name}-${uniqueId}.${extension}`;
};

// aws config
export const EBP_Images_CDN_BaseUrl =
  process.env.NEXT_PUBLIC_AWS_IMAGES_CDN_BASE_URL;
export const fileMaxSize = 400 * 1024 * 1024; // 400MB
export const chunkSize = 5 * 1024 * 1024; // 100MB

// Function to format remaining time in years, months, days, hours, minutes, and seconds
function formatTime(time: any) {
  const years = time.years();
  const months = time.months();
  const days = time.days();
  const hours = time.hours();
  const minutes = time.minutes();
  const seconds = time.seconds();

  const formattedTime = [];

  if (years > 0) {
    formattedTime.push(
      <div
        key="years"
        className="flex flex-col items-center justify-center px-3 py-2 md:px-4 md:py-3 bg-white rounded-xl shadow-md border border-green-200 min-w-[60px] md:min-w-[80px]"
      >
        <span className="text-xl md:text-2xl lg:text-3xl font-bold text-green-700">
          {" "}
          {years}
        </span>
        <span className="text-xs md:text-sm text-gray-600 font-medium mt-1">
          {years === 1 ? "Year" : "Years"}
        </span>
      </div>,
    );
  }

  if (months > 0) {
    formattedTime.push(
      <div
        key="months"
        className="flex flex-col items-center justify-center px-3 py-2 md:px-4 md:py-3 bg-white rounded-xl shadow-md border border-green-200 min-w-[60px] md:min-w-[80px]"
      >
        <span className="text-xl md:text-2xl lg:text-3xl font-bold text-green-700">
          {months}
        </span>
        <span className="text-xs md:text-sm text-gray-600 font-medium mt-1">
          {months === 1 ? "Month" : "Months"}
        </span>
      </div>,
    );
  }

  if (days > 0) {
    formattedTime.push(
      <div
        key="days"
        className="flex flex-col items-center justify-center px-3 py-2 md:px-4 md:py-3 bg-white rounded-xl shadow-md border border-green-200 min-w-[60px] md:min-w-[80px]"
      >
        <span className="text-xl md:text-2xl lg:text-3xl font-bold text-green-700">
          {days}
        </span>
        <span className="text-xs md:text-sm text-gray-600 font-medium mt-1">
          {days === 1 ? "Day" : "Days"}
        </span>
      </div>,
    );
  }

  // Smart logic: Only show hours/minutes/seconds when appropriate
  // If we have months/years, don't show hours/minutes/seconds (too granular)
  const hasMonthsOrYears = years > 0 || months > 0;
  const hasDays = days > 0;
  const hasHours = hours > 0;
  const hasMinutes = minutes > 0;

  if (!hasMonthsOrYears) {
    // Show hours if we have days (to give more context) or if we only have hours/minutes/seconds
    if (hasHours && (hasDays || (!hasDays && (hasMinutes || seconds >= 0)))) {
      formattedTime.push(
        <div
          key="hours"
          className="flex flex-col items-center justify-center px-3 py-2 md:px-4 md:py-3 bg-white rounded-xl shadow-md border border-green-200 min-w-[60px] md:min-w-[80px]"
        >
          <span className="text-xl md:text-2xl lg:text-3xl font-bold text-green-700">
            {hours}
          </span>
          <span className="text-xs md:text-sm text-gray-600 font-medium mt-1">
            {" "}
            {hours === 1 ? "Hour" : "Hours"}
          </span>
        </div>,
      );
    }

    // Show minutes if we don't have many days (less than 2 days) or if we only have minutes/seconds
    if (hasMinutes && (days < 2 || (!hasDays && !hasHours && seconds >= 0))) {
      formattedTime.push(
        <div
          key="minutes"
          className="flex flex-col items-center justify-center px-3 py-2 md:px-4 md:py-3 bg-white rounded-xl shadow-md border border-green-200 min-w-[60px] md:min-w-[80px]"
        >
          <span className="text-xl md:text-2xl lg:text-3xl font-bold text-green-700">
            {minutes}
          </span>
          <span className="text-xs md:text-sm text-gray-600 font-medium mt-1">
            {" "}
            {minutes === 1 ? "Minute" : "Minutes"}
          </span>
        </div>,
      );
    }

    // Show seconds only when we're down to hours/minutes/seconds (no days)
    if (seconds >= 0 && !hasDays && (hasHours || hasMinutes)) {
      formattedTime.push(
        <div
          key="seconds"
          className="flex flex-col items-center justify-center px-3 py-2 md:px-4 md:py-3 bg-white rounded-xl shadow-md border border-green-200 min-w-[60px] md:min-w-[80px]"
        >
          <span className="text-xl md:text-2xl lg:text-3xl font-bold text-green-700">
            {seconds}
          </span>
          <span className="text-xs md:text-sm text-gray-600 font-medium mt-1">
            {seconds === 1 || seconds === 0 ? "Second" : "Seconds"}
          </span>
        </div>,
      );
    }
  }

  return (
    <div className="formatted-time w-full">
      <div className="flex flex-wrap gap-2 md:gap-3 justify-center items-center">
        {formattedTime.map((part, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="text-xl md:text-2xl font-bold text-green-600 mx-1">
                :
              </span>
            )}
            {part}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
// Course Time checker

export const Timecheckers = (
  startDate: any,
  endDate: any,
  remainingTime: any,
) => {
  const courseStartTime = new Date(startDate).getTime();
  const courseEndTime = new Date(endDate).getTime();
  const currentTime = new Date().getTime();

  // check course time started or not
  if (courseEndTime <= currentTime) {
    return (window.location.href = "/dashboard");
  }
  return formatTime(remainingTime);
};

export const DayPrivateRoute = ({
  loggedUser,
  dayCount,
  redirectUrl,
}: {
  loggedUser: any;
  dayCount: number[] | number;
  redirectUrl?: string;
}) => {
  const currentDay = moment().tz(moment.tz.guess()).day(); // 0=Sun, 6=Sat
  const isBlockedDay = Array.isArray(dayCount)
    ? dayCount.includes(currentDay)
    : currentDay === dayCount;
  const shouldRedirect = isBlockedDay && !!redirectUrl;

  React.useEffect(() => {
    if (shouldRedirect && redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [shouldRedirect, redirectUrl]);

  if (loggedUser?.role === "Admin") {
    return false;
  }

  if (isBlockedDay) {
    if (redirectUrl) {
      return true;
    } else {
      return (
        <>
          <div className="flex justify-center sticky top-40 -mb-[200px] z-12">
            <div className="w-full md:w-1/2 ">
              <div className="w-full overflow-hidden rounded-2xl border border-warning-200/90 bg-white shadow-large sm:rounded-3xl">
                <div className="h-1 bg-linear-to-r from-warning-400 via-warning-500 to-warning-600" />
                <div className="flex flex-col items-center gap-5 px-7 py-8 sm:flex-row sm:items-start md:p-9">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-warning-100 text-warning-600">
                    <MdOutlineDesktopAccessDisabled className="h-8 w-8" />
                  </div>
                  <div className="w-full min-w-0 text-center sm:text-left">
                    <span className="mb-2 inline-block rounded-full bg-warning-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-warning-800">
                      Notice
                    </span>
                    <h5 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                      Temporary Course Video Disabled
                    </h5>
                    <p className="font-bengali text-sm leading-relaxed text-gray-600 sm:text-base">
                      কোর্স ভিডিও আমাদের ওয়েবসাইটে শুধুমাত্র লাইভ ক্লাস যেদিন হবে
                      ওই দিনগুলোতে দেখতে পারবেন। অ্যাপে প্রতিদিন দেখতে পারবেন —
                      তাই অ্যাপে দেখুন।
                    </p>
                    <div className="mt-5 flex items-start gap-3 rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-left">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                        <MdOutlineSmartphone className="h-5 w-5" />
                      </div>
                      <p className="font-bengali text-sm leading-snug text-primary-800">
                        <span className="font-semibold text-primary-900">
                          মোবাইল অ্যাপ:
                        </span>{" "}
                        প্রতিদিনের কোর্স ভিডিও অ্যাপ থেকেই দেখুন।
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bluryBg absolute top-0 right-0 bottom-0 left-0 z-10 flex justify-center overflow-y-auto bg-gray-900/50 p-5 backdrop-blur-md"></div>
        </>
      );
    }
  }
  return false;
};
