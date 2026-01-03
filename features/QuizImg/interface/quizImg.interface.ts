export interface IQuizImage {
  _id: string;
  figure: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ISingeQuizImageResponse {
  success: boolean;
  data: IQuizImage;
  message: string;
}

export interface ISingleQuizImageRequest {
  figure: string;
  imageUrl?: string;
}

export interface IQuizImagesGetRequest {
  page?: number;
  limit?: number;
  sort?: string;
  searchTerm?: string;
  figure?: string;
  imageUrl?: string;
}

export interface IQuizImagesGetResponse {
  success: boolean;
  data: {
    result: IQuizImage[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  message: string;
}
