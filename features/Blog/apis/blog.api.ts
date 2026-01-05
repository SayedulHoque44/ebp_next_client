import api from "@/lib/api";
import {
  IBlog,
  IBlogGetBlogsRequest,
  IBlogResponse,
  IBlogsResponse,
} from "../interface/blog.interface";

const ENDPOINT = {
  GET_BLOGS: () => `/blogs`,
  UPDATE_SINGLE_BLOG: (blogId: string) => `/blogs/${blogId}`,
  CREATE_BLOG: () => `/blogs`,
  DELETE_SINGLE_BLOG: (blogId: string) => `/blogs/${blogId}`,
  GET_SINGLE_BLOG: (blogId: string) => `/blogs/${blogId}`,
};

const getBlogsHandler = async (
  params?: IBlogGetBlogsRequest
): Promise<IBlogsResponse> => {
  const response = await api.get(`${ENDPOINT.GET_BLOGS()}`, { params });
  return response.data;
};

const updateSingleBlogHandler = async (
  data: Partial<Omit<IBlog, "_id">>,
  blogId: string
): Promise<IBlogsResponse> => {
  const response = await api.patch(`${ENDPOINT.UPDATE_SINGLE_BLOG(blogId)}`, {
    ...data,
  });
  return response.data;
};

const createBlogHandler = async (
  data: Partial<Omit<IBlog, "_id">>
): Promise<IBlogsResponse> => {
  const response = await api.post(`${ENDPOINT.CREATE_BLOG()}`, data);
  return response.data;
};

const deleteSingleBlogHandler = async (
  blogId: string
): Promise<IBlogsResponse> => {
  const response = await api.delete(`${ENDPOINT.DELETE_SINGLE_BLOG(blogId)}`);
  return response.data;
};

const getSingleBlogHandler = async ({
  blogId,
}: {
  blogId: string;
}): Promise<IBlogResponse> => {
  const response = await api.get(`${ENDPOINT.GET_SINGLE_BLOG(blogId)}`);
  return response.data;
};

const BlogApis = {
  getBlogsHandler,
  updateSingleBlogHandler,
  createBlogHandler,
  deleteSingleBlogHandler,
  getSingleBlogHandler,
};

export default BlogApis;
