import api from "@/lib/api";
import { ISingleQuizImageRequest } from "../interface/quizImg.interface";

const ENDPOINT = {
  GET_QUIZ_IMAGES: () => `/quizImages`, //GET
  UPDATE_SINGLE_FIGURE: (figureId: string) => `/quizImages/${figureId}`, //PATCH
  CREATE_QUIZ_IMAGE: () => `/quizImages`, //POST
  DELETE_SINGLE_QUIZ_IMAGE: (figureId: string) => `/quizImages/${figureId}`, //DELETE
  GET_IMAGE_METADATA_BY_ID: (figureId: string) =>
    `/quizImages/image-meta/${figureId}`, //GET
};

const getQuizImgsHandler = async (params?: any): Promise<any> => {
  const response = await api.get(`${ENDPOINT.GET_QUIZ_IMAGES()}`, { params });
  return response.data;
};

const updateSingleFigureHandler = async (
  data: ISingleQuizImageRequest,
  figureId: string
): Promise<any> => {
  const response = await api.patch(
    `${ENDPOINT.UPDATE_SINGLE_FIGURE(figureId)}`,
    {
      ...data,
    }
  );
  return response.data;
};

const createQuizImageHandler = async (
  data: ISingleQuizImageRequest
): Promise<any> => {
  const response = await api.post(`${ENDPOINT.CREATE_QUIZ_IMAGE()}`, data);
  return response.data;
};

const deleteSingleQuizImageHandler = async (figureId: string): Promise<any> => {
  const response = await api.delete(
    `${ENDPOINT.DELETE_SINGLE_QUIZ_IMAGE(figureId)}`
  );
  return response.data;
};

const getImageMetadataByIdHandler = async (figureId: string): Promise<any> => {
  const response = await api.get(
    `${ENDPOINT.GET_IMAGE_METADATA_BY_ID(figureId)}`
  );
  return response.data;
};

export const QuizImgApis = {
  getQuizImgsHandler,
  updateSingleFigureHandler,
  createQuizImageHandler,
  deleteSingleQuizImageHandler,
  getImageMetadataByIdHandler,
};
