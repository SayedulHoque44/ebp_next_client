"use client";
import React, { useMemo, useState, useEffect, useCallback, startTransition } from "react";
import { Image } from "antd";
import { FaClock } from "react-icons/fa";
import { Lock } from "@phosphor-icons/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  AuthorAudioPlay,
  ShowTheoryModal,
} from "../AdminManagment/QuizManagment/Quizzes/SingleQuiz";
import TextSpech from "@/components/shared/TextSpech";
import TranslationInModal from "@/components/shared/Translation";
import { Pagination } from "antd";
import { BsArrowRight } from "react-icons/bs";
import QuizPlayModal from "@/components/shared/QuizScreen/QuizPlayModal";
import useIsLocked from "@/hooks/useIsLocked";
import QuizHooks from "@/features/Quiz/hooks/quiz.hooks";
import { IGetUserPlayedQuizzesRequest } from "@/features/Quiz/interface/quiz.interfaces";
import { QUERY_KEY } from "@/constants/constendData";
import { mediaProvider } from "@/constants/mediaProvider";

const RipassoErrori = () => {
  const [filterParams, setFilterParams] = useState<
    Array<{ name: string; value: string | number | boolean }>
  >([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const isLocked = useIsLocked();

  // Convert filter params to request object
  const queryParams = useMemo<IGetUserPlayedQuizzesRequest>(() => {
    const requestParams: IGetUserPlayedQuizzesRequest = {
      page,
      limit,
      sort: "-createdAt",
      isCorrect: false,
    };

    filterParams.forEach((param) => {
      if (param.name === "searchTerm") {
        requestParams.searchTerm = param.value as string;
      }
    });

    return requestParams;
  }, [page, limit, filterParams]);

  // Create stable query key
  const queryKey = useMemo(
    () => [
      QUERY_KEY.USER_PLAYED_QUIZZES,
      page,
      limit,
      ...filterParams.map((p) => `${p.name}:${p.value}`),
    ],
    [page, limit, filterParams]
  );

  const {
    data: userQuizPlayed,
    isLoading: isUserQuizPlayedLoading,
    isFetching,
    refetch: refetchUserQuizPlayed,
  } = QuizHooks.useGetUserPlayedQuizzes({
    queryKey: queryKey as any,
    params: queryParams,
    options: {
      refetchOnWindowFocus: true,
    },
  });

  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [shouldFetchQuiz, setShouldFetchQuiz] = useState(false);
  const [newQuizData, setNewQuizData] = useState<any[]>([]);

  const playedQuizData = useMemo(
    () => userQuizPlayed?.data?.result || [],
    [userQuizPlayed]
  );
  const metaData = useMemo(
    () => userQuizPlayed?.data?.meta,
    [userQuizPlayed]
  );

  // Fetch quiz data only when shouldFetchQuiz is true
  const {
    data: randomPlayedQuizData ,
    isLoading: isRandomPlayedQuizLoading,
    isFetching: isRandomPlayedQuizFetching,
    refetch: refetchRandomPlayedQuiz,
  } = QuizHooks.useGetRandomPlayedQuizzes({
    enabled: shouldFetchQuiz,
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    if (filterParams.length > 0 || page !== 1) {
      setTimeout(() => {
        setPage(1);
      }, 0);
    }
  }, [filterParams]); // eslint-disable-line react-hooks/exhaustive-deps

  // Trigger refetch when shouldFetchQuiz becomes true (to get fresh data)
  useEffect(() => {
    if (shouldFetchQuiz && refetchRandomPlayedQuiz) {
      // Small delay to ensure query hook is ready
      const timer = setTimeout(() => {
        refetchRandomPlayedQuiz();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [shouldFetchQuiz, refetchRandomPlayedQuiz]);

  // Update quiz data when query completes
  useEffect(() => {
    if (randomPlayedQuizData?.data?.topicQuizzes && shouldFetchQuiz) {
      setTimeout(() => {
        setNewQuizData(randomPlayedQuizData.data.topicQuizzes);
      }, 0);
    }
  }, [randomPlayedQuizData, shouldFetchQuiz]);

  // Handle modal close - reset state and refetch data
  const handleCloseModal = useCallback(() => {
    setIsQuizModalOpen(false);
    setTimeout(() => {
      setNewQuizData([]);
      setShouldFetchQuiz(false);
      // Refetch user quiz played data to get updated results after completing quiz
      if (refetchUserQuizPlayed) {
        refetchUserQuizPlayed();
      }
    }, 0);
  }, [refetchUserQuizPlayed]);

  // Function to trigger new quiz fetch
  const handleStartQuiz = useCallback(() => {
    setNewQuizData([]); // Clear old data
    setShouldFetchQuiz(true);
    setIsQuizModalOpen(true);
  }, []);

  // Search handler
  const onSearch = useCallback((value: string) => {
    setFilterParams((prev) => {
      const searchItemRemove = prev.filter(
        (item) => item.name !== "searchTerm"
      );
      if (value && value.trim()) {
        return [
          ...searchItemRemove,
          { name: "searchTerm", value: value.trim() },
        ];
      } else {
        return searchItemRemove;
      }
    });
  }, []);

  // Transform playedQuizData to match QuizResult structure
  const transformedQuizData = useMemo(() => {
    return playedQuizData.map((item: any) => ({
      _id: item._id,
      question: item?.quizId?.question || "",
      correctAnswer: item?.quizId?.answer || "",
      userAnswer: item?.givenAnswer || "",
      isCorrect: item?.isCorrect || false,
      authorAudio: item?.quizId?.authorAudio || null,
      ArgTopicId: item?.quizId?.ArgTopicId || null,
      imageUrl: item?.quizId?.image?.imageUrl || null,
      createdAt: item?.createdAt || null,
    }));
  }, [playedQuizData]);

  const getStatus = useCallback((item: any) => {
    const userAnswer =
      item?.userAnswer === undefined || item?.userAnswer === null
        ? ""
        : String(item.userAnswer).trim();
    const correctAnswer =
      item?.correctAnswer === undefined || item?.correctAnswer === null
        ? ""
        : String(item.correctAnswer).trim();

    if (!userAnswer) return "unanswered";
    if (typeof item?.isCorrect === "boolean") {
      return item.isCorrect ? "correct" : "wrong";
    }
    return userAnswer.toLowerCase() === correctAnswer.toLowerCase()
      ? "correct"
      : "wrong";
  }, []);

  const palette = {
    correct: {
      bg: "bg-emerald-50/80",
      text: "text-emerald-900",
      badge: "bg-emerald-100 text-emerald-900",
      ring: "ring-emerald-200/80",
      chip: "bg-emerald-500 text-white",
    },
    wrong: {
      bg: "bg-rose-50/80",
      text: "text-rose-900",
      badge: "bg-rose-100 text-rose-900",
      ring: "ring-rose-200/80",
      chip: "bg-rose-500 text-white",
    },
    unanswered: {
      bg: "bg-slate-50/80",
      text: "text-slate-800",
      badge: "bg-slate-100 text-slate-800",
      ring: "ring-slate-200/80",
      chip: "bg-slate-500 text-white",
    },
  };

  const getAnswerColorClass = useCallback((answer: string) => {
    const normalized = String(answer || "").trim().toLowerCase();
    if (!normalized) return "text-slate-500";
    if (["v", "vero", "true"].includes(normalized)) return "text-emerald-600";
    if (["f", "falso", "false"].includes(normalized)) return "text-rose-600";
    return "text-slate-900";
  }, []);

  const formatDate = useCallback((dateString: string) => {
    if (!dateString) return "N/D";
    try {
      const date = new Date(dateString);
      return date.toLocaleString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "N/D";
    }
  }, []);

  // Skeleton loader component
  const QuizCardSkeleton = () => (
    <div className="relative rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col gap-3 border bg-slate-50/80 border-white/70 backdrop-blur-md ring-1 ring-slate-200/80">
      <div className="absolute -top-1 right-3">
        <Skeleton width={80} height={24} className="rounded-full" />
      </div>
      <div className="flex items-start gap-3">
        <div className="absolute -top-1 md:-top-3 left-0 flex-shrink-0">
          <Skeleton circle width={36} height={36} className="md:w-9 md:h-9" />
        </div>
        <div className="flex-1 space-y-3 ml-10 md:ml-12">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton width={16} height={16} circle />
            <Skeleton width={120} height={16} />
          </div>
          <Skeleton count={2} height={20} />
          <Skeleton height={96} width={96} className="rounded-xl" />
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Skeleton width={150} height={32} className="rounded-lg" />
            <Skeleton width={150} height={32} className="rounded-lg" />
          </div>
          <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
            <Skeleton circle width={40} height={40} />
            <Skeleton circle width={40} height={40} />
            <Skeleton circle width={40} height={40} />
            <Skeleton circle width={40} height={40} />
          </div>
        </div>
      </div>
    </div>
  );

  // Don't show empty state while loading
  const showEmptyState =
    !isFetching && !isUserQuizPlayedLoading && !transformedQuizData.length;

  return (
    <div className="  flex justify-center px-2 sm:px-4 py-5 sm:py-8">
      <div className="w-full max-w-6xl space-y-5 sm:space-y-7">
        <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#b7e4c7]/40 via-white/40 to-[#a5d8ff]/30" />
          <div className="relative p-5 sm:p-7">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-slate-500 font-semibold">
                  Ripasso Errori
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                  I tuoi quiz giocati
                </h2>
                <p className="text-sm text-slate-500">
                  Rivedi le tue risposte e migliora le tue prestazioni
                </p>
              </div>
              {metaData?.total !== undefined && (
                <div className="text-sm text-slate-600 sm:text-right">
                  Totale:{" "}
                  <span className="font-semibold text-slate-800">
                    {metaData.total}
                  </span>{" "}
                  quiz
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-slate-700 font-semibold text-base">
            Le tue risposte
          </h3>
          {isFetching || isUserQuizPlayedLoading ? (
            <div className="space-y-5">
              {[...Array(limit)].map((_, index) => (
                <QuizCardSkeleton key={index} />
              ))}
            </div>
          ) : showEmptyState ? (
            <div className="text-center space-y-4 bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl rounded-2xl px-6 py-8">
              <p className="text-lg font-semibold text-slate-800">
                Nessun quiz giocato disponibile
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {transformedQuizData.map((item: any, index: number) => {
                const status = getStatus(item);
                const colors = palette[status as keyof typeof palette];
                const userAnswer =
                  item?.userAnswer === undefined || item?.userAnswer === null
                    ? ""
                    : String(item.userAnswer).trim();
                const correctAnswer =
                  item?.correctAnswer === undefined ||
                  item?.correctAnswer === null
                    ? ""
                    : String(item.correctAnswer).trim();
                return (
                  <div
                    key={item._id || index}
                    className={`relative rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col gap-3 border ${colors.bg} ${colors.text} border-white/70 backdrop-blur-md ring-1 ${colors.ring}`}
                  >
                    <div className="absolute -top-1 right-3">
                      <span
                        className={`px-2 py-1 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold shadow-sm whitespace-nowrap ${colors.chip}`}
                      >
                        {status === "correct"
                          ? "Corretto"
                          : status === "wrong"
                          ? "Errato"
                          : "Non risposto"}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="absolute -top-1 md:-top-3 text-[10px] sm:text-xs left-0 flex-shrink-0 w-6 h-6 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 text-white flex items-center justify-center font-bold shadow-lg">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2 mb-2">
                          <FaClock className="text-slate-500 text-sm" />
                          <span className="text-xs sm:text-sm text-slate-500">
                            {formatDate(item.createdAt)}
                          </span>
                        </div>
                        <p className="text-base sm:text-lg leading-relaxed break-words whitespace-normal">
                          {item?.question || "Domanda non disponibile"}
                        </p>

                        {item?.imageUrl && (
                          <div className="w-24 h-24 rounded-xl overflow-hidden border border-white/80 bg-white shadow-md">
                            <Image
                              src={item.imageUrl}
                              alt={`Domanda ${index + 1}`}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <span
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
                              colors.badge
                            } shadow-sm ${getAnswerColorClass(correctAnswer)}`}
                          >
                            Risposta corretta: {correctAnswer || "N/D"}
                          </span>
                          <span
                            className={`px-3 py-1.5 rounded-lg bg-white/80 text-sm font-semibold shadow-sm ${getAnswerColorClass(
                              userAnswer
                            )}`}
                          >
                            La tua risposta: {userAnswer || "Non hai risposto"}
                          </span>
                        </div>
                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                          <TextSpech
                            text={item?.question || ""}
                            className="!w-10 !h-10 sm:!w-11 sm:!h-11 md:!w-12 md:!h-12"
                            iconClassName="text-base sm:text-lg md:text-xl"
                          />
                          <div className="relative">
                            {isLocked && (
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
                              className={isLocked ? "pointer-events-none" : ""}
                            >
                              <TranslationInModal
                                component={
                                  <button
                                    className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
                                    aria-label="Translate question"
                                    disabled={isLocked}
                                  >
                                    <Image
                                      width={20}
                                      height={20}
                                      className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform"
                                      src={mediaProvider.dashboard.google.src}
                                      alt="Translate"
                                    />
                                  </button>
                                }
                                text={item?.question || ""}
                              />
                            </div>
                          </div>
                          {item?.ArgTopicId && (
                            <div className="relative transform scale-90 sm:scale-95 md:scale-100 origin-center">
                              {isLocked && (
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
                                className={
                                  isLocked ? "pointer-events-none" : ""
                                }
                              >
                                <ShowTheoryModal topicId={item.ArgTopicId} />
                              </div>
                            </div>
                          )}
                          {item?.authorAudio && (
                            <div className="relative transform scale-90 sm:scale-95 md:scale-100 origin-center">
                              {isLocked && (
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
                                className={
                                  isLocked ? "pointer-events-none" : ""
                                }
                              >
                                <AuthorAudioPlay
                                  authorAudio={item.authorAudio}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {transformedQuizData.length > 0 && (
                <div className="fixed bottom-6 sm:bottom-8 md:bottom-10 right-6 sm:right-8 md:right-10 z-50 cursor-pointer">
                  <div
                    onClick={handleStartQuiz}
                    className="px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-P-primary hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center gap-2 sm:gap-3 transition-all transform hover:scale-105"
                  >
                    <span className="font-medium text-sm sm:text-base">
                      Riprova i Quiz
                    </span>
                    <BsArrowRight size={20} />
                  </div>
                </div>
              )}
              {/* Quiz Play Modal */}
              <QuizPlayModal
                quizData={newQuizData}
                isLoading={
                  isRandomPlayedQuizLoading || isRandomPlayedQuizFetching
                }
                isOpen={isQuizModalOpen}
                onClose={handleCloseModal}
                quizType={"fixed"}
                manualeEnabled={true}
                traduzioneEnabled={true}
              />
            </div>
          )}
        </div>

        {/* Pagination */}
        {metaData?.totalPages && metaData.totalPages > 1 && (
          <div className="flex justify-center pt-4">
            <Pagination
              current={page}
              onChange={(value) => setPage(value)}
              pageSize={limit}
              total={metaData?.total || 0}
              showSizeChanger
              onShowSizeChange={(current, size) => {
                setLimit(size);
                setPage(1);
              }}
              pageSizeOptions={["5", "10", "20", "50"]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RipassoErrori;
