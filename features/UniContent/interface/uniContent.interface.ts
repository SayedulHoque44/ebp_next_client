import { contentTypeObj } from "@/constants/ui_constent";

export type IContentTypeObj =
  (typeof contentTypeObj)[keyof typeof contentTypeObj];

// Base interface with common fields
export interface IUniContentBase {
  description: string;
  imageUrl: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface ICourseVideoContentType extends IUniContentBase {
  contentType: typeof contentTypeObj.CourseVideo;
}

export interface ITrucchiContentType extends IUniContentBase {
  contentType: typeof contentTypeObj.Trucchi;
}

export interface IStdNotesContentType extends IUniContentBase {
  contentType: typeof contentTypeObj.STDNotes;
}

export interface IFeedbackVideoContentType extends IUniContentBase {
  contentType: typeof contentTypeObj.FeedbackVideo;
}

export interface IYTFreeVideoContentType extends IUniContentBase {
  contentType: typeof contentTypeObj.YTFreeVideo;
}
export interface IPatenteBookContentType extends IUniContentBase {
  contentType: typeof contentTypeObj.PatenteBook;
}

export type IUniContent =
  | ICourseVideoContentType
  | ITrucchiContentType
  | IStdNotesContentType
  | IFeedbackVideoContentType
  | IYTFreeVideoContentType
  | IPatenteBookContentType;

// Type mapping from contentType to interface
export type ContentTypeToInterface = {
  [contentTypeObj.CourseVideo]: ICourseVideoContentType;
  [contentTypeObj.Trucchi]: ITrucchiContentType;
  [contentTypeObj.STDNotes]: IStdNotesContentType;
  [contentTypeObj.FeedbackVideo]: IFeedbackVideoContentType;
  [contentTypeObj.YTFreeVideo]: IYTFreeVideoContentType;
  [contentTypeObj.PatenteBook]: IPatenteBookContentType;
};

// Helper type to get the specific interface type from contentType
export type GetUniContentByType<T extends IContentTypeObj> =
  T extends keyof ContentTypeToInterface
    ? ContentTypeToInterface[T]
    : IUniContent;

export interface IUniContentQueryParam {
  name: string;
  value: string | number | boolean;
}

export interface IUniContentGetUniContentRequest<
  T extends IContentTypeObj = IContentTypeObj
> {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
  contentType?: T;
}

export interface IUniContentResponse {
  success: boolean;
  data: IUniContent;
  message: string;
}

// Generic response that changes based on contentType
export interface IUniContentsResponse<
  T extends IContentTypeObj = IContentTypeObj
> {
  success: boolean;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    result: T extends keyof ContentTypeToInterface
      ? ContentTypeToInterface[T][]
      : IUniContent[];
  };
  message: string;
}

export interface ISubContent {
  RefId: IUniContent;
  _id: string;
  _createdAt: string;
  updatedAt: string;
  index: number;
  title: string;
  url: string;
  description: string;
  imageUrl: string;
}

export interface ISubContentGetSubContentsRequest {
  RefId: string;
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
}

export interface ISubContentResponse {
  success: boolean;
  data: ISubContent;
  message: string;
}

export interface ISubContentsResponse {
  success: boolean;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    result: ISubContent[];
  };
  message: string;
}
