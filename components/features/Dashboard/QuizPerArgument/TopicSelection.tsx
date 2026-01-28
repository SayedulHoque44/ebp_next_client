"use client";
import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { BsFillFilePostFill } from "react-icons/bs";
import EBSearch from "@/components/shared/EBSearch";
import { Button } from "antd";
import SingleTopic from "../AdminManagment/QuizManagment/Topics/SingleTopic";
import ErrorAlert from "@/components/shared/Alert/ErrorAlert";
import Skeleton from "react-loading-skeleton";
import TopicManagementHooks from "@/features/Topic/hooks/topic.hooks";
import { IGetTopicsByArgumentIdsRequest, ITopicQueryParam } from "@/features/Topic/interface/topic.interface";
import { useSearchParams } from "next/navigation";
import QuizHooks from "@/features/Quiz/hooks/quiz.hooks";
import { IQuizGetRandomQuizzesByTopicIdsRequest } from "@/features/Quiz/interface/quiz.interfaces";
import { BsArrowRight } from "react-icons/bs";
import QuizPlayModal from "@/components/shared/QuizScreen/QuizPlayModal";
import useIsLocked from "@/hooks/useIsLocked";
import toast from "react-hot-toast";
import { QUERY_KEY } from "@/constants/constendData";
import { useQueryClient } from "@tanstack/react-query";

