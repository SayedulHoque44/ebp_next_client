import api from "@/lib/api";
import {
  IUser,
  IUserCourseTimesRequest,
  IUserCourseTimesResponse,
  IUserGetAllUsersRequest,
  IUserGetAllUsersResponse,
  IUserGetMeRequest,
  IUserResponse,
} from "../interface/user.interface";

const ENDPOINT = {
  GET_ME: () => `users/getMe`, //POST
  GET_SINGLE_USER: (userId: string) => `/users/${userId}`, //GET
  UPDATE_SINGLE_USER: (userId: string) => `/users/${userId}`, //PATCH
  GET_ALL_USERS: () => `/users`, //GET,
  UPDATE_USER_COURSE_TIMES: () => `/courseTimes`, //POST,
  DELETE_SINGLE_USER: (userId: string) => `/users/${userId}`, //DELETE,
  LOGOUT_ALL_DEVICES: () => `/users/device/deleteDevices`, //PATCH,
  DELETE_USER_COURSE_TIMES: (courseId: string) => `/courseTimes/${courseId}`, //DELETE,
};

const getMeHandler = async (
  params: IUserGetMeRequest
): Promise<IUserResponse> => {
  const response = await api.post(`${ENDPOINT.GET_ME()}`, {
    deviceInfo: params.deviceInfo,
  });
  return response.data;
};

const getSingleUserHandler = async ({
  userId,
}: {
  userId: string;
}): Promise<IUserResponse> => {
  const response = await api.get(`${ENDPOINT.GET_SINGLE_USER(userId)}`);
  return response.data;
};

const updateSingleUserHandler = async (
  data: Partial<IUser>,
  userId: string
): Promise<IUserResponse> => {
  const response = await api.patch(`${ENDPOINT.UPDATE_SINGLE_USER(userId)}`, {
    ...data,
  });
  return response.data;
};

const getAllUsersHandler = async (
  params: IUserGetAllUsersRequest
): Promise<IUserGetAllUsersResponse> => {
  const response = await api.get(`${ENDPOINT.GET_ALL_USERS()}`, { params });
  return response.data;
};

const updateUserCourseTimesHandler = async (
  data: IUserCourseTimesRequest
): Promise<IUserCourseTimesResponse> => {
  const response = await api.post(
    `${ENDPOINT.UPDATE_USER_COURSE_TIMES()}`,
    data
  );
  return response.data;
};

const deleteSingleUserHandler = async (
  userId: string
): Promise<IUserResponse> => {
  const response = await api.delete(`${ENDPOINT.DELETE_SINGLE_USER(userId)}`);
  return response.data;
};

const logoutAllDevicesHandler = async (): Promise<IUserResponse> => {
  const response = await api.patch(`${ENDPOINT.LOGOUT_ALL_DEVICES()}`);
  return response.data;
};

const deleteUserCourseTimesHandler = async (
  courseId: string
): Promise<IUserCourseTimesResponse> => {
  const response = await api.delete(
    `${ENDPOINT.DELETE_USER_COURSE_TIMES(courseId)}`
  );
  return response.data;
};
const UserApis = {
  getMeHandler,
  getSingleUserHandler,
  updateSingleUserHandler,
  getAllUsersHandler,
  updateUserCourseTimesHandler,
  deleteSingleUserHandler,
  logoutAllDevicesHandler,
  deleteUserCourseTimesHandler,
};

export default UserApis;
