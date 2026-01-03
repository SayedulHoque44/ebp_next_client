export interface IYTVideo {
  _id: string;
  [key: string]: any; // Add specific YTVideo properties as needed
  createdAt?: string;
  updatedAt?: string;
}

export interface IYTVideoQueryParam {
  name: string;
  value: string | number | boolean;
}

export interface IYTVideoGetAllYTVideoRequest {
  [key: string]: string | number | boolean | undefined; // Dynamic query params
}

export interface IYTVideoResponse {
  success: boolean;
  data: IYTVideo;
  message: string;
}

export interface IYTVideosResponse {
  success: boolean;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    result: IYTVideo[];
  };
  message: string;
}

export interface ICreateYTVideoRequest {
  [key: string]: any; // Add specific YTVideo creation properties as needed
}

export interface IUpdateSingleUserRequest {
  userId: string;
  userData: { [key: string]: any };
}

export interface IUpdateUserCourseTimeRequest {
  [key: string]: any; // Add specific courseTime properties as needed
}

