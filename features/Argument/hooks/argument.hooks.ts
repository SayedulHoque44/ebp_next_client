import { AxiosError } from "axios";
import {
  IArgument,
  IArgumentGetArgumentsRequest,
  IArgumentQueryParam,
  IArgumentResponse,
  IArgumentsResponse,
  IUpdateArgumentRequest,
  ICreateArgumentRequest,
} from "../interface/argument.interface";
import {
  QueryObserverOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import ArgumentApis from "../apis/argument.apis";
import { useApiMutation } from "@/lib/hooks/useApiMutation";

const useGetArguments = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params?: IArgumentQueryParam[] | IArgumentGetArgumentsRequest;
  options?: QueryObserverOptions<
    IArgumentsResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<
    IArgumentsResponse,
    IArgumentQueryParam[] | IArgumentGetArgumentsRequest | undefined
  >([...queryKey], ArgumentApis.getArgumentsHandler, params, options);
};

const useUpdateSingleArgument = (
  options?: UseMutationOptions<
    IArgumentResponse,
    AxiosError<{ message: string }>,
    { data: Partial<IArgument>; argId: string },
    unknown
  >
) => {
  return useApiMutation<
    IArgumentResponse,
    { data: Partial<IArgument>; argId: string }
  >(async (params) => {
    const response = await ArgumentApis.updateSingleArgumentHandler(
      params.data,
      params.argId
    );
    return response;
  }, options);
};

const useCreateArgument = (
  options?: UseMutationOptions<
    IArgumentResponse,
    AxiosError<{ message: string }>,
    ICreateArgumentRequest,
    unknown
  >
) => {
  return useApiMutation<IArgumentResponse, ICreateArgumentRequest>(
    async (params) => {
      const response = await ArgumentApis.createArgumentHandler(params);
      return response;
    },
    options
  );
};

const useDeleteSingleArg = (
  options?: UseMutationOptions<
    IArgumentResponse,
    AxiosError<{ message: string }>,
    { argId: string },
    unknown
  >
) => {
  return useApiMutation<IArgumentResponse, { argId: string }>(
    async (params: { argId: string }) => {
      const response = await ArgumentApis.deleteSingleArgHandler(params.argId);
      return response;
    },
    options
  );
};

const ArgumentHooks = {
  useGetArguments,
  useUpdateSingleArgument,
  useCreateArgument,
  useDeleteSingleArg,
};

export default ArgumentHooks;
