"use client";
import React, { useState, useMemo } from "react";
import { MdDelete } from "react-icons/md";
import { BiSolidCheckboxChecked } from "react-icons/bi";
import { SiStackshare } from "react-icons/si";
import { QuizImgHooks } from "@/features/QuizImg/hooks/quizImg.hooks";
import { IQuizImage, ISingleQuizImageRequest } from "@/features/QuizImg/interface/quizImg.interface";
import { FaEdit } from "react-icons/fa";
import { Button, Modal } from "antd";
import EBFrom from "@/components/shared/Form/EBFrom";
import EBInput from "@/components/shared/Form/EBInput";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { QUERY_KEY } from "@/constants/constendData";
import { useQueryClient } from "@tanstack/react-query";

interface SingleFigureProps {
  item: IQuizImage;
}

interface ImageMetadata {
  argumentFound?: Array<{ _id: string; title: string }>;
  argTopicFound?: Array<{ _id: string; title: string }>;
  argTopicTheory?: Array<{ _id: string; title: string }>;
  quizFound?: Array<{ _id: string; question: string }>;
}

interface ImageMetadataResponse {
  success: boolean;
  data: ImageMetadata;
  message: string;
}

const SingleFigure = ({ item }: SingleFigureProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteFigureQuery, isPending: isDeleting } =
    QuizImgHooks.useDeleteSingleQuizImage({
      onSuccess: (response) => {
        if (response?.success) {
          toast.success(response.message);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.QUIZ_IMAGES],
          });
        }
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to delete figure");
      },
    });

  const handleDeleteFigure = (figureId: string) => {
    if (isDeleting) {
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
          await deleteFigureQuery({ figureId });
        } catch (error) {
          // Error handled in onError callback
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
            <img
              src={item.imageUrl}
              alt={item.figure}
              className="mx-auto max-w-full max-h-[200px] object-contain"
            />
          </div>
          <h1 className="flex-1 md:text-xl">{item.figure}</h1>
        </div>
      </div>
    </div>
  );
};

const UpdateFigureModal = ({ item }: { item: IQuizImage }) => {
  const { figure, _id } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: updateFigureQuery, isPending: isLoading } =
    QuizImgHooks.useUpdateSingleBlog({
      onSuccess: (response) => {
        if (response?.success) {
          toast.success(response.message);
          setIsModalOpen(false);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.QUIZ_IMAGES],
          });
        }
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to update figure"
        );
      },
    });

  const handleSubmit = async (data: ISingleQuizImageRequest) => {
    await updateFigureQuery({ data, figureId: _id });
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

const ConnectedFigure = ({ quizId }: { quizId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryKey = useMemo(
    () => [QUERY_KEY.IMAGE_METADATA, quizId],
    [quizId]
  );

  const { data: FigureMetaData, isLoading } =
    QuizImgHooks.useGetImageMetadataById({
      queryKey: queryKey as any,
      params: { figureId: quizId },
      options: {
        enabled: isModalOpen && !!quizId,
      },
    });

  const metadata = useMemo(() => {
    const data = (FigureMetaData as any)?.data || {};
    return {
      ArgumentsMeta: data.argumentFound || [],
      TopicMeta: data.argTopicFound || [],
      TheoryMeta: data.argTopicTheory || [],
      QuizzesMeta: data.quizFound || [],
    };
  }, [FigureMetaData]);

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
          {metadata.ArgumentsMeta.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold">Arguments :</h2>
              <div className="space-y-3 ml-2">
                {metadata.ArgumentsMeta.map((ele: any, index: number) => (
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
          {metadata.TopicMeta.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold">Topics :</h2>
              <div className="space-y-3 ml-2">
                {metadata.TopicMeta.map((ele: any, index: number) => (
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
          {metadata.TheoryMeta.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold">Theory :</h2>
              <div className="space-y-3 ml-2">
                {metadata.TheoryMeta.map((ele: any, index: number) => (
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
          {metadata.QuizzesMeta.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold">Quizzes :</h2>
              <div className="space-y-3 ml-2">
                {metadata.QuizzesMeta.map((ele: any, index: number) => (
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
