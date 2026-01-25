"use client";
import React, { useContext, useMemo, useState, useCallback, memo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import SingleQuiz from "./SingleQuiz";
import QuizHooks from "@/features/Quiz/hooks/quiz.hooks";
import { IQuiz, IQuizGetQuizzesRequest } from "@/features/Quiz/interface/quiz.interfaces";
import { ITopic } from "@/features/Topic/interface/topic.interface";
import LoaderCircleWithBar from "@/components/shared/LoaderCircleWithBar";
import ErrorAlert from "@/components/shared/Alert/ErrorAlert";
import { Button, Modal, Upload } from "antd";
import { QuizImgHooks } from "@/features/QuizImg/hooks/quizImg.hooks";
import { IQuizImage } from "@/features/QuizImg/interface/quizImg.interface";
import toast from "react-hot-toast";
import EBFTextarea from "@/components/shared/Form/EBFTextarea";
import EBFSelect from "@/components/shared/Form/EBFSelect";
import EBFrom from "@/components/shared/Form/EBFrom";
import { zodResolver } from "@hookform/resolvers/zod";
import { createQuizSchema } from "@/utils/Schemas";
import { PiFileAudioDuotone } from "react-icons/pi";
import { MdQuiz } from "react-icons/md";
import { EBP_Images_CDN_BaseUrl } from "@/utils/utils";
import { TheoryProvider } from "..";
import { QUERY_KEY } from "@/constants/constendData";
import { useQueryClient } from "@tanstack/react-query";
import { useUplodeSinglePart } from "@/hooks/media.hooks";
import EBSearch from "@/components/shared/EBSearch";
import QuizPlayModal, { QuizQuestion } from "@/components/shared/QuizScreen/QuizPlayModal";
import type { UploadFile } from "antd/es/upload/interface";
import { mediaProvider } from "@/constants/mediaProvider";

interface QuizzesProps {
  topic?: ITopic & { index?: number };
}

interface FilterParam {
  name: string;
  value: string | number | boolean;
}

const Quizzes = memo(({ topic }: QuizzesProps) => {
  const params = useParams();
  const topicId = (params?.topicId as string) || topic?._id;
  const { theory, title, index } = topic || {};

  const [filterParams, setFilterParams] = useState<FilterParam[]>([]);
  const { isTheory } = useContext(TheoryProvider);
  const queryClient = useQueryClient();

  // Convert filter params to request object
  const queryParams = useMemo<IQuizGetQuizzesRequest>(() => {
    const requestParams: IQuizGetQuizzesRequest = {
      page: 1,
      limit: 1000,
      sort: "createdAt",
    };

    if (topicId) {
      requestParams.ArgTopicId = topicId;
    }

    filterParams.forEach((param) => {
      if (param.name === "searchTerm") {
        requestParams.searchTerm = param.value as string;
      }
    });

    return requestParams;
  }, [topicId, filterParams]);

  // Create stable query key
  const queryKey = useMemo(
    () => [
      QUERY_KEY.QUIZZES,
      topicId,
      ...filterParams.map((p) => `${p.name}:${p.value}`),
    ],
    [topicId, filterParams]
  );

  const { data, isLoading, isFetching } = QuizHooks.useGetQuizzes({
    queryKey: queryKey as any,
    params: queryParams,
    options: {
      enabled: !!topicId,
    },
  });

  const metaData = useMemo(() => data?.data?.meta || { total: 0 }, [data?.data?.meta]);
  const result = useMemo(() => data?.data?.result || [], [data?.data?.result]);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [randomQuizData, setRandomQuizData] = useState<IQuiz[]>([]);

  const shuffleQuizzes = useCallback((list: IQuiz[]): IQuiz[] => {
    const arr = [...list];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const handleOpenQuiz = useCallback(() => {
    setRandomQuizData(shuffleQuizzes(result));
    setIsQuizModalOpen(true);
  }, [result, shuffleQuizzes]);

  const handleCloseQuiz = useCallback(() => {
    setIsQuizModalOpen(false);
  }, []);

  // Search handler
  const onSearch = useCallback((value: string) => {
    setFilterParams((prev) => {
      const filtered = prev.filter((item) => item.name !== "searchTerm");
      if (!value) return filtered;
      return [...filtered, { name: "searchTerm", value }];
    });
  }, []);

  // Clear filters
  const handleClearFilters = useCallback(() => {
    setFilterParams([]);
  }, []);

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="p-3 bg-P-primary/10 rounded-full text-P-primary">
            <MdQuiz size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Quizzes</h1>
            <p className="text-gray-500 text-sm">
              Total Quizzes:{" "}
              <span className="font-semibold text-gray-800">
                {metaData?.total || 0}
              </span>
            </p>
          </div>
        </div>
        <div>{!isTheory && topic && <CreateQuizModal topic={topic} />}</div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="w-full lg:w-1/3">
            <EBSearch
              placeholder="Search Quizzes..."
              allowClear
              onSearch={onSearch}
              className="w-full"
            />
          </div>
          <div className="flex flex-wrap gap-3 w-full lg:w-2/3 justify-end">
            {filterParams.length > 0 && (
              <Button onClick={handleClearFilters} type="dashed" danger>
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Quiz show */}
      <div className="space-y-5 relative">
        {title && (
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 z-10">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="bg-P-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                {(index ?? 0) + 1}
              </span>
              {title}
            </h2>
          </div>
        )}

        <div className="space-y-5">
          {isFetching ? (
            <LoaderCircleWithBar />
          ) : result?.length > 0 ? (
            result?.map((item, idx) => (
              <SingleQuiz key={item._id || idx} quiz={{ ...item, index: idx }} />
            ))
          ) : (
            <ErrorAlert
              title="Sorry No Data Found!"
              info="Please Check Again Later"
            />
          )}
        </div>
      </div>
      <div
        onClick={handleOpenQuiz}
        className="fixed bottom-6 sm:bottom-8 md:bottom-10 right-6 sm:right-8 md:right-10 z-50 cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleOpenQuiz();
          }
        }}
        aria-label="Play quiz"
      >
        <div className="px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-P-primary hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center gap-2 sm:gap-3 transition-all transform hover:scale-105">
          <Image
            src={mediaProvider.dashboard.question}
            alt="Quiz icon"
            width={24}
            height={24}
            className="object-contain"
            unoptimized
          />
          <span className="font-medium text-sm sm:text-base">Play Quiz</span>
        </div>
      </div>
      {/* Quiz Play Modal */}
      <QuizPlayModal
        quizData={randomQuizData.length ? randomQuizData as QuizQuestion[] : result as QuizQuestion[]}
        isLoading={isLoading || isFetching}
        isOpen={isQuizModalOpen}
        onClose={handleCloseQuiz}
        quizType="fixed"
        manualeEnabled={true}
        traduzioneEnabled={true}
      />
    </div>
  );
});

