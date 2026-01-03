import api from "@/lib/api";
import {
  IYTVideo,
  IYTVideoGetAllYTVideoRequest,
  IYTVideoQueryParam,
  IYTVideoResponse,
  IYTVideosResponse,
  ICreateYTVideoRequest,
  IUpdateSingleUserRequest,
  IUpdateUserCourseTimeRequest,
} from "../interface/yTVideo.interface";

const ENDPOINT = {
  CREATE_YT_VIDEO: () => `/YTVideo`,
  GET_ALL_YT_VIDEO: () => `/YTVideo`,
  UPDATE_SINGLE_USER: (userId: string) => `/users/${userId}`,
  UPDATE_USER_COURSE_TIME: () => `/courseTimes`,
  DELETE_SINGLE_YT_VIDEO: (id: string) => `/YTVideo/${id}`,
};

const createYTVideoHandler = async (
  data: ICreateYTVideoRequest
): Promise<IYTVideoResponse> => {
  const response = await api.post(`${ENDPOINT.CREATE_YT_VIDEO()}`, data);
  return response.data;
};

const getAllYTVideoHandler = async (
  params?: IYTVideoQueryParam[] | IYTVideoGetAllYTVideoRequest
): Promise<IYTVideosResponse> => {
  // Support both array format [{name, value}] and object format {key: value}
  let queryParams: Record<string, any> | undefined;

  if (params) {
    if (Array.isArray(params)) {
      // Convert array format to object format
      queryParams = {};
      params.forEach((item: IYTVideoQueryParam) => {
        queryParams![item.name] = item.value;
      });
    } else {
      // Already in object format
      queryParams = params;
    }
  }

  const response = await api.get(`${ENDPOINT.GET_ALL_YT_VIDEO()}`, {
    params: queryParams,
  });
  return response.data;
};

const updateSingleUserHandler = async (
  data: IUpdateSingleUserRequest
): Promise<IYTVideoResponse> => {
  const response = await api.patch(
    `${ENDPOINT.UPDATE_SINGLE_USER(data.userId)}`,
    data.userData
  );
  return response.data;
};

const updateUserCourseTimeHandler = async (
  data: IUpdateUserCourseTimeRequest
): Promise<IYTVideoResponse> => {
  const response = await api.post(
    `${ENDPOINT.UPDATE_USER_COURSE_TIME()}`,
    data
  );
  return response.data;
};

const deleteSingeYTVideoHandler = async (
  id: string
): Promise<IYTVideoResponse> => {
  const response = await api.delete(`${ENDPOINT.DELETE_SINGLE_YT_VIDEO(id)}`);
  return response.data;
};

const YTVideoApis = {
  createYTVideoHandler,
  getAllYTVideoHandler,
  updateSingleUserHandler,
  updateUserCourseTimeHandler,
  deleteSingeYTVideoHandler,
};

export default YTVideoApis;
