"use client";
import React, { useRef, useState, useCallback } from "react";
import { QuizImgHooks } from "@/features/QuizImg/hooks/quizImg.hooks";
import { IQuizImage, ISingleQuizImageRequest } from "@/features/QuizImg/interface/quizImg.interface";
import { useUplodeSinglePart } from "@/hooks/media.hooks";
import toast from "react-hot-toast";
import { EBP_Images_CDN_BaseUrl, getFileNameFromCdnUrl } from "@/utils/utils";
import { Button, Modal, Upload } from "antd";
import EBFrom from "@/components/shared/Form/EBFrom";
import EBInput from "@/components/shared/Form/EBInput";
import { LuImagePlus } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFigureSchema } from "@/utils/Schemas";
import { QUERY_KEY } from "@/constants/constendData";
import { useQueryClient } from "@tanstack/react-query";
import type { UploadFile } from "antd/es/upload/interface";

interface CreateFigureModalProps {
  AllImages: IQuizImage[];
}

const CreateFigureModal = ({ AllImages }: CreateFigureModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const uplodeBtn = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { uplodeSinglePart, uploading } = useUplodeSinglePart();
  const queryClient = useQueryClient();

  const { mutateAsync: createImageQuery, isPending: isCreating } =
    QuizImgHooks.useCreateQuizImage({
      onSuccess: (response) => {
        if (response?.success) {
          handleCancel();
          toast.success(response.message);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.QUIZ_IMAGES],
          });
        }
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to create figure"
        );
      },
    });

  const checkExitsFigureName = useCallback(
    (inputedFigName: string, AllImages: IQuizImage[]) => {
      return AllImages.find((item) => {
        if (item.figure === inputedFigName) {
          return true;
        }
        return false;
      });
    },
    []
  );

  const checkExitsImageUrl = useCallback(
    (inputedFigName: string, AllImages: IQuizImage[]) => {
      return AllImages.find((item) => {
        const folderName = "QuizImages/";
        if (
          getFileNameFromCdnUrl(
            EBP_Images_CDN_BaseUrl || "",
            folderName,
            item.imageUrl
          ) === inputedFigName
        ) {
          return true;
        }
        return false;
      });
    },
    []
  );

  const handleSubmit = async (data: ISingleQuizImageRequest) => {
    try {
      setLoading(true);
      // check selected file
      if (!file) {
        throw new Error("Please Select an Image");
      }

      // check exits figure name
      if (checkExitsFigureName(data.figure, AllImages)) {
        throw new Error("This Figure Name Is Already Exits!");
      }
      // check exits img name
      if (checkExitsImageUrl(file.name, AllImages)) {
        throw new Error("This Image Name Is Already Exits!");
      }

      const folderName = "QuizImages";
      // const folderName = "testEbp";
      const singlePartResult = await uplodeSinglePart({
        file,
        folderName,
      });
      if (singlePartResult.success && singlePartResult.Key) {
        toast.success("File Uploded Success!!");
        const imageUrl = `${EBP_Images_CDN_BaseUrl}${singlePartResult.Key}`;
        await createImageQuery({ ...data, imageUrl });
      } else {
        throw new Error("Faild to file uplode!!");
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFile(null);
  };

  return (
    <>
      <Button className="bg-blue-500 text-white" onClick={showModal}>
        Create Figure
      </Button>
      <Modal
        title="Create Figure"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <EBFrom
          onSubmit={handleSubmit}
          reset={true}
          resolver={zodResolver(createFigureSchema)}
        >
          <EBInput type="text" name="figure" label="Figure Name" />

          <div className="mb-5">
            <h2 className="mb-2">File Uplode :</h2>

            <Upload
              ref={uplodeBtn}
              beforeUpload={() => false}
              onChange={(e) => {
                const fileList = e.fileList;
                if (fileList.length > 0) {
                  const originFile = fileList[0]?.originFileObj;
                  if (originFile) {
                    setFile(originFile);
                  }
                } else {
                  setFile(null);
                }
              }}
              listType="picture"
              maxCount={1}
            >
              <Button className="flex items-center gap-1">
                <LuImagePlus />
                {file ? `Replace : ${file.name}` : "Uplode"}
              </Button>
            </Upload>
          </div>
          <Button disabled={loading || uploading || isCreating} htmlType="submit">
            {/** loading */}
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

export default CreateFigureModal;
