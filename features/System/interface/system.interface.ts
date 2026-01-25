export interface IAd {
  _id?: string;
  [key: string]: any; // Add specific ad properties as needed
}

export interface IPoster {
  _id: string;
  name: string;
  status: string;
  url: string;
}

export interface IRedirectUrl {
  _id: string;
  name: string;
  url: string;
}

export interface ISocialMedia {
  _id: string;
  name: string;
  url: string;
}

export interface ISystem {
  _id: string;
  title: string;
  description: string;
  category: string;
  ads: IAd[];
  posters: IPoster[];
  redirect_url: IRedirectUrl[];
  social_media: ISocialMedia[];
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISystemQueryParam {
  name: string;
  value: string | number | boolean;
}

export type ISystemGetSystemsRequest =
  | ISystemQueryParam[]
  | { [key: string]: string | number | boolean | undefined }; // Support both array format and object format

export interface ISystemResponse {
  success: boolean;
  data: ISystem;
  message: string;
}

export interface ISystemsResponse {
  success: boolean;
  data:  ISystem[];
  message: string;
}

export interface IUpdateSystemRequest {
  systemId: string;
  systemData: Partial<Omit<ISystem, "_id" | "createdAt" | "updatedAt">>;
}
