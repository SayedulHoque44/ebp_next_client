import { Image } from "antd";
import React, { useMemo } from "react";
import {
  FaClock,
  FaCheck,
  FaTimes,
  FaMinusCircle,
  FaBullseye,
  FaFlagCheckered,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Lock } from "@phosphor-icons/react";
import {
  AuthorAudioPlay,
  ShowTheoryModal,
} from "@/components/features/Dashboard/AdminManagment/QuizManagment/Quizzes/SingleQuiz";
import TextSpech from "../TextSpech";
import TranslationInModal from "../Translation";
import useAuth from "@/features/Auth/hooks/useAuth";
import QuizHooks from "@/features/Quiz/hooks/quiz.hooks";
import useIsLocked from "@/hooks/useIsLocked";
import { mediaProvider } from "@/constants/mediaProvider";

interface QuizResultItem {
  _id?: string;
  ArgTopicId?: string;
  argumentId?: string;
  question: string;
  correctAnswer?: string | boolean;
  userAnswer?: string | boolean | null;
  imageUrl?: string;
  authorAudio?: string;
  isCorrect?: boolean | null;
}

interface QuizResultProps {
  quizData?: QuizResultItem[];
  timeTakenSeconds?: number;
  title?: string;
  onClose?: () => void;
  onRetry?: () => void;
  showTranslation?: boolean;
  showTheory?: boolean;
}

/**
 * QuizResult component
 * Renders a dynamic quiz result page similar to the provided design.
 *
 * Expected quizData shape (per question):
 * {
 *   question: string,
 *   correctAnswer: string | boolean, // e.g. "V" / "F"
 *   userAnswer: string | boolean | null,
 *   imageUrl?: string,
 *   isCorrect?: boolean // optional override
 * }
 *
 * Props:
 * - quizData: array of question results
 * - timeTakenSeconds: number (seconds spent)
 * - title: string (optional heading)
 * - onClose: function (optional action button)
 * - onRetry: function (optional action button)
 * - showTranslation: boolean (optional, default: true)
 * - showTheory: boolean (optional, default: true)
 */
