import api from "@/lib/api";
import {
  ISystem,
  ISystemGetSystemsRequest,
  ISystemQueryParam,
  ISystemResponse,
  ISystemsResponse,
} from "../interface/system.interface";

const ENDPOINT = {
  GET_ALL_SYSTEMS: () => `/system`,
  GET_SYSTEM_BY_ID: (systemId: string) => `/system/${systemId}`,
  UPDATE_SINGLE_SYSTEM: (systemId: string) => `/system/${systemId}/update`,
  CREATE_SYSTEM: () => `/system`,
  DELETE_SINGLE_SYSTEM: (systemId: string) => `/system/${systemId}`,
};

const getAllSystemsHandler = async (
  params?: ISystemGetSystemsRequest
): Promise<ISystemsResponse> => {
  // Support both array format [{name, value}] and object format {key: value}
  let queryParams: Record<string, any> | undefined;

  if (params) {
    if (Array.isArray(params)) {
      // Convert array format to object format
      queryParams = {};
      params.forEach((item: ISystemQueryParam) => {
        queryParams![item.name] = item.value;
      });
    } else {
      // Already in object format
      queryParams = params;
    }
  }

  const response = await api.get(`${ENDPOINT.GET_ALL_SYSTEMS()}`, {
    params: queryParams,
  });
  return response.data;
};

const getSystemByIdHandler = async (
  systemId: string
): Promise<ISystemResponse> => {
  const response = await api.get(`${ENDPOINT.GET_SYSTEM_BY_ID(systemId)}`);
  return response.data;
};

const updateSingleSystemHandler = async (
  data: Partial<Omit<ISystem, "_id" | "createdAt" | "updatedAt">>,
  systemId: string
): Promise<ISystemResponse> => {
  const response = await api.patch(
    `${ENDPOINT.UPDATE_SINGLE_SYSTEM(systemId)}`,
    {
      ...data,
    }
  );
  return response.data;
};

const createSystemHandler = async (
  data: Partial<Omit<ISystem, "_id" | "createdAt" | "updatedAt">>
): Promise<ISystemResponse> => {
  const response = await api.post(`${ENDPOINT.CREATE_SYSTEM()}`, data);
  return response.data;
};

const deleteSingleSystemHandler = async (
  systemId: string
): Promise<ISystemResponse> => {
  const response = await api.delete(
    `${ENDPOINT.DELETE_SINGLE_SYSTEM(systemId)}`
  );
  return response.data;
};

const getSingleSystemHandler = async ({
  systemId,
}: {
  systemId: string;
}): Promise<ISystemResponse> => {
  const response = await api.get(`${ENDPOINT.GET_SYSTEM_BY_ID(systemId)}`);
  return response.data;
};

const SystemManagementApis = {
  getAllSystemsHandler,
  getSystemByIdHandler,
  updateSingleSystemHandler,
  createSystemHandler,
  deleteSingleSystemHandler,
  getSingleSystemHandler,
};

export default SystemManagementApis;
