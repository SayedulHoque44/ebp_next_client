import { ITopic } from "@/features/Topic/interface/topic.interface";
import { IQuizImage } from "../../QuizImg/interface/quizImg.interface";

interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IQuiz {
  _id: string;
  argumentId: string;
  ArgTopicId: ITopic | string;
  question: string;
  answer: string;
  image: IQuizImage | string;
  createdAt: string;
  updatedAt: string;
  authorAudio: string;
  isDeleted: boolean;
}

export interface IQuizGetQuizzesRequest {
  page?: number;
  limit?: number;
  sort?: string;
  ArgTopicId?: string;
  searchTerm?: string;
}

export interface IGETRandomThirtyQuizzesResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    argumentId: string;
    ArgTopicId: ITopic | string;
    image: IQuizImage | string;
    question: string;
    answer: string;
    createdAt: string;
    updatedAt: string;
    authorAudio: string;
    isDeleted: boolean;
  }[];
}

export interface IQuizGetRandomQuizzesByTopicIdsRequest {
  topicsIds: string[];
}
export interface IQuizGetRandomQuizzesByTopicIdsResponse {
  success: boolean;
  message: string;
  data: {
    topicQuizzes: IQuiz[];
    totalQuizzes: number;
  };
}
export interface IQuizResponse {
  success: boolean;
  data: IQuiz;
  message: string;
}

export interface IQuizzesResponse {
  success: boolean;
  data: {
    meta: IMeta;
    result: IQuiz[];
  };
  message: string;
}

export interface IGetUserPlayedQuizzesRequest {
  page?: number;
  limit?: number;
  sort?: string;
  isCorrect?: boolean;
  searchTerm?: string;
}

export interface IUserPlayedQuizzesReq {
  quizId: string;
  userId: string;
  givenAnswer: string;
  isCorrect: boolean;
}

export interface IUserPlayedQuiz {
  _id: string;
  userId: string;
  quizId: IQuiz | string;
  givenAnswer: string;
  isCorrect: boolean;
  playedCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IGetUserPlayedQuizzesResponse {
  success: boolean;
  data: {
    meta: IMeta;
    result: IUserPlayedQuiz[];
  };
  message: string;
}

export interface IGetRandomPlayedQuizzesResponse {
  success: boolean;
  data: {
    meta: IMeta;
    topicQuizzes: IUserPlayedQuiz[];
  };
  message: string;
}