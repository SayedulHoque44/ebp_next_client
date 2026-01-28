"use client";
import React, { Suspense, useContext, useRef, useState, useMemo, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Image as AntImage, Button, Modal, Select } from "antd";
import { QuizImgHooks } from "@/features/QuizImg/hooks/quizImg.hooks";
import { IQuizImage } from "@/features/QuizImg/interface/quizImg.interface";
import TopicManagementHooks from "@/features/Topic/hooks/topic.hooks";
import { ITopic } from "@/features/Topic/interface/topic.interface";
import toast from "react-hot-toast";
import EBFrom from "@/components/shared/Form/EBFrom";
import EBFSelect from "@/components/shared/Form/EBFSelect";
import EBInput from "@/components/shared/Form/EBInput";
import EBFTextarea from "@/components/shared/Form/EBFTextarea";
import Swal from "sweetalert2";
import TranslationInModal from "@/components/shared/Translation";
// import { IconUse } from "@/components/shared/UI/IconUse";
import { TheoryProvider } from "..";
import TextSpech from "@/components/shared/TextSpech";
import {
  Trash,
  PencilSimple,
  CheckCircle,
  ListChecks,
} from "@phosphor-icons/react";
import useIsLocked from "@/hooks/useIsLocked";
import { LockedOverlay } from "../Arguments/SingleArg";
import { QUERY_KEY } from "@/constants/constendData";
import { useQueryClient } from "@tanstack/react-query";
import { mediaProvider } from "@/constants/mediaProvider";

// Constants
const QUIZ_IMAGE_QUERY_PARAMS = {
  page: 1,
  limit: 1000,
  sort: "-createdAt",
};

/**
 * Helper function to extract theory image IDs
 */
const getTheoryImageIds = (theoryImages: IQuizImage[] | string[] | undefined): string[] => {
  if (!theoryImages) return [];
  return theoryImages.map((image) => {
    if (typeof image === "string") return image;
    return image._id;
  });
};

interface SingleTopicProps {
  topic: ITopic & { index?: number };
  selectable?: boolean;
  isSelected?: boolean;
  onToggleSelect?: (id: string) => void;
}

/**
 * Main component for displaying a single topic card
 */
const SingleTopic = memo(({
  topic,
  selectable = false,
  isSelected = false,
  onToggleSelect,
}: SingleTopicProps) => {
  const queryClient = useQueryClient();
  const { _id, title, index = 0, image, totalQuizzes } = topic;
  const { isTheory, isAdmin } = useContext(TheoryProvider);
  const router = useRouter();
  const actionButtonsRef = useRef<any>(null);
  const isLocked = useIsLocked();

  const deleteTopicMutation = TopicManagementHooks.useDeleteSingleTopic({
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TOPICS] });
        toast.success(response.message);
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: () => {
      toast.error("Action failed");
    },
  });

  // Memoize routing paths
  const routingPath = useMemo(
    () =>
      isTheory
        ? "/dashboard/theory/topics"
        : "/dashboard/adminManagment/quizManagment/topics",
    [isTheory]
  );

  const shouldShowLock = index > 14 && isLocked;

  // Handle navigation to topic detail page
  const handleNavigate = useCallback(() => {
    if (actionButtonsRef.current?.target) return;

    if (selectable && onToggleSelect) {
      onToggleSelect(_id);
      return;
    }

    // For Next.js, pass data via URL params
    router.push(`${routingPath}/${_id}?title=${encodeURIComponent(title)}&index=${index}&shouldShowLock=${shouldShowLock}`);
  }, [selectable, onToggleSelect, _id, routingPath, router, title, index, shouldShowLock]);

  // Handle delete topic
  const handleDeleteTopic = useCallback(
    (topicId: string) => {
      if (deleteTopicMutation.isPending) return;

      Swal.fire({
        title: "Are You Sure?",
        text: "After deletion, you won&apos;t be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteTopicMutation.mutateAsync({ topicId });
        }
      });
    },
    [deleteTopicMutation]
  );

  // Prevent event propagation for action buttons
  const handleActionClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const imageUrl = useMemo(() => {
    if (typeof image === "string") return "";
    return image?.imageUrl || "";
  }, [image]);

  return (
    <article className="mb-6 relative">
      {shouldShowLock && <LockedOverlay />}
      {/* Admin Actions */}
      {isAdmin && (
        <div className="flex justify-end items-center gap-2 mb-4">
          <button
            onClick={() => handleDeleteTopic(_id)}
            disabled={deleteTopicMutation.isPending}
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
          {imageUrl && (
            <div
              className="mb-6 flex justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-3 max-w-sm shadow-inner">
                <AntImage
                  src={imageUrl}
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
                        <Image
                          src={mediaProvider.dashboard.google}
                          alt="Translate"
                          width={20}
                          height={20}
                          className="group-hover:scale-110 transition-transform"
                          unoptimized
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
});

SingleTopic.displayName = "SingleTopic";

interface UpdateTopicModalProps {
  topic: ITopic & { index?: number };
}

/**
 * Modal component for updating topic details
 */
const UpdateTopicModal = memo(({ topic }: UpdateTopicModalProps) => {
  const queryClient = useQueryClient();
  const { _id, title, theory, image, theoryImages, videoUrl } = topic;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [multiSelect, setMultiSelect] = useState<string[]>(
    getTheoryImageIds(theoryImages)
  );

  const { data: fetchImageData, isFetching: isImgFetching } =
    QuizImgHooks.useGetQuizImages({
      queryKey: [QUERY_KEY.QUIZ_IMAGES],
      params: QUIZ_IMAGE_QUERY_PARAMS,
      options: {
        enabled: true,
      },
    });

  const quizImages = useMemo(
    () => fetchImageData?.data?.result || [],
    [fetchImageData?.data?.result]
  );

  const imageOptions = useMemo(
    () =>
      quizImages.map((item: IQuizImage) => ({
        value: item._id,
        label: item.figure,
      })),
    [quizImages]
  );

  const updateTopicMutation = TopicManagementHooks.useUpdateSingleTopic({
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TOPICS] });
        toast.success(response.message);
        closeModal();
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: () => {
      toast.error("Action failed");
    },
  });

  const handleSubmit = useCallback(
    async (data: Partial<ITopic>) => {
      const topicData = { ...data, theoryImages: multiSelect };
      await updateTopicMutation.mutateAsync({
        topicId: _id,
        data: topicData,
      });
    },
    [_id, multiSelect, updateTopicMutation]
  );

  const openModal = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Reset multiSelect to original values
    setMultiSelect(getTheoryImageIds(theoryImages));
  }, [theoryImages]);

  const handleMultiFigSelect = useCallback((value: string[]) => {
    setMultiSelect(value);
  }, []);

  const imageId = useMemo(() => {
    if (typeof image === "string") return image;
    return image?._id || "";
  }, [image]);

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
            image: imageId,
            videoUrl,
          }}
        >
          <div className="space-y-5 pt-2">
            <EBInput type="text" name="title" label="Title" />

            <EBFTextarea name="theory" label="Theory" rows={6} />

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
                aria-label="Select theory figures"
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
              <Button onClick={closeModal} disabled={updateTopicMutation.isPending} size="large">
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={updateTopicMutation.isPending}
                size="large"
                className="bg-P-primary hover:bg-P-primary/90 shadow-md hover:shadow-lg"
                aria-label="Update topic"
              >
                Update Topic
              </Button>
            </div>
          </div>
        </EBFrom>
      </Modal>
    </>
  );
});

UpdateTopicModal.displayName = "UpdateTopicModal";

export default SingleTopic;
