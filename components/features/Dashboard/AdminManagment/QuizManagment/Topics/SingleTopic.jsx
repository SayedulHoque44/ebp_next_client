import React, { Suspense, useContext, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Button, Modal, Select } from "antd";
import { useGetQuizImagesQuery } from "../../../../../redux/Api/QuizImgManagmentApi";
import {
  useDeleteSingleTopicMutation,
  useUpdateSingleTopicMutation,
} from "../../../../../redux/Api/TopicManagmentApi";
import toast from "react-hot-toast";
import EBFrom from "../../../../../Shared/Components/EBFrom";
import EBFSelect from "../../../../../Shared/Components/EBFSelect";
import EBInput from "../../../../../Shared/Components/EBInput";
import EBFTextarea from "../../../../../Shared/Components/EBFTextarea";
import Swal from "sweetalert2";
import TranslationInModal from "../../../../../Shared/Components/Translation";
import { IconUse } from "../../../../../Shared/UI/IconUse";
import { TheoryProvider } from "..";
import TextSpech from "../../../../../Shared/Components/TextSpech";
import {
  Trash,
  PencilSimple,
  BookOpen,
  CheckCircle,
  FileText,
  ListChecks,
} from "@phosphor-icons/react";
import useIsLocked from "../../../../../Util/Hooks/useIsLocked";
import { LockedOverlay } from "../Arguments/SingleArg";

// Constants
const QUIZ_IMAGE_QUERY_PARAMS = [
  { name: "page", value: 1 },
  { name: "limit", value: 1000 },
  { name: "sort", value: "-createdAt" },
];

/**
 * Helper function to extract theory image IDs
 */
const getTheoryImageIds = (theoryImages) => {
  return theoryImages?.map((image) => image._id) || [];
};

/**
 * Main component for displaying a single topic card
 */
const SingleTopic = ({
  topic,
  selectable = false,
  isSelected = false,
  onToggleSelect,
}) => {
  const { _id, title, index, image, totalQuizzes } = topic;
  const { isTheory, isAdmin } = useContext(TheoryProvider);
  const navigate = useNavigate();
  const actionButtonsRef = useRef(null);
  const isLocked = useIsLocked();
  const [deleteTopicQuery, { isDeleteTopicLoading }] =
    useDeleteSingleTopicMutation();

  // Memoize routing paths
  const routingPath = useMemo(
    () =>
      isTheory
        ? "/dashboard/theory/topics"
        : "/dashboard/adminManagment/quizManagment/topics",
    [isTheory]
  );

  // Handle navigation to topic detail page
  const handleNavigate = () => {
    if (actionButtonsRef.current?.target) return;

    if (selectable && onToggleSelect) {
      onToggleSelect(_id);
      return;
    }

    navigate(`${routingPath}/${_id}`, {
      state: { topic, shouldShowLock: shouldShowLock },
    });
  };
  const shouldShowLock = index > 14 && isLocked;
  // Handle delete topic
  const handleDeleteTopic = (topicId) => {
    if (isDeleteTopicLoading) return;

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
          const deletedTopic = await deleteTopicQuery(topicId);
          if (deletedTopic?.data?.success) {
            toast.success(deletedTopic.data.message);
          } else {
            toast.error(
              deletedTopic?.data?.message || "Failed to delete topic"
            );
          }
        } catch (error) {
          toast.error(error?.data?.message || "Failed to delete topic");
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
    <article className="mb-6 relative">
      {shouldShowLock && <LockedOverlay />}
      {/* Admin Actions */}
      {isAdmin && (
        <div className="flex justify-end items-center gap-2 mb-4">
          <button
            onClick={() => handleDeleteTopic(_id)}
            disabled={isDeleteTopicLoading}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-50 to-red-50/80 hover:from-red-100 hover:to-red-100/80 text-red-600 hover:text-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            title="Delete Topic"
            aria-label="Delete topic"
          >
            <Trash
              size={18}
              weight="bold"
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-sm font-medium hidden sm:inline">Delete</span>
          </button>
          <UpdateTopicModal topic={topic} />
        </div>
      )}

      {/* Topic Card */}
      <div
        onClick={handleNavigate}
        className={`bg-white border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer ${
          isSelected
            ? "border-emerald-300 ring-2 ring-emerald-200 bg-emerald-50"
            : "border-gray-200"
        }`}
      >
        <div className="p-6 md:p-8">
          {selectable && (
            <div className="flex justify-end mb-2">
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
              className="mb-6 flex justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-3 max-w-sm shadow-inner">
                <Image
                  src={image?.imageUrl}
                  alt="Topic illustration"
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
 * Modal component for updating topic details
 */
const UpdateTopicModal = ({ topic }) => {
  const { _id, title, theory, image, theoryImages, videoUrl } = topic;

  const { data: fetchImageData, isImgFetching } = useGetQuizImagesQuery(
    QUIZ_IMAGE_QUERY_PARAMS
  );
  const [updateTopic, { isLoading }] = useUpdateSingleTopicMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [multiSelect, setMultiSelect] = useState(
    getTheoryImageIds(theoryImages)
  );

  const quizImages = fetchImageData?.result || [];
  const imageOptions = quizImages.map((item) => ({
    value: item._id,
    label: item.figure,
  }));

  const handleSubmit = async (data) => {
    try {
      const topicData = { ...data, theoryImages: multiSelect };
      const updateResult = await updateTopic({
        topicId: _id,
        topicData,
      });

      if (updateResult?.data?.success) {
        toast.success(updateResult.data.message);
        closeModal();
      } else if (updateResult.error) {
        throw new Error(updateResult.error.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update topic");
    }
  };

  const openModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset multiSelect to original values
    setMultiSelect(getTheoryImageIds(theoryImages));
  };

  const handleMultiFigSelect = (value) => {
    setMultiSelect(value);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-blue-50/80 hover:from-blue-100 hover:to-blue-100/80 text-blue-600 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
        title="Edit Topic"
        aria-label="Edit topic"
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
              Update Topic
            </span>
          </div>
        }
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        width={700}
      >
        <EBFrom
          onSubmit={handleSubmit}
          defaultValues={{
            title,
            theory,
            image: image?._id,
            videoUrl,
          }}
        >
          <div className="space-y-5 pt-2">
            <EBInput type="text" name="title" label="Title" />

            <EBFTextarea type="text" name="theory" label="Theory" rows={6} />

            <EBFSelect
              label="Theory Title Figure"
              name="image"
              disabled={isImgFetching}
              options={imageOptions}
              placeholder="Select Figure"
            />

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Select Theory Figures
              </label>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Select Theory Figures"
                onChange={handleMultiFigSelect}
                value={multiSelect}
                disabled={isImgFetching}
                options={imageOptions}
                className="w-full"
              />
            </div>

            <EBInput
              type="text"
              name="videoUrl"
              label="Video URL"
              placeholder="Enter Video URL"
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
                Update Topic
              </Button>
            </div>
          </div>
        </EBFrom>
      </Modal>
    </>
  );
};

export default SingleTopic;
