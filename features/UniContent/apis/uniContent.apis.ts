import api from "@/lib/api";
import {
  IUniContent,
  IUniContentGetUniContentRequest,
  IUniContentQueryParam,
  IUniContentResponse,
  IUniContentsResponse,
  ISubContentGetSubContentsRequest,
  ISubContentResponse,
  ISubContentsResponse,
  ISubContent,
  IContentTypeObj,
} from "../interface/uniContent.interface";

const ENDPOINT = {
  GET_UNI_CONTENT: () => `/UniContent`,
  CREATE_UNI_CONTENT: () => `/UniContent`,
  UPDATE_SINGLE_UC: (UniContentId: string) => `/UniContent/${UniContentId}`,
  DELETE_SINGLE_UNI_CONTENT: (UniContentId: string) =>
    `/UniContent/${UniContentId}`,
  GET_SUB_CONTENTS: () => `/UniContent/SubContent`,
  CREATE_SUB_CONTENT: () => `/UniContent/SubContent`,
  DELETE_SINGLE_SUB_CONTENT: (Id: string) => `/UniContent/SubContent/${Id}`,
  UPDATE_SINGLE_SUB_CONTENT: (subContentId: string) =>
    `/UniContent/SubContent/${subContentId}`,
};

const getUniContentHandler = async <
  T extends IContentTypeObj = IContentTypeObj
>(
  params?: IUniContentGetUniContentRequest<T>
): Promise<IUniContentsResponse<T>> => {
  // Support both array format [{name, value}] and object format {key: value}
  let queryParams: Record<string, any> | undefined;

  if (params) {
    if (Array.isArray(params)) {
      // Convert array format to object format
      queryParams = {};
      params.forEach((item: IUniContentQueryParam) => {
        queryParams![item.name] = item.value;
      });
    } else {
      // Already in object format
      queryParams = params;
    }
  }

  const response = await api.get(`${ENDPOINT.GET_UNI_CONTENT()}`, {
    params: queryParams,
  });
  return response.data;
};

const createUniContentHandler = async (
  data: Omit<IUniContent, "_id" | "createdAt" | "updatedAt">
): Promise<IUniContentResponse> => {
  const response = await api.post(`${ENDPOINT.CREATE_UNI_CONTENT()}`, data);
  return response.data;
};

const updateSingleUCHandler = async (
  data: Partial<Omit<IUniContent, "_id" | "createdAt" | "updatedAt">>,
  UniContentId: string
): Promise<IUniContentResponse> => {
  const response = await api.patch(
    `${ENDPOINT.UPDATE_SINGLE_UC(UniContentId)}`,
    {
      ...data,
    }
  );
  return response.data;
};

const deleteSingleUniContentHandler = async (
  UniContentId: string
): Promise<IUniContentResponse> => {
  const response = await api.delete(
    `${ENDPOINT.DELETE_SINGLE_UNI_CONTENT(UniContentId)}`
  );
  return response.data;
};

const getSubContentsHandler = async (
  params?: IUniContentQueryParam[] | ISubContentGetSubContentsRequest
): Promise<ISubContentsResponse> => {
  // Support both array format [{name, value}] and object format {key: value}
  let queryParams: Record<string, any> | undefined;

  if (params) {
    if (Array.isArray(params)) {
      // Convert array format to object format
      queryParams = {};
      params.forEach((item: IUniContentQueryParam) => {
        queryParams![item.name] = item.value;
      });
    } else {
      // Already in object format
      queryParams = params;
    }
  }

  const response = await api.get(`${ENDPOINT.GET_SUB_CONTENTS()}`, {
    params: queryParams,
  });
  return response.data;
};

const createSubContentHandler = async (
  data: Partial<Omit<ISubContent, "_id" | "createdAt" | "updatedAt">>
): Promise<ISubContentResponse> => {
  const response = await api.post(`${ENDPOINT.CREATE_SUB_CONTENT()}`, data);
  return response.data;
};

const deleteSingleSubContentHandler = async (
  Id: string
): Promise<ISubContentResponse> => {
  const response = await api.delete(
    `${ENDPOINT.DELETE_SINGLE_SUB_CONTENT(Id)}`
  );
  return response.data;
};

const updateSingleSubContentHandler = async (
  data: Partial<Omit<ISubContent, "_id" | "createdAt" | "updatedAt">>,
  subContentId: string
): Promise<ISubContentResponse> => {
  const response = await api.patch(
    `${ENDPOINT.UPDATE_SINGLE_SUB_CONTENT(subContentId)}`,
    {
      ...data,
    }
  );
  return response.data;
};

const UniContentApis = {
  getUniContentHandler,
  createUniContentHandler,
  updateSingleUCHandler,
  deleteSingleUniContentHandler,
  getSubContentsHandler,
  createSubContentHandler,
  deleteSingleSubContentHandler,
  updateSingleSubContentHandler,
};

export default UniContentApis;
