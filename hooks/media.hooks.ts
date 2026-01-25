import axios from "axios";
import { chunkSize, fileMaxSize } from "../utils/utils";
import { useCallback, useState } from "react";
import { FileUploadHooks } from "./useFileUploadAWS";

// Types
interface UploadSinglePartParams {
  file: File;
  folderName: string;
  setUploadProgress?: (progress: number) => void;
}

interface UploadMultiPartParams {
  file: File;
  folderName: string;
  setUploadProgress?: (progress: number) => void;
}

interface UploadResult {
  success: boolean;
  Key: string;
  data?: any;
}

// Utility function for single part upload
const UplodeSinglePart = async ({
  file,
  folderName,
  uplodeSmallFileApi,
  setUploadProgress,
}: {
  file: File;
  folderName: string;
  uplodeSmallFileApi: (params: {
    fileName: string;
    fileType: string;
    folderName: string;
    fileSize: number;
  }) => Promise<{ data: { presignedUrl: string; Key: string } }>;
  setUploadProgress?: (progress: number) => void;
}): Promise<UploadResult> => {
  try {
    if (file.size > fileMaxSize) {
      throw new Error(`File limit is max ${fileMaxSize / (1024 * 1024)}mb!`);
    }
    // Check Required Fields
    if (!file || !folderName || !uplodeSmallFileApi) {
      throw new Error("File or Foldername or more... cannot be empty");
    }
    // Get PresigendUrl for uplode file
    const presignedResponse = await uplodeSmallFileApi({
      fileName: file.name,
      fileType: encodeURIComponent(file.type),
      folderName,
      fileSize: file.size,
    });

    const { presignedUrl, Key } = presignedResponse.data;

    // If presignedUrl Or Key not found
    if (!presignedUrl || !Key) {
      throw new Error("Faild Upload Operation !24! ☹️");
    }

    // After PreSignedUrl Generate next process if to uplode in AWS S3
    const result = await axios.put(presignedUrl, file, {
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total !== undefined && setUploadProgress) {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        }
      },
    });

    return { success: true, Key, data: { ...result } };
  } catch (error) {
    throw error;
  }
};

// Utility function for multipart upload
const UplodeMultiPartWithinChunk = async ({
  file,
  folderName,
  uplodeBigFileChunckPresignedUrlApi,
  setUploadProgress,
  chunkSize,
  uplodeBigFileChunckPresignedUrlCompleteApi,
}: {
  file: File;
  folderName: string;
  uplodeBigFileChunckPresignedUrlApi: (params: {
    fileName: string;
    fileType: string;
    partCount: number;
    folderName: string;
    fileSize: number;
  }) => Promise<{
    data: {
      presignedUrls: Array<{ url: string; partNumber: number }>;
      UploadId: string;
      Key: string;
    };
  }>;
  setUploadProgress?: (progress: number) => void;
  chunkSize: number;
  uplodeBigFileChunckPresignedUrlCompleteApi: (params: {
    uploadId: string;
    parts: Array<{ ETag: string; PartNumber: number }>;
    Key: string;
  }) => Promise<{ Key: string; success: boolean }>;
}): Promise<UploadResult> => {
  try {
    // init
    const partCount = Math.ceil(file.size / chunkSize);
    let totalUploaded = 0;
    const progress = new Array(partCount).fill(0);

    // Check Required Fields
    if (
      !file ||
      !folderName ||
      !uplodeBigFileChunckPresignedUrlApi ||
      !chunkSize ||
      !uplodeBigFileChunckPresignedUrlCompleteApi
    ) {
      throw new Error(
        "File or Foldername or ChunkSize or more... cannot be empty"
      );
    }

    if (file.size > fileMaxSize) {
      throw new Error(`File limit is max ${fileMaxSize / (1024 * 1024)}mb!`);
    }

    // Start multipart upload
    const presignedResponse = await uplodeBigFileChunckPresignedUrlApi({
      fileName: file.name,
      fileType: file.type,
      partCount,
      folderName,
      fileSize: file.size,
    });

    const parts: Array<{ ETag: string; PartNumber: number }> = [];

    const { presignedUrls, UploadId, Key } = presignedResponse.data;

    if (!presignedUrls || !UploadId || !Key) {
      throw new Error("Faild Upload Operation !92! ☹️");
    }
    // Upload file parts
    for (
      let i = 0;
      i < presignedUrls.length && i * chunkSize < file.size;
      i++
    ) {
      const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
      const presignedUrl = presignedUrls[i].url;

      const uploadResponse = await axios.put(presignedUrl, chunk);

      const eTag =
        uploadResponse.headers["etag"] || uploadResponse.headers["ETag"];
      if (!eTag) {
        throw new Error("Missing ETag in part upload response.");
      }
      parts.push({ ETag: eTag, PartNumber: i + 1 });

      totalUploaded += chunk.size;
      progress[i] = Math.floor((chunk.size / file.size) * 100);
      const overallProgress = Math.floor((totalUploaded / file.size) * 100);
      if (setUploadProgress) {
        setUploadProgress(overallProgress);
      }
    }

    // Complete multipart upload
    const result = await uplodeBigFileChunckPresignedUrlCompleteApi({
      uploadId: UploadId,
      parts,
      Key,
    });
    return { success: true, Key, data: { ...result } };
  } catch (error) {
    throw error;
  }
};

