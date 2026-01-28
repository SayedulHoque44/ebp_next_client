import api from "@/lib/api";
import {
  IGetCourseVideosByPartIdRequest,
  IGetCourseVideosByPartIdResponse,
} from "../interface/courseVideo.interface";

const ENDPOINT = {
  GET_COURSE_VIDEOS_BY_PART_ID: (partId: string) =>
    `/CourseVideos/${partId}`,
  GET_SINGLE_COURSE_VIDEO: (videoId: string) =>
    `/CourseVideosSingle/${videoId}`,
};

const getCourseVideosByPartIdHandler = async (
  partId: string
): Promise<IGetCourseVideosByPartIdResponse> => {
  const response = await api.get(
    `${ENDPOINT.GET_COURSE_VIDEOS_BY_PART_ID(partId)}`
  );
  return response.data;
};

const getSingleCourseVideoHandler = async (
  videoId: string
): Promise<{ videoLink: string; title: string; [key: string]: any }> => {
  const response = await api.get(
    `${ENDPOINT.GET_SINGLE_COURSE_VIDEO(videoId)}`
  );
  return response.data;
};

const CourseVideoApis = {
  getCourseVideosByPartIdHandler,
  getSingleCourseVideoHandler,
};

export default CourseVideoApis;
