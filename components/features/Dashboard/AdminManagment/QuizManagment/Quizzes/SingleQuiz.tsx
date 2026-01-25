"use client";
import React, { useContext, useRef, useState, useMemo, useCallback, memo, Suspense } from "react";
import { Button, Image as AntImage, Modal, Upload } from "antd";
import Image from "next/image";
import { TheoryComponent } from "../Theroy";
import { QuizImgHooks } from "@/features/QuizImg/hooks/quizImg.hooks";
import { IQuizImage } from "@/features/QuizImg/interface/quizImg.interface";
import EBFTextarea from "@/components/shared/Form/EBFTextarea";
import EBFrom from "@/components/shared/Form/EBFrom";
import EBFSelect from "@/components/shared/Form/EBFSelect";
import QuizHooks from "@/features/Quiz/hooks/quiz.hooks";
import { IQuiz } from "@/features/Quiz/interface/quiz.interfaces";
import { ITopic } from "@/features/Topic/interface/topic.interface";
import TopicManagementHooks from "@/features/Topic/hooks/topic.hooks";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { PiFileAudioDuotone } from "react-icons/pi";
import { EBP_Images_CDN_BaseUrl, getFileNameFromCdnUrl } from "@/utils/utils";
import TranslationInModal from "@/components/shared/Translation";
// import { IconUse } from "@/components/shared/UI/IconUse";
import { TheoryProvider } from "..";
import TextSpech from "@/components/shared/TextSpech";
import { QUERY_KEY } from "@/constants/constendData";
import { useQueryClient } from "@tanstack/react-query";
import { useUplodeSinglePart } from "@/hooks/media.hooks";
import {
  Trash,
  PencilSimple,
  BookOpen,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  Lock,
} from "@phosphor-icons/react";
import type { UploadFile } from "antd/es/upload/interface";
import { mediaProvider } from "@/constants/mediaProvider";

// Constants
const ANSWER_OPTIONS = [
  {
    value: "F",
    label: <span className="text-rose-500 font-semibold">False (F)</span>,
  },
  {
    value: "V",
    label: <span className="text-green-500 font-semibold">True (V)</span>,
  },
];

const QUIZ_IMAGE_QUERY_PARAMS = {
  page: 1,
  limit: 1000,
  sort: "-createdAt",
};

const AUDIO_FOLDER_NAME = "AuthorAudio";

interface SingleQuizProps {
  quiz: IQuiz & { index?: number };
  cerca?: string;
  shouldShowLock?: boolean;
}

/**
 * Main component for displaying a single quiz card
 */
