import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { BiSolidCheckboxChecked } from "react-icons/bi";
import { SiStackshare } from "react-icons/si";
import {
  useDeleteSingleFigureMutation,
  useGetImageMetabyIdQuery,
  useUpdateSingleFigureMutation,
} from "../../../../redux/Api/QuizImgManagmentApi";
import { FaEdit } from "react-icons/fa";
import { Button, Modal } from "antd";
import EBFrom from "../../../../Shared/Components/EBFrom";
import EBInput from "../../../../Shared/Components/EBInput";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  EBP_Images_CDN_BaseUrl,
  EBP_S3_Images_BUCKET_NAME,
  EBP_s3Client,
  getObjectKeyFromUrl,
} from "../../../../Util/utils";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

const SingleFigure = ({ item }) => {
  const [deleteFigureQuery, { isLoading }] = useDeleteSingleFigureMutation();

  //console.log(item);
  const handleDeleteFigure = (figureId) => {
    if (isLoading) {
      return;
    }
    Swal.fire({
      title: `Are You Sure delete this Figure!`,
      text: "After Delete Figure All Connected figure will be lost!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deletedFigure = await deleteFigureQuery(figureId);
          //console.log(deletedFigure);
          if (deletedFigure?.data?.success) {
            toast.success(deletedFigure.data.message);
          }
        } catch (error) {
          //console.log(error);
          toast.success(error?.message);
        }
      }
    });
  };

  return (
    <div>
      <div className="flex  justify-end items-center gap-3 mb-1">
        <ConnectedFigure quizId={item._id} />
        <MdDelete
          size={25}
          onClick={() => handleDeleteFigure(item._id)}
          className="text-red-400 cursor-pointer "
        />
        <UpdateFigureModal item={item} />
      </div>
      <div className="bg-P-primary/50 border-2 border-P-primary shadow-1 text-black p-5 rounded mb-4 gap-3 flex min-h-[200px]">
        <div className="flex flex-1 gap-5">
          <div className="w-[20%] xl:w-[10%] flex items-center justify-center">
            <img className="mx-auto" src={item.imageUrl} alt="" />
          </div>
          <h1 className="flex-1 md:text-xl">{item.figure}</h1>
        </div>
      </div>
    </div>
  );
};

const UpdateFigureModal = ({ item }) => {
  const { figure, _id } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateFigureQuery, { isLoading }] = useUpdateSingleFigureMutation();

  const handleSubmit = async (data) => {
    const update = await updateFigureQuery({ figureId: _id, figureData: data });
    if (update?.data?.success) {
      toast.success(update.data.message);
    } else if (update.error) {
      toast.error(update.error.data.message);
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
      <FaEdit
        onClick={showModal}
        size={25}
        className="text-blue-400 cursor-pointer"
      />
      <Modal
        title="Update Figure"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <EBFrom
          onSubmit={handleSubmit}
          defaultValues={{
            figure,
          }}
        >
          <EBInput type="text" name="figure" label="Figure Name" />
          <Button disabled={isLoading} htmlType="submit">
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};
const ConnectedFigure = ({ quizId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: FigureMetaData, isLoading } = useGetImageMetabyIdQuery(quizId);
  //console.log(FigureMetaData?.data);

  const ArgumentsMeta = FigureMetaData?.data?.argumentFound;
  const TopicMeta = FigureMetaData?.data?.argTopicFound;
  const TheoryMeta = FigureMetaData?.data?.argTopicTheory;
  const QuizzesMeta = FigureMetaData?.data?.quizFound;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <SiStackshare
        onClick={showModal}
        size={25}
        className="text-yellow-400 cursor-pointer"
      />
      <Modal
        title="CONNECTED FIGURE"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="max-h-[400px] overflow-y-scroll space-y-5">
          {/* Argument */}
          {ArgumentsMeta?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold">Arguments :</h2>
              <div className="space-y-3 ml-2">
                {ArgumentsMeta?.map((ele, index) => (
                  <div
                    key={ele._id}
                    className="flex items-center gap-1 text-lg flex-wrap"
                  >
                    <span>
                      {index + 1}. {ele.title}
                    </span>
                    <BiSolidCheckboxChecked className="text-yellow-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Topic */}
          {TopicMeta?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold">Topics :</h2>
              <div className="space-y-3 ml-2">
                {TopicMeta.map((ele, index) => (
                  <div
                    key={ele._id}
                    className="flex items-center gap-1 text-lg"
                  >
                    <span>
                      {index + 1}. {ele.title}
                    </span>
                    <BiSolidCheckboxChecked className="text-yellow-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Theory */}
          {TheoryMeta?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold">Theory :</h2>
              <div className="space-y-3 ml-2">
                {TheoryMeta.map((ele, index) => (
                  <div
                    key={ele._id}
                    className="flex items-center gap-1 text-lg"
                  >
                    <span>
                      {index + 1}. {ele.title}
                    </span>
                    <BiSolidCheckboxChecked className="text-yellow-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Quiz */}
          {QuizzesMeta?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold">Theory :</h2>
              <div className="space-y-3 ml-2">
                {QuizzesMeta.map((ele, index) => (
                  <div
                    key={ele._id}
                    className="flex items-center gap-1 text-lg"
                  >
                    <span>
                      {index + 1}. {ele.question}
                    </span>
                    <BiSolidCheckboxChecked className="text-yellow-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default SingleFigure;
