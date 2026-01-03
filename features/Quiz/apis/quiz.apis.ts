import api from "@/lib/api";
import {
  IGETRandomThirtyQuizzesResponse,
  IGetUserPlayedQuizzesRequest,
  IGetUserPlayedQuizzesResponse,
  IQuiz,
  IQuizGetQuizzesRequest,
  IQuizGetRandomQuizzesByTopicIdsRequest,
  IQuizGetRandomQuizzesByTopicIdsResponse,
  IQuizResponse,
  IQuizzesResponse,
  IUserPlayedQuiz,
  IUserPlayedQuizzesReq,
} from "../interface/quiz.interfaces";

const ENDPOINT = {
  GET_QUIZES: () => `/Quizzes`, //GET
  GET_RANDOM_THIRTY_QUIZES: () => `/Quizzes/random/thirty-quizzes`, //GET
  GET_RANDOM_QUIZES_BY_TOPIC_IDS: () => `/Quizzes/random/by-topics-ids`, //POST
  GET_SINGLE_QUIZ: (quizId: string) => `/Quizzes/${quizId}`, //GET
  UPDATE_SINGLE_QUIZ: (quizId: string) => `/Quizzes/${quizId}`, //PATCH
  CREATE_QUIZ: () => `/Quizzes`, //POST
  DELETE_SINGLE_QUIZ: (quizId: string) => `/Quizzes/${quizId}`, //DELETE
  GET_USER_PLAYED_QUIZES: () => `/userQuizzes`, //GET
  GET_RANDOM_PLAYED_QUIZES: () => `/userQuizzes/random-played-quizzes`, //GET
  CREATE_USER_PLAYED_QUIZ: () => `/userQuizzes/create`, //POST
  GET_SINGLE_USER_QUIZ_STATISTICS: (userId: string) =>
    `/userQuizzes/singlet-user-quiz-statistics/${userId}`, //GET
};

const getQuizzesHandler = async (
  params?: IQuizGetQuizzesRequest
): Promise<IQuizzesResponse> => {
  const response = await api.get(`${ENDPOINT.GET_QUIZES()}`, { params });
  return response.data;
};

const getRandomThirtyQuizzesHandler =
  async (): Promise<IGETRandomThirtyQuizzesResponse> => {
    const response = await api.get(`${ENDPOINT.GET_RANDOM_THIRTY_QUIZES()}`);
    return response.data;
  };

const getRandomQuizzesByTopicIdsHandler = async (
  params?: IQuizGetRandomQuizzesByTopicIdsRequest
): Promise<IQuizGetRandomQuizzesByTopicIdsResponse> => {
  const response = await api.post(
    `${ENDPOINT.GET_RANDOM_QUIZES_BY_TOPIC_IDS()}`,
    params
  );
  return response.data;
};

const getSingleQuizHandler = async (quizId: string): Promise<IQuizResponse> => {
  const response = await api.get(`${ENDPOINT.GET_SINGLE_QUIZ(quizId)}`);
  return response.data;
};

const updateSingleQuizHandler = async (
  data: Partial<Omit<IQuiz, "_id">>,
  quizId: string
): Promise<IQuizResponse> => {
  const response = await api.patch(`${ENDPOINT.UPDATE_SINGLE_QUIZ(quizId)}`, {
    ...data,
  });
  return response.data;
};

const createQuizHandler = async (
  data: Omit<IQuiz, "_id" | "createdAt" | "updatedAt" | "__v">
): Promise<IQuizResponse> => {
  const response = await api.post(`${ENDPOINT.CREATE_QUIZ()}`, data);
  return response.data;
};

const deleteSinglweQuizHandler = async (
  quizId: string
): Promise<IQuizResponse> => {
  const response = await api.delete(`${ENDPOINT.DELETE_SINGLE_QUIZ(quizId)}`);
  return response.data;
};

const getUserPlayedQuizzesHandler = async (
  params: IGetUserPlayedQuizzesRequest
): Promise<IGetUserPlayedQuizzesResponse> => {
  const response = await api.get(`${ENDPOINT.GET_USER_PLAYED_QUIZES()}`, {
    params,
  });
  return response.data;
};

const getRandomPlayedQuizzesHandler =
  async (): Promise<IGetUserPlayedQuizzesResponse> => {
    const response = await api.get(`${ENDPOINT.GET_RANDOM_PLAYED_QUIZES()}`);
    return response.data;
  };

const createUserPlayedQuizHandler = async (
  data: IUserPlayedQuizzesReq[]
): Promise<IGetUserPlayedQuizzesResponse> => {
  const response = await api.post(
    `${ENDPOINT.CREATE_USER_PLAYED_QUIZ()}`,
    data
  );
  return response.data;
};

const getSingleUserQuizStatisticsHandler = async (
  userId: string
): Promise<IGetUserPlayedQuizzesResponse> => {
  const response = await api.get(
    `${ENDPOINT.GET_SINGLE_USER_QUIZ_STATISTICS(userId)}`
  );
  return response.data;
};

export const QuizApis = {
  getQuizzesHandler,
  getRandomThirtyQuizzesHandler,
  getRandomQuizzesByTopicIdsHandler,
  getSingleQuizHandler,
  updateSingleQuizHandler,
  createQuizHandler,
  deleteSinglweQuizHandler,
  getUserPlayedQuizzesHandler,
  getRandomPlayedQuizzesHandler,
  createUserPlayedQuizHandler,
  getSingleUserQuizStatisticsHandler,
};
