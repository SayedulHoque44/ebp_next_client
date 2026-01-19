import React, { useContext, useRef, useState } from "react";
import { Button, Image, Modal, Upload } from "antd";
import { TheoryComponent } from "../Theroy";
import { useGetQuizImagesQuery } from "../../../../../redux/Api/QuizImgManagmentApi";
import EBFTextarea from "../../../../../Shared/Components/EBFTextarea";
import EBFrom from "../../../../../Shared/Components/EBFrom";
import EBFSelect from "../../../../../Shared/Components/EBFSelect";
import founderThumb from "../../../../../assets/Images/founderThumb2.jpg";
import {
  useDeleteSingleQuizMutation,
  useUpdateSingleQuizMutation,
} from "../../../../../redux/Api/QuizManagmentApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { PiFileAudioDuotone } from "react-icons/pi";
import {
  EBP_Images_CDN_BaseUrl,
  getFileNameFromCdnUrl,
} from "../../../../../Util/utils";
import TranslationInModal from "../../../../../Shared/Components/Translation";
import { IconUse } from "../../../../../Shared/UI/IconUse";
import { TheoryProvider } from "..";
import TextSpech from "../../../../../Shared/Components/TextSpech";
import { useUplodeSinglePart } from "../../../../../Util/Media";
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
import { useGetTopicsByIdsQuery } from "../../../../../redux/Api/TopicManagmentApi";

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

const QUIZ_IMAGE_QUERY_PARAMS = [
  { name: "page", value: 1 },
  { name: "limit", value: 1000 },
  { name: "sort", value: "-createdAt" },
];

const AUDIO_FOLDER_NAME = "AuthorAudio";

/**
 * Main component for displaying a single quiz card
 */
const SingleQuiz = ({ quiz, cerca, shouldShowLock }) => {
  const { ArgTopicId, _id, answer, question, index, image, authorAudio } = quiz;
  const { isAdmin } = useContext(TheoryProvider);

  const [deleteQuizQuery, { isDeleteArgLoading }] =
    useDeleteSingleQuizMutation();

  const handleDeleteQuiz = (quizId) => {
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
          const deletedQuiz = await deleteQuizQuery(quizId);
          toast.success(deletedQuiz.data.message);
        } catch (error) {
          toast.error(error?.data?.message || "Failed to delete quiz");
        }
      }
    });
  };

  const isCorrect = answer === "V";

  return (
    <article className="mb-6">
      {/* Admin Actions */}
      {isAdmin && (
        <div className="flex justify-end items-center gap-2 mb-4">
          <button
            onClick={() => handleDeleteQuiz(_id)}
            disabled={isDeleteArgLoading}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-50 to-red-50/80 hover:from-red-100 hover:to-red-100/80 text-red-600 hover:text-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
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
          {image && (
            <div className="mb-6 flex justify-center">
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-3 max-w-sm shadow-inner">
                <Image
                  src={image?.imageUrl}
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
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-P-primary/20 to-P-primary/10 flex items-center justify-center shadow-sm">
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
                  <TextSpech text={question} />
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
                    <div
                      className={shouldShowLock ? "pointer-events-none" : ""}
                    >
                      <TranslationInModal
                        component={
                          <button
                            className="group flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
                            aria-label="Translate question"
                            disabled={shouldShowLock}
                          >
                            <img
                              className="h-5 w-5 group-hover:scale-110 transition-transform"
                              src={IconUse?.transImg}
                              alt="Translate"
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
                  <ShowTheoryModal topic={ArgTopicId} cerca={cerca} />
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
};

/**
 * Modal component for displaying theory content
 */
export const ShowTheoryModal = ({ topic, cerca, topicId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use topicId if provided, otherwise use topic prop
  // Only fetch when modal is open to avoid unnecessary API calls
  // Cache results by topicId to avoid refetching the same data
  const { data: topicData, isFetching } = useGetTopicsByIdsQuery(topicId, {
    skip: !topicId || !isModalOpen, // Skip query if topicId is undefined or modal is not open
    refetchOnMountOrArgChange: false, // Use cached data if available for the same topicId
  });
  //console.log(topicData, "topicData");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
            topic={topic || topicData}
            cerca={cerca}
            isFetching={isFetching}
          />
        </div>
      </Modal>
    </>
  );
};

/**
 * Modal component for updating quiz details
 */
const UpdateQuizModal = ({ quiz }) => {
  const { _id, answer, question, image, authorAudio } = quiz;

  const { data: fetchImageData, isImgFetching } = useGetQuizImagesQuery(
    QUIZ_IMAGE_QUERY_PARAMS
  );
  const [updateQuiz] = useUpdateSingleQuizMutation();
  const [loading, setLoading] = useState(false);
  const { uplodeSinglePart } = useUplodeSinglePart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState("");

  const quizImages = fetchImageData?.result || [];
  const imageOptions = quizImages.map((item) => ({
    value: item._id,
    label: item.figure,
  }));

  const handleSubmit = async (quizData) => {
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

      // Update quiz
      const updateResult = await updateQuiz({ quizId: _id, quizData });

      if (updateResult?.data?.success) {
        toast.success(updateResult.data.message);
        closeModal();
      } else if (updateResult.error) {
        throw new Error(updateResult.error.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update quiz");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFile("");
  };

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
            image: image?._id,
          }}
        >
          <div className="space-y-5 pt-2">
            <EBFTextarea
              type="text"
              name="question"
              label="Question"
              rows={4}
            />

            <EBFSelect
              label="Answer"
              name="answer"
              options={ANSWER_OPTIONS}
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
                onChange={(e) => setFile(e.fileList[0]?.originFileObj)}
                listType="picture"
                maxCount={1}
                accept="audio/*"
              >
                <Button
                  className="flex items-center gap-2 h-10"
                  icon={<PiFileAudioDuotone size={18} />}
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
                      EBP_Images_CDN_BaseUrl,
                      AUDIO_FOLDER_NAME,
                      authorAudio
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button onClick={closeModal} disabled={loading} size="large">
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                className="bg-P-primary hover:bg-P-primary/90 shadow-md hover:shadow-lg"
              >
                Update Quiz
              </Button>
            </div>
          </div>
        </EBFrom>
      </Modal>
    </>
  );
};

/**
 * Component for playing author audio
 */
export const AuthorAudioPlay = ({ authorAudio }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAudioEnd = () => setIsPlaying(false);
  const handleAudioPause = () => setIsPlaying(false);

  if (!authorAudio) return null;

  return (
    <>
      <button
        onClick={togglePlayback}
        className="group relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 hover:scale-105 ring-2 ring-offset-2 ring-gray-200 hover:ring-P-primary/30"
        title={isPlaying ? "Pause Audio" : "Play Author Audio"}
        aria-label={isPlaying ? "Pause audio" : "Play author audio"}
      >
        <img
          src={founderThumb}
          className="w-full h-full object-cover"
          alt="Author"
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
};

export default SingleQuiz;
