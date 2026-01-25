"use client";
import React, { useMemo, useState, useCallback } from "react";
import EBSearch from "@/components/shared/EBSearch";
import { Button } from "antd";
import Skeleton from "react-loading-skeleton";
import ErrorAlert from "@/components/shared/Alert/ErrorAlert";
import SingleArg from "../AdminManagment/QuizManagment/Arguments/SingleArg";
import ArgumentHooks from "@/features/Argument/hooks/argument.hooks";
import { IArgumentGetArgumentsRequest } from "@/features/Argument/interface/argument.interface";
import { BsFillFilePostFill } from "react-icons/bs";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import useIsLocked from "@/hooks/useIsLocked";
import toast from "react-hot-toast";
import { QUERY_KEY } from "@/constants/constendData";

const QuizPerArgument = () => {
  const [filterParams, setFilterParams] = useState<
    Array<{ name: string; value: string | number | boolean }>
  >([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const selectionLimit = 25;
  const isLocked = useIsLocked();

  // Convert filter params to request object
  const queryParams = useMemo<IArgumentGetArgumentsRequest>(() => {
    const requestParams: IArgumentGetArgumentsRequest = {
      page,
      limit: 1000,
      sort: "createdAt",
      count: true,
      isDeleted: false,
    };

    filterParams.forEach((param) => {
      if (param.name === "searchTerm") {
        requestParams.searchTerm = param.value as string;
      }
    });

    return requestParams;
  }, [page, filterParams]);

  // Create stable query key
  const queryKey = useMemo(
    () => [
      QUERY_KEY.ARGUMENTS,
      page,
      ...filterParams.map((p) => `${p.name}:${p.value}`),
    ],
    [page, filterParams]
  );

  const { data: featchData, isLoading, isFetching } =
    ArgumentHooks.useGetArguments({
      queryKey: queryKey as any,
      params: queryParams,
    });

  const metaData = useMemo(
    () => featchData?.data?.meta || { total: 0 },
    [featchData?.data?.meta]
  );
  const ALlArguments = useMemo(
    () => featchData?.data?.result || [],
    [featchData?.data?.result]
  );

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

  const handleToggle = useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= selectionLimit) return prev;
      return [...prev, id];
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (isLocked) {
      toast.error("You are not allowed to select all arguments");
      return;
    }
    const allIds = (ALlArguments || []).map((arg) => arg._id);
    if (selectedIds.length === Math.min(allIds.length, selectionLimit)) {
      setSelectedIds([]);
      return;
    }
    setSelectedIds(allIds.slice(0, selectionLimit));
  }, [isLocked, ALlArguments, selectedIds.length]);

  const selectedCount = selectedIds.length;

  // Clear filters
  const handleClearFilters = useCallback(() => {
    setFilterParams([]);
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
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="p-3 bg-P-primary/10 rounded-full text-P-primary">
                <BsFillFilePostFill size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Arguments Selection
                </h1>
                <p className="text-gray-500 text-sm">
                  Total Arguments:{" "}
                  <span className="font-semibold text-gray-800">
                    {metaData?.total || 0}
                  </span>
                </p>
              </div>
            </div>
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
              disabled={isLocked}
            />
          </div>
          <div className="flex flex-wrap gap-3 w-full lg:w-2/3 justify-end items-center">
            <span className="text-sm text-gray-700 font-semibold">
              Seleziona argomenti ({selectedCount}/{selectionLimit})
            </span>
            <button
              onClick={handleSelectAll}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm border ${
                selectedCount
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              {selectedCount >= Math.min(ALlArguments.length, selectionLimit)
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
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 uppercase border-b pb-2">
          Arguments
        </h2>
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
          ) : ALlArguments.length > 0 ? (
            ALlArguments.map((item, index) => (
              <SingleArg
                key={item._id || index}
                argument={{ ...item, index }}
                selectable
                isSelected={selectedIds.includes(item._id)}
                onToggleSelect={handleToggle}
              />
            ))
          ) : (
            <ErrorAlert
              title={"Sorry No Data Found!"}
              info={"Please Check Again Later"}
            />
          )}
          {selectedCount > 0 && (
            <Link
              href={{
                pathname: "/dashboard/topicSelection",
                query: { selectedIds: JSON.stringify(selectedIds) },
              }}
              className="fixed bottom-6 sm:bottom-8 md:bottom-10 right-6 sm:right-8 md:right-10 z-50 cursor-pointer"
            >
              <div className="px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-P-primary hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center gap-2 sm:gap-3 transition-all transform hover:scale-105">
                <span className="font-medium text-sm sm:text-base">Avanti</span>
                <BsArrowRight size={20} />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPerArgument;
