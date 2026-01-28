export interface IQnaPdf {
  _id: string;
  title: string;
  link: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IQnaPdfResponse {
  success: boolean;
  data: IQnaPdf[];
  message: string;
}

export interface ICreateQnaPdfRequest {
  title: string;
  link: string;
}

export interface ICreateQnaPdfResponse {
  success: boolean;
  data: IQnaPdf;
  message: string;
}

export interface IDeleteQnaPdfResponse {
  success: boolean;
  data: {
    sucess: boolean;
  };
  message: string;
}
