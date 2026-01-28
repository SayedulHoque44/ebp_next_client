import { AxiosError } from "axios";
import {
  IQnaPdfResponse,
  ICreateQnaPdfRequest,
  ICreateQnaPdfResponse,
  IDeleteQnaPdfResponse,
} from "../interface/qnaPdf.interface";
import {
  QueryObserverOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import QnaPdfApis from "../apis/qnaPdf.apis";
import { useApiMutation } from "@/lib/hooks/useApiMutation";
import { QUERY_KEY } from "@/constants/constendData";

const useGetQnaPdfs = ({
  queryKey = [],
  options,
}: {
  queryKey?: (string | number)[];
  options?: QueryObserverOptions<
    IQnaPdfResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<IQnaPdfResponse, void>(
    [QUERY_KEY.QNA_PDFS, ...queryKey],
    QnaPdfApis.getQnaPdfsHandler,
    undefined,
    options
  );
};

const useCreateQnaPdf = (
  options?: UseMutationOptions<
    ICreateQnaPdfResponse,
    AxiosError<{ message: string }>,
    ICreateQnaPdfRequest,
    unknown
  >
) => {
  return useApiMutation<ICreateQnaPdfResponse, ICreateQnaPdfRequest>(
    async (params) => {
      const response = await QnaPdfApis.createQnaPdfHandler(params);
      return response;
    },
    options
  );
};

const useDeleteQnaPdf = (
  options?: UseMutationOptions<
    IDeleteQnaPdfResponse,
    AxiosError<{ message: string }>,
    { pdfId: string },
    unknown
  >
) => {
  return useApiMutation<IDeleteQnaPdfResponse, { pdfId: string }>(
    async (params) => {
      const response = await QnaPdfApis.deleteQnaPdfHandler(params.pdfId);
      return response;
    },
    options
  );
};

const QnaPdfHooks = {
  useGetQnaPdfs,
  useCreateQnaPdf,
  useDeleteQnaPdf,
};

export default QnaPdfHooks;
