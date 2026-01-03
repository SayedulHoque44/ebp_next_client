import { AxiosError } from "axios";
import {
  IYTVideo,
  IYTVideoGetAllYTVideoRequest,
  IYTVideoQueryParam,
  IYTVideoResponse,
  IYTVideosResponse,
  ICreateYTVideoRequest,
  IUpdateSingleUserRequest,
  IUpdateUserCourseTimeRequest,
} from "../interface/yTVideo.interface";
import {
  QueryObserverOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import YTVideoApis from "../apis/yTVideo.apis";
import { useApiMutation } from "@/lib/hooks/useApiMutation";

const useCreateYTVideo = (
  options?: UseMutationOptions<
    IYTVideoResponse,
    AxiosError<{ message: string }>,
    ICreateYTVideoRequest,
    unknown
  >
) => {
  return useApiMutation<IYTVideoResponse, ICreateYTVideoRequest>(
    async (params) => {
      const response = await YTVideoApis.createYTVideoHandler(params);
      return response;
    },
    options
  );
};

const useGetAllYTVideo = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params?: IYTVideoQueryParam[] | IYTVideoGetAllYTVideoRequest;
  options?: QueryObserverOptions<
    IYTVideosResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<
    IYTVideosResponse,
    IYTVideoQueryParam[] | IYTVideoGetAllYTVideoRequest | undefined
  >([...queryKey], YTVideoApis.getAllYTVideoHandler, params, options);
};

const useUpdateSingleUser = (
  options?: UseMutationOptions<
    IYTVideoResponse,
    AxiosError<{ message: string }>,
    IUpdateSingleUserRequest,
    unknown
  >
) => {
  return useApiMutation<IYTVideoResponse, IUpdateSingleUserRequest>(
    async (params) => {
      const response = await YTVideoApis.updateSingleUserHandler(params);
      return response;
    },
    options
  );
};

const useUpdateUserCourseTime = (
  options?: UseMutationOptions<
    IYTVideoResponse,
    AxiosError<{ message: string }>,
    IUpdateUserCourseTimeRequest,
    unknown
  >
) => {
  return useApiMutation<IYTVideoResponse, IUpdateUserCourseTimeRequest>(
    async (params) => {
      const response = await YTVideoApis.updateUserCourseTimeHandler(params);
      return response;
    },
    options
  );
};

const useDeleteSingeYTVideo = (
  options?: UseMutationOptions<
    IYTVideoResponse,
    AxiosError<{ message: string }>,
    { id: string },
    unknown
  >
) => {
  return useApiMutation<IYTVideoResponse, { id: string }>(
    async (params: { id: string }) => {
      const response = await YTVideoApis.deleteSingeYTVideoHandler(params.id);
      return response;
    },
    options
  );
};

const YTVideoHooks = {
  useCreateYTVideo,
  useGetAllYTVideo,
  useUpdateSingleUser,
  useUpdateUserCourseTime,
  useDeleteSingeYTVideo,
};

export default YTVideoHooks;

