import { Button, Modal, Select, Space } from "antd";
import React, { useContext, useState } from "react";
import { BsFillFilePostFill } from "react-icons/bs";
import SingleArg from "../Arguments/SingleArg";
import { useLocation, useParams } from "react-router-dom";
import SingleTopic from "./SingleTopic";
import {
  useCreateArgTopicMutation,
  useGetAllTopicsQuery,
} from "../../../../../redux/Api/TopicManagmentApi";
import ErrorAlert from "../../../../../Shared/Components/Alert/ErrorAlert";
import LoaderCircleWithBar from "../../../../../Shared/Components/LoaderCircleWithBar";
import { useGetQuizImagesQuery } from "../../../../../redux/Api/QuizImgManagmentApi";
import toast from "react-hot-toast";
import EBFrom from "../../../../../Shared/Components/EBFrom";
import EBInput from "../../../../../Shared/Components/EBInput";
import EBFSelect from "../../../../../Shared/Components/EBFSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createArgTopicSchema,
  createArgumentSchema,
} from "../../../../../Schemas/Schema";
import EBFTextarea from "../../../../../Shared/Components/EBFTextarea";
import { TheoryProvider } from "..";
import usePContext from "../../../../../Util/Hooks/usePContext";
import EBSearch from "../../../../../Shared/Components/EBSearch/EBSearch";

const Topics = () => {
  const { ArgId } = useParams();
  const location = useLocation();
  const [params, setParams] = useState([]);
  const { isTheory } = useContext(TheoryProvider);
  const { loggedUser, loading } = usePContext();
  const {
    data: fetchData,
    isLoading,
    isFetching,
  } = useGetAllTopicsQuery([
    { name: "page", value: 1 },
    { name: "limit", value: 1000 },
    { name: "sort", value: "createdAt" },
    { name: "count", value: true },
    { name: "argumentId", value: ArgId },
    { name: "isDeleted", value: false },
    ...params,
  ]);

  const metaData = fetchData?.meta;
  const result = fetchData?.result;
  //console.log(result, "result");
  // SearchTerm
  const onSearch = (value) => {
    const searchItemRemove = params.filter(
      (item) => item.name !== "searchTerm"
    );
    setParams([...searchItemRemove, { name: "searchTerm", value }]);
  };

  if (!location?.state?.argumentTitle) {
    //console.log("no argument title");
    window.location.href = "/dashboard";
    return;
  } else if (location?.state?.shouldShowLock) {
    //console.log("no active status");
    // window.location.href = "/dashboard";
    // return;
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
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 ">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span className="bg-P-primary text-white px-3 py-1 rounded-lg text-sm">
              ARGUMENT
            </span>
            {location?.state?.argumentTitle}
          </h2>
        </div>

        <div className="space-y-5">
          {/*  */}

          {isFetching ? (
            <LoaderCircleWithBar />
          ) : result.length > 0 ? (
            result.map((item, index) => (
              <SingleTopic key={index} topic={{ ...item, index }} />
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

const CreateTopicModal = ({ ArgId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [multiSelect, setMultiSelect] = useState([]);
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
  const [createArgTopicQuery, { isLoading }] = useCreateArgTopicMutation();

  const handleSubmit = async (data) => {
    const topicData = { argumentId: ArgId, ...data, theoryImages: multiSelect };

    try {
      const create = await createArgTopicQuery(topicData);
      //console.log(create);
      if (create?.data?.success) {
        toast.success(create.data.message);
        handleCancel();
        setMultiSelect([]);
      } else if (create.error) {
        toast.error(create.error.data.message);
      }
    } catch (error) {
      // console.error("Failed to create argument:", error);
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

  const handleMultiFigSelect = (value) => {
    setMultiSelect(value);
    //console.log(value);
  };

  return (
    <>
      <Button className="bg-blue-500 text-white" onClick={showModal}>
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
            placeholder={"Enter Title"}
          />
          <EBFTextarea type="text" name="theory" label="Theory" />
          <EBFSelect
            label="Theory Title Figure"
            name="image"
            disabled={isImgFetching}
            options={imagesOptions}
            placeholder={"Select Figure"}
          />
          <p className="mb-1">Select Theory Figures</p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please Theory Figures"
            // defaultValue={['a10', 'c12']}
            onChange={handleMultiFigSelect}
            disabled={isImgFetching}
            options={imagesOptions}
            className="mb-2"
          />
          <EBInput
            type="text"
            name="videoUrl"
            label="Video Url"
            placeholder={"Enter Video Url"}
          />
          <Button
            className="mt-3"
            disabled={isLoading | loading}
            htmlType="submit"
          >
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

export default Topics;
