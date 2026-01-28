import moment from "moment-timezone";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { MdOutlineDesktopAccessDisabled } from "react-icons/md";

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
  imageUrl: string
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
      "আপনার কোর্স টাইম শেষ হয়ে গিয়েছে, টাইম বাডানোর জন্য যোগাযোগ করুন।"
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
function formatTime(time:any) {
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
      </div>
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
      </div>
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
      </div>
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
        </div>
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
        </div>
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
        </div>
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

export const Timecheckers = (startDate:any, endDate:any, remainingTime:any) => {
  const courseStartTime = new Date(startDate).getTime();
  const courseEndTime = new Date(endDate).getTime();
  const currentTime = new Date().getTime();

  // check course time started or not
  if (courseEndTime <= currentTime) {
    return (window.location.href = "/dashboard");
  }
  return formatTime(remainingTime);
};

export const DayPrivateRoute = ({ loggedUser, dayCount, redirectUrl }: { loggedUser: any, dayCount: number, redirectUrl?: string }) => {
  const router = useRouter();
  if (loggedUser?.role === "Admin") {
    return false;
  }

  const currentDayCount = moment().tz(moment.tz.guess()).day(); // 1-7

  if (currentDayCount === dayCount) {
    if (redirectUrl) {
      router.push(redirectUrl);
    } else {
      return (
        <>
          <div className="flex justify-center sticky top-40 -mb-[200px] z-[12]">
            <div className="w-full md:w-1/2 ">
              <div className="flex flex-col justify-center items-center w-full border-l-6 border-warning bg-warning bg-opacity-[45%] px-7 py-8 shadow-md dark:bg-opacity-90 md:p-9 gap-7">
                <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
                  <MdOutlineDesktopAccessDisabled size={35} />
                </div>
                <div className="w-full flex flex-col items-center">
                  <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
                    {"Temporary Course Video Disabled!"}
                  </h5>
                  <p className="leading-relaxed text-white">
                    {
                      "আমাদের ওয়েভসাইটে কাজ চলতেচে তাই ২৪ ঘন্টার জন্য আমাদের কোর্স ভিডিও বন্ধ থাববে। ধন্যবাদ। 😊"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center p-5 bluryBg absolute top-0 right-0 bottom-0 left-0 z-10 overflow-y-auto"></div>
        </>
      );
    }
  }
};