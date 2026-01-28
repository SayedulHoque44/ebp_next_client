import React, { useState, useEffect, useRef, useMemo, startTransition } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  AuthorAudioPlay,
  ShowTheoryModal,
} from "@/components/features/Dashboard/AdminManagment/QuizManagment/Quizzes/SingleQuiz";
import TextSpech from "@/components/shared/TextSpech";
import TranslationInModal from "../Translation";
import Logo from "../Logo";
import QuizResult from "./QuizResult";
import { Image as AntdImage } from "antd";
import Image from "next/image";
import { mediaProvider } from "@/constants/mediaProvider";


export interface QuizQuestion {
  _id?: string;
  ArgTopicId? : string;
  argumentId?: string;
  question: string;
  answer?: string | boolean;
  image?: {
    imageUrl?: string;
  };
  imageUrl?: string;
  figure?: string;
  authorAudio?: string;
}

interface QuizPlayModalProps {
  isOpen: boolean;
  onClose?: () => void;
  quizType?: "fixed" | "personalized";
  manualeEnabled?: boolean;
  traduzioneEnabled?: boolean;
  quizData?: QuizQuestion[];
  isLoading?: boolean;
}

const QuizPlayModal: React.FC<QuizPlayModalProps> = ({
  isOpen,
  onClose,
  quizType = "fixed",
  manualeEnabled = true,
  traduzioneEnabled = true,
  quizData = [],
  isLoading = false,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(20 * 60); // 20 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [showQuestionList, setShowQuestionList] = useState<boolean>(false);
  const [showConfirmEnd, setShowConfirmEnd] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const numberRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevQuizDataRef = useRef<QuizQuestion[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = quizData.slice(0, 30) || [];
  const currentQuestion = questions[currentQuestionIndex];
  //console.log(currentQuestion,"currentQuestion");

  // Reset quiz state when modal opens - ensures fresh start every time
  useEffect(() => {
    if (isOpen) {
      // Reset all quiz state when modal opens
      startTransition(() => {
        setCurrentQuestionIndex(0);
        setAnswers({});
        setTimeRemaining(20 * 60); // Always start from 20 minutes
        setIsTimerRunning(true);
        setCurrentSection(0);
        setShowResult(false);
        setShowConfirmEnd(false);
      });
      // Update ref to track current quiz data
      prevQuizDataRef.current = quizData;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // Only depend on isOpen to reset when modal opens/closes

  // Reset quiz state when new quiz data arrives while modal is open
  useEffect(() => {
    if (!isOpen) return;
    
    const hasNewQuizData = 
      quizData && 
      quizData.length > 0 && 
      prevQuizDataRef.current.length !== quizData.length;
    
    if (hasNewQuizData) {
      prevQuizDataRef.current = quizData;
      startTransition(() => {
        setCurrentQuestionIndex(0);
        setAnswers({});
        setTimeRemaining(20 * 60);
        setIsTimerRunning(true);
        setCurrentSection(0);
      });
    }
  }, [quizData, isOpen]);

  // Fetch image for current question - MUST be called before any conditional returns
  // const { data: imageData } = useGetImageMetabyIdQuery(currentQuestion?.image, {
  //   skip: !currentQuestion?.image || !isOpen,
  // });

  // const imageUrl = imageData?.data?.figure
  //   ? `${EBP_Images_CDN_BaseUrl}${imageData.data.figure}`
  //   : null;

  const imageUrl = currentQuestion?.image?.imageUrl;

  // Timer effect - MUST be called before any conditional returns
  useEffect(() => {
    if (!isOpen || !isTimerRunning) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isTimerRunning]);

  // Prevent closing modal accidentally - MUST be called before any conditional returns
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";
      // Prevent ESC key from closing
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen]);
  //console.log(currentQuestion, "currentQuestion");

  // Derived data - must stay before any conditional returns to keep hook order stable
  const elapsedTime = useMemo(() => {
    const totalDuration = 20 * 60;
    return Math.max(totalDuration - timeRemaining, 0);
  }, [timeRemaining]);

  const resultData = useMemo(() => {
    return questions.map((q, idx): {
      _id?: string;
      ArgTopicId?: string;
      argumentId?: string;
      question: string;
      correctAnswer: string;
      userAnswer: string;
      imageUrl: string | null;
      authorAudio?: string;
      isCorrect: boolean | null;
    } => {
      const correctRaw = q?.answer ?? "";

      const correctAnswer =
        typeof correctRaw === "boolean"
          ? correctRaw
            ? "V"
            : "F"
          : String(correctRaw || "").trim();

      const userAnswerRaw = answers[idx] ?? "";
      const userAnswer =
        typeof userAnswerRaw === "boolean"
          ? userAnswerRaw
            ? "V"
            : "F"
          : String(userAnswerRaw || "").trim();

      const isCorrect =
        userAnswer && correctAnswer
          ? userAnswer.toLowerCase() === correctAnswer.toLowerCase()
          : null;

      return {
        _id: q?._id,
        ArgTopicId: q?.ArgTopicId,
        argumentId: q?.argumentId,
        question: q?.question,
        correctAnswer,
        userAnswer,
        imageUrl: q?.image?.imageUrl || q?.imageUrl || q?.figure || null,
        authorAudio: q?.authorAudio,
        isCorrect,
      };
    });
  }, [questions, answers]);

  // Personalization flags (only applied for personalized mode)
  const showTheory = quizType === "personalized" ? manualeEnabled : true;
  const showTranslation =
    quizType === "personalized" ? traduzioneEnabled : true;

  // Don't render anything if modal is not open - check this first
  if (!isOpen) return null;

  // Show loading state - AFTER all hooks
  if (isLoading) {
    return (
      <div
        className="fixed inset-0 z-1000 bg-[#cfe6d6] overflow-y-auto "
        style={{ margin: 0 }}
      >
        <div className="h-full max-w-7xl mx-auto flex flex-col p-4 space-y-3 px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 md:py-5 lg:py-6">
          {/* Header Skeleton */}
          <div className="flex items-center gap-1 md:gap-4 justify-between">
            <Skeleton circle width={56} height={56} />
            <div className="text-center">
              <Skeleton width={120} height={30} />
            </div>
            <Skeleton width={80} height={20} />
            <Skeleton circle width={40} height={40} />
          </div>

          {/* Sections Skeleton */}
          <div className="px-1 sm:px-2 md:px-4 lg:px-6">
            <div className="grid grid-cols-3 gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 justify-center">
              {[1, 2, 3].map((idx) => (
                <Skeleton key={idx} width={120} height={36} borderRadius={4} />
              ))}
            </div>
          </div>

          {/* Question Numbers Skeleton */}
          <div className="px-1 sm:px-2 md:px-4 lg:px-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 justify-center min-w-max">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((idx) => (
                <Skeleton key={idx} circle width={40} height={40} />
              ))}
            </div>
          </div>

          {/* Question Numbers Navigation Skeleton */}
          <div className="sm:block px-1 sm:px-2 md:px-4 lg:px-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-0.5 sm:gap-1 justify-center min-w-max">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((idx) => (
                <Skeleton key={idx} circle width={40} height={40} />
              ))}
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1 overflow-x-hidden">
            <div className="flex justify-center items-center flex-1 mx-auto h-full">
              <div className="flex-1 flex flex-col h-full">
                <div className="flex flex-1 flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
                  {/* Image Skeleton */}
                  <div className="shrink-0 w-[35%] sm:w-[36%] md:w-[37%] lg:w-[38%] bg-white rounded-lg p-2 sm:p-3 md:p-4 lg:p-6 shadow-sm flex items-center justify-center">
                    <Skeleton height={400} borderRadius={8} />
                  </div>

                  {/* Question and Answers Skeleton */}
                  <div className="flex-1 min-w-0 flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                    {/* Question Skeleton */}
                    <div className="bg-white flex-1 rounded-lg p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 shadow-sm min-h-[200px] sm:min-h-[220px] md:min-h-[240px] lg:min-h-[260px] flex flex-col">
                      <div className="mb-3 pb-3 sm:mb-4 md:mb-5 flex justify-end border-b border-gray-300">
                        <Skeleton width={100} height={24} />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 mb-3 sm:mb-4 md:mb-5 flex-1">
                          <div className="flex-1 space-y-3">
                            <Skeleton height={20} />
                            <Skeleton height={20} width="90%" />
                            <Skeleton height={20} width="80%" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                          <Skeleton circle width={48} height={48} />
                          <Skeleton circle width={48} height={48} />
                          <Skeleton circle width={48} height={48} />
                        </div>
                      </div>
                    </div>

                    {/* Answers Skeleton */}
                    <div className="bg-white rounded-lg p-2 sm:p-3 md:p-4 lg:p-6 shadow-sm">
                      <div className="flex justify-center items-center gap-4">
                        <div className="flex flex-col items-center gap-2 sm:gap-2.5 md:gap-3">
                          <Skeleton width={60} height={20} />
                          <Skeleton width={96} height={96} borderRadius={4} />
                        </div>
                        <div className="flex flex-col items-center gap-2 sm:gap-2.5 md:gap-3">
                          <Skeleton width={60} height={20} />
                          <Skeleton width={96} height={96} borderRadius={4} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {/* Timer and Navigation Skeleton */}
                  <div className="flex flex-row items-center justify-between gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-3 sm:py-3.5 md:py-4">
                    <div className="bg-white flex flex-col items-center justify-center rounded-lg px-1 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-2.5 md:py-3 lg:py-3.5 border border-gray-300 shadow-sm">
                      <Skeleton
                        width={120}
                        height={16}
                        className="mb-1 sm:mb-1.5"
                      />
                      <Skeleton width={100} height={32} />
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Skeleton circle width={48} height={48} />
                      <Skeleton circle width={48} height={48} />
                      <Skeleton width={80} height={36} borderRadius={8} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state only if we have attempted to load and have no data
  if (questions.length === 0 && !isLoading) {
    return (
      <div className="fixed inset-0 z-9999 bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Nessun quiz disponibile</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-P-primary text-white rounded-lg hover:bg-primary-600"
          >
            Chiudi
          </button>
        </div>
      </div>
    );
  }

  // Format time as MM : SS (with spaces around colon)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")} : ${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (answer: string): void => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));

    // Auto-advance to the next question after selection (if available)
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        goToQuestion(currentQuestionIndex + 1);
      }, 200);
    }
  };

  // Navigation functions
  const goToQuestion = (index: number): void => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
      setCurrentSection(Math.floor(index / 10));
      // Smooth scroll the selected question number into view
      const target = numberRefs.current[index];
      if (target?.scrollIntoView) {
        target.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      goToQuestion(currentQuestionIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      goToQuestion(currentQuestionIndex + 1);
    }
  };

  // Get question status
  const getQuestionStatus = (index: number): "current" | "answered" | "unanswered" => {
    if (index === currentQuestionIndex) return "current";
    if (answers[index]) return "answered";
    return "unanswered";
  };

  // Sections (10 questions each)
  // Sections are dynamic based on total questions (chunks of 10)
  const totalQuestions = questions.length;
  const sectionCount = Math.ceil(totalQuestions / 10);
  const sections =
    sectionCount > 0
      ? Array.from({ length: sectionCount }, (_, idx) => {
          const start = idx * 10 + 1;
          const end = Math.min((idx + 1) * 10, totalQuestions);
          return {
            start,
            end,
            label: `Domande da ${start} a ${end}`,
          };
        })
      : [];

  // Active section range (used for section-scoped tabs)
  const sectionStart = sections[currentSection]?.start || 1;
  const sectionEnd = sections[currentSection]?.end || questions.length;

  // Check if quiz is completed (all questions answered)
  const isQuizCompleted =
    questions.length > 0 && Object.keys(answers).length === questions.length;

  const confirmEndQuiz = () => {
    setIsTimerRunning(false);
    setShowConfirmEnd(false);
    setShowResult(true);
  };

  const handleClose = () => {
    if (showResult) {
      setShowResult(false);
      onClose?.();
      return;
    }
    if (isQuizCompleted) {
      onClose?.();
    } else {
      // Show confirmation if quiz is not completed
      setShowConfirmEnd(true);
    }
  };

  const handleEndQuiz = () => {
    setShowConfirmEnd(true);
  };

  if (showResult) {
    return (
      <div
        className="fixed inset-0 z-1000 bg-green-50 overflow-y-auto "
        style={{ margin: 0 }}
      >
        <QuizResult
          // @ts-expect-error - QuizResult component needs proper TypeScript types
          quizData={resultData}
          timeTakenSeconds={elapsedTime}
          showTranslation={traduzioneEnabled}
          showTheory={manualeEnabled}
          onClose={() => {
            setShowResult(false);
            onClose?.();
          }}
          onRetry={() => {
            setShowResult(false);
            setCurrentQuestionIndex(0);
            setAnswers({});
            setTimeRemaining(20 * 60);
            setIsTimerRunning(true);
            setCurrentSection(0);
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-1000 bg-[#cfe6d6]  overflow-y-auto m-0"
      style={{ margin: 0 }}
      onClick={(e) => {
        // Prevent closing by clicking outside
        e.stopPropagation();
      }}
    >
      <div className="h-full max-w-7xl mx-auto flex flex-col p-4 space-y-3 px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 md:py-5 lg:py-6 ">
        <div className="flex items-center gap-1 md:gap-4 justify-between r">
          <AntdImage
            src={mediaProvider.dashboard.rpi.src}
            alt="R-P-I"
            className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14"
          
          />

          <div className="text-center leading-tight">
            <h2 className="font-extrabold uppercase tracking-[0.08em]">
              <span className="block text-[#6c8b7c] drop-shadow-[0_2px_2px_rgba(0,0,0,0.28)]">
                Scheda
              </span>
              <span className="block text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.32)]">
                Esame
              </span>
            </h2>
          </div>
          <h4 className="text-gray-600 text-sm uppercase">Fac-Simile</h4>
          <Logo showText={false} />
        </div>
        {/* Top Navigation - Sections */}
        <div className="  px-1 sm:px-2 md:px-4 lg:px-6 ">
          <div className="grid grid-cols-3 gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 justify-center">
            {sections.map((section, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const startIndex = section.start - 1;
                  goToQuestion(startIndex);
                }}
                className={`px-1.5 sm:px-2 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm md:text-base lg:text-lg rounded transition-colors border flex flex-col items-center leading-tight ${
                  currentSection === idx
                    ? "bg-white text-red-600 font-semibold border-red-600"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                }`}
              >
                <span className="block">Domande</span>
                <span className="block">{`da ${section.start} a ${section.end}`}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section-specific Question Tabs (only current domande range) */}
        <div className="  px-1 sm:px-2 md:px-4 lg:px-6  overflow-x-auto">
          <div className="flex gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 justify-center min-w-max">
            {Array.from(
              {
                length: Math.min(
                  sectionEnd - sectionStart + 1,
                  questions.length
                ),
              },
              (_, idx) => {
                const qIndex = sectionStart - 1 + idx;
                if (qIndex >= questions.length) return null;
                const status = getQuestionStatus(qIndex);
                return (
                  <button
                    key={qIndex}
                    ref={(el) => {
                      numberRefs.current[qIndex] = el;
                    }}
                    onClick={() => goToQuestion(qIndex)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center text-[11px] sm:text-xs md:text-sm lg:text-base font-medium rounded transition-all border ${
                      status === "current"
                        ? "bg-red-600 text-white border-red-600"
                        : status === "answered"
                        ? "bg-green-200 text-black "
                        : "bg-white text-black "
                    }`}
                  >
                    {qIndex + 1}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Question Numbers Navigation */}
        <div className="  sm:block  px-1 sm:px-2 md:px-4 lg:px-6  overflow-x-auto scrollbar-hide">
          <div className="flex gap-0.5 sm:gap-1  justify-center min-w-max">
            {Array.from({ length: questions.length }, (_, i) => {
              const status = getQuestionStatus(i);
              return (
                <button
                  key={i}
                  ref={(el) => {
                    numberRefs.current[i] = el;
                  }}
                  onClick={() => goToQuestion(i)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center text-[11px] sm:text-xs md:text-sm lg:text-base font-medium rounded transition-all border ${
                    status === "current"
                      ? "bg-red-600 text-white border-red-600"
                      : status === "answered"
                      ? "bg-green-200 text-black "
                      : "bg-white text-black "
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1  overflow-x-hidden">
          <div className=" flex justify-center items-center flex-1 mx-auto h-full">
            {/* Side-by-side layout - never wraps, just reduces size */}
            <div className="flex-1 flex flex-col h-full">
              <div className="flex flex-1 flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
                {/* Left: Quiz Image - Smaller side */}
                <div className="shrink-0 w-[35%] sm:w-[36%] md:w-[37%] lg:w-[38%] bg-white rounded-lg p-2 sm:p-3 md:p-4 lg:p-6 shadow-sm flex items-center justify-center">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Quiz"
                      className="w-full max-w-full h-28 sm:h-40 md:h-60 lg:h-72 object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-32 sm:h-40 md:h-48 lg:h-64 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-xs sm:text-sm text-white text-center">
                        No image available
                      </span>
                    </div>
                  )}
                </div>

                {/* Right: Question and Answers - Larger side */}
                <div className="flex-1 min-w-0 flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                  {/* Question Section - Separate white box with increased height */}
                  <div className="bg-white flex-1 rounded-lg p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 shadow-sm min-h-[200px] sm:min-h-[220px] md:min-h-[240px] lg:min-h-[260px] flex flex-col">
                    {/* Question Number */}
                    <div className="mb-3 pb-3 sm:mb-4 md:mb-5 flex justify-end border-b border-gray-300">
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <span className="text-[10px] sm:text-xs md:text-sm text-gray-700">
                          Domanda numero
                        </span>
                        <div className="border border-gray-400 rounded px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 bg-white">
                          <span className="text-[10px] sm:text-xs md:text-sm text-gray-800 font-medium">
                            {currentQuestionIndex + 1}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Question Text */}
                    {currentQuestion && (
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 mb-3 sm:mb-4 md:mb-5 flex-1">
                          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 flex-1 leading-relaxed">
                            {currentQuestion.question}
                          </p>
                        </div>

                        {/* Audio element */}
                        {currentQuestion.authorAudio && (
                          <audio
                            ref={audioRef}
                            src={currentQuestion.authorAudio}
                            preload="auto"
                          />
                        )}

                        {/* Border below question */}
                        {/* <div className="mt-auto pt-3 sm:pt-4 md:pt-5 "></div> */}
                        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                          <TextSpech
                            text={currentQuestion.question}
                            className="w-10! h-10! sm:w-11! sm:h-11! md:w-12 md:h-12"
                            iconClassName="text-base sm:text-lg md:text-xl"
                          />
                          {showTranslation && (
                            <TranslationInModal
                              component={
                                <button
                                  className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-linear-to-br from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 shadow-sm hover:shadow-md"
                                  aria-label="Translate question"
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
                              text={currentQuestion.question}
                            />
                          )}
                          {showTheory && (
                            <div className="transform scale-90 sm:scale-95 md:scale-100 origin-center">
                              <ShowTheoryModal
                                topic={currentQuestion.ArgTopicId}
                              />
                            </div>
                          )}
                          <div className="transform scale-90 sm:scale-95 md:scale-100 origin-center">
                            <AuthorAudioPlay
                              authorAudio={currentQuestion.authorAudio}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Answer Options Section - Separate white box with gap */}
                  {currentQuestion && (
                    <div className="bg-white rounded-lg p-2 sm:p-3 md:p-4 lg:p-6 shadow-sm">
                      <div className="flex justify-center items-center gap-4">
                        {/* Vero (True) - with V letter */}
                        <button
                          onClick={() => handleAnswerSelect("V")}
                          className="flex flex-col items-center gap-2 sm:gap-2.5 md:gap-3"
                        >
                          <span
                            className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium ${
                              answers[currentQuestionIndex] === "V"
                                ? "text-[#00003a]"
                                : "text-gray-800"
                            }`}
                          >
                            Vero
                          </span>
                          {/* Square with circle inside, containing V */}
                          <div
                            className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 border-2 border-[#00003a] rounded flex items-center justify-center transition-all ${
                              answers[currentQuestionIndex] === "V"
                                ? "bg-[#00003a]/10"
                                : "bg-white hover:bg-gray-50"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full border-2 border-[#00003a] flex items-center justify-center ${
                                answers[currentQuestionIndex] === "V"
                                  ? "bg-[#00003a]"
                                  : "bg-white"
                              }`}
                            >
                              <span
                                className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold ${
                                  answers[currentQuestionIndex] === "V"
                                    ? "text-white"
                                    : "text-[#00003a]"
                                }`}
                              >
                                V
                              </span>
                            </div>
                            {/* Diagonal cross (X) when selected */}
                            {answers[currentQuestionIndex] === "V" && (
                              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded">
                                <svg
                                  className="w-full h-full"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                >
                                  {/* First diagonal line (top-left to bottom-right) */}
                                  <line
                                    x1="0"
                                    y1="0"
                                    x2="100"
                                    y2="100"
                                    stroke="#00003a"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                  />
                                  {/* Second diagonal line (top-right to bottom-left) */}
                                  <line
                                    x1="100"
                                    y1="0"
                                    x2="0"
                                    y2="100"
                                    stroke="#00003a"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        </button>

                        {/* Falso (False) - with F letter */}
                        <button
                          onClick={() => handleAnswerSelect("F")}
                          className=" flex flex-col items-center gap-2 sm:gap-2.5 md:gap-3"
                        >
                          <span
                            className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium ${
                              answers[currentQuestionIndex] === "F"
                                ? "text-[#00003a]"
                                : "text-gray-800"
                            }`}
                          >
                            Falso
                          </span>
                          {/* Square with circle inside, containing F */}
                          <div
                            className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 border-2 border-[#00003a] rounded flex items-center justify-center transition-all ${
                              answers[currentQuestionIndex] === "F"
                                ? "bg-[#00003a]/10"
                                : "bg-white hover:bg-gray-50"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full border-2 border-[#00003a] flex items-center justify-center ${
                                answers[currentQuestionIndex] === "F"
                                  ? "bg-[#00003a]"
                                  : "bg-white"
                              }`}
                            >
                              <span
                                className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold ${
                                  answers[currentQuestionIndex] === "F"
                                    ? "text-white"
                                    : "text-[#00003a]"
                                }`}
                              >
                                F
                              </span>
                            </div>
                            {/* Diagonal cross (X) when selected */}
                            {answers[currentQuestionIndex] === "F" && (
                              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded">
                                <svg
                                  className="w-full h-full"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                >
                                  {/* First diagonal line (top-left to bottom-right) */}
                                  <line
                                    x1="0"
                                    y1="0"
                                    x2="100"
                                    y2="100"
                                    stroke="#00003a"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                  />
                                  {/* Second diagonal line (top-right to bottom-left) */}
                                  <line
                                    x1="100"
                                    y1="0"
                                    x2="0"
                                    y2="100"
                                    stroke="#00003a"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                {/* Timer and Navigation Row */}
                <div className="flex flex-row items-center justify-between gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-3 sm:py-3.5 md:py-4">
                  {/* Timer - Left side */}
                  <div className="bg-white flex flex-col items-center justify-center rounded-lg px-1 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-2.5 md:py-3 lg:py-3.5 border border-gray-300 shadow-sm">
                    <div className="text-[7px] sm:text-xs md:text-sm text-gray-600 mb-1 sm:mb-1.5 font-medium">
                      TEMPO A DISPOSIZIONE
                    </div>
                    <div className="text-xs sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 tracking-wide">
                      {formatTime(timeRemaining)}
                    </div>
                  </div>

                  {/* Navigation Buttons - Right side */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Previous button (circle) */}
                    <button
                      onClick={goToPrevious}
                      disabled={currentQuestionIndex === 0}
                      className="w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white border border-gray-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:shadow-lg overflow-hidden"
                    >
                      <Image
                        src={mediaProvider.dashboard.backQuiz.src as string}
                        alt="Previous"
                        className="w-full h-full object-contain"
                        fill
                      />
                    </button>
                    {/* Next button (circle) */}
                    <button
                      onClick={goToNext}
                      disabled={currentQuestionIndex >= questions.length - 1}
                      className="w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white border border-gray-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:shadow-lg overflow-hidden"
                    >
                      <Image
                        src={mediaProvider.dashboard.nextQuiz.src as string}
                        alt="Next"
                        fill
                        className="w-full h-full object-contain"
                      />
                    </button>
                    <button
                      onClick={handleEndQuiz}
                      className="px-3 py-2 md:px-4 md:py-2 rounded-lg bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition"
                    >
                      Correggi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showConfirmEnd && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-5 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Vuoi terminare il quiz e confermare le risposte?
            </h3>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmEnd(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
              >
                Annulla
              </button>
              <button
                onClick={confirmEndQuiz}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
              >
                Conferma
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPlayModal;
