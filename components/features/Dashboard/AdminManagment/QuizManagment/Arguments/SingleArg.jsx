import React, { Suspense, useContext, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import lock from "../../../../../assets/Images/padlock.png";
import toast from "react-hot-toast";
import EBFrom from "../../../../../Shared/Components/EBFrom";
import { useGetQuizImagesQuery } from "../../../../../redux/Api/QuizImgManagmentApi";
import {
  useDeleteSingleArgMutation,
  useUpdateSingleArgumentMutation,
} from "../../../../../redux/Api/ArgManagmentApi";
import EBFSelect from "../../../../../Shared/Components/EBFSelect";
import EBInput from "../../../../../Shared/Components/EBInput";
import { Button, Modal } from "antd";
import Swal from "sweetalert2";
import TextSpech from "../../../../../Shared/Components/TextSpech";
import { IconUse } from "../../../../../Shared/UI/IconUse";
import TranslationInModal from "../../../../../Shared/Components/Translation";
import { TheoryProvider } from "..";
import useIsLocked from "../../../../../Util/Hooks/useIsLocked";
import {
  Trash,
  PencilSimple,
  Lock,
  FileText,
  CheckCircle,
  ListChecks,
} from "@phosphor-icons/react";

// Constants
const QUIZ_IMAGE_QUERY_PARAMS = [
  { name: "page", value: 1 },
  { name: "limit", value: 1000 },
  { name: "sort", value: "-createdAt" },
];

const LOCKED_MESSAGE = {
  title: "আপনাকে কোর্সটা কিনতে হবে।",
  phone: "+39 320 608 8871",
};

export const LockedOverlay = () => {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-white/40 backdrop-blur-sm rounded-2xl border-2 border-amber-200">
      <div className="flex flex-col items-center gap-3 p-6">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center shadow-lg">
          <Lock size={32} weight="fill" className="text-amber-600" />
        </div>
        <div className="text-center">
          <h3 className="font-bold text-lg text-gray-800 mb-1">
            {LOCKED_MESSAGE.title}
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            {LOCKED_MESSAGE.phone}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Main component for displaying a single argument card
 */
const SingleArg = ({
  argument,
  onToggleSelect,
  isSelected = false,
  selectable = false,
}) => {
  const { _id, image, title, index, totalQuizzes } = argument;
  const { isTheory, isAdmin } = useContext(TheoryProvider);
  const navigate = useNavigate();
  const actionButtonsRef = useRef(null);

  const [deleteArgumentQuery, { isDeleteArgLoading }] =
    useDeleteSingleArgMutation();

  // Check if argument is locked using global hook
  const isLocked = useIsLocked();

  // Memoize routing paths
  const routingPath = useMemo(
    () =>
      isTheory
        ? "/dashboard/theory/argument"
        : "/dashboard/adminManagment/quizManagment/argument",
    [isTheory]
  );

  const shouldShowLock = index > 1 && isLocked;

  // Handle navigation or selection
  const handleClick = () => {
    if (actionButtonsRef.current?.target) return;

    if (selectable && onToggleSelect) {
      onToggleSelect(_id);
      return;
    }

    navigate(`${routingPath}/${_id}`, {
      state: {
        argumentTitle: `${index + 1}. ${title}`,
        argumentIndex: index,
        shouldShowLock: shouldShowLock,
      },
    });
  };

  // Handle delete argument
  const handleDeleteArgument = (argId) => {
    if (isDeleteArgLoading) return;

    Swal.fire({
      title: "Are You Sure?",
      text: "After deletion, you won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deletedArg = await deleteArgumentQuery(argId);
          if (deletedArg?.data?.success) {
            toast.success(deletedArg.data.message);
          } else {
            toast.error(
              deletedArg?.data?.message || "Failed to delete argument"
            );
          }
        } catch (error) {
          toast.error(error?.data?.message || "Failed to delete argument");
        }
      }
    });
  };

  // Prevent event propagation for action buttons
  const handleActionClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <article className="relative mb-6">
      {/* Lock Overlay */}
      {shouldShowLock && <LockedOverlay />}

      {/* Admin Actions */}
      {isAdmin && (
        <div className="flex justify-end items-center gap-2 mb-4">
          <button
            onClick={() => handleDeleteArgument(_id)}
            disabled={isDeleteArgLoading}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-50 to-red-50/80 hover:from-red-100 hover:to-red-100/80 text-red-600 hover:text-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            title="Delete Argument"
            aria-label="Delete argument"
          >
            <Trash
              size={18}
              weight="bold"
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-sm font-medium hidden sm:inline">Delete</span>
          </button>
          <UpdateArgumentModal argument={argument} />
        </div>
      )}

      {/* Argument Card */}
      <div
        onClick={handleClick}
        className={`border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer ${
          isSelected
            ? "border-emerald-300 ring-2 ring-emerald-200 bg-emerald-50"
            : "border-gray-200 bg-white"
        }`}
      >
        <div className="p-6 md:p-8">
          {selectable && (
            <div className="flex justify-between items-center mb-2">
              {/* <div className="text-sm font-semibold text-gray-600">
                {index + 1}
              </div> */}
              {isSelected && (
                <CheckCircle
                  size={22}
                  weight="fill"
                  className="text-emerald-500 drop-shadow-sm"
                />
              )}
            </div>
          )}
          {/* Image Section */}
          {image && (
            <div
              className="mb-6 flex justify-center "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-3 max-w-sm shadow-inner">
                <Image
                  src={image?.imageUrl}
                  alt="Argument illustration"
                  className="rounded-lg"
                  preview={{
                    mask: "View Image",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="mb-6">
            <div className="flex items-start gap-4 mb-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-P-primary/20 to-P-primary/10 flex items-center justify-center shadow-sm">
                <span className="text-P-primary font-bold text-base">
                  {index + 1}
                </span>
              </div>
              <h2 className="flex-1 text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 leading-relaxed">
                {title}
              </h2>
            </div>

            {/* Action Buttons */}
            {!isAdmin && (
              <div className="inline-block">
                <div
                  ref={actionButtonsRef}
                  className="flex flex-wrap items-center gap-3 mb-5"
                  onClick={handleActionClick}
                >
                  <Suspense fallback={<div className="w-11 h-11" />}>
                    <TextSpech text={title} />
                  </Suspense>
                  <TranslationInModal
                    component={
                      <button
                        className="group flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 shadow-sm hover:shadow-md"
                        aria-label="Translate title"
                      >
                        <img
                          className="h-5 w-5 group-hover:scale-110 transition-transform"
                          src={IconUse.transImg}
                          alt="Translate"
                        />
                      </button>
                    }
                    text={title}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Quiz Count Badge */}
          <div className="flex justify-center pt-4 sm:pt-5 border-t border-gray-100">
            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-P-primary/10 to-purple-50/50 border border-P-primary/20 shadow-sm hover:shadow transition-all">
              <ListChecks
                size={16}
                weight="bold"
                className="text-P-primary flex-shrink-0"
              />
              <span className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                {totalQuizzes || 0} Quiz
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

/**
 * Modal component for updating argument details
 */
const UpdateArgumentModal = ({ argument }) => {
  const { _id, title, image } = argument;

  const { data: fetchImageData, isImgFetching } = useGetQuizImagesQuery(
    QUIZ_IMAGE_QUERY_PARAMS
  );
  const [updateArgument, { isLoading }] = useUpdateSingleArgumentMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quizImages = fetchImageData?.result || [];
  const imageOptions = quizImages.map((item) => ({
    value: item._id,
    label: item.figure,
  }));

  const handleSubmit = async (data) => {
    try {
      const updateResult = await updateArgument({
        argId: _id,
        argData: data,
      });

      if (updateResult?.data?.success) {
        toast.success(updateResult.data.message);
        closeModal();
      } else if (updateResult.error) {
        throw new Error(updateResult.error.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update argument");
    }
  };

  const openModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-blue-50/80 hover:from-blue-100 hover:to-blue-100/80 text-blue-600 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
        title="Edit Argument"
        aria-label="Edit argument"
      >
        <PencilSimple
          size={18}
          weight="bold"
          className="group-hover:scale-110 transition-transform"
        />
        <span className="text-sm font-medium hidden sm:inline">Edit</span>
      </button>

      <Modal
        title={
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <PencilSimple size={24} weight="bold" className="text-blue-600" />
            </div>
            <span className="text-xl font-semibold text-gray-800">
              Update Argument
            </span>
          </div>
        }
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        width={600}
      >
        <EBFrom
          onSubmit={handleSubmit}
          defaultValues={{
            title: title,
            image: image?._id,
          }}
        >
          <div className="space-y-5 pt-2">
            <EBInput type="text" name="title" label="Title" />

            <EBFSelect
              label="Argument Figure"
              name="image"
              disabled={isImgFetching}
              options={imageOptions}
              placeholder="Select Figure"
            />

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button onClick={closeModal} disabled={isLoading} size="large">
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                size="large"
                className="bg-P-primary hover:bg-P-primary/90 shadow-md hover:shadow-lg"
              >
                Update Argument
              </Button>
            </div>
          </div>
        </EBFrom>
      </Modal>
    </>
  );
};

export default SingleArg;
