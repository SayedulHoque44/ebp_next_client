import { AxiosError } from "axios";
import {
  ISystem,
  ISystemGetSystemsRequest,
  ISystemResponse,
  ISystemsResponse,
  IUpdateSystemRequest,
} from "../interface/system.interface";
import {
  QueryObserverOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import SystemManagementApis from "../apis/system.apis";
import { useApiMutation } from "@/lib/hooks/useApiMutation";

const useGetAllSystems = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params?: ISystemGetSystemsRequest;
  options?: QueryObserverOptions<
    ISystemsResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<ISystemsResponse, ISystemGetSystemsRequest | undefined>(
    [...queryKey],
    SystemManagementApis.getAllSystemsHandler,
    params,
    options
  );
};

const useGetSingleSystem = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params: { systemId: string };
  options?: QueryObserverOptions<
    ISystemResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<ISystemResponse, { systemId: string }>(
    [...queryKey],
    SystemManagementApis.getSingleSystemHandler,
    params,
    options
  );
};

const useUpdateSingleSystem = (
  options?: UseMutationOptions<
    ISystemResponse,
    AxiosError<{ message: string }>,
    { data: Partial<ISystem>; systemId: string },
    unknown
  >
) => {
  return useApiMutation<
    ISystemResponse,
    { data: Partial<ISystem>; systemId: string }
  >(async (params) => {
    const response = await SystemManagementApis.updateSingleSystemHandler(
      params.data,
      params.systemId
    );
    return response;
  }, options);
};

const useCreateSystem = (
  options?: UseMutationOptions<
    ISystemResponse,
    AxiosError<{ message: string }>,
    Partial<Omit<ISystem, "_id">>,
    unknown
  >
) => {
  return useApiMutation<ISystemResponse, Partial<Omit<ISystem, "_id">>>(
    async (params) => {
      const response = await SystemManagementApis.createSystemHandler(params);
      return response;
    },
    options
  );
};

const useDeleteSingleSystem = (
  options?: UseMutationOptions<
    ISystemResponse,
    AxiosError<{ message: string }>,
    { systemId: string },
    unknown
  >
) => {
  return useApiMutation<ISystemResponse, { systemId: string }>(
    async (params: { systemId: string }) => {
      const response = await SystemManagementApis.deleteSingleSystemHandler(
        params.systemId
      );
      return response;
    },
    options
  );
};

const SystemManagementHooks = {
  useGetAllSystems,
  useGetSingleSystem,
  useUpdateSingleSystem,
  useCreateSystem,
  useDeleteSingleSystem,
};

export default SystemManagementHooks;
