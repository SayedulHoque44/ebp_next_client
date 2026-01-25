"use client";
import React, {
  useCallback,
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { debounce } from "lodash";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pagination } from "antd";
import SingleQuiz from "../AdminManagment/QuizManagment/Quizzes/SingleQuiz";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BoxSkeleton from "@/components/shared/SkeletonLoader/BoxSkeleton";
import SectionHeader from "@/components/shared/SectionHeader";
import Container from "@/components/ui/Container";
import {
  MagnifyingGlass,
  X,
  CheckCircle,
  XCircle,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import useIsLocked from "@/hooks/useIsLocked";
import QuizHooks from "@/features/Quiz/hooks/quiz.hooks";
import { IQuizGetQuizzesRequest } from "@/features/Quiz/interface/quiz.interfaces";
import { QUERY_KEY } from "@/constants/constendData";
import api from "@/lib/api";

// Cache configuration constants
const CACHE_CONFIG = {
  staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
  gcTime: 10 * 60 * 1000, // 10 minutes - cache garbage collection (formerly cacheTime)
  retry: 2,
  retryDelay: 1000,
  refetchOnWindowFocus: false, // Don't refetch on window focus for search
  refetchOnReconnect: true,
};

// Search debounce delay
const SEARCH_DEBOUNCE_DELAY = 600;

// API fetch function - extracted for better testability and caching
const fetchQuizSearchResults = async ({ queryKey }: { queryKey: any[] }) => {
  const [, searchText, page] = queryKey;

  if (!searchText || searchText.trim().length === 0) {
    return null;
  }

  const trimmedSearch = searchText.trim();
  const encodedSearch = encodeURIComponent(trimmedSearch);

  // Parallel API calls for better performance
  const [res, vero, falso] = await Promise.all([
    api.get(
      `/Quizzes?page=${page}&limit=10&sort=createdAt&searchTerm=${encodedSearch}`
    ),
    api.get(
      `/Quizzes?page=1&limit=1&sort=createdAt&searchTerm=${encodedSearch}&answer=V`
    ),
    api.get(
      `/Quizzes?page=1&limit=1&sort=createdAt&searchTerm=${encodedSearch}&answer=F`
    ),
  ]);

  return {
    data: res?.data?.data?.result || [],
    meta: {
      ...res?.data?.data?.meta,
      v: vero?.data?.data?.meta?.total || 0,
      f: falso?.data?.data?.meta?.total || 0,
    },
  };
};

const Cerca = () => {
  const [searchText, setSearchText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const debouncedSearchRef = useRef<any>(null);
  const isLocked = useIsLocked();
  // Memoized query key for better caching
  const queryKey = useMemo(
    () => [QUERY_KEY.QUIZ_SEARCH, searchText.trim().toLowerCase(), page],
    [searchText, page]
  );

  // Optimized debounced search with proper cleanup
  useEffect(() => {
    // Create debounced function
    debouncedSearchRef.current = debounce((value: string) => {
      const trimmedValue = value.trim();
      setSearchText(trimmedValue);
      setPage(1); // Reset to first page on new search
    }, SEARCH_DEBOUNCE_DELAY);

    // Cleanup on unmount
    return () => {
      if (debouncedSearchRef.current) {
        debouncedSearchRef.current.cancel();
      }
    };
  }, []);

  // Optimized query with proper caching and error handling
  const {
    data: quizData,
    isFetching,
    error,
    isLoading,
  } = useQuery({
    queryKey,
    queryFn: fetchQuizSearchResults,
    ...CACHE_CONFIG,
    // Keep previous data while fetching new data for smoother UX
    placeholderData: (previousData) => previousData,
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      if (!value || value.trim().length === 0) {
        // Clear search immediately
        setInputValue("");
        setSearchText("");
        setPage(1);
        // Clear cache for empty search
        queryClient.removeQueries({ queryKey: [QUERY_KEY.QUIZ_SEARCH] });
        return;
      }

      // Use debounced search
      if (debouncedSearchRef.current) {
        debouncedSearchRef.current(value);
      }
    },
    [queryClient]
  );

  const handleClear = useCallback(() => {
    setInputValue("");
    setSearchText("");
    setPage(1);
    // Cancel any pending debounced calls
    if (debouncedSearchRef.current) {
      debouncedSearchRef.current.cancel();
    }
    // Clear cache
    queryClient.removeQueries({ queryKey: [QUERY_KEY.QUIZ_SEARCH] });
  }, [queryClient]);

  return (
    <div className="py-10">
      <Container>
        {/* Header */}
        <SectionHeader
          badge={{
            icon: <MagnifyingGlass className="mr-2" />,
            text: "Cerca Quiz",
            className: "bg-orange-100 text-orange-700",
          }}
          title="Cerca Quiz"
          description="এখানে ৭০০০+ কুইজ থেকে সার্চ করে পরতে পারবেন"
          className="mb-12"
        />

        {/* Modern Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-orange-300 transition-all duration-300 overflow-hidden">
                <div className="flex items-center px-4 py-3">
                  <MagnifyingGlass
                    size={20}
                    className="text-gray-400 mr-3 flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Search from 7000+ quizzes... (e.g., traffic signs, rules, etc.)"
                    className="flex-1 text-gray-800 placeholder-gray-400 bg-transparent border-none outline-none text-base"
                  />
                  {inputValue && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={handleClear}
                      className="ml-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X size={18} className="text-gray-400" />
                    </motion.button>
                  )}
                </div>
              </div>
            </div>

            {/* Search Tips */}
            {!searchText && !inputValue && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-center text-xs text-gray-500"
              >
                <p>
                  💡 Try searching for: traffic signs, road rules, parking, etc.
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Loading State - Initial Search */}
        {isLoading && searchText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Stats Skeleton - Matching actual card design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-xl shadow-lg p-5 border border-gray-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Skeleton width={80} height={12} className="mb-2" />
                      <Skeleton width={100} height={32} />
                    </div>
                    <Skeleton circle width={44} height={44} />
                  </div>
                </div>
              ))}
            </div>
            {/* Results Skeleton */}
            <BoxSkeleton count={5} />
          </motion.div>
        )}

        {/* Fetching State - Pagination/Refetch */}
        {isFetching && !isLoading && quizData && (
          <div className="flex justify-center py-8">
            <div className="flex items-center gap-3 text-gray-500">
              <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Loading more results...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 rounded-xl p-6 text-center"
          >
            <p className="text-red-600 font-medium">
              Error loading quizzes. Please try again.
            </p>
          </motion.div>
        )}

        {/* Results Stats */}
        <AnimatePresence>
          {quizData?.data && quizData?.meta && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <ShowTotal meta={quizData.meta} searchTerm={searchText} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results List */}
        <AnimatePresence mode="wait">
          {quizData?.data && quizData?.data.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 mb-6"
            >
              {quizData.data.map((quiz: any, index: number) => (
                <motion.div
                  key={quiz._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="transform transition-all duration-300 hover:scale-[1.01]"
                >
                  <SingleQuiz
                    quiz={{ ...quiz, index }}
                    cerca={true}
                    shouldShowLock={isLocked}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : searchText && !isLoading && quizData?.data?.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block p-4 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl mb-4 shadow-sm"
              >
                <MagnifyingGlass
                  size={40}
                  className="text-gray-400"
                  weight="duotone"
                />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No results found
              </h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                We couldn't find any quizzes matching your search. Try different
                keywords or check your spelling.
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Pagination */}
        {quizData?.meta && quizData.meta.total > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sticky bottom-4 z-10 backdrop-blur-sm bg-white/95"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {(page - 1) * quizData.meta.limit + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-800">
                  {Math.min(page * quizData.meta.limit, quizData.meta.total)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-800">
                  {quizData.meta.total.toLocaleString()}
                </span>{" "}
                results
              </div>
              <Pagination
                current={page}
                onChange={(value) => setPage(value)}
                pageSize={quizData?.meta?.limit}
                total={quizData?.meta?.total}
                showSizeChanger={false}
                showQuickJumper
                className="custom-pagination"
              />
            </div>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

/**
 * Statistics Cards Component
 * Displays search results statistics with improved design and animations
 */
interface ShowTotalProps {
  meta: {
    total: number;
    v?: number;
    f?: number;
  };
  searchTerm: string;
}

const ShowTotal = ({ meta }: ShowTotalProps) => {
  const stats = useMemo(
    () => [
      {
        label: "Total Results",
        value: meta.total,
        Icon: MagnifyingGlass,
        colors: {
          gradient: ["#ec4899", "#f43f5e", "#db2777"],
          textLight: "text-pink-100",
          iconBg: "bg-pink-400/30",
        },
      },
      {
        label: "True Answers",
        value: meta.v || 0,
        Icon: CheckCircle,
        colors: {
          gradient: ["#10b981", "#059669", "#047857"],
          textLight: "text-green-100",
          iconBg: "bg-green-400/30",
        },
      },
      {
        label: "False Answers",
        value: meta.f || 0,
        Icon: XCircle,
        colors: {
          gradient: ["#ef4444", "#f43f5e", "#dc2626"],
          textLight: "text-red-100",
          iconBg: "bg-red-400/30",
        },
      },
    ],
    [meta]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          whileHover={{ y: -2, scale: 1.01 }}
          className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${stat.colors.gradient.join(
              ", "
            )})`,
          }}
        >
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          {/* Decorative pattern */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full -ml-10 -mb-10"></div>

          <div className="relative p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p
                  className={`${stat.colors.textLight} text-[10px] font-semibold uppercase tracking-wider mb-1.5 opacity-90`}
                >
                  {stat.label}
                </p>
                <motion.p
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                  className="text-white text-2xl md:text-3xl font-bold leading-tight"
                >
                  {stat.value.toLocaleString()}
                </motion.p>
              </div>
              <div
                className={`${stat.colors.iconBg} backdrop-blur-sm rounded-xl p-3 flex items-center justify-center flex-shrink-0 ml-3`}
              >
                <stat.Icon size={20} className="text-white" weight="bold" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Cerca;