Quizzes.displayName = "Quizzes";

interface CreateQuizModalProps {
  topic: ITopic;
}

const CreateQuizModal = memo(({ topic }: CreateQuizModalProps) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { uplodeSinglePart, uploading } = useUplodeSinglePart();

  const { data: fetchImageData, isFetching: isImgFetching } =
    QuizImgHooks.useGetQuizImages({
      queryKey: [QUERY_KEY.QUIZ_IMAGES],
      params: {
        page: 1,
        limit: 1000,
        sort: "-createdAt",
      },
      options: {
        enabled: true,
      },
    });

  const AllQuizImgsData = useMemo(
    () => fetchImageData?.data?.result || [],
    [fetchImageData?.data?.result]
  );

  const imagesOptions = useMemo(
    () =>
      AllQuizImgsData.map((item: IQuizImage) => ({
        value: item._id,
        label: item.figure,
      })),
    [AllQuizImgsData]
  );

  const answerOptions = useMemo(
    () => [
      {
        value: "F",
        label: <span className="text-rose-500 font-semibold">F</span>,
      },
      {
        value: "V",
        label: <span className="text-green-500 font-semibold">V</span>,
      },
    ],
    []
  );

  const createQuizMutation = QuizHooks.useCreateQuiz({
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.QUIZZES] });
        toast.success(response.message);
        handleCancel();
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create quiz");
    },
  });

  const handleSubmitFinal = useCallback(
    async (data: Partial<IQuiz>) => {
      if (!topic?.argumentId || !topic?._id) {
        toast.error("Topic information is missing");
        return;
      }

      const quizData: Omit<any, "_id" | "createdAt" | "updatedAt" | "__v"> = {
        argumentId:
          typeof topic.argumentId === "string"
            ? topic.argumentId
            : topic.argumentId._id,
        ArgTopicId: topic._id,
        question: data.question || "",
        answer: (data.answer as "V" | "F") || "F",
        image: data.image || "",
        isDeleted: false,
        ...data,
      };

      setLoading(true);
      try {
        if (file) {
          const folderName = "AuthorAudio";
          const singlePartResult = await uplodeSinglePart({
            file,
            folderName,
          });

          if (singlePartResult.success && singlePartResult.Key) {
            toast.success("File Uploaded Successfully!");
            quizData.authorAudio = `${EBP_Images_CDN_BaseUrl}${singlePartResult.Key}`;
          }
        }

        await createQuizMutation.mutateAsync(quizData);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [file, topic, uplodeSinglePart, createQuizMutation]
  );

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
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

  return (
    <>
      <Button
        className="bg-blue-500 text-white"
        onClick={showModal}
        aria-label="Create new quiz"
      >
        Create Quiz
      </Button>
      <Modal
        title="Create Quiz"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <EBFrom
          reset={true}
          onSubmit={handleSubmitFinal}
          resolver={zodResolver(createQuizSchema)}
        >
          <EBFTextarea name="question" label="Question" />
          <EBFSelect
            label="Answer"
            name="answer"
            options={answerOptions as any}
            placeholder="Select Answer"
          />
          <EBFSelect
            label="Quiz Figure"
            name="image"
            disabled={isImgFetching}
            options={imagesOptions}
            placeholder="Select Figure"
          />
          <div className="mb-5">
            <h2 className="mb-2">Author Audio:</h2>
            <Upload
              beforeUpload={() => false}
              onChange={handleFileChange}
              listType="picture"
              maxCount={1}
              accept="audio/*"
            >
              <Button
                className="flex items-center gap-1"
                aria-label="Upload author audio"
              >
                <PiFileAudioDuotone />
                {file ? `Replace: ${file.name}` : "Upload"}
              </Button>
            </Upload>
          </div>
          <Button
            className="mt-3"
            disabled={createQuizMutation.isPending || loading || (uploading ?? false)}
            htmlType="submit"
            aria-label="Submit quiz creation"
          >
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
});

CreateQuizModal.displayName = "CreateQuizModal";

export default Quizzes;
