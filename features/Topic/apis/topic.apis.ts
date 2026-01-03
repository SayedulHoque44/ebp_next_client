import api from "@/lib/api";
import {
  ITopic,
  ITopicGetTopicsRequest,
  ITopicQueryParam,
  ITopicResponse,
  ITopicsResponse,
  IGetTopicsByArgumentIdsRequest,
  IGetTopicsByArgumentIdsResponse,
} from "../interface/topic.interface";

const ENDPOINT = {
  GET_ALL_TOPICS: () => `/argTopics`,
  GET_TOPICS_BY_ID: (topicId: string) => `/argTopics/${topicId}`,
  UPDATE_SINGLE_TOPIC: (topicId: string) => `/argTopics/${topicId}`,
  CREATE_ARG_TOPIC: () => `/argTopics`,
  DELETE_SINGLE_TOPIC: (topicId: string) => `/argTopics/${topicId}`,
  GET_TOPICS_BY_ARGUMENT_IDS: () => `/argTopics/get-by-argIds`,
};

const getAllTopicsHandler = async (
  params?: ITopicGetTopicsRequest
): Promise<ITopicsResponse> => {
  // Support both array format [{name, value}] and object format {key: value}
  let queryParams: Record<string, any> | undefined;

  if (params) {
    if (Array.isArray(params)) {
      // Convert array format to object format
      queryParams = {};
      params.forEach((item: ITopicQueryParam) => {
        queryParams![item.name] = item.value;
      });
    } else {
      // Already in object format
      queryParams = params;
    }
  }

  const response = await api.get(`${ENDPOINT.GET_ALL_TOPICS()}`, {
    params: queryParams,
  });
  return response.data;
};

const getTopicsByIdHandler = async (
  topicId: string
): Promise<ITopicResponse> => {
  const response = await api.get(`${ENDPOINT.GET_TOPICS_BY_ID(topicId)}`);
  return response.data;
};

const updateSingleTopicHandler = async (
  data: Partial<Omit<ITopic, "_id" | "createdAt" | "updatedAt">>,
  topicId: string
): Promise<ITopicResponse> => {
  const response = await api.patch(
    `${ENDPOINT.UPDATE_SINGLE_TOPIC(topicId)}`,
    data
  );
  return response.data;
};

const createArgTopicHandler = async (
  data: Partial<Omit<ITopic, "_id" | "createdAt" | "updatedAt">>
): Promise<ITopicResponse> => {
  const response = await api.post(`${ENDPOINT.CREATE_ARG_TOPIC()}`, data);
  return response.data;
};

const deleteSingleTopicHandler = async (
  topicId: string
): Promise<ITopicResponse> => {
  const response = await api.delete(`${ENDPOINT.DELETE_SINGLE_TOPIC(topicId)}`);
  return response.data;
};

const getTopicsByArgumentIdsHandler = async (
  data: IGetTopicsByArgumentIdsRequest
): Promise<IGetTopicsByArgumentIdsResponse> => {
  // Build query params from array format
  const queryParams: Record<string, any> = {};
  if (data.params && Array.isArray(data.params)) {
    data.params.forEach((item: ITopicQueryParam) => {
      queryParams[item.name] = item.value;
    });
  }

  const response = await api.post(
    `${ENDPOINT.GET_TOPICS_BY_ARGUMENT_IDS()}`,
    { argumentIds: data.argumentIds },
    { params: queryParams }
  );
  return response.data;
};

const TopicManagementApis = {
  getAllTopicsHandler,
  getTopicsByIdHandler,
  updateSingleTopicHandler,
  createArgTopicHandler,
  deleteSingleTopicHandler,
  // getTopicsByArgumentIdsHandler,
};

export default TopicManagementApis;
