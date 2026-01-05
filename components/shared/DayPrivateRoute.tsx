"use client";
import moment from "moment-timezone";
import { MdOutlineDesktopAccessDisabled } from "react-icons/md";
import { useRouter } from "next/navigation";

interface DayPrivateRouteProps {
  loggedUser?: {
    role?: string;
  } | null;
  dayCount: number;
  redirectUrl: string;
}

export const DayPrivateRoute = ({
  loggedUser,
  dayCount,
  redirectUrl,
}: DayPrivateRouteProps) => {
  // Hooks must be called at the top level, before any conditional returns
  const router = useRouter();
  const currentDayCount = moment().tz(moment.tz.guess()).day(); // 1-7

  if (loggedUser?.role === "Admin") {
    return null;
  }

  if (currentDayCount === dayCount && redirectUrl) {
    router.push(redirectUrl);
    return null;
  }

  if (currentDayCount === dayCount) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center sticky top-40 -mb-[200px] z-12">
        <div className="w-full md:w-1/2 ">
          <div className="flex flex-col justify-center items-center w-full border-l-6 border-warning bg-warning bg-opacity-[45%] px-7 py-8 shadow-md dark:bg-opacity-90 md:p-9 gap-7">
            <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
              <MdOutlineDesktopAccessDisabled className="w-6 h-6" />
            </div>
            <div className="w-full flex flex-col items-center">
              <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
                Temporary Course Video Disabled!
              </h5>
              <p className="leading-relaxed text-white">
                আমাদের ওয়েভসাইটে কাজ চলতেচে তাই ২৪ ঘন্টার জন্য আমাদের কোর্স
                ভিডিও বন্ধ থাববে। ধন্যবাদ। 😊
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center p-5 bluryBg absolute top-0 right-0 bottom-0 left-0 z-10 overflow-y-auto"></div>
    </>
  );
};
