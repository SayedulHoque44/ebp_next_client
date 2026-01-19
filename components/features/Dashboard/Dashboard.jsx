import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Outlet, useLocation } from "react-router-dom";
import Container from "../../Shared/Container/Container";
import CardSkeleton from "../../Shared/Components/SkeletonLoader/CardSkeleton";
import usePContext from "../../Util/Hooks/usePContext";
import { useGetSingleUserQuery } from "../../redux/Api/UserManagmentApi/UserManagmentApi";
import Congratulation from "./Congratulation/Congratulation";
import DashboradContent from "./DashboradContent/DashboradContent";
import EndedCourseTime from "./EndedCourseTime/EndedCourseTime";
import OnGoingCourseTime from "./OnGoingCourseTime/OnGoingCourseTime";
import UpComingCourseTime from "./UpComingCourseTime/UpComingCourseTime";

const Dashboard = () => {
  const { loggedUser } = usePContext();
  // const [SingleUser, refetch, isLoading, SingleUserError] = useGetSingleUser(
  //   loggedUser._id
  // );
  const { data: SingleUser, isLoading } = useGetSingleUserQuery(loggedUser._id);

  const location = useLocation();

  // is user blocked courseTime
  if (SingleUser?.status === "Block") {
    window.location.href = "/dashboard";
  }
  // is there any onGoing course
  const isThereAnyOnGoingCourse = SingleUser?.courseTimes?.find(
    (courseTimeEle) => courseTimeEle.status === "ONGOING"
  );
  // is there any onGoing course
  const isThereEndedCourse = SingleUser?.courseTimes?.find(
    (courseTimeEle) => courseTimeEle.status === "ENDED"
  );
  // is there any onGoing course
  const isThereUpcoming = SingleUser?.courseTimes?.find(
    (courseTimeEle) => courseTimeEle.status === "UPCOMING"
  );
  // if ther user is not admin and is active --> now is  ongoing course is finished and still user is not active.
  if (SingleUser?.role !== "Admin" && SingleUser?.status === "Active") {
    if (!isThereAnyOnGoingCourse) {
      window.location.href = "/dashboard";
    }
  } else if (
    SingleUser?.role !== "Admin" &&
    SingleUser?.status === "Disabled"
  ) {
    // if ther user is not admin and is disabled -> now is any ongoing course updated for this user and user still disabled
    if (isThereAnyOnGoingCourse) {
      window.location.href = "/dashboard";
    }
  }
  return (
    <>
      {location.pathname === "/dashboard" && (
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
                  {loggedUser.name}
                </span>
                <span className="inline-block animate-bounce-gentle ml-2">
                  👋
                </span>
              </h1>
              <p className="text-lg text-gray-500 font-medium text-center max-w-2xl">
                Ready to continue your learning journey? Let's achieve your
                goals today!
              </p>
            </>
          )}
        </div>
      )}
      {/* show course information */}
      {location.pathname === "/dashboard" && (
        <>
          {isLoading ? (
            <div className="flex justify-center mt-4 px-4">
              <Skeleton
                width="100%"
                maxWidth={600}
                height={120}
                className="rounded-xl"
              />
            </div>
          ) : (
            loggedUser.role !== "Admin" &&
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
      {location.pathname === "/dashboard" && (
        <>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
              <CardSkeleton count={9} />
            </div>
          ) : (
            SingleUser && <DashboradContent user={SingleUser} />
          )}
        </>
      )}
      <Outlet />
    </>
  );
};

export default Dashboard;
