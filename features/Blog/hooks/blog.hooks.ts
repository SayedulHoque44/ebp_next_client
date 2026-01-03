import { AxiosError } from "axios";
import {
  IBlog,
  IBlogGetBlogsRequest,
  IBlogResponse,
} from "../interface/blog.interface";
import {
  QueryObserverOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import BlogApis from "../apis/blog.api";
import { useApiMutation } from "@/lib/hooks/useApiMutation";

const useGetBlogs = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params: IBlogGetBlogsRequest;
  options?: QueryObserverOptions<
    IBlogResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<IBlogResponse, IBlogGetBlogsRequest>(
    [...queryKey],
    BlogApis.getBlogsHandler,
    params,
    options
  );
};

const useUpdateSingleBlog = (
  options?: UseMutationOptions<
    IBlogResponse,
    AxiosError<{ message: string }>,
    { data: Partial<IBlog>; blogId: string },
    unknown
  >
) => {
  return useApiMutation<
    IBlogResponse,
    { data: Partial<IBlog>; blogId: string }
  >(async (params) => {
    const response = await BlogApis.updateSingleBlogHandler(
      params.data,
      params.blogId
    );
    return response;
  }, options);
};

const useCreateBlog = (
  options: UseMutationOptions<
    IBlogResponse,
    AxiosError<{ message: string }>,
    Partial<Omit<IBlog, "_id">>,
    unknown
  >
) => {
  return useApiMutation<IBlogResponse, Partial<Omit<IBlog, "_id">>>(
    async (params) => {
      const response = await BlogApis.createBlogHandler(params);
      return response;
    },
    options
  );
};

const useDeleteSingleBlog = (
  options: UseMutationOptions<
    IBlogResponse,
    AxiosError<{ message: string }>,
    { blogId: string },
    unknown
  >
) => {
  return useApiMutation<IBlogResponse, { blogId: string }>(
    async (params: { blogId: string }) => {
      const response = await BlogApis.deleteSingleBlogHandler(params.blogId);
      return response;
    },
    options
  );
};

const useGetSingleBlog = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params: { blogId: string };
  options: QueryObserverOptions<
    IBlogResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<IBlogResponse, { blogId: string }>(
    [...queryKey],
    BlogApis.getSingleBlogHandler,
    params,
    options
  );
};

const BlogHooks = {
  useGetBlogs,
  useUpdateSingleBlog,
  useCreateBlog,
  useDeleteSingleBlog,
  useGetSingleBlog,
};

export default BlogHooks;
