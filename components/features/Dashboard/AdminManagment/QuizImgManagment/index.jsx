import { Button, Modal, Pagination, Upload } from "antd";
import { useState } from "react";
import { FaImages } from "react-icons/fa";
import { BsFillFilePostFill } from "react-icons/bs";
import ErrorAlert from "../../../../Shared/Components/Alert/ErrorAlert";

import { useGetQuizImagesQuery } from "../../../../redux/Api/QuizImgManagmentApi";

import CreateFigureModal from "./CreateFigureModal";
import SingleFigure from "./SingleFigure";
import LoaderCircleWithBar from "../../../../Shared/Components/LoaderCircleWithBar";
import EBSearch from "../../../../Shared/Components/EBSearch/EBSearch";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const QuizImgManagment = () => {
  const [params, setParams] = useState([]);

  const [page, setPage] = useState(1);
  const {
    data: fetchImageData,
    isImgLoading,
    isFetching,
    isLoading,
  } = useGetQuizImagesQuery([
    { name: "page", value: page },
    { name: "limit", value: 10 },
    { name: "sort", value: "-createdAt" },
    ...params,
  ]);
  const metaData = fetchImageData?.meta;
  const ALlImages = fetchImageData?.result || [];
  //console.log(ALlImages);

  // SearchTerm
  const onSearch = (value) => {
    const searchItemRemove = params.filter(
      (item) => item.name !== "searchTerm"
    );
    setParams([...searchItemRemove, { name: "searchTerm", value }]);
  };

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {isLoading ? (
          <div className="flex items-center gap-4 w-full">
            <Skeleton circle width={48} height={48} />
            <div className="flex-1">
              <Skeleton width={200} height={28} className="mb-2" />
              <Skeleton width={150} height={20} />
            </div>
            <Skeleton width={140} height={40} />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="p-3 bg-P-primary/10 rounded-full text-P-primary">
                <FaImages size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Image Management
                </h1>
                <p className="text-gray-500 text-sm">
                  Total Images:{" "}
                  <span className="font-semibold text-gray-800">
                    {metaData?.total || 0}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <CreateFigureModal AllImages={ALlImages} />
            </div>
          </>
        )}
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="w-full lg:w-1/3">
            <EBSearch
              placeholder="Search Images..."
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
          Figures
        </h2>

        <div className="space-y-5">
          {/*  */}
          {isLoading ? (
            <div className="space-y-5">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <Skeleton width={200} height={200} />
                  <div className="flex-1 space-y-3">
                    <Skeleton width="80%" height={24} />
                    <Skeleton width="60%" height={20} />
                    <Skeleton width="40%" height={20} />
                  </div>
                </div>
              ))}
            </div>
          ) : isFetching ? (
            <LoaderCircleWithBar />
          ) : ALlImages.length > 0 ? (
            ALlImages.map((item, index) => (
              <SingleFigure key={index} item={item} />
            ))
          ) : (
            <ErrorAlert
              title={"Sorry No Data Found!"}
              info={"Please Check Again Later"}
            />
          )}
          <div className="mt-6 flex justify-end pt-4 border-t border-gray-100">
            <Pagination
              current={page}
              onChange={(value) => {
                setPage(value);
              }}
              pageSize={metaData?.limit}
              total={metaData?.total}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizImgManagment;
