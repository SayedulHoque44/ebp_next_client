import { AxiosError } from "axios";
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
} from "../interface/uniContent.interface";
import {
  QueryObserverOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import UniContentApis from "../apis/uniContent.apis";
import { useApiMutation } from "@/lib/hooks/useApiMutation";

const useGetUniContent = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params?: IUniContentQueryParam[] | IUniContentGetUniContentRequest;
  options?: QueryObserverOptions<
    IUniContentsResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<
    IUniContentsResponse,
    IUniContentQueryParam[] | IUniContentGetUniContentRequest | undefined
  >([...queryKey], UniContentApis.getUniContentHandler, params, options);
};

const useCreateUniContent = (
  options?: UseMutationOptions<
    IUniContentResponse,
    AxiosError<{ message: string }>,
    Partial<Omit<IUniContent, "_id" | "createdAt" | "updatedAt">>,
    unknown
  >
) => {
  return useApiMutation<
    IUniContentResponse,
    Partial<Omit<IUniContent, "_id" | "createdAt" | "updatedAt">>
  >(async (params) => {
    const response = await UniContentApis.createUniContentHandler(params);
    return response;
  }, options);
};

const useUpdateSingleUC = (
  options?: UseMutationOptions<
    IUniContentResponse,
    AxiosError<{ message: string }>,
    { data: Partial<IUniContent>; UniContentId: string },
    unknown
  >
) => {
  return useApiMutation<
    IUniContentResponse,
    { data: Partial<IUniContent>; UniContentId: string }
  >(async (params) => {
    const response = await UniContentApis.updateSingleUCHandler(
      params.data,
      params.UniContentId
    );
    return response;
  }, options);
};

const useDeleteSingleUniContent = (
  options?: UseMutationOptions<
    IUniContentResponse,
    AxiosError<{ message: string }>,
    { UniContentId: string },
    unknown
  >
) => {
  return useApiMutation<IUniContentResponse, { UniContentId: string }>(
    async (params: { UniContentId: string }) => {
      const response = await UniContentApis.deleteSingleUniContentHandler(
        params.UniContentId
      );
      return response;
    },
    options
  );
};

const useGetSubContents = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params?: IUniContentQueryParam[] | ISubContentGetSubContentsRequest;
  options?: QueryObserverOptions<
    ISubContentsResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<
    ISubContentsResponse,
    IUniContentQueryParam[] | ISubContentGetSubContentsRequest | undefined
  >([...queryKey,params], UniContentApis.getSubContentsHandler, params, options);
};

const useCreateSubContent = (
  options?: UseMutationOptions<
    ISubContentResponse,
    AxiosError<{ message: string }>,
    Partial<Omit<ISubContent, "_id" | "_createdAt" | "updatedAt">>,
    unknown
  >
) => {
  return useApiMutation<
    ISubContentResponse,
    Partial<Omit<ISubContent, "_id" | "_createdAt" | "updatedAt">>
  >(async (params) => {
    const response = await UniContentApis.createSubContentHandler(params);
    return response;
  }, options);
};

const useDeleteSingleSubContent = (
  options?: UseMutationOptions<
    ISubContentResponse,
    AxiosError<{ message: string }>,
    { Id: string },
    unknown
  >
) => {
  return useApiMutation<ISubContentResponse, { Id: string }>(
    async (params: { Id: string }) => {
      const response = await UniContentApis.deleteSingleSubContentHandler(
        params.Id
      );
      return response;
    },
    options
  );
};

const useUpdateSingleSubContent = (
  options?: UseMutationOptions<
    ISubContentResponse,
    AxiosError<{ message: string }>,
    { data: Partial<ISubContent>; subContentId: string },
    unknown
  >
) => {
  return useApiMutation<
    ISubContentResponse,
    { data: Partial<ISubContent>; subContentId: string }
  >(async (params) => {
    const response = await UniContentApis.updateSingleSubContentHandler(
      params.data,
      params.subContentId
    );
    return response;
  }, options);
};

const UniContentHooks = {
  useGetUniContent,
  useCreateUniContent,
  useUpdateSingleUC,
  useDeleteSingleUniContent,
  useGetSubContents,
  useCreateSubContent,
  useDeleteSingleSubContent,
  useUpdateSingleSubContent,
};

export default UniContentHooks;
