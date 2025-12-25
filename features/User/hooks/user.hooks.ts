import {
  QueryObserverOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  IUser,
  IUserGetMeRequest,
  IUserResponse,
} from "../interface/user.interface";
import { AxiosError } from "axios";
import { useApiQuery } from "@/hooks/useApiQuery";
import UserApis from "../api/user.api";
import { useApiMutation } from "@/hooks/useApiMutation";

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

const useUserProfileUpdate = (
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
    const response = await UserApis.updateUserHandler(
      params.data,
      params.userId
    );
    return response;
  }, options);
};

const UserHooks = {
  useGetUserQuery,
  useUserProfileUpdate,
};

export default UserHooks;
