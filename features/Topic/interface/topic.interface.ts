import { IArgument } from "@/features/Argument/interface/argument.interface";
import { IQuizImage } from "@/features/QuizImg/interface/quizImg.interface";

export interface ITopic {
  _id: string;
  title: string;
  theory: string;
  videoUrl: string;
  image: IQuizImage | string;
  theoryImages: IQuizImage[] | string[];
  argumentId: IArgument;
  totalQuizzes: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ITopicQueryParam {
  name: string;
  value: string | number | boolean;
}

export interface ITopicGetTopicsRequest {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
  count?: boolean;
  isDeleted?: boolean;
  argumentId?: string;
}

export interface ITopicResponse {
  success: boolean;
  data: ITopic;
  message: string;
}

export interface ITopicsResponse {
  success: boolean;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    result: ITopic[];
  };
  message: string;
}

export interface IGetTopicsByArgumentIdsRequest {
  argumentIds: string[];
  params?: ITopicQueryParam[];
}

export interface IGetTopicsByArgumentIdsResponse {
  success: boolean;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    result: ITopic[];
  };
  message: string;
}
