import api from "@/lib/api";
import {
  IUser,
  IUserGetMeRequest,
  IUserResponse,
} from "../interface/user.interface";

const ENDPOINT = {
  GET_ME: () => `users/getMe`,
  UPDATE_USER: (userId: string) => `/user/${userId}`,
};

const getMeHandler = async (
  params: IUserGetMeRequest
): Promise<IUserResponse> => {
  const response = await api.post(`${ENDPOINT.GET_ME()}`, {
    deviceInfo: params.deviceInfo,
  });
  return response.data;
};

const updateUserHandler = async (
  data: Partial<IUser>,
  userId: string
): Promise<IUserResponse> => {
  const response = await api.patch(`${ENDPOINT.UPDATE_USER(userId)}`, {
    ...data,
  });
  return response.data;
};

const UserApis = {
  getMeHandler,
  updateUserHandler,
};

export default UserApis;
