import { AxiosError } from "axios";
import {
  ITopic,
  ITopicGetTopicsRequest,
  ITopicQueryParam,
  ITopicResponse,
  ITopicsResponse,
  IGetTopicsByArgumentIdsRequest,
  IGetTopicsByArgumentIdsResponse,
} from "../interface/topic.interface";
import {
  QueryObserverOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import TopicManagementApis from "../apis/topic.apis";
import { useApiMutation } from "@/lib/hooks/useApiMutation";

const useGetAllTopics = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params?: ITopicGetTopicsRequest;
  options?: QueryObserverOptions<
    ITopicsResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<ITopicsResponse, ITopicGetTopicsRequest | undefined>(
    [...queryKey],
    TopicManagementApis.getAllTopicsHandler,
    params,
    options
  );
};

const useGetTopicsById = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params: { topicId: string };
  options?: QueryObserverOptions<
    ITopicResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<ITopicResponse, { topicId: string }>(
    [...queryKey],
    () => TopicManagementApis.getTopicsByIdHandler(params.topicId),
    params,
    options
  );
};

const useUpdateSingleTopic = (
  options?: UseMutationOptions<
    ITopicResponse,
    AxiosError<{ message: string }>,
    {
      topicId: string;
      data: Partial<Omit<ITopic, "_id" | "createdAt" | "updatedAt">>;
    },
    unknown
  >
) => {
  return useApiMutation<
    ITopicResponse,
    {
      topicId: string;
      data: Partial<Omit<ITopic, "_id" | "createdAt" | "updatedAt">>;
    }
  >(async (params) => {
    const response = await TopicManagementApis.updateSingleTopicHandler(
      params.data,
      params.topicId
    );
    return response;
  }, options);
};

const useCreateArgTopic = (
  options?: UseMutationOptions<
    ITopicResponse,
    AxiosError<{ message: string }>,
    Partial<Omit<ITopic, "_id" | "createdAt" | "updatedAt">>,
    unknown
  >
) => {
  return useApiMutation<
    ITopicResponse,
    Partial<Omit<ITopic, "_id" | "createdAt" | "updatedAt">>
  >(async (params) => {
    const response = await TopicManagementApis.createArgTopicHandler(params);
    return response;
  }, options);
};

const useDeleteSingleTopic = (
  options?: UseMutationOptions<
    ITopicResponse,
    AxiosError<{ message: string }>,
    { topicId: string },
    unknown
  >
) => {
  return useApiMutation<ITopicResponse, { topicId: string }>(
    async (params: { topicId: string }) => {
      const response = await TopicManagementApis.deleteSingleTopicHandler(
        params.topicId
      );
      return response;
    },
    options
  );
};

const useGetTopicsByArgumentIds = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params: IGetTopicsByArgumentIdsRequest;
  options?: QueryObserverOptions<
    IGetTopicsByArgumentIdsResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<
    IGetTopicsByArgumentIdsResponse,
    IGetTopicsByArgumentIdsRequest
  >(
    [...queryKey],
    TopicManagementApis.getTopicsByArgumentIdsHandler,
    params,
    options
  );
};

const TopicManagementHooks = {
  useGetAllTopics,
  useGetTopicsById,
  useUpdateSingleTopic,
  useCreateArgTopic,
  useDeleteSingleTopic,
  useGetTopicsByArgumentIds,
};

export default TopicManagementHooks;
