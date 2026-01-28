export interface ICourseVideo {
  _id: string;
  title: string;
  url: string;
  videoLink?: string;
  partId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICourseVideoResponse {
  success: boolean;
  data: ICourseVideo[];
  message: string;
}

export interface IGetCourseVideosByPartIdRequest {
  partId: string;
}

export interface IGetCourseVideosByPartIdResponse {
  success: boolean;
  data: ICourseVideo[];
  message: string;
}
