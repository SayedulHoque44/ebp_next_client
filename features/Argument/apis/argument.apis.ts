import api from "@/lib/api";
import {
  IArgument,
  IArgumentGetArgumentsRequest,
  IArgumentQueryParam,
  IArgumentResponse,
  IArgumentsResponse,
} from "../interface/argument.interface";

const ENDPOINT = {
  GET_ARGUMENTS: () => `/arguments`,
  UPDATE_SINGLE_ARGUMENT: (argId: string) => `/arguments/${argId}`,
  CREATE_ARGUMENT: () => `/arguments`,
  DELETE_SINGLE_ARG: (argId: string) => `/arguments/${argId}`,
};

const getArgumentsHandler = async (
  params?: IArgumentGetArgumentsRequest
): Promise<IArgumentsResponse> => {
  // Support both array format [{name, value}] and object format {key: value}
  let queryParams: Record<string, any> | undefined;

  if (params) {
    if (Array.isArray(params)) {
      // Convert array format to object format
      queryParams = {};
      params.forEach((item: IArgumentQueryParam) => {
        queryParams![item.name] = item.value;
      });
    } else {
      // Already in object format
      queryParams = params;
    }
  }

  const response = await api.get(`${ENDPOINT.GET_ARGUMENTS()}`, {
    params: queryParams,
  });
  return response.data;
};

const updateSingleArgumentHandler = async (
  data: Partial<Omit<IArgument, "_id" | "createdAt" | "updatedAt">>,
  argId: string
): Promise<IArgumentResponse> => {
  const response = await api.patch(
    `${ENDPOINT.UPDATE_SINGLE_ARGUMENT(argId)}`,
    {
      ...data,
    }
  );
  return response.data;
};

const createArgumentHandler = async (
  data: Partial<Omit<IArgument, "_id" | "createdAt" | "updatedAt">>
): Promise<IArgumentResponse> => {
  const response = await api.post(`${ENDPOINT.CREATE_ARGUMENT()}`, data);
  return response.data;
};

const deleteSingleArgHandler = async (
  argId: string
): Promise<IArgumentResponse> => {
  const response = await api.delete(`${ENDPOINT.DELETE_SINGLE_ARG(argId)}`);
  return response.data;
};

const ArgumentApis = {
  getArgumentsHandler,
  updateSingleArgumentHandler,
  createArgumentHandler,
  deleteSingleArgHandler,
};

export default ArgumentApis;