export const fileUploadOperation = {
  UplodeSinglePart,
  UplodeMultiPartWithinChunk,
};

// --------------------------------- Using Custom Hook --------------------------
// Custom Hook for single part upload
export const useUplodeSinglePart = () => {
  const { mutateAsync: uplodeSmallFileApi } = FileUploadHooks.useUploadSmallFile();
  const [uploading, setUploading] = useState(false);

  const uplodeSinglePart = useCallback(
    async ({ file, folderName, setUploadProgress }: UploadSinglePartParams): Promise<UploadResult> => {
      try {
        setUploading(true);
        if (file.size > fileMaxSize) {
          throw new Error(
            `File limit is max ${fileMaxSize / (1024 * 1024)}mb!`
          );
        }
        // Check Required Fields
        if (!file || !folderName) {
          throw new Error("File or Foldername or more... cannot be empty");
        }
        // Get PresigendUrl for uplode file
        const presignedResponse = await uplodeSmallFileApi({
          fileName: file.name,
          fileType: encodeURIComponent(file.type),
          folderName,
          fileSize: file.size,
        });

        const { presignedUrl, Key } = presignedResponse.data;

        // If presignedUrl Or Key not found
        if (!presignedUrl || !Key) {
          throw new Error("Faild Upload Operation !24! ☹️");
        }

        // After PreSignedUrl Generate next process if to uplode in AWS S3
        const result = await axios.put(presignedUrl, file, {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total !== undefined && setUploadProgress) {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setUploadProgress(progress);
            }
          },
        });

        return { success: true, Key, data: { ...result } };
      } catch (error) {
        throw error;
      } finally {
        setUploading(false);
      }
    },
    [uplodeSmallFileApi]
  );

  return {
    uplodeSinglePart,
    uploading,
  };
};

// Custom Hook for multipart upload
export const useUplodeMultipart = () => {
  const { mutateAsync: uplodeBigFileChunckPresignedUrlApi } =
    FileUploadHooks.useGetPresignedUrlChunk();
  const { mutateAsync: uplodeBigFileChunckPresignedUrlCompleteApi } =
    FileUploadHooks.useGetPresignedUrlChunkComplete();
  const [uploading, setUploading] = useState(false);

  const uplodeMultiPart = useCallback(
    async ({ file, folderName, setUploadProgress }: UploadMultiPartParams): Promise<UploadResult> => {
      try {
        setUploading(true);
        // init
        const partCount = Math.ceil(file.size / chunkSize);
        let totalUploaded = 0;
        const progress = new Array(partCount).fill(0);

        // Check Required Fields
        if (!file || !folderName || !chunkSize) {
          throw new Error(
            "File or Foldername or ChunkSize or more... cannot be empty"
          );
        }

        if (file.size > fileMaxSize) {
          throw new Error(
            `File limit is max ${fileMaxSize / (1024 * 1024)}mb!`
          );
        }

        // Start multipart upload
        const presignedResponse = await uplodeBigFileChunckPresignedUrlApi({
          fileName: file.name,
          fileType: file.type,
          partCount,
          folderName,
          fileSize: file.size,
        });

        const parts: Array<{ ETag: string; PartNumber: number }> = [];

        const { presignedUrls, UploadId, Key } = presignedResponse.data;

        if (!presignedUrls || !UploadId || !Key) {
          throw new Error("Faild Upload Operation !92! ☹️");
        }
        // Upload file parts
        for (
          let i = 0;
          i < presignedUrls.length && i * chunkSize < file.size;
          i++
        ) {
          const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
          const presignedUrl = presignedUrls[i].url;

          const uploadResponse = await axios.put(presignedUrl, chunk);

          const eTag =
            uploadResponse.headers["etag"] || uploadResponse.headers["ETag"];
          if (!eTag) {
            throw new Error("Missing ETag in part upload response.");
          }
          parts.push({ ETag: eTag, PartNumber: i + 1 });

          totalUploaded += chunk.size;
          progress[i] = Math.floor((chunk.size / file.size) * 100);
          const overallProgress = Math.floor((totalUploaded / file.size) * 100);
          if (setUploadProgress) {
            setUploadProgress(overallProgress);
          }
        }

        // Complete multipart upload
        const result = await uplodeBigFileChunckPresignedUrlCompleteApi({
          uploadId: UploadId,
          parts,
          Key,
        });
        return { success: true, Key, data: { ...result } };
      } catch (error) {
        throw error;
      } finally {
        setUploading(false);
      }
    },
    [uplodeBigFileChunckPresignedUrlApi, uplodeBigFileChunckPresignedUrlCompleteApi]
  );

  return {
    uplodeMultiPart,
    uploading,
  };
};
