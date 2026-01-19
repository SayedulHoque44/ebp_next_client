import React, { useContext, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import SingleQuiz from "./SingleQuiz";
import {
  useCreateQuizMutation,
  useGetQuizzesQuery,
} from "../../../../../redux/Api/QuizManagmentApi";
import LoaderCircleWithBar from "../../../../../Shared/Components/LoaderCircleWithBar";
import ErrorAlert from "../../../../../Shared/Components/Alert/ErrorAlert";
import { BsFillFilePostFill } from "react-icons/bs";
import { Button, Modal, Upload } from "antd";
import { useGetQuizImagesQuery } from "../../../../../redux/Api/QuizImgManagmentApi";
import toast from "react-hot-toast";
import EBFTextarea from "../../../../../Shared/Components/EBFTextarea";
import EBFSelect from "../../../../../Shared/Components/EBFSelect";
import EBFrom from "../../../../../Shared/Components/EBFrom";
import { zodResolver } from "@hookform/resolvers/zod";
import { createQuizSchema } from "../../../../../Schemas/Schema";

import { PiFileAudioDuotone } from "react-icons/pi";
import { MdQuiz } from "react-icons/md";
import {
  EBP_Images_CDN_BaseUrl,
  EBP_S3_Images_BUCKET_NAME,
  EBP_s3Client,
  getObjectKeyFromUrl,
} from "../../../../../Util/utils";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { TheoryProvider } from "..";
import { useUplodeSinglePart } from "../../../../../Util/Media";
import EBSearch from "../../../../../Shared/Components/EBSearch/EBSearch";
import QuizPlayModal from "../../../../../Shared/Components/QuizScreen/QuizPlayModal";
import qimg from "../../../../../assets/Images/dashboard/question.png";
const Quizzes = () => {
  const { topicId } = useParams();
  const { state } = useLocation();
  const { theory, title, index } = state?.topic || {}; //topic from state in link

  const [params, setParams] = useState([]);
  const { isTheory } = useContext(TheoryProvider);

  const {
    data: fetchQuizzes,
    isLoading,
    isFetching,
  } = useGetQuizzesQuery([
    { name: "page", value: 1 },
    { name: "limit", value: 1000 },
    { name: "sort", value: "createdAt" },
    { name: "isDeleted", value: false },
    {
      name: "ArgTopicId",
      value: topicId,
    },
    ...params,
  ]);
  //console.log(fetchQuizzes, "fetchQuizzes");

  const metaData = fetchQuizzes?.meta || { total: 0 };
  const result = fetchQuizzes?.result || [];
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [randomQuizData, setRandomQuizData] = useState([]);

  const shuffleQuizzes = (list) => {
    const arr = [...(list || [])];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const handleOpenQuiz = () => {
    setRandomQuizData(shuffleQuizzes(result));
    setIsQuizModalOpen(true);
  };
  // SearchTerm
  const onSearch = (value) => {
    const searchItemRemove = params.filter(
      (item) => item.name !== "searchTerm"
    );
    setParams([...searchItemRemove, { name: "searchTerm", value }]);
  };
  //console.log(params);
  return (
    <div className="space-y-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="p-3 bg-P-primary/10 rounded-full text-P-primary">
            <MdQuiz size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Topics</h1>
            <p className="text-gray-500 text-sm">
              Total Quizzes:{" "}
              <span className="font-semibold text-gray-800">
                {metaData?.total || 0}
              </span>
            </p>
          </div>
        </div>
        <div>{!isTheory && <CreateQuizModal topic={state?.topic} />}</div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="w-full lg:w-1/3">
            <EBSearch
              placeholder="Search Quizzes..."
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

      {/* quiz show */}
      <div className="space-y-5 relative">
        {title && (
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100  z-10">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="bg-P-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                {index + 1}
              </span>
              {title}
            </h2>
          </div>
        )}

        <div className="space-y-5">
          {isFetching ? (
            <LoaderCircleWithBar />
          ) : result?.length > 0 ? (
            result?.map((item, index) => (
              <SingleQuiz key={index} quiz={{ ...item, index }} />
            ))
          ) : (
            <ErrorAlert
              title={"Sorry No Data Found!"}
              info={"Please Check Again Later"}
            />
          )}
        </div>
      </div>
      <div
        onClick={handleOpenQuiz}
        className="fixed bottom-6 sm:bottom-8 md:bottom-10 right-6 sm:right-8 md:right-10 z-50 cursor-pointer"
      >
        <div className="px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-P-primary hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center gap-2 sm:gap-3 transition-all transform hover:scale-105">
          <img className="h-5 w-5 sm:h-6 sm:w-6" src={qimg} alt="" />
          <span className="font-medium text-sm sm:text-base">Play Quiz</span>
        </div>
      </div>
      {/* Quiz Play Modal */}
      <QuizPlayModal
        quizData={randomQuizData.length ? randomQuizData : result}
        isLoading={isLoading || isFetching}
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        quizType={"fixed"}
        manualeEnabled={true}
        traduzioneEnabled={true}
      />
    </div>
  );
};

const CreateQuizModal = ({ topic }) => {
  //console.log(topic);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const { uplodeSinglePart, uploading } = useUplodeSinglePart();

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
  const [createQuizQuery, { isLoading }] = useCreateQuizMutation();

  //
  const handleSubmitFinal = async (data) => {
    const quizData = {
      argumentId: topic.argumentId._id,
      ArgTopicId: topic._id,
      ...data,
    };
    // return //console.log(new Date().getTime() + "-" + file.name);
    setLoading(true);
    try {
      if (file) {
        const folderName = "AuthorAudio";
        // const folderName = "testEbp";

        const singlePartResult = await uplodeSinglePart({
          file,
          folderName,
        });
        if (singlePartResult.success && singlePartResult.Key) {
          toast.success("File Uploded Success!!");
          quizData.authorAudio = `${EBP_Images_CDN_BaseUrl}${singlePartResult.Key}`;
        }
      }

      //
      const create = await createQuizQuery(quizData);
      if (create?.data?.success) {
        toast.success(create.data.message);
      } else if (create.error) {
        throw new Error(create.error.data.message);
      }
    } catch (error) {
      //console.log(error);
      toast.error(error.message);
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
        Create Quiz
      </Button>
      <Modal
        title="Create Quiz"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <EBFrom
          reset={true}
          onSubmit={handleSubmitFinal}
          resolver={zodResolver(createQuizSchema)}
        >
          {/* <EBInput type="text" name="question" label="Queastion" />  */}
          <EBFTextarea type="text" name="question" label="Question" />

          <EBFSelect
            label="Answer"
            name="answer"
            options={[
              {
                value: "F",
                label: <span className="text-rose-500 font-semibold">F</span>,
              },
              {
                value: "V",
                label: <span className="text-green-500 font-semibold">V</span>,
              },
            ]}
            placeholder={"Select Answer"}
          />
          <EBFSelect
            label="Quiz Figure"
            name="image"
            disabled={isImgFetching}
            options={imagesOptions}
            placeholder={"Select Figure"}
          />
          <div className="mb-5">
            <h2 className="mb-2">Autho Audio :</h2>
            <Upload
              //    {...props}
              beforeUpload={() => false}
              onChange={(e) => setFile(e.fileList[0]?.originFileObj)}
              listType="picture"
              maxCount={1}
              accept="audio/*"
            >
              <Button className="flex items-center gap-1">
                <PiFileAudioDuotone />
                {file ? `Replace : ${file.name}` : "Uplode"}
              </Button>
            </Upload>
          </div>
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

export default Quizzes;
