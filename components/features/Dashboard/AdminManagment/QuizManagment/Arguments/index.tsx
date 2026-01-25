"use client";
import React, { useContext, useState, useMemo, useCallback, memo } from "react";
import { Button, Modal } from "antd";
import SingleArg from "./SingleArg";
import { BsFillFilePostFill } from "react-icons/bs";
import ArgumentHooks from "@/features/Argument/hooks/argument.hooks";
import { IArgument, IArgumentGetArgumentsRequest } from "@/features/Argument/interface/argument.interface";
import LoaderCircleWithBar from "@/components/shared/LoaderCircleWithBar";
import ErrorAlert from "@/components/shared/Alert/ErrorAlert";
import { zodResolver } from "@hookform/resolvers/zod";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
import { createArgumentSchema } from "@/utils/Schemas";
import EBFrom from "@/components/shared/Form/EBFrom";
import EBInput from "@/components/shared/Form/EBInput";
import EBFSelect from "@/components/shared/Form/EBFSelect";
import { QuizImgHooks } from "@/features/QuizImg/hooks/quizImg.hooks";
import { IQuizImage } from "@/features/QuizImg/interface/quizImg.interface";
import { TheoryProvider } from "..";
import EBSearch from "@/components/shared/EBSearch";
import { QUERY_KEY } from "@/constants/constendData";
import { useQueryClient } from "@tanstack/react-query";

interface FilterParam {
  name: string;
  value: string | number | boolean;
}

const Arguments = memo(() => {
  const queryClient = useQueryClient();
  const [params, setParams] = useState<FilterParam[]>([]);
  const [page] = useState(1);
  const { isTheory } = useContext(TheoryProvider);

  // Convert params array to request object
  const queryParams = useMemo<Partial<IArgumentGetArgumentsRequest> & { page: number; limit: number; sort: string; count: boolean; isDeleted: boolean }>(() => {
    const requestParams: Partial<IArgumentGetArgumentsRequest> & { page: number; limit: number; sort: string; count: boolean; isDeleted: boolean } = {
      page,
      limit: 1000,
      sort: "createdAt",
      count: true,
      isDeleted: false,
    };

    params.forEach((param) => {
      if (param.name === "searchTerm" && param.value) {
        requestParams.searchTerm = param.value as string;
      }
    });

    return requestParams;
  }, [page, params]);

  // Create stable query key
  const queryKey = useMemo(
    () => [
      QUERY_KEY.ARGUMENTS,
      page,
      ...params.map((p) => `${p.name}:${p.value}`),
    ],
    [page, params]
  );

  const { data, isLoading, isFetching } = ArgumentHooks.useGetArguments({
    queryKey,
    params: queryParams,
    options: {
      enabled: true,
    },
  });

  const metaData = useMemo(() => data?.data?.meta, [data?.data?.meta]);
  const allArguments = useMemo(() => data?.data?.result || [], [data?.data?.result]);

  // Search handler
  const onSearch = useCallback((value: string) => {
    setParams((prev) => {
      const filtered = prev.filter((item) => item.name !== "searchTerm");
      if (!value) return filtered;
      return [...filtered, { name: "searchTerm", value }];
    });
  }, []);

  // Clear filters
  const handleClearFilters = useCallback(() => {
    setParams([]);
  }, []);

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {isLoading ? (
          <div className="flex items-center gap-4 w-full">
            <Skeleton circle width={48} height={48} />
            <div className="flex-1">
              <Skeleton width={250} height={28} className="mb-2" />
              <Skeleton width={180} height={20} />
            </div>
            {!isTheory && <Skeleton width={140} height={40} />}
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="p-3 bg-P-primary/10 rounded-full text-P-primary">
                <BsFillFilePostFill size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Arguments</h1>
                <p className="text-gray-500 text-sm">
                  Total Arguments:{" "}
                  <span className="font-semibold text-gray-800">
                    {metaData?.total || 0}
                  </span>
                </p>
              </div>
            </div>
            <div>{!isTheory && <CreateModal />}</div>
          </>
        )}
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="w-full lg:w-1/3">
            <EBSearch
              placeholder="Search Arguments..."
              allowClear
              onSearch={onSearch}
              className="w-full"
            />
          </div>
          <div className="flex flex-wrap gap-3 w-full lg:w-2/3 justify-end">
            {params.length > 0 && (
              <Button onClick={handleClearFilters} type="dashed" danger>
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Display */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 uppercase border-b pb-2">
          Arguments
        </h2>
        <div className="space-y-5">
          {isLoading ? (
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
          ) : isFetching ? (
            <LoaderCircleWithBar />
          ) : allArguments.length > 0 ? (
            allArguments.map((item, index) => (
              <SingleArg key={item._id || index} argument={{ ...item, index }} />
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

Arguments.displayName = "Arguments";

const CreateModal = memo(() => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const createArgumentMutation = ArgumentHooks.useCreateArgument({
    onSuccess: async (response) => {
      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ARGUMENTS] });
        toast.success(response.message);
        handleCancel();
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create argument");
    },
  });

  const handleSubmit = useCallback(
    async (data: Partial<IArgument>) => {
      await createArgumentMutation.mutateAsync(data);
    },
    [createArgumentMutation]
  );

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <Button
        className="bg-blue-500 text-white"
        onClick={showModal}
        aria-label="Create new argument"
      >
        Create Argument
      </Button>
      <Modal
        title="Create Argument"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <EBFrom
          onSubmit={handleSubmit}
          resolver={zodResolver(createArgumentSchema)}
          reset={true}
        >
          <EBInput type="text" name="title" label="Title" />
          <EBFSelect
            label="Argument Figure"
            name="image"
            disabled={isImgFetching}
            options={imagesOptions}
            placeholder="Select Figure"
          />
          <Button
            disabled={createArgumentMutation.isPending || (isImgFetching ?? false)}
            htmlType="submit"
            aria-label="Submit argument creation"
          >
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
});

CreateModal.displayName = "CreateModal";

export default Arguments;
