import api from "@/lib/api";
import { useApiMutation } from "@/lib/hooks/useApiMutation";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import {
  QueryObserverOptions,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

const ENDPOINT = {
  GET_QNA_PDF: () => `/QNAPdf`, //GET
  CREATE_QNA_PDF: () => `/QNAPdf`, //POST
  DELETE_QNA_PDF: (pdfId: string) => `/QNAPdf/${pdfId}`, //DELETE
};

const getQnaPdfsHandler = async (params?: any): Promise<any> => {
  const response = await api.get(`${ENDPOINT.GET_QNA_PDF()}`, { params });
  return response.data;
};

const useCreateQnaPdf = (
  options: UseMutationOptions<
    { title: string; link: string },
    AxiosError<{ message: string }>,
    any, //Response
    unknown
  >
) => {
  return useApiMutation<{ title: string; link: string }, any>(
    async (params) => {
      const response = await api.post(`${ENDPOINT.CREATE_QNA_PDF()}`, params);
      return response.data;
    },
    options
  );
};

const useGetQnaPdfs = ({
  queryKey = [],
  params,
  options,
}: {
  queryKey: (string | number)[];
  params: any; //req
  options?: QueryObserverOptions<
    any, //res
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<{ title: string; link: string }, any>(
    [...queryKey],
    getQnaPdfsHandler,
    params,
    options
  );
};

const useDeleteQnaPdf = (
  options: UseMutationOptions<
    any,
    AxiosError<{ message: string }>,
    { pdfId: string }, //Response
    unknown
  >
) => {
  return useApiMutation<any, { pdfId: string }>(async (params) => {
    const response = await api.delete(
      `${ENDPOINT.DELETE_QNA_PDF(params.pdfId)}`
    );
    return response.data;
  }, options);
};

export const QnaPdfHooks = {
  useCreateQnaPdf,
  useGetQnaPdfs,
  useDeleteQnaPdf,
};
