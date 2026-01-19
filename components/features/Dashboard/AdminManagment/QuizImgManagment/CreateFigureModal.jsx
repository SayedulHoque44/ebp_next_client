import { useEffect, useRef, useState } from "react";
import { useCreateQImageMutation } from "../../../../redux/Api/QuizImgManagmentApi";
import { useUplodeSinglePart } from "../../../../Util/Media";
import toast from "react-hot-toast";
import {
  EBP_Images_CDN_BaseUrl,
  EBP_S3_Images_BUCKET_NAME,
  EBP_s3Client,
  getFileNameFromCdnUrl,
  getObjectKeyFromUrl,
} from "../../../../Util/utils";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Button, Modal, Upload } from "antd";
import EBFrom from "../../../../Shared/Components/EBFrom";
import EBInput from "../../../../Shared/Components/EBInput";
import { LuImagePlus } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFigureSchema } from "../../../../Schemas/Schema";

const CreateFigureModal = ({ AllImages }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const uplodeBtn = useRef(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const { uplodeSinglePart, uploading } = useUplodeSinglePart();
  const [createImageQuery, { isLoading }] = useCreateQImageMutation();

  //console.log(AllImages);

  const checkExitsFigureName = (inputedFigName, AllImages) => {
    return AllImages.find((item) => {
      if (item.figure === inputedFigName) {
        return true;
      }
    });
  };
  const checkExitsImageUrl = (inputedFigName, AllImages) => {
    return AllImages.find((item) => {
      const folderName = "QuizImages/";
      if (
        getFileNameFromCdnUrl(
          EBP_Images_CDN_BaseUrl,
          folderName,
          item.imageUrl
        ) === inputedFigName
      ) {
        return true;
      }
    });
  };

  const handleSubmit = async (data) => {
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
        data.imageUrl = `${EBP_Images_CDN_BaseUrl}${singlePartResult.Key}`;
      } else {
        throw new Error("Faild to file uplode!!");
      }
      const create = await createImageQuery(data);
      //console.log(create);
      if (create?.data?.success) {
        handleCancel();
        toast.success(create.data.message);
      } else if (create.error) {
        throw new Error(create.error.data.message);
      }
      //
    } catch (error) {
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
              //    {...props}
              beforeUpload={() => false}
              onChange={(e) => setFile(e.fileList[0]?.originFileObj)}
              listType="picture"
              maxCount={1}
            >
              <Button className="flex items-center gap-1">
                <LuImagePlus />
                {file ? `Replace : ${file.name}` : "Uplode"}
              </Button>
            </Upload>
          </div>
          <Button disabled={loading} htmlType="submit">
            {/** loading */}
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

export default CreateFigureModal;
