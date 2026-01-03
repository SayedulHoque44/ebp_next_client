import { useApiMutation } from "@/lib/hooks/useApiMutation";
import { AxiosError } from "axios";
import { UseMutationOptions } from "@tanstack/react-query";
import api from "@/lib/api";

interface IUploadSmallFileRequest {
  fileName: string;
  fileType: string;
  folderName: string;
  fileSize: number;
}

interface IUploadSmallFileResponse {
  // WILL NEED TO ADD MORE TYPES
  url: string;
}

interface IGetPresignedUrlChunkRequest {
  fileName: string;
  fileType: string;
  folderName: string;
  partCount: number;
  fileSize: number;
}
interface IGetPresignedUrlChunkResponse {
  // WILL NEED TO ADD MORE TYPES
  url: string;
  partNumber: number;
  uploadId: string;
}

const ENDPOINT = {
  UPLOAD_SMALL_FILE: () => `/media/uplode-small-file`, //POST
  GET_PRESIGNED_URL_CHUNCK: () => `/media/upload/multipart/start`, //POST
  GET_PRESIGNED_URL_CHUNCK_COMPLETE: () => `/media//uplode-BigFile/complete`, //POST
};

const useUploadSmallFile = (
  options: UseMutationOptions<
    IUploadSmallFileResponse,
    AxiosError<{ message: string }>,
    IUploadSmallFileRequest,
    unknown
  >
) => {
  return useApiMutation<IUploadSmallFileResponse, IUploadSmallFileRequest>(
    async (params) => {
      const response = await api.post(
        `${ENDPOINT.UPLOAD_SMALL_FILE()}`,
        params
      );
      return response.data;
    },
    options
  );
};
const useGetPresignedUrlChunk = (
  options: UseMutationOptions<
    IGetPresignedUrlChunkResponse,
    AxiosError<{ message: string }>,
    IGetPresignedUrlChunkRequest,
    unknown
  >
) => {
  return useApiMutation<
    IGetPresignedUrlChunkResponse,
    IGetPresignedUrlChunkRequest
  >(async (params) => {
    const response = await api.post(
      `${ENDPOINT.GET_PRESIGNED_URL_CHUNCK()}`,
      params
    );
    return response.data;
  }, options);
};
const useGetPresignedUrlChunkComplete = (
  options: UseMutationOptions<
    IUploadSmallFileResponse,
    AxiosError<{ message: string }>,
    IUploadSmallFileRequest,
    unknown
  >
) => {
  return useApiMutation<IUploadSmallFileResponse, IUploadSmallFileRequest>(
    async (params) => {
      const response = await api.post(
        `${ENDPOINT.GET_PRESIGNED_URL_CHUNCK_COMPLETE()}`,
        params
      );
      return response.data;
    },
    options
  );
};

export const FileUploadHooks = {
  useUploadSmallFile,
  useGetPresignedUrlChunk,
};
