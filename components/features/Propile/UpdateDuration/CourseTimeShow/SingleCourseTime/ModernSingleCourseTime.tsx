import moment from "moment-timezone";
import type { IconType } from "react-icons";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  FaClock,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPlay,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "@/features/Auth/hooks/useAuth";
import UserHooks from "@/features/User/hooks/user.hooks";
import { useQueryClient } from "@tanstack/react-query";
import { IUserCourse } from "@/features/User/interface/user.interface";

type StatusConfig = {
  icon: IconType;
  bgColor: string;
  textColor: string;
  borderColor: string;
  iconColor: string;
};

const getStatusConfig = (status: string): StatusConfig => {
  switch (status) {
    case "ONGOING":
      return {
        icon: FaPlay,
        bgColor: "bg-green-50",
        textColor: "text-green-800",
        borderColor: "border-green-200",
        iconColor: "text-green-600",
      };
    case "ENDED":
      return {
        icon: FaCheckCircle,
        bgColor: "bg-red-50",
        textColor: "text-red-800",
        borderColor: "border-red-200",
        iconColor: "text-red-600",
      };
    case "UPCOMING":
      return {
        icon: FaExclamationTriangle,
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-800",
        borderColor: "border-yellow-200",
        iconColor: "text-yellow-600",
      };
    default:
      return {
        icon: FaClock,
        bgColor: "bg-gray-50",
        textColor: "text-gray-800",
        borderColor: "border-gray-200",
        iconColor: "text-gray-600",
      };
  }
};

type ModernSingleCourseTimeProps = {
  courseTime: IUserCourse;
  variant?: "current" | "history";
};

const ModernSingleCourseTime = ({ courseTime }: ModernSingleCourseTimeProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const deleteMutation = UserHooks.useDeleteUserCourseTimesMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["single-user", courseTime.userId] });
    },
  });
  const { status, startDate, endDate, durationInMonths, _id } = courseTime;

  const handleDeleteCourseTime = async () => {
    const result = await Swal.fire({
      title: "Delete Course Duration?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;
    try {
      const response = await deleteMutation.mutateAsync({ courseId: _id });
      toast.success(response.message || "Deleted successfully");
    } catch (error: unknown) {
      const message =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      toast.error(message || "Delete failed");
    }
  };

  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;

  const calculateProgress = (): number | null => {
    if (status !== "ONGOING") return null;

    const now = moment();
    const start = moment(startDate);
    const end = moment(endDate);
    const totalDuration = end.diff(start);
    const elapsed = now.diff(start);

    if (elapsed < 0) return 0;
    if (elapsed > totalDuration) return 100;

    return Math.round((elapsed / totalDuration) * 100);
  };

  const progress = calculateProgress();

  return (
    <div
      className={`${statusConfig.bgColor} ${statusConfig.borderColor} rounded-2xl border-2 p-6 transition-all duration-200 hover:shadow-lg`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${statusConfig.bgColor}`}
          >
            <StatusIcon className={`text-xl ${statusConfig.iconColor}`} />
          </div>
          <div>
            <h4 className={`text-lg font-bold ${statusConfig.textColor}`}>{status}</h4>
            <p className="text-sm text-gray-600">
              {durationInMonths} month{durationInMonths !== 1 ? "s" : ""} duration
            </p>
          </div>
        </div>

        {user?.role === "Admin" && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-gray-100 transition-colors duration-200 hover:bg-gray-200"
              title="Edit course duration"
            >
              <MdEdit className="text-sm text-gray-600" />
            </button>
            <button
              type="button"
              onClick={() => void handleDeleteCourseTime()}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-red-100 transition-colors duration-200 hover:bg-red-200"
              title="Delete course duration"
            >
              <MdDelete className="text-sm text-red-600" />
            </button>
          </div>
        )}
      </div>

      {status === "ONGOING" && progress !== null && (
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
            <span>Course Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-green-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
            <FaCalendarAlt className="text-sm text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Start Date</p>
            <p className="font-semibold text-gray-900">
              {moment(startDate).local().format("MMMM D, YYYY")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
            <FaClock className="text-sm text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">End Date</p>
            <p className="font-semibold text-gray-900">
              {moment(endDate).local().format("MMMM D, YYYY")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
            <FaClock className="text-sm text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-semibold text-gray-900">
              {durationInMonths} month{durationInMonths !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {status === "ONGOING" && (
        <div className="mt-4 rounded-lg bg-green-100 p-3">
          <p className="text-sm text-green-800">
            <strong>Active:</strong> This course is currently in progress
          </p>
        </div>
      )}

      {status === "ENDED" && (
        <div className="mt-4 rounded-lg bg-red-100 p-3">
          <p className="text-sm text-red-800">
            <strong>Completed:</strong> This course has finished
          </p>
        </div>
      )}

      {status === "UPCOMING" && (
        <div className="mt-4 rounded-lg bg-yellow-100 p-3">
          <p className="text-sm text-yellow-800">
            <strong>Scheduled:</strong> This course will start soon
          </p>
        </div>
      )}
    </div>
  );
};

export default ModernSingleCourseTime;
