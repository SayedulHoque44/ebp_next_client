"use client";

import moment from "moment-timezone";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { FcOvertime } from "react-icons/fc";
import { FaCalendarAlt, FaClock, FaPlus } from "react-icons/fa";
import useAuth from "@/features/Auth/hooks/useAuth";
import UserHooks from "@/features/User/hooks/user.hooks";
import { useQueryClient } from "@tanstack/react-query";
import ModernCourseTimeShow from "./CourseTimeShow/ModernCourseTimeShow";
import Button from "@/components/ui/Button";
import GenericModal from "@/components/shared/GenericModal";
import { IProfileUser } from "../types";
import type { IUserCourseTimesRequest } from "@/features/User/interface/user.interface";

const ModernUpdateDuration = ({ singleUser }: { singleUser: IProfileUser }) => {
  const { user: loggedUser } = useAuth();
  const queryClient = useQueryClient();
  const { _id, courseTimes } = singleUser;

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [months, setMonths] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputMode, setInputMode] = useState<"duration" | "endDate">(
    "duration",
  );

  const mutation = UserHooks.useUpdateUserCourseTimesMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["single-user", singleUser._id],
      });
    },
  });

  const handleMonths = (e: React.ChangeEvent<HTMLInputElement>) => {
    const month = e.target.value;
    if (month) {
      setMonths(month);
      setInputMode("duration");
      if (startDate) {
        const newEndDate = moment(startDate).add(Number(month), "months");
        setEndDate(newEndDate.toDate());
      } else {
        setEndDate(null);
      }
    } else {
      setMonths("");
      setEndDate(null);
    }
  };

  const handleStartDate = (date: Date | null) => {
    setStartDate(date);
    if (!date) {
      setEndDate(null);
      setMonths("");
      return;
    }

    if (inputMode === "duration" && months) {
      const newEndDate = moment(date).add(Number(months), "months");
      setEndDate(newEndDate.toDate());
    } else if (inputMode === "endDate" && endDate) {
      const calculatedMonths = moment(endDate).diff(
        moment(date),
        "months",
        true,
      );
      const roundedMonths = Math.round(calculatedMonths * 10) / 10;
      setMonths(roundedMonths > 0 ? String(roundedMonths) : "");
    }
  };

  const handleEndDate = (date: Date | null) => {
    if (date) {
      setEndDate(date);
      setInputMode("endDate");
      if (startDate) {
        const calculatedMonths = moment(date).diff(
          moment(startDate),
          "months",
          true,
        );
        const roundedMonths = Math.round(calculatedMonths * 10) / 10;
        setMonths(roundedMonths > 0 ? String(roundedMonths) : "");
      } else {
        setMonths("");
      }
    } else {
      setEndDate(null);
      setMonths("");
    }
  };

  const resetForm = () => {
    setStartDate(null);
    setEndDate(null);
    setMonths("");
    setInputMode("duration");
  };

  const openModal = () => {
    setIsModalOpen(true);
    resetForm();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdateDuration = async (
    e?: React.FormEvent | { preventDefault: () => void },
  ) => {
    e?.preventDefault?.();

    if (!startDate) {
      return toast.error("Please select start date");
    }
    if (!endDate && !months) {
      return toast.error("Please set either duration or end date");
    }

    let finalEndDate: Date | null = endDate;
    let finalMonths: string | number = months;

    if (months && !endDate) {
      finalEndDate = moment(startDate).add(Number(months), "months").toDate();
    } else if (endDate && !months) {
      const calculatedMonths = moment(endDate).diff(
        moment(startDate),
        "months",
        true,
      );
      finalMonths = Math.round(calculatedMonths * 10) / 10;
    }

    if (!finalEndDate || finalMonths === "" || finalMonths === undefined) {
      return toast.error(
        "Please set both start date and either duration or end date",
      );
    }

    const payload: IUserCourseTimesRequest = {
      courseId: "",
      userId: _id,
      startDate: startDate.toISOString(),
      endDate: finalEndDate.toISOString(),
      durationInMonths: Number(finalMonths),
    };

    try {
      const response = await mutation.mutateAsync(payload);
      toast.success(response.message || "Course duration updated");
      closeModal();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  const isLoading = mutation.isPending;
  const monthsNum = months === "" ? NaN : Number(months);

  return (
    <div className="space-y-6">
      {loggedUser?.role === "Admin" && (
        <Button
          type="button"
          variant="primary"
          onClick={openModal}
          leftIcon={<FcOvertime size={24} />}
          rightIcon={
            <FaPlus className="text-sm transition-transform duration-200 group-hover:rotate-90" />
          }
          className="group flex cursor-pointer items-center gap-3 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl"
        >
          Update Course Duration
        </Button>
      )}

      <div>
        {courseTimes?.length > 0 ? (
          <ModernCourseTimeShow courseTimes={courseTimes} />
        ) : (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <FaClock className="text-2xl text-amber-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-amber-800">
              No Enrolled Courses
            </h3>
            <p className="text-amber-600">
              This user doesn&apos;t have any enrolled courses yet.
            </p>
          </div>
        )}
      </div>

      <GenericModal
        open={isModalOpen}
        onClose={closeModal}
        title={
          <span className="flex items-center gap-3 overflow-hidden">
            <FcOvertime size={20} />
            <span className="text-lg font-bold text-white">
              Update Course Duration
            </span>
          </span>
        }
        width="500px"
        headerStyle={{
          background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
        }}
        actions={[
          {
            key: "cancel",
            label: "Cancel",
            type: "ghost",
            onClick: closeModal,
          },
          {
            key: "update",
            label: isLoading ? "Updating..." : "Update Duration",
            type: "primary",
            loading: isLoading,
            icon: isLoading ? undefined : <FaPlus />,
            onClick: () => {
              void handleUpdateDuration({ preventDefault: () => {} });
            },
            disabled: isLoading || !startDate || (!endDate && !months),
          },
        ]}
      >
        <form onSubmit={handleUpdateDuration} className="space-y-6 p-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
                <FaCalendarAlt className="text-sm text-orange-600" />
              </div>
              Start Date
            </label>
            <DatePicker
              selected={startDate}
              showTimeSelect
              onChange={(date: Date | null) => handleStartDate(date)}
              className="w-full cursor-pointer rounded-xl border-2 border-gray-200 px-4 py-3 transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              placeholderText="Select start date and time"
              dateFormat="MMMM d, yyyy h:mm aa"
              popperProps={{ strategy: "fixed" }}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
                <FaClock className="text-sm text-orange-600" />
              </div>
              Duration (Months)
              <span className="text-xs font-normal text-gray-500">
                {inputMode === "endDate" && endDate && months
                  ? "(Calculated)"
                  : "(Optional - set this or end date)"}
              </span>
            </label>
            <input
              type="number"
              step="0.1"
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              value={months}
              onChange={handleMonths}
              onFocus={() => setInputMode("duration")}
              placeholder="Enter duration in months"
              min={0.1}
              max={60}
              disabled={inputMode === "endDate" && !!endDate}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                <FaCalendarAlt className="text-sm text-red-600" />
              </div>
              End Date
              <span className="text-xs font-normal text-gray-500">
                {inputMode === "duration" && !!months && !!endDate
                  ? "(Calculated)"
                  : "(Optional - set this or duration)"}
              </span>
            </label>
            <DatePicker
              selected={endDate}
              showTimeSelect
              onChange={(date: Date | null) => handleEndDate(date)}
              onFocus={() => setInputMode("endDate")}
              className="w-full cursor-pointer rounded-xl border-2 border-gray-200 px-4 py-3 transition-all duration-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              placeholderText="Select end date and time"
              dateFormat="MMMM d, yyyy h:mm aa"
              minDate={startDate ?? undefined}
              disabled={inputMode === "duration" && !!months}
              popperProps={{ strategy: "fixed" }}
            />
          </div>

          {(startDate || endDate) && (
            <div className="space-y-3 rounded-xl bg-gray-50 p-4">
              <h4 className="font-semibold text-gray-800">
                Course Timeline Preview
              </h4>

              {startDate && (
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="font-medium text-gray-900">
                      {moment(startDate)
                        .local()
                        .format("MMMM D, YYYY h:mm A Z")}
                    </p>
                  </div>
                </div>
              )}

              {endDate && (
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <div>
                    <p className="text-sm text-gray-600">End Date</p>
                    <p className="font-medium text-gray-900">
                      {moment(endDate).local().format("MMMM D, YYYY h:mm A Z")}
                    </p>
                  </div>
                </div>
              )}

              {months !== "" && !Number.isNaN(monthsNum) && (
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-orange-500" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium text-gray-900">
                      {months} {monthsNum === 1 ? "month" : "months"}
                      {inputMode === "endDate" && (
                        <span className="ml-2 text-xs text-gray-500">
                          (calculated)
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </form>
      </GenericModal>
    </div>
  );
};

export default ModernUpdateDuration;
