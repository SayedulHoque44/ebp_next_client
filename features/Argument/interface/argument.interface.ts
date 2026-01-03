import { IQuizImage } from "@/features/QuizImg/interface/quizImg.interface";

export interface IArgument {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  image: IQuizImage | string;
  isDeleted: boolean;
  totalQuizzes: number;
}

export interface IArgumentQueryParam {
  name: string;
  value: string | number | boolean;
}

export interface IArgumentGetArgumentsRequest {
  page: number;
  limit: number;
  searchTerm: string;
  sort: string;
  count: boolean;
  isDeleted: boolean;
}

export interface IArgumentResponse {
  success: boolean;
  data: IArgument;
  message: string;
}

export interface IArgumentsResponse {
  success: boolean;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    result: IArgument[];
  };
  message: string;
}
