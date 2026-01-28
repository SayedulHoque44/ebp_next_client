"use client";
import { Button, Modal, Select } from "antd";
import React, { useContext, useState, useMemo, useCallback, memo, useEffect } from "react";
import { BsFillFilePostFill } from "react-icons/bs";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import SingleTopic from "./SingleTopic";
import TopicManagementHooks from "@/features/Topic/hooks/topic.hooks";
import { ITopic, ITopicGetTopicsRequest } from "@/features/Topic/interface/topic.interface";
import ErrorAlert from "@/components/shared/Alert/ErrorAlert";
import LoaderCircleWithBar from "@/components/shared/LoaderCircleWithBar";
import { QuizImgHooks } from "@/features/QuizImg/hooks/quizImg.hooks";
import { IQuizImage } from "@/features/QuizImg/interface/quizImg.interface";
import toast from "react-hot-toast";
import EBFrom from "@/components/shared/Form/EBFrom";
import EBInput from "@/components/shared/Form/EBInput";
import EBFSelect from "@/components/shared/Form/EBFSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { createArgTopicSchema } from "@/utils/Schemas";
import EBFTextarea from "@/components/shared/Form/EBFTextarea";
import { TheoryProvider } from "..";
import useAuth from "@/features/Auth/hooks/useAuth";
import EBSearch from "@/components/shared/EBSearch";
import { QUERY_KEY } from "@/constants/constendData";
import { useQueryClient } from "@tanstack/react-query";



interface FilterParam {
  name: string;
  value: string | number | boolean;
}

const Topics = memo(() => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  // Route parameter (from [ArgId] folder)
  const ArgId = (params?.ArgId as string) || "";
  
  // Query parameters (from URL search params)
  const titleParam = searchParams.get("title") || "";
  const indexParam = searchParams.get("index") || "";
  
  // Parse and format argumentTitle from query params
  const argumentTitle = titleParam ? decodeURIComponent(titleParam) : "";
  const argumentIndex = indexParam ? parseInt(indexParam, 10) : 0;
  
  // shouldShowLock can be passed as query param if needed, defaulting to false
  const shouldShowLock = searchParams.get("shouldShowLock") === "true" || false;
  
  const [filterParams, setFilterParams] = useState<FilterParam[]>([]);
  const { isTheory } = useContext(TheoryProvider);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Redirect if no ArgId (required route parameter)
  useEffect(() => {
    if (!ArgId) {
      router.push(
        isTheory ? "/dashboard/theory" : "/dashboard/adminManagment/quizManagment"
      );
    }
  }, [ArgId, router, isTheory]);

  // Convert params array to request object
  const queryParams = useMemo<ITopicGetTopicsRequest>(() => {
    const requestParams: ITopicGetTopicsRequest = {
      page: 1,
      limit: 1000,
      sort: "createdAt",
      count: true,
      isDeleted: false,
    };

    if (ArgId) {
      requestParams.argumentId = ArgId;
    }

    filterParams.forEach((param) => {
      if (param.name === "searchTerm") {
        requestParams.searchTerm = param.value as string;
      }
    });

    return requestParams;
  }, [ArgId, filterParams]);

  // Create stable query key
  const queryKey = useMemo(
    () => [
      QUERY_KEY.TOPICS,
      ArgId,
      ...filterParams.map((p) => `${p.name}:${p.value}`),
    ],
    [ArgId, filterParams]
  );

  const { data, isLoading, isFetching } = TopicManagementHooks.useGetAllTopics({
    queryKey,
    params: queryParams,
    options: {
      enabled: !!ArgId,
    },
  });

  const metaData = useMemo(() => data?.data?.meta, [data?.data?.meta]);
  const result = useMemo(() => data?.data?.result || [], [data?.data?.result]);

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

  if (!argumentTitle) {
    return null; // Will redirect via useEffect
  }

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
        <div>{!isTheory && <CreateTopicModal ArgId={ArgId} />}</div>
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
          <div className="flex flex-wrap gap-3 w-full lg:w-2/3 justify-end">
            {filterParams.length > 0 && (
              <Button onClick={handleClearFilters} type="dashed" danger>
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Display */}
      <div className="relative space-y-5">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span className="bg-P-primary text-white px-3 py-1 rounded-lg text-sm">
              ARGUMENT
            </span>
            {argumentTitle}
          </h2>
        </div>

        <div className="space-y-5">
          {isFetching ? (
            <LoaderCircleWithBar />
          ) : result.length > 0 ? (
            result.map((item, index) => (
              <SingleTopic key={item._id || index} topic={{ ...item, index }} />
            ))
          ) : (
            <ErrorAlert
              title="Sorry No Data Found!"
              info="Please Check Again Later"
            />
          )}
        </div>
      </div>
    </div>
  );
});

Topics.displayName = "Topics";

interface CreateTopicModalProps {
  ArgId: string;
}

const CreateTopicModal = memo(({ ArgId }: CreateTopicModalProps) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [multiSelect, setMultiSelect] = useState<string[]>([]);

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

  const allQuizImgsData = useMemo(
    () => fetchImageData?.data?.result || [],
    [fetchImageData?.data?.result]
  );

  const imagesOptions = useMemo(
    () =>
      allQuizImgsData.map((item: IQuizImage) => ({
        value: item._id,
        label: item.figure,
      })),
    [allQuizImgsData]
  );

  const createTopicMutation = TopicManagementHooks.useCreateArgTopic({
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TOPICS] });
        toast.success(response.message);
        handleCancel();
        setMultiSelect([]);
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create topic");
    },
  });

  const handleSubmit = useCallback(
    async (data: Partial<ITopic>) => {
      const topicData: Partial<Omit<ITopic, "_id" | "createdAt" | "updatedAt">> = {
        argumentId: ArgId as any,
        ...data,
        theoryImages: multiSelect,
      };

      await createTopicMutation.mutateAsync(topicData);
    },
    [ArgId, multiSelect, createTopicMutation]
  );

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    setMultiSelect([]);
  }, []);

  const handleMultiFigSelect = useCallback((value: string[]) => {
    setMultiSelect(value);
  }, []);

  return (
    <>
      <Button
        className="bg-blue-500 text-white"
        onClick={showModal}
        aria-label="Create new topic"
      >
        Create Topic
      </Button>
      <Modal
        title="Create Topic"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <EBFrom
          reset={true}
          onSubmit={handleSubmit}
          resolver={zodResolver(createArgTopicSchema)}
        >
          <EBInput
            type="text"
            name="title"
            label="Title"
            placeholder="Enter Title"
          />
          <EBFTextarea name="theory" label="Theory" />
          <EBFSelect
            label="Theory Title Figure"
            name="image"
            disabled={isImgFetching}
            options={imagesOptions}
            placeholder="Select Figure"
          />
          <p className="mb-1">Select Theory Figures</p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please Theory Figures"
            onChange={handleMultiFigSelect}
            disabled={isImgFetching}
            options={imagesOptions}
            className="mb-2"
            aria-label="Select theory figures"
          />
          <EBInput
            type="text"
            name="videoUrl"
            label="Video Url"
            placeholder="Enter Video Url"
          />
          <Button
            className="mt-3"
            disabled={createTopicMutation.isPending || (isImgFetching ?? false)}
            htmlType="submit"
            aria-label="Submit topic creation"
          >
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
});

CreateTopicModal.displayName = "CreateTopicModal";

export default Topics;
