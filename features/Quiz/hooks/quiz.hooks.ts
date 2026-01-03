import { AxiosError } from "axios";
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
  IUserPlayedQuizzesReq,
} from "../interface/quiz.interfaces";
import {
  QueryObserverOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import { QuizApis } from "../apis/quiz.apis";
import { useApiMutation } from "@/lib/hooks/useApiMutation";

const useGetQuizzes = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params: IQuizGetQuizzesRequest;
  options?: QueryObserverOptions<
    IQuizzesResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<IQuizzesResponse, IQuizGetQuizzesRequest>(
    [...queryKey],
    QuizApis.getQuizzesHandler,
    params,
    options
  );
};

const useGetRandomThirtyQuizzes = (
  options?: QueryObserverOptions<
    IGETRandomThirtyQuizzesResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >
) => {
  return useApiQuery<IGETRandomThirtyQuizzesResponse, void>(
    ["random-thirty-quizzes"],
    QuizApis.getRandomThirtyQuizzesHandler,
    undefined,
    options
  );
};

const useGetRandomQuizzesByTopicIds = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params: IQuizGetRandomQuizzesByTopicIdsRequest;
  options?: QueryObserverOptions<
    IQuizGetRandomQuizzesByTopicIdsResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<
    IQuizGetRandomQuizzesByTopicIdsResponse,
    IQuizGetRandomQuizzesByTopicIdsRequest
  >([...queryKey], QuizApis.getRandomQuizzesByTopicIdsHandler, params, options);
};

const useGetSingleQuiz = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params: { quizId: string };
  options?: QueryObserverOptions<
    IQuizResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<IQuizResponse, { quizId: string }>(
    [...queryKey],
    () => QuizApis.getSingleQuizHandler(params.quizId),
    params,
    options
  );
};

const useUpdateSingleQuiz = (
  options?: UseMutationOptions<
    IQuizResponse,
    AxiosError<{ message: string }>,
    { data: Partial<IQuiz>; quizId: string },
    unknown
  >
) => {
  return useApiMutation<
    IQuizResponse,
    { data: Partial<IQuiz>; quizId: string }
  >(async (params) => {
    const response = await QuizApis.updateSingleQuizHandler(
      params.data,
      params.quizId
    );
    return response;
  }, options);
};

const useCreateQuiz = (
  options?: UseMutationOptions<
    IQuizResponse,
    AxiosError<{ message: string }>,
    Omit<IQuiz, "_id" | "createdAt" | "updatedAt" | "__v">,
    unknown
  >
) => {
  return useApiMutation<
    IQuizResponse,
    Omit<IQuiz, "_id" | "createdAt" | "updatedAt" | "__v">
  >(async (params) => {
    const response = await QuizApis.createQuizHandler(params);
    return response;
  }, options);
};

const useDeleteSingleQuiz = (
  options?: UseMutationOptions<
    IQuizResponse,
    AxiosError<{ message: string }>,
    { quizId: string },
    unknown
  >
) => {
  return useApiMutation<IQuizResponse, { quizId: string }>(
    async (params: { quizId: string }) => {
      const response = await QuizApis.deleteSinglweQuizHandler(params.quizId);
      return response;
    },
    options
  );
};

const useGetUserPlayedQuizzes = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params: IGetUserPlayedQuizzesRequest;
  options?: QueryObserverOptions<
    IGetUserPlayedQuizzesResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<
    IGetUserPlayedQuizzesResponse,
    IGetUserPlayedQuizzesRequest
  >([...queryKey], QuizApis.getUserPlayedQuizzesHandler, params, options);
};

const useGetRandomPlayedQuizzes = (
  options?: QueryObserverOptions<
    IGetUserPlayedQuizzesResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >
) => {
  return useApiQuery<IGetUserPlayedQuizzesResponse, void>(
    ["random-played-quizzes"],
    QuizApis.getRandomPlayedQuizzesHandler,
    undefined,
    options
  );
};

const useCreateUserPlayedQuiz = (
  options?: UseMutationOptions<
    IGetUserPlayedQuizzesResponse,
    AxiosError<{ message: string }>,
    IUserPlayedQuizzesReq[],
    unknown
  >
) => {
  return useApiMutation<IGetUserPlayedQuizzesResponse, IUserPlayedQuizzesReq[]>(
    async (params) => {
      const response = await QuizApis.createUserPlayedQuizHandler(params);
      return response;
    },
    options
  );
};

const useGetSingleUserQuizStatistics = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params: { userId: string };
  options?: QueryObserverOptions<
    IGetUserPlayedQuizzesResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<IGetUserPlayedQuizzesResponse, { userId: string }>(
    [...queryKey],
    (params: { userId: string }) =>
      QuizApis.getSingleUserQuizStatisticsHandler(params?.userId),
    params,
    options
  );
};

const QuizHooks = {
  useGetQuizzes,
  useGetRandomThirtyQuizzes,
  useGetRandomQuizzesByTopicIds,
  useGetSingleQuiz,
  useUpdateSingleQuiz,
  useCreateQuiz,
  useDeleteSingleQuiz,
  useGetUserPlayedQuizzes,
  useGetRandomPlayedQuizzes,
  useCreateUserPlayedQuiz,
  useGetSingleUserQuizStatistics,
};

export default QuizHooks;
