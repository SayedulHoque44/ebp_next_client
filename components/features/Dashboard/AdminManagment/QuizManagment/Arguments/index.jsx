import React, { useContext, useState } from "react";
import { Button, Modal } from "antd";
import SingleArg from "./SingleArg";
import { BsFillFilePostFill } from "react-icons/bs";
import {
  useCreateArgumentMutation,
  useGetArgumentsQuery,
} from "../../../../../redux/Api/ArgManagmentApi";
import LoaderCircleWithBar from "../../../../../Shared/Components/LoaderCircleWithBar";
import ErrorAlert from "../../../../../Shared/Components/Alert/ErrorAlert";
import { zodResolver } from "@hookform/resolvers/zod";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import toast from "react-hot-toast";

import { createArgumentSchema } from "../../../../../Schemas/Schema";
import EBFrom from "../../../../../Shared/Components/EBFrom";
import EBInput from "../../../../../Shared/Components/EBInput";
import EBFSelect from "../../../../../Shared/Components/EBFSelect";
import { useGetQuizImagesQuery } from "../../../../../redux/Api/QuizImgManagmentApi";
import { TheoryProvider } from "..";

import EBSearch from "../../../../../Shared/Components/EBSearch/EBSearch";

const Arguments = () => {
  const [params, setParams] = useState([]);
  const [page, setPage] = useState(1);
  const { isTheory } = useContext(TheoryProvider);
  const {
    data: featchData,
    isLoading,
    isFetching,
  } = useGetArgumentsQuery([
    { name: "page", value: page },
    { name: "limit", value: 1000 },
    { name: "sort", value: "createdAt" },
    { name: "count", value: true },
    { name: "isDeleted", value: false },
    ...params,
  ]);
  const metaData = featchData?.meta;
  const ALlArguments = featchData?.result || [];
  //console.log(featchData);

  // SearchTerm
  const onSearch = (value) => {
    const searchItemRemove = params.filter(
      (item) => item.name !== "searchTerm"
    );
    setParams([...searchItemRemove, { name: "searchTerm", value }]);
  };

  //console.log(ALlArguments);

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
              <Button onClick={() => setParams([])} type="dashed" danger>
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
          ) : ALlArguments.length > 0 ? (
            ALlArguments.map((item, index) => (
              <SingleArg key={index} argument={{ ...item, index }} />
            ))
          ) : (
            <ErrorAlert
              title={"Sorry No Data Found!"}
              info={"Please Check Again Later"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const CreateModal = (argId) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    data: fetchImageData,
    isImgLoading,
    isImgFetching,
  } = useGetQuizImagesQuery([
    { name: "page", value: 1 },
    { name: "limit", value: 1000 },
    { name: "sort", value: "-createdAt" },
  ]);
  const AllQuizImgsData = fetchImageData?.result || [];

  const imagesOptions = AllQuizImgsData.map((item) => ({
    value: item._id,
    label: item.figure,
  }));
  const [createArgumentQuery, { isLoading }] = useCreateArgumentMutation();

  const handleSubmit = async (data) => {
    const argumentData = { ...data };

    // return //console.log(argumentData);
    try {
      const create = await createArgumentQuery(argumentData);
      //console.log(create);
      if (create?.data?.success) {
        toast.success(create.data.message);
      } else if (create.error) {
        toast.error(create.error.data.message);
      }
    } catch (error) {
      console.error("Failed to create argument:", error);
      toast.error("Failed to create argument!");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className="bg-blue-500 text-white" onClick={showModal}>
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
            placeholder={"Select Figure"}
          />
          <Button disabled={isLoading | loading} htmlType="submit">
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

export default Arguments;