const QuizResult: React.FC<QuizResultProps> = ({
  quizData = [],
  timeTakenSeconds = 0,
  title = "Riepilogo",
  onClose,
  onRetry,
  showTranslation = true,
  showTheory = true,
}) => {
  const { user } = useAuth();
  const isLocked = useIsLocked();
  const userId = user?._id || "";
  const { mutateAsync: createUserQuizPlayed, isPending: isSubmitting } =
    QuizHooks.useCreateUserPlayedQuiz();
  const {
    correctCount,
    wrongCount,
    unansweredCount,
    precision,
    isPassed,
    formattedTime,
  } = useMemo(() => {
    const total = quizData.length || 0;
    let correct = 0;
    let unanswered = 0;

    quizData.forEach((item) => {
      const userAnswer =
        item?.userAnswer === undefined || item?.userAnswer === null
          ? ""
          : String(item.userAnswer).trim();
      const correctAnswer =
        item?.correctAnswer === undefined || item?.correctAnswer === null
          ? ""
          : String(item.correctAnswer).trim();

      if (!userAnswer) {
        unanswered += 1;
        return;
      }

      const isCorrectExplicit =
        typeof item?.isCorrect === "boolean" ? item.isCorrect : null;

      const resolvedCorrect =
        isCorrectExplicit !== null
          ? isCorrectExplicit
          : userAnswer.toLowerCase() === correctAnswer.toLowerCase();

      if (resolvedCorrect) {
        correct += 1;
      }
    });

    const wrong = Math.max(total - correct - unanswered, 0);
    const precisionValue = total ? Math.round((correct / total) * 100) : 0;
    const formatTime = (seconds: number): string => {
      const mins = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");
      const secs = (seconds % 60).toString().padStart(2, "0");
      return `${mins}:${secs}`;
    };

    return {
      correctCount: correct,
      wrongCount: wrong,
      unansweredCount: unanswered,
      precision: precisionValue,
      isPassed: precisionValue >= 90,
      formattedTime: formatTime(Math.max(timeTakenSeconds, 0)),
    };
  }, [quizData, timeTakenSeconds]);

  const handleCloseWithApiCall = async (): Promise<void> => {
    try {
      // Prepare payload according to validation schema
      const payload: Array<{
        quizId: string;
        userId: string;
        givenAnswer: string;
        isCorrect: boolean;
      }> = quizData
        .map((item) => {
          const userAnswer = item?.userAnswer;
          const isCorrect = item?.isCorrect;

          // Skip items without quizId, userId, or userAnswer
          if (!item?._id || !userId || !userAnswer) {
            return null;
          }

          // Convert userAnswer to string (handle boolean values)
          const givenAnswer: string = typeof userAnswer === "boolean" 
            ? (userAnswer ? "V" : "F")
            : String(userAnswer).trim();

          // Ensure isCorrect is a boolean
          const isCorrectValue: boolean = typeof isCorrect === "boolean" 
            ? isCorrect 
            : (givenAnswer.toLowerCase() === String(item?.correctAnswer || "").toLowerCase().trim());

          return {
            quizId: item._id,
            userId: userId,
            givenAnswer: givenAnswer,
            isCorrect: isCorrectValue,
          };
        })
        .filter((item): item is {
          quizId: string;
          userId: string;
          givenAnswer: string;
          isCorrect: boolean;
        } => item !== null); // Filter out null items

      // Call API if we have valid data
      if (payload.length > 0) {
        await createUserQuizPlayed(payload);
      }

      // Call onClose after API call completes
      onClose?.();
    } catch (error) {
      console.error("Error submitting quiz results:", error);
      // Still call onClose even if API call fails
      onClose?.();
    }
  };

  if (!quizData.length) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#e8f5ee] via-white to-[#dff1e7]">
        <div className="text-center space-y-4 bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl rounded-2xl px-6 py-8">
          <p className="text-lg font-semibold text-slate-800">
            Nessun risultato disponibile
          </p>
          {onClose && (
            <button
              onClick={handleCloseWithApiCall}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Invio..." : "Chiudi"}
            </button>
          )}
        </div>
      </div>
    );
  }

  const getStatus = (item: QuizResultItem): "correct" | "wrong" | "unanswered" => {
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
  };

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

  const getAnswerColorClass = (answer: string | boolean | null | undefined): string => {
    const normalized = String(answer || "")
      .trim()
      .toLowerCase();
    if (!normalized) return "text-slate-500";
    if (["v", "vero", "true"].includes(normalized)) return "text-emerald-600";
    if (["f", "falso", "false"].includes(normalized)) return "text-rose-600";
    return "text-slate-900";
  };

  const summaryItems = [
    { label: "Tempo", value: formattedTime, icon: <FaClock /> },
    { label: "Corrette", value: correctCount, icon: <FaCheck /> },
    { label: "Sbagliate", value: wrongCount, icon: <FaTimes /> },
    { label: "Non Risposte", value: unansweredCount, icon: <FaMinusCircle /> },
    { label: "Precisione", value: `${precision}%`, icon: <FaBullseye /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f5ee] via-white to-[#dff1e7] flex justify-center px-2 sm:px-4 py-5 sm:py-8">
      <div className="w-full max-w-6xl space-y-5 sm:space-y-7">
        <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#b7e4c7]/40 via-white/40 to-[#a5d8ff]/30" />
          <div className="relative p-5 sm:p-7">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-slate-500 font-semibold">
                  {title}
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                  Risultato del quiz
                </h2>
                <p className="text-sm text-slate-500">
                  Prestazioni complessive e risposte salvate
                </p>
              </div>
              <div
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg border backdrop-blur whitespace-nowrap ${
                  isPassed
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-200 shadow-emerald-200/60"
                    : "bg-gradient-to-r from-rose-500 to-rose-600 text-white border-rose-200 shadow-rose-200/60"
                }`}
              >
                {isPassed ? <FaFlagCheckered /> : <FaExclamationTriangle />}
                <span>{isPassed ? "Promosso" : "Non superato"}</span>
              </div>
            </div>

            <div className="mt-4 h-2 rounded-full bg-white/60 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isPassed
                    ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                    : "bg-gradient-to-r from-rose-400 to-rose-600"
                }`}
                style={{ width: `${Math.min(Math.max(precision, 0), 100)}%` }}
              />
            </div>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
              {summaryItems.map((item) => (
                <div
                  key={item.label}
                  className="relative w-full min-w-0 rounded-2xl px-3 py-2.5 sm:px-3.5 sm:py-3 bg-white/80 backdrop-blur border border-white/70 shadow-lg hover:-translate-y-0.5 transition-transform"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 via-white/40 to-[#eef7f2]/70 pointer-events-none" />
                  <div className="relative flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#dff5eb] to-[#c6e9d8] flex items-center justify-center text-base sm:text-lg text-[#0f5132] shadow-inner border border-white/80 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-slate-500">
                        {item.label}
                      </p>
                      <p className="text-base sm:text-lg font-bold text-slate-800 truncate">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-slate-700 font-semibold text-base">
            Le tue risposte
          </h3>
          <div className="space-y-5">
            {quizData.map((item, index) => {
              const status = getStatus(item);
              const colors = palette[status];
              const userAnswer =
                item?.userAnswer === undefined || item?.userAnswer === null
                  ? ""
                  : String(item.userAnswer).trim();
              const correctAnswer =
                item?.correctAnswer === undefined ||
                item?.correctAnswer === null
                  ? ""
                  : String(item.correctAnswer).trim();
              //console.log(item, "item");
              return (
                <div
                  key={index}
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
                        {/* {showTranslation && ( */}
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
                        {/* )} */}
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
                              className={isLocked ? "pointer-events-none" : ""}
                            >
                              <ShowTheoryModal topic={item.ArgTopicId} />
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
                              className={isLocked ? "pointer-events-none" : ""}
                            >
                              <AuthorAudioPlay authorAudio={item.authorAudio} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {(onRetry || onClose) && (
          <div className="flex flex-wrap gap-3 justify-end">
            {onRetry && (
              <button
                onClick={onRetry}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Riprova
              </button>
            )}
            {onClose && (
              <button
                onClick={handleCloseWithApiCall}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg bg-white/90 text-slate-800 font-semibold shadow-md border border-white/70 hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Invio..." : "Chiudi"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizResult;
