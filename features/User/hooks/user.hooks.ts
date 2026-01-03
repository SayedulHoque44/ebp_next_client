import {
  QueryObserverOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  IUser,
  IUserCourseTimesRequest,
  IUserCourseTimesResponse,
  IUserGetAllUsersRequest,
  IUserGetAllUsersResponse,
  IUserGetMeRequest,
  IUserResponse,
} from "../interface/user.interface";
import { AxiosError } from "axios";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import UserApis from "../api/user.api";
import { useApiMutation } from "@/lib/hooks/useApiMutation";

const useGetUserQuery = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params: IUserGetMeRequest;
  options: QueryObserverOptions<
    IUserResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<IUserResponse, IUserGetMeRequest>(
    [...queryKey],
    UserApis.getMeHandler,
    params,
    options
  );
};

const useGetSingleUserQuery = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params: { userId: string };
  options: QueryObserverOptions<
    IUserResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<IUserResponse, { userId: string }>(
    [...queryKey],
    UserApis.getSingleUserHandler,
    params,
    options
  );
};
const useUpdateSingleUserMutation = (
  options?: UseMutationOptions<
    IUserResponse,
    AxiosError<{ message: string }>,
    { data: Partial<IUser>; userId: string },
    unknown
  >
) => {
  return useApiMutation<
    IUserResponse,
    { data: Partial<IUser>; userId: string }
  >(async (params) => {
    const response = await UserApis.updateSingleUserHandler(
      params.data,
      params.userId
    );
    return response;
  }, options);
};

const useGetAllUsersQuery = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params: IUserGetAllUsersRequest;
  options: QueryObserverOptions<
    IUserGetAllUsersResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<IUserGetAllUsersResponse, IUserGetAllUsersRequest>(
    [...queryKey],
    UserApis.getAllUsersHandler,
    params,
    options
  );
};

const useUpdateUserCourseTimesMutation = (
  options?: UseMutationOptions<
    IUserCourseTimesResponse,
    AxiosError<{ message: string }>,
    IUserCourseTimesRequest,
    unknown
  >
) => {
  return useApiMutation<IUserCourseTimesResponse, IUserCourseTimesRequest>(
    async (params) => {
      const response = await UserApis.updateUserCourseTimesHandler(params);
      return response;
    },
    options
  );
};

const useDeleteSingleUserMutation = (
  options?: UseMutationOptions<
    IUserResponse,
    AxiosError<{ message: string }>,
    { userId: string },
    unknown
  >
) => {
  return useApiMutation<IUserResponse, { userId: string }>(async (params) => {
    const response = await UserApis.deleteSingleUserHandler(params.userId);
    return response;
  }, options);
};

const useLogoutAllDevicesMutation = (
  options?: UseMutationOptions<
    IUserResponse,
    AxiosError<{ message: string }>,
    unknown
  >
) => {
  return useApiMutation<IUserResponse>(async () => {
    const response = await UserApis.logoutAllDevicesHandler();
    return response;
  }, options);
};

const useDeleteUserCourseTimesMutation = (
  options?: UseMutationOptions<
    IUserCourseTimesResponse,
    AxiosError<{ message: string }>,
    { courseId: string },
    unknown
  >
) => {
  return useApiMutation<IUserCourseTimesResponse, { courseId: string }>(
    async (params) => {
      const response = await UserApis.deleteUserCourseTimesHandler(
        params.courseId
      );
      return response;
    },
    options
  );
};

const UserHooks = {
  useGetUserQuery,
  useUpdateSingleUserMutation,
  useLogoutAllDevicesMutation,
  useDeleteUserCourseTimesMutation,
  useGetSingleUserQuery,
  useGetAllUsersQuery,
  useUpdateUserCourseTimesMutation,
  useDeleteSingleUserMutation,
};

export default UserHooks;
