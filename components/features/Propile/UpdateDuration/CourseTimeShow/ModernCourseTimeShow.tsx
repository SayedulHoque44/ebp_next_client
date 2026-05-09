import { useState } from "react";
import { MdHistory, MdExpandMore, MdExpandLess } from "react-icons/md";
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import { IUserCourse } from "@/features/User/interface/user.interface";
import ModernSingleCourseTime from "./SingleCourseTime/ModernSingleCourseTime";

const ModernCourseTimeShow = ({ courseTimes }: { courseTimes: IUserCourse[] }) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const ongoingCourses = courseTimes.filter((course) => course.status === "ONGOING");
  const otherCourses = courseTimes.filter((course) => course.status !== "ONGOING");

  const toggleHistory = () => setIsHistoryOpen(!isHistoryOpen);

  return (
    <div className="space-y-6">
      {ongoingCourses.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <FaClock className="text-lg text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Current Course</h3>
              <p className="text-sm text-gray-600">Active course enrollment</p>
            </div>
          </div>

          <div className="space-y-4">
            {ongoingCourses.map((courseTime) => (
              <ModernSingleCourseTime
                key={courseTime._id}
                courseTime={courseTime}
                variant="current"
              />
            ))}
          </div>
        </div>
      )}

      {otherCourses.length > 0 && (
        <div className="space-y-4">
          <button
            type="button"
            onClick={toggleHistory}
            className="group flex w-full cursor-pointer items-center justify-between rounded-xl bg-gray-50 p-4 transition-all duration-200 hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 transition-colors duration-200 group-hover:bg-gray-200">
                <MdHistory className="text-lg text-gray-600" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">Course History</h3>
                <p className="text-sm text-gray-600">
                  {otherCourses.length}{" "}
                  {otherCourses.length === 1 ? "course" : "courses"} completed or upcoming
                </p>
              </div>
            </div>
            <div className="text-gray-400 transition-colors duration-200 group-hover:text-gray-600">
              {isHistoryOpen ? (
                <MdExpandLess className="text-xl" />
              ) : (
                <MdExpandMore className="text-xl" />
              )}
            </div>
          </button>

          {isHistoryOpen && (
            <div className="space-y-4 animate-[fadeIn_0.5s_ease-in-out]">
              {otherCourses.map((courseTime) => (
                <ModernSingleCourseTime
                  key={courseTime._id}
                  courseTime={courseTime}
                  variant="history"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {courseTimes.length === 0 && (
        <div className="rounded-xl bg-gray-50 p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <FaCalendarAlt className="text-2xl text-gray-400" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-600">No Course History</h3>
          <p className="text-gray-500">No courses have been enrolled yet.</p>
        </div>
      )}
    </div>
  );
};

export default ModernCourseTimeShow;