const SingleQuiz = memo(({ quiz, cerca, shouldShowLock }: SingleQuizProps) => {
  const queryClient = useQueryClient();
  const { ArgTopicId, _id, answer, question, index = 0, image, authorAudio } = quiz;
  const { isAdmin } = useContext(TheoryProvider);

  const deleteQuizMutation = QuizHooks.useDeleteSingleQuiz({
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.QUIZZES] });
        toast.success(response.message);
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: () => {
      toast.error("Action failed");
    },
  });

  const handleDeleteQuiz = useCallback(
    (quizId: string) => {
      if (deleteQuizMutation.isPending) return;

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
          await deleteQuizMutation.mutateAsync({ quizId });
        }
      });
    },
    [deleteQuizMutation]
  );

  const isCorrect = answer === "V";

  const imageUrl = useMemo(() => {
    if (typeof image === "string") return "";
    return image?.imageUrl || "";
  }, [image]);

  const topicId = useMemo(() => {
    if (typeof ArgTopicId === "string") return ArgTopicId;
    return ArgTopicId?._id || "";
  }, [ArgTopicId]);

  return (
    <article className="mb-6">
      {/* Admin Actions */}
      {isAdmin && (
        <div className="flex justify-end items-center gap-2 mb-4">
          <button
            onClick={() => handleDeleteQuiz(_id)}
            disabled={deleteQuizMutation.isPending}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-red-50 to-red-50/80 hover:from-red-100 hover:to-red-100/80 text-red-600 hover:text-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            title="Delete Quiz"
            aria-label="Delete quiz"
          >
            <Trash
              size={18}
              weight="bold"
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-sm font-medium hidden sm:inline">Delete</span>
          </button>
          <UpdateQuizModal quiz={quiz} />
        </div>
      )}

      {/* Quiz Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <div className="p-6 md:p-8">
          {/* Quiz Image */}
          {imageUrl && (
            <div className="mb-6 flex justify-center">
              <div className="relative rounded-xl overflow-hidden bg-linear-to-br from-gray-50 to-gray-100 p-3 max-w-sm shadow-inner">
                <AntImage
                  src={imageUrl}
                  alt="Quiz illustration"
                  className="rounded-lg"
                  preview={{
                    mask: "View Image",
                  }}
                />
              </div>
            </div>
          )}

          {/* Question Section */}
          <div className="mb-6">
            <div className="flex items-start gap-4 mb-5">
              <div className="shrink-0 w-10 h-10 rounded-full bg-linear-to-br from-P-primary/20 to-P-primary/10 flex items-center justify-center shadow-sm">
                <span className="text-P-primary font-bold text-base">
                  {index + 1}
                </span>
              </div>
              <h2 className="flex-1 text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 leading-relaxed">
                {question}
              </h2>
            </div>

            {/* Action Buttons */}
            <div
              className="flex flex-wrap items-center gap-3 mb-5"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {!isAdmin && (
                <>
                  <Suspense fallback={<div className="w-11 h-11" />}>
                    <TextSpech text={question} />
                  </Suspense>
                  <div className="relative">
                    {shouldShowLock && (
                      <div className="absolute -top-1 -right-1 z-10 pointer-events-none">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-100/90 flex items-center justify-center shadow-lg border border-amber-300/50">
                          <Lock
                            size={12}
                            weight="fill"
                            className="text-amber-600 opacity-80"
                          />
                        </div>
                      </div>
                    )}
                    <div className={shouldShowLock ? "pointer-events-none" : ""}>
                      <TranslationInModal
                        component={
                          <button
                            className="group flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
                            aria-label="Translate question"
                            disabled={shouldShowLock}
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
                        text={question}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="relative">
                {shouldShowLock && (
                  <div className="absolute -top-1 -right-1 z-10 pointer-events-none">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-100/90 flex items-center justify-center shadow-lg border border-amber-300/50">
                      <Lock
                        size={12}
                        weight="fill"
                        className="text-amber-600 opacity-80"
                      />
                    </div>
                  </div>
                )}
                <div className={shouldShowLock ? "pointer-events-none" : ""}>
                  <ShowTheoryModal topic={ArgTopicId} cerca={cerca} topicId={topicId} />
                </div>
              </div>
              <div className="relative">
                {shouldShowLock && (
                  <div className="absolute -top-1 -right-1 z-10 pointer-events-none">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-100/90 flex items-center justify-center shadow-lg border border-amber-300/50">
                      <Lock
                        size={12}
                        weight="fill"
                        className="text-amber-600 opacity-80"
                      />
                    </div>
                  </div>
                )}
                <div className={shouldShowLock ? "pointer-events-none" : ""}>
                  <AuthorAudioPlay authorAudio={authorAudio} />
                </div>
              </div>
            </div>
          </div>

          {/* Answer Badge */}
          <div className="flex justify-center pt-5 border-t border-gray-100">
            <div
              className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-xl shadow-md font-semibold text-base transition-all duration-200 transform hover:scale-105 ${
                isCorrect
                  ? "bg-gradient-to-r from-green-500 via-green-500 to-emerald-600 text-white shadow-green-200/50"
                  : "bg-gradient-to-r from-red-500 via-red-500 to-rose-600 text-white shadow-red-200/50"
              }`}
            >
              {isCorrect ? (
                <CheckCircle size={22} weight="fill" />
              ) : (
                <XCircle size={22} weight="fill" />
              )}
              <span className="text-lg">{answer}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
});

SingleQuiz.displayName = "SingleQuiz";

interface ShowTheoryModalProps {
  topic?: ITopic | string;
  cerca?: string;
  topicId?: string;
}

/**
 * Modal component for displaying theory content
 */
export const ShowTheoryModal = memo(({ topic, cerca, topicId }: ShowTheoryModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use topicId if provided, otherwise use topic prop
  const resolvedTopicId = useMemo(() => {
    if (topicId) return topicId;
    if (typeof topic === "object" && topic?._id) return topic._id;
    return "";
  }, [topicId, topic]);

  const { data: topicData, isFetching } = TopicManagementHooks.useGetTopicsById({
    queryKey: [QUERY_KEY.TOPICS, resolvedTopicId],
    params: { topicId: resolvedTopicId },
    options: {
      enabled: !!resolvedTopicId && isModalOpen,
      refetchOnMount: false,
    },
  });

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const displayTopic = useMemo(() => {
    if (topicData?.data) return topicData.data;
    if (typeof topic === "object") return topic;
    return undefined;
  }, [topicData?.data, topic]);

  return (
    <>
      <button
        onClick={openModal}
        className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-purple-50 to-purple-100/50 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 shadow-sm hover:shadow-md"
        title="View Theory"
        aria-label="View theory"
      >
        <BookOpen
          size={16}
          weight="bold"
          className="text-purple-600 group-hover:scale-110 transition-transform text-base sm:text-lg"
        />
      </button>

      <Modal
        title={
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <BookOpen size={24} weight="bold" className="text-purple-600" />
            </div>
            <span className="text-xl font-semibold text-gray-800">
              Theory Revision
            </span>
          </div>
        }
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        width={900}
        zIndex={11000}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <div className="max-h-[600px] overflow-y-auto">
          <TheoryComponent
            topic={displayTopic}
            cerca={cerca}
            isFetching={isFetching}
          />
        </div>
      </Modal>
    </>
  );
});

ShowTheoryModal.displayName = "ShowTheoryModal";

interface UpdateQuizModalProps {
  quiz: IQuiz & { index?: number };
}

/**
 * Modal component for updating quiz details
 */
const UpdateQuizModal = memo(({ quiz }: UpdateQuizModalProps) => {
  const queryClient = useQueryClient();
  const { _id, answer, question, image, authorAudio } = quiz;
  const [loading, setLoading] = useState(false);
  const { uplodeSinglePart, uploading } = useUplodeSinglePart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

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

  const updateQuizMutation = QuizHooks.useUpdateSingleQuiz({
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.QUIZZES] });
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
    async (quizData: Partial<IQuiz>) => {
      try {
        setLoading(true);

        // Upload audio file if provided
        if (file) {
          const uploadResult = await uplodeSinglePart({
            file,
            folderName: AUDIO_FOLDER_NAME,
          });

          if (uploadResult.success && uploadResult.Key) {
            toast.success("Audio file uploaded successfully!");
            quizData.authorAudio = `${EBP_Images_CDN_BaseUrl}${uploadResult.Key}`;
          }
        }

        await updateQuizMutation.mutateAsync({
          quizId: _id,
          data: quizData,
        });
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [file, _id, uplodeSinglePart, updateQuizMutation]
  );

  const openModal = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setFile(null);
  }, []);

  const handleFileChange = useCallback(
    (info: { fileList: UploadFile[] }) => {
      const fileObj = info.fileList[0]?.originFileObj;
      if (fileObj instanceof File) {
        setFile(fileObj);
      } else {
        setFile(null);
      }
    },
    []
  );

  const imageId = useMemo(() => {
    if (typeof image === "string") return image;
    return image?._id || "";
  }, [image]);

  const hasExistingAudio = authorAudio && authorAudio.length > 10 && !file;

  return (
    <>
      <button
        onClick={openModal}
        className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-blue-50/80 hover:from-blue-100 hover:to-blue-100/80 text-blue-600 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
        title="Edit Quiz"
        aria-label="Edit quiz"
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
              Update Quiz
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
            question,
            answer,
            image: imageId,
          }}
        >
          <div className="space-y-5 pt-2">
            <EBFTextarea name="question" label="Question" rows={4} />

            <EBFSelect
              label="Answer"
              name="answer"
              options={ANSWER_OPTIONS as any}
              placeholder="Select Answer"
            />

            <EBFSelect
              label="Quiz Image"
              name="image"
              disabled={isImgFetching}
              options={imageOptions}
              placeholder="Select Figure"
            />

            {/* Audio Upload Section */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Author Audio
              </label>
              <Upload
                beforeUpload={() => false}
                onChange={handleFileChange}
                listType="picture"
                maxCount={1}
                accept="audio/*"
              >
                <Button
                  className="flex items-center gap-2 h-10"
                  icon={<PiFileAudioDuotone size={18} />}
                  aria-label="Upload audio file"
                >
                  {file ? `Replace: ${file.name}` : "Upload Audio"}
                </Button>
              </Upload>

              {hasExistingAudio && (
                <div className="mt-3 p-4 flex items-center gap-3 border-2 border-blue-200 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100/50 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                    <PiFileAudioDuotone size={20} className="text-blue-700" />
                  </div>
                  <span className="text-sm text-blue-800 font-semibold flex-1">
                    {getFileNameFromCdnUrl(
                      EBP_Images_CDN_BaseUrl || "",
                      AUDIO_FOLDER_NAME,
                      authorAudio
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button onClick={closeModal} disabled={loading || updateQuizMutation.isPending} size="large">
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading || updateQuizMutation.isPending || (uploading ?? false)}
                size="large"
                className="bg-P-primary hover:bg-P-primary/90 shadow-md hover:shadow-lg"
                aria-label="Update quiz"
              >
                Update Quiz
              </Button>
            </div>
          </div>
        </EBFrom>
      </Modal>
    </>
  );
});

UpdateQuizModal.displayName = "UpdateQuizModal";

interface AuthorAudioPlayProps {
  authorAudio?: string;
}

/**
 * Component for playing author audio
 */
export const AuthorAudioPlay = memo(({ authorAudio }: AuthorAudioPlayProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const handleAudioEnd = useCallback(() => setIsPlaying(false), []);
  const handleAudioPause = useCallback(() => setIsPlaying(false), []);

  if (!authorAudio) return null;

  return (
    <>
      <button
        onClick={togglePlayback}
        className="group relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 hover:scale-105 ring-2 ring-offset-2 ring-gray-200 hover:ring-P-primary/30"
        title={isPlaying ? "Pause Audio" : "Play Author Audio"}
        aria-label={isPlaying ? "Pause audio" : "Play author audio"}
      >
        <Image
          src={mediaProvider.founderThumb2}
          className="w-full h-full object-cover"
          alt="Author"
          width={44}
          height={44}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50 group-hover:from-black/40 group-hover:to-black/60 transition-all flex items-center justify-center">
          {isPlaying ? (
            <Pause size={14} weight="fill" className="text-white" />
          ) : (
            <Play size={14} weight="fill" className="text-white ml-0.5" />
          )}
        </div>
      </button>
      <audio
        ref={audioRef}
        onEnded={handleAudioEnd}
        onPause={handleAudioPause}
        className="hidden"
      >
        <source src={authorAudio} type="audio/mpeg" />
      </audio>
    </>
  );
});

AuthorAudioPlay.displayName = "AuthorAudioPlay";

export default SingleQuiz;