const TopicSelection = () => {
  const searchParams = useSearchParams();
  const selectedIdsParam = searchParams.get("selectedIds");
  const argumentIds = useMemo(() => {
    try {
      return selectedIdsParam ? JSON.parse(selectedIdsParam) : [];
    } catch {
      return [];
    }
  }, [selectedIdsParam]);

  const [filterParams, setFilterParams] = useState<ITopicQueryParam[]>([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const isLocked = useIsLocked();

  const baseParams = useMemo(
    () => [
      { name: "page", value: 1 },
      { name: "limit", value: 1000 },
      { name: "sort", value: "createdAt" },
      { name: "isDeleted", value: false },
      { name: "count", value: true },
      ...filterParams,
    ],
    [filterParams]
  );

  const queryParams = useMemo<IGetTopicsByArgumentIdsRequest>(() => ({
    argumentIds,
    params: baseParams,
  }), [argumentIds, baseParams]);

  const queryKey = useMemo(
    () => [QUERY_KEY.TOPICS, "by-argument-ids", ...argumentIds, ...filterParams.map((p) => `${p.name}:${p.value}`)],
    [argumentIds, filterParams]
  );

  const { data: fetchData, isLoading, isFetching } =
    TopicManagementHooks.useGetTopicsByArgumentIds({
      queryKey: queryKey as any,
      params: queryParams,
      options: {
        enabled: argumentIds.length > 0,
      },
    });

  const metaData = useMemo(
    () => fetchData?.data?.meta || { total: 0 },
    [fetchData?.data?.meta]
  );
  const result = useMemo(
    () => fetchData?.data?.result || [],
    [fetchData?.data?.result]
  );

  const [shouldFetchQuiz, setShouldFetchQuiz] = useState(false);
  const [quizData, setQuizData] = useState<any[]>([]);
  const hasOpenedModalRef = useRef(false);
  const queryClient = useQueryClient();
  const [refetchCounter, setRefetchCounter] = useState(0);

  const quizQueryParams = useMemo<IQuizGetRandomQuizzesByTopicIdsRequest>(() => ({
    topicsIds: selectedTopicIds,
  }), [selectedTopicIds]);

  const quizQueryKey = useMemo(
    () => [QUERY_KEY.RANDOM_PLAYED_QUIZZES, ...selectedTopicIds, refetchCounter],
    [selectedTopicIds, refetchCounter]
  );

  const { data: randomQuizData, isLoading: isRandomQuizLoading, isFetching: isRandomQuizFetching, refetch: refetchRandomQuizzes } =
    QuizHooks.useGetRandomQuizzesByTopicIds({
      queryKey: quizQueryKey as any,
      params: quizQueryParams,
      options: {
        enabled: shouldFetchQuiz && selectedTopicIds.length > 0,
        refetchOnMount: true,
        staleTime: 0, // Always consider data stale to force fresh fetch
        cacheTime: 0, // Don't cache the data
      },
    });
console.log("randomQuizData", randomQuizData, shouldFetchQuiz, selectedTopicIds,isRandomQuizLoading, isRandomQuizFetching);
  // SearchTerm
  const onSearch = useCallback(
    (value: string) => {
      if (isLocked) {
        return;
      }
      setFilterParams((prev) => {
        const searchItemRemove = prev.filter(
          (item) => item.name !== "searchTerm"
        );
        if (!value) return searchItemRemove;
        return [...searchItemRemove, { name: "searchTerm", value }];
      });
    },
    [isLocked]
  );

  const handleToggleTopic = useCallback((id: string) => {
    setSelectedTopicIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      return [...prev, id];
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (isLocked) {
      toast.error("You are not allowed to select all topics");
      return;
    }
    const allIds = result.map((topic) => topic._id);
    if (selectedTopicIds.length === allIds.length) {
      setSelectedTopicIds([]);
      return;
    }
    setSelectedTopicIds(allIds);
  }, [isLocked, result, selectedTopicIds.length]);

  const handleStartQuiz = useCallback(async () => {
    if (selectedTopicIds.length === 0) return;
    
    // Reset modal state
    hasOpenedModalRef.current = false;
    setQuizData([]);
    
    // Invalidate previous query cache to force fresh fetch
    await queryClient.invalidateQueries({ 
      queryKey: [QUERY_KEY.RANDOM_PLAYED_QUIZZES, ...selectedTopicIds] 
    });
    
    // Increment counter to create new query key (forces fresh fetch)
    setRefetchCounter((prev) => prev + 1);
    
    // Enable fetching
    setShouldFetchQuiz(true);
  }, [selectedTopicIds, queryClient]);

  // Derive quiz data from query result
  const derivedQuizData = useMemo(() => {
    return randomQuizData?.data?.topicQuizzes || [];
  }, [randomQuizData?.data?.topicQuizzes]);

  // Update quiz data and open modal when query completes (using ref to prevent cascading renders)
  useEffect(() => {
    if (derivedQuizData.length > 0 && shouldFetchQuiz && !hasOpenedModalRef.current) {
      hasOpenedModalRef.current = true;
      // Use setTimeout to defer state updates and avoid cascading renders
      const timeoutId = setTimeout(() => {
        setQuizData(derivedQuizData);
        setIsQuizModalOpen(true);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
    // Reset ref when shouldFetchQuiz becomes false
    if (!shouldFetchQuiz) {
      hasOpenedModalRef.current = false;
    }
  }, [derivedQuizData, shouldFetchQuiz]);

  // Handle modal close and reset state
  const handleCloseModal = useCallback(() => {
    setIsQuizModalOpen(false);
    setShouldFetchQuiz(false);
    setQuizData([]);
    hasOpenedModalRef.current = false;
  }, []);

  const selectedCount = selectedTopicIds.length;

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
            <BsFillFilePostFill size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Topics</h1>
            <p className="text-gray-500 text-sm">
              Total Topics:{" "}
              <span className="font-semibold text-gray-800">
                {metaData?.total || 0}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="w-full lg:w-1/3">
            <EBSearch
              placeholder="Search Topics..."
              allowClear
              onSearch={onSearch}
              className="w-full"
            />
          </div>
          <div className="flex flex-wrap gap-3 w-full lg:w-2/3 justify-end items-center">
            <span className="text-sm text-gray-700 font-semibold">
              Seleziona topic ({selectedCount})
            </span>
            <button
              onClick={handleSelectAll}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm border ${
                selectedCount
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              {selectedCount >= result.length
                ? "Deseleziona tutto"
                : "Seleziona tutto"}
            </button>
            {filterParams.length > 0 && (
              <Button onClick={handleClearFilters} type="dashed" danger>
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* display */}
      <div className="relative space-y-5">
        <div className="space-y-5">
          {/*  */}
          {isFetching ? (
            <div className="space-y-5">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex gap-4">
                    <Skeleton width={100} height={100} />
                    <div className="flex-1 space-y-3">
                      <Skeleton width="80%" height={24} />
                      <Skeleton width="60%" height={20} />
                      <Skeleton width="40%" height={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : result.length > 0 ? (
            result.map((item, index) => (
              <SingleTopic
                key={item._id || index}
                topic={{ ...item, index }}
                selectable
                isSelected={selectedTopicIds.includes(item._id)}
                onToggleSelect={handleToggleTopic}
              />
            ))
          ) : (
            <ErrorAlert
              title={"Sorry No Data Found!"}
              info={"Please Check Again Later"}
            />
          )}

          {selectedCount > 0 && (
            <div
              onClick={handleStartQuiz}
              className={`fixed bottom-6 sm:bottom-8 md:bottom-10 right-6 sm:right-8 md:right-10 z-50 ${
                isRandomQuizFetching
                  ? "cursor-wait opacity-75"
                  : "cursor-pointer"
              }`}
            >
              <div className="px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-P-primary hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center gap-2 sm:gap-3 transition-all transform hover:scale-105">
                <span className="font-medium text-sm sm:text-base">
                  {isRandomQuizFetching
                    ? "Caricamento..."
                    : "Inizia i Quiz"}
                </span>
                <BsArrowRight size={20} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Play Modal */}
      <QuizPlayModal
        quizData={quizData}
        isLoading={isRandomQuizFetching}
        isOpen={isQuizModalOpen}
        onClose={handleCloseModal}
        quizType={"fixed"}
        manualeEnabled={true}
        traduzioneEnabled={true}
      />
    </div>
  );
};

export default TopicSelection;
