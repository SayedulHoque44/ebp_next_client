import React, { useEffect, useMemo, useState } from "react";
import { BsFillFilePostFill } from "react-icons/bs";
import EBSearch from "../../../Shared/Components/EBSearch/EBSearch";
import Button from "../../../Shared/Components/Button/Button";
import SingleTopic from "../AdminManagment/QuizManagment/Topics/SingleTopic";
import ErrorAlert from "../../../Shared/Components/Alert/ErrorAlert";
import Skeleton from "react-loading-skeleton";
import { useLazyGetTopicsByArgumentIdsQuery } from "../../../redux/Api/TopicManagmentApi";
import { useLocation } from "react-router-dom";
import { useGetRandomQuizByTopicIdsMutation } from "../../../redux/Api/QuizManagmentApi";
import { BsArrowRight } from "react-icons/bs";
import QuizPlayModal from "../../../Shared/Components/QuizScreen/QuizPlayModal";
import useIsLocked from "../../../Util/Hooks/useIsLocked";
import toast from "react-hot-toast";

const TopicSelection = () => {
  const [params, setParams] = useState([]);
  const location = useLocation();
  const argumentIds = location.state?.selectedIds;
  const [selectedTopicIds, setSelectedTopicIds] = useState([]);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const isLocked = useIsLocked();
  const [
    getRandomQuizByTopicIds,
    {
      data: randomQuizData,
      isLoading: isRandomQuizLoading,
      isFetching: isRandomQuizFetching,
    },
  ] = useGetRandomQuizByTopicIdsMutation();

  // Featch Topics by Sending Argument Ids by payload in mutation
  const [fetchTopics, { data: fetchData, isLoading, isFetching }] =
    useLazyGetTopicsByArgumentIdsQuery();

  const baseParams = useMemo(
    () => [
      { name: "page", value: 1 },
      { name: "limit", value: 1000 },
      { name: "sort", value: "createdAt" },
      { name: "isDeleted", value: false },
      { name: "count", value: true },
      ...params,
    ],
    [params]
  );

  useEffect(() => {
    if (!argumentIds || argumentIds.length === 0) return;
    fetchTopics({ argumentIds, params: baseParams });
  }, [argumentIds, baseParams, fetchTopics]);

  const metaData = fetchData?.meta;
  const result = fetchData?.result || [];
  const selectedCount = selectedTopicIds.length;
  // SearchTerm
  const onSearch = (value) => {
    if (isLocked) {
      return;
    }
    const searchItemRemove = params.filter(
      (item) => item.name !== "searchTerm"
    );
    setParams([...searchItemRemove, { name: "searchTerm", value }]);
  };

  const handleToggleTopic = (id) => {
    setSelectedTopicIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      return [...prev, id];
    });
  };

  const handleSelectAll = () => {
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
  };

  const handleStartQuiz = async () => {
    if (selectedTopicIds.length === 0) return;

    try {
      const response = await getRandomQuizByTopicIds({
        topicsIds: selectedTopicIds,
      });
      //console.log(response, "response");
      // Open modal if we have quiz data
      if (
        response?.data?.result ||
        response?.data?.data?.result ||
        response?.data
      ) {
        setIsQuizModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };
  //console.log(randomQuizData, "randomQuizData");
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
            {params.length > 0 && (
              <Button onClick={() => setParams([])} type="dashed" danger>
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
                key={index}
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
                isRandomQuizLoading || isRandomQuizFetching
                  ? "cursor-wait opacity-75"
                  : "cursor-pointer"
              }`}
            >
              <div className="px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-P-primary hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center gap-2 sm:gap-3 transition-all transform hover:scale-105">
                {/* <img className="h-5 w-5 sm:h-6 sm:w-6" src={qimg} alt="" /> */}
                <span className="font-medium text-sm sm:text-base">
                  {isRandomQuizLoading || isRandomQuizFetching
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
        quizData={randomQuizData?.data?.topicQuizzes || []}
        isLoading={isRandomQuizLoading || isRandomQuizFetching}
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        quizType={"fixed"}
        manualeEnabled={true}
        traduzioneEnabled={true}
      />
    </div>
  );
};

export default TopicSelection;
