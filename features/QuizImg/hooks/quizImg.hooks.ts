import {
  QueryObserverOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  IQuizImagesGetRequest,
  IQuizImagesGetResponse,
  ISingeQuizImageResponse,
  ISingleQuizImageRequest,
} from "../interface/quizImg.interface";
import { AxiosError } from "axios";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import { QuizImgApis } from "../apis/quizImg.apis";
import { useApiMutation } from "@/lib/hooks/useApiMutation";

const useGetQuizImages = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params: IQuizImagesGetRequest;
  options?: QueryObserverOptions<
    IQuizImagesGetResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<IQuizImagesGetResponse, IQuizImagesGetRequest>(
    [...queryKey],
    QuizImgApis.getQuizImgsHandler,
    params,
    options
  );
};

const useUpdateSingleBlog = (
  options?: UseMutationOptions<
    ISingeQuizImageResponse,
    AxiosError<{ message: string }>,
    { data: ISingleQuizImageRequest; figureId: string },
    unknown
  >
) => {
  return useApiMutation<
    ISingeQuizImageResponse,
    { data: ISingleQuizImageRequest; figureId: string }
  >(async (params) => {
    const response = await QuizImgApis.updateSingleFigureHandler(
      params.data,
      params.figureId
    );
    return response;
  }, options);
};

const useCreateQuizImage = (
  options?: UseMutationOptions<
    ISingeQuizImageResponse,
    AxiosError<{ message: string }>,
    ISingleQuizImageRequest,
    unknown
  >
) => {
  return useApiMutation<ISingeQuizImageResponse, ISingleQuizImageRequest>(
    async (params) => {
      const response = await QuizImgApis.createQuizImageHandler(params);
      return response;
    },
    options
  );
};

const useDeleteSingleQuizImage = (
  options?: UseMutationOptions<
    ISingeQuizImageResponse,
    AxiosError<{ message: string }>,
    { figureId: string },
    unknown
  >
) => {
  return useApiMutation<ISingeQuizImageResponse, { figureId: string }>(
    async (params) => {
      const response = await QuizImgApis.deleteSingleQuizImageHandler(
        params.figureId
      );
      return response;
    },
    options
  );
};

const useGetImageMetadataById = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params: { figureId: string };
  options?: QueryObserverOptions<
    ISingeQuizImageResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<ISingeQuizImageResponse, { figureId: string }>(
    [...queryKey],
    async (params) => {
      const response = await QuizImgApis.getImageMetadataByIdHandler(
        params.figureId
      );
      return response;
    },
    params,
    options
  );
};

export const QuizImgHooks = {
  useGetQuizImages,
  useUpdateSingleBlog,
  useCreateQuizImage,
  useDeleteSingleQuizImage,
  useGetImageMetadataById,
};
