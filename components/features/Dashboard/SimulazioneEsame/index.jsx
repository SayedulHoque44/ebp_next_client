import React, { useState, useEffect } from "react";
import { FiTrendingUp } from "react-icons/fi";
import { AiOutlineBulb } from "react-icons/ai";
import { HiChevronRight } from "react-icons/hi";
import { FaBook, FaHandPointer } from "react-icons/fa";
import { IoMdBook } from "react-icons/io";
import { MdTranslate } from "react-icons/md";
import QuizPlayModal from "../../../Shared/Components/QuizScreen/QuizPlayModal";
import {
  useGetQuizzesQuery,
  useGetRandomThirtyQuizzesQuery,
  useGetSingleUserQuizStatsQuery,
} from "../../../redux/Api/QuizManagmentApi";
import usePContext from "../../../Util/Hooks/usePContext";
import { LockedOverlay } from "../AdminManagment/QuizManagment/Arguments/SingleArg";
import useIsLocked from "../../../Util/Hooks/useIsLocked";

const SimulazioneEsame = () => {
  const { loggedUser } = usePContext();
  const isLocked = useIsLocked();

  const {
    data: singleUserQuizStatsData,
    isLoading: singleUserQuizStatsLoading,
    isFetching: singleUserQuizStatsFetching,
    refetch: refetchSingleUserQuizStats,
  } = useGetSingleUserQuizStatsQuery(loggedUser?._id, {
    skip: !loggedUser?._id,
  });
  const QuizStats = singleUserQuizStatsData?.data;
  //console.log(QuizStats, "QuizStats");

  // Calculate quiz statistics from API data
  const calculateQuizStats = () => {
    if (!QuizStats) {
      return {
        totalQuizzes: 0,
        totalPlayedCount: 0,
        totalCorrectQuizzes: 0,
        totalIncorrectQuizzes: 0,
        remainingQuizzes: 0,
        completionPercentage: 0,
        accuracyPercentage: 0,
      };
    }

    const totalQuizzes = QuizStats.totalQuizzes || 0;
    const totalPlayedCount = QuizStats.totalPlayedCount || 0;
    const totalCorrectQuizzes = QuizStats.totalCorrectQuizzes || 0;
    const totalIncorrectQuizzes = QuizStats.totalinCorrectQuizzes || 0;
    const remainingQuizzes = QuizStats.remainingQuizzes || 0;

    // Calculate completion percentage (correct / total)
    const completionPercentage =
      totalQuizzes > 0 ? (totalCorrectQuizzes / totalQuizzes) * 100 : 0;

    // Calculate accuracy percentage (correct / played)
    const accuracyPercentage =
      totalPlayedCount > 0 ? (totalCorrectQuizzes / totalPlayedCount) * 100 : 0;

    return {
      totalQuizzes,
      totalPlayedCount,
      totalCorrectQuizzes,
      totalIncorrectQuizzes,
      remainingQuizzes,
      completionPercentage,
      accuracyPercentage,
    };
  };

  const quizStatisticData = calculateQuizStats();

  // Animate progress on mount and when data changes
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const duration = 1500; // Animation duration in ms
    const startTime = Date.now();
    const startValue = 0;
    const endValue = quizStatisticData.completionPercentage;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOutCubic;

      setAnimatedPercentage(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 100);

    return () => clearTimeout(timer);
  }, [quizStatisticData.completionPercentage]);

  // Calculate progress for circular chart
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercentage / 100) * circumference;

  // Toggle states for second card
  const [manualeEnabled, setManualeEnabled] = useState(true);
  const [traduzioneEnabled, setTraduzioneEnabled] = useState(true);

  // Quiz modal state
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizType, setQuizType] = useState("fixed"); // "fixed" or "personalized"
  const [newQuizData, setNewQuizData] = useState([]);
  const [shouldFetchQuiz, setShouldFetchQuiz] = useState(false);
  // Fetch quiz questions only when shouldFetchQuiz is true
  const {
    data: randomThirtyQuizzesData,
    isLoading: randomThirtyQuizzesLoading,
    isFetching: randomThirtyQuizzesFetching,
    refetch: refetchQuizzes,
  } = useGetRandomThirtyQuizzesQuery(undefined, {
    skip: !shouldFetchQuiz,
  });
  //console.log(randomThirtyQuizzesData, "randomThirtyQuizzesData");
  // Trigger refetch when shouldFetchQuiz becomes true (to get fresh data)
  useEffect(() => {
    if (shouldFetchQuiz && refetchQuizzes) {
      // Small delay to ensure query hook is ready
      const timer = setTimeout(() => {
        refetchQuizzes();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [shouldFetchQuiz, refetchQuizzes]);

  // Update quiz data when query completes
  useEffect(() => {
    if (randomThirtyQuizzesData?.data && shouldFetchQuiz) {
      setNewQuizData(randomThirtyQuizzesData.data);
    }
  }, [randomThirtyQuizzesData, shouldFetchQuiz]);

  // Reset quiz state and refetch stats when modal closes
  useEffect(() => {
    if (!isQuizModalOpen) {
      setNewQuizData([]);
      setShouldFetchQuiz(false);
      // Refetch quiz stats to get updated data after completing quiz
      if (refetchSingleUserQuizStats) {
        refetchSingleUserQuizStats();
      }
    }
  }, [isQuizModalOpen, refetchSingleUserQuizStats]);

  // Function to trigger new quiz fetch
  const handleStartQuiz = () => {
    setNewQuizData([]); // Clear old data
    setShouldFetchQuiz(true);
    setIsQuizModalOpen(true);
  };

  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-primary-50/50 py-4 md:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Quiz Completion Progress Card */}
        {singleUserQuizStatsLoading || singleUserQuizStatsFetching ? (
          <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl border border-white/20 overflow-hidden">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="flex gap-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        ) : !QuizStats || quizStatisticData.totalQuizzes === 0 ? (
          <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl border border-white/20 overflow-hidden">
            <div className="text-center py-8">
              <div className="p-4 bg-primary-100/80 backdrop-blur-sm rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <FiTrendingUp className="text-P-primary text-3xl" />
              </div>
              <h2 className="text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold mb-2">
                Nessun Dato Disponibile
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Inizia a completare i quiz per vedere le tue statistiche!
              </p>
            </div>
          </div>
        ) : (
          <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl border border-white/20 overflow-hidden group hover:shadow-2xl transition-all duration-500">
            {/* Glassmorphism gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-primary-400/10 to-primary-600/20  transition-opacity duration-500"></div>
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="p-2 bg-primary-100/80 backdrop-blur-sm rounded-lg group-hover:bg-primary-200/80 transition-colors duration-300">
                  <FiTrendingUp className="text-P-primary text-lg md:text-xl" />
                </div>
                <h2 className="text-gray-800 group-hover:text-P-primary text-lg md:text-xl lg:text-2xl font-semibold transition-colors duration-300">
                  Statistiche Quiz
                </h2>
              </div>

              {/* Progress Section */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 lg:gap-8 mb-4 md:mb-6">
                {/* Circular Progress Chart */}
                <div className="relative flex-shrink-0 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48">
                  <svg
                    className="transform -rotate-90 w-full h-full"
                    viewBox="0 0 140 140"
                  >
                    {/* Background circle */}
                    <circle
                      cx="70"
                      cy="70"
                      r={radius}
                      fill="none"
                      stroke="rgba(131, 25, 244, 0.1)"
                      strokeWidth="12"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="70"
                      cy="70"
                      r={radius}
                      fill="none"
                      stroke="#8319f4"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      className="transition-all duration-1000 ease-out group-hover:stroke-primary-600"
                    />
                  </svg>
                  {/* Percentage Text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-P-primary text-2xl md:text-3xl lg:text-4xl font-bold group-hover:text-primary-600 transition-colors duration-300">
                        {animatedPercentage.toFixed(1)}%
                      </span>
                      <p className="text-gray-500 text-xs md:text-sm mt-1">
                        Completamento
                      </p>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="flex-1 w-full md:w-auto">
                  <div className="space-y-3 md:space-y-4">
                    {/* Total Played */}
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-P-primary rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm md:text-base lg:text-lg">
                        Quiz Played
                      </span>
                      <span className="text-P-primary font-semibold text-sm md:text-base lg:text-lg ml-auto">
                        {quizStatisticData.totalPlayedCount.toLocaleString()}
                      </span>
                    </div>
                    {/* Remaining */}
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-primary-300 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm md:text-base lg:text-lg">
                        Quiz Rimanenti
                      </span>
                      <span className="text-primary-500 font-semibold text-sm md:text-base lg:text-lg ml-auto">
                        {quizStatisticData.remainingQuizzes.toLocaleString()}
                      </span>
                    </div>
                    {/* Correct */}
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm md:text-base lg:text-lg">
                        Corretti
                      </span>
                      <span className="text-emerald-600 font-semibold text-sm md:text-base lg:text-lg ml-auto">
                        {quizStatisticData.totalCorrectQuizzes.toLocaleString()}
                      </span>
                    </div>
                    {/* Incorrect */}
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-rose-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm md:text-base lg:text-lg">
                        Errati
                      </span>
                      <span className="text-rose-600 font-semibold text-sm md:text-base lg:text-lg ml-auto">
                        {quizStatisticData.totalIncorrectQuizzes.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
                {/* Total Quizzes */}
                <div className="bg-primary-50/80 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-primary-200/50">
                  <p className="text-gray-600 text-xs md:text-sm mb-1">
                    Totale Quiz
                  </p>
                  <p className="text-P-primary font-bold text-lg md:text-xl">
                    {quizStatisticData.totalQuizzes.toLocaleString()}
                  </p>
                </div>
                {/* Accuracy */}
                <div className="bg-emerald-50/80 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-emerald-200/50">
                  <p className="text-gray-600 text-xs md:text-sm mb-1">
                    Precisione
                  </p>
                  <p className="text-emerald-600 font-bold text-lg md:text-xl">
                    {quizStatisticData.accuracyPercentage.toFixed(1)}%
                  </p>
                </div>
                {/* Completion Rate */}
                <div className="bg-blue-50/80 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-blue-200/50">
                  <p className="text-gray-600 text-xs md:text-sm mb-1">
                    Completamento
                  </p>
                  <p className="text-blue-600 font-bold text-lg md:text-xl">
                    {quizStatisticData.completionPercentage.toFixed(1)}%
                  </p>
                </div>
                {/* Success Rate */}
                <div className="bg-purple-50/80 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-purple-200/50">
                  <p className="text-gray-600 text-xs md:text-sm mb-1">
                    Tasso Successo
                  </p>
                  <p className="text-purple-600 font-bold text-lg md:text-xl">
                    {quizStatisticData.totalPlayedCount > 0
                      ? (
                          (quizStatisticData.totalCorrectQuizzes /
                            quizStatisticData.totalPlayedCount) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </p>
                </div>
              </div>

              {/* Motivational Message */}
              <div className="bg-primary-50/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 flex items-start gap-3 md:gap-4 border border-primary-200/50 group-hover:bg-primary-100/80 group-hover:border-primary-300/50 transition-all duration-300">
                <div className="p-2 bg-primary-200/60 backdrop-blur-sm rounded-lg flex-shrink-0 mt-0.5 group-hover:bg-primary-300/60 transition-colors duration-300">
                  <AiOutlineBulb className="text-P-primary text-lg md:text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 text-sm md:text-base lg:text-lg mb-1">
                    {quizStatisticData.accuracyPercentage >= 70
                      ? "Ottimo lavoro! Continua così, stai ottenendo ottimi risultati!"
                      : quizStatisticData.accuracyPercentage >= 50
                      ? "Stai facendo progressi! Continua a esercitarti per migliorare."
                      : quizStatisticData.totalPlayedCount === 0
                      ? "Inizia a completare i quiz per vedere le tue statistiche!"
                      : "Non arrenderti! Ogni quiz è un'opportunità per migliorare."}
                  </p>
                  {quizStatisticData.remainingQuizzes > 0 && (
                    <p className="text-gray-600 text-xs md:text-sm mt-1">
                      Hai ancora{" "}
                      <span className="font-semibold text-P-primary">
                        {quizStatisticData.remainingQuizzes.toLocaleString()}
                      </span>{" "}
                      quiz da completare.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Option Cards */}
        <div className="space-y-4 md:space-y-6">
          {/* First Quiz Option Card */}
          <div
            onClick={() => {
              setQuizType("personalized");
              setManualeEnabled(false);
              setTraduzioneEnabled(false);
              handleStartQuiz();
            }}
            className="relative bg-white/70 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-white/20 cursor-pointer group hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 overflow-hidden"
          >
            {/* Glassmorphism gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-primary-400/5 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 md:gap-6">
                {/* Icon */}
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-primary-50/80 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center relative overflow-hidden border border-primary-200/30 group-hover:bg-primary-100/80 group-hover:border-primary-300/50 group-hover:scale-110 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-primary-500/20"></div>
                  <FaBook className="text-P-primary text-2xl md:text-3xl lg:text-4xl relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-primary-300/40 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary-400/50 transition-colors duration-300">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-P-primary rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-P-primary text-lg md:text-xl lg:text-2xl font-semibold mb-1 md:mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    Scheda Ministeriale
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base lg:text-lg group-hover:text-gray-700 transition-colors duration-300">
                    Inizia il quiz con un programma fisso e una configurazione
                    semplice.
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0">
                  <HiChevronRight className="text-primary-300 group-hover:text-P-primary group-hover:translate-x-1 text-2xl md:text-3xl transition-all duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Second Quiz Option Card */}
          <div
            onClick={() => {
              if (isLocked) return;
              setQuizType("personalized");
              handleStartQuiz();
            }}
            className="relative bg-white/70 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-white/20 cursor-pointer group hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 overflow-hidden"
          >
            {isLocked && <LockedOverlay />}
            {/* Glassmorphism gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-primary-400/5 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 md:gap-6">
                {/* Icon */}
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-primary-50/80 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center relative overflow-hidden border border-primary-200/30 group-hover:bg-primary-100/80 group-hover:border-primary-300/50 group-hover:scale-110 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-primary-500/20"></div>
                  <IoMdBook className="text-P-primary text-2xl md:text-3xl lg:text-4xl relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <FaHandPointer className="text-primary-400 text-lg md:text-xl lg:text-2xl absolute bottom-2 right-2 z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-P-primary text-lg md:text-xl lg:text-2xl font-semibold mb-1 md:mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    Scheda Ministeriale
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-3 md:mb-4 group-hover:text-gray-700 transition-colors duration-300">
                    Fai il quiz con un'esperienza personalizzata.
                  </p>

                  {/* Toggle Options */}
                  <div className="space-y-2 md:space-y-3">
                    {/* Manuale Toggle */}
                    <div className="flex items-center justify-between gap-3 md:gap-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <IoMdBook className="text-P-primary text-lg md:text-xl group-hover:text-primary-600 transition-colors duration-300" />
                        <span className="text-gray-700 text-sm md:text-base group-hover:text-gray-800 transition-colors duration-300">
                          Manuale
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setManualeEnabled(!manualeEnabled);
                        }}
                        className={`relative inline-flex h-6 w-11 md:h-7 md:w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-P-primary focus:ring-offset-2 focus:ring-offset-white/70 hover:shadow-lg ${
                          manualeEnabled
                            ? "bg-P-primary shadow-md shadow-primary-500/30"
                            : "bg-primary-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 md:h-5 md:w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                            manualeEnabled
                              ? "translate-x-6 md:translate-x-7"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Traduzione Toggle */}
                    <div className="flex items-center justify-between gap-3 md:gap-4 relative">
                      <div className="flex items-center gap-2 md:gap-3">
                        <MdTranslate className="text-P-primary text-lg md:text-xl group-hover:text-primary-600 transition-colors duration-300" />
                        <span className="text-gray-700 text-sm md:text-base group-hover:text-gray-800 transition-colors duration-300">
                          Traduzione
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setTraduzioneEnabled(!traduzioneEnabled);
                        }}
                        className={`relative inline-flex h-6 w-11 md:h-7 md:w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-P-primary focus:ring-offset-2 focus:ring-offset-white/70 hover:shadow-lg ${
                          traduzioneEnabled
                            ? "bg-P-primary shadow-md shadow-primary-500/30"
                            : "bg-primary-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 md:h-5 md:w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                            traduzioneEnabled
                              ? "translate-x-6 md:translate-x-7"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0">
                  <HiChevronRight className="text-primary-300 group-hover:text-P-primary group-hover:translate-x-1 text-2xl md:text-3xl transition-all duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Play Modal */}
      <QuizPlayModal
        quizData={newQuizData}
        isLoading={randomThirtyQuizzesLoading || randomThirtyQuizzesFetching}
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        quizType={quizType}
        manualeEnabled={manualeEnabled}
        traduzioneEnabled={traduzioneEnabled}
      />
    </div>
  );
};

export default SimulazioneEsame;
