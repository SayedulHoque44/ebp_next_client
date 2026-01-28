import api from "@/lib/api";
import {
  IQnaPdfResponse,
  ICreateQnaPdfRequest,
  ICreateQnaPdfResponse,
  IDeleteQnaPdfResponse,
} from "../interface/qnaPdf.interface";

const ENDPOINT = {
  GET_QNA_PDF: () => `/QNAPdf`,
  CREATE_QNA_PDF: () => `/QNAPdf`,
  DELETE_QNA_PDF: (pdfId: string) => `/QNAPdf/${pdfId}`,
};

const getQnaPdfsHandler = async (): Promise<IQnaPdfResponse> => {
  const response = await api.get(`${ENDPOINT.GET_QNA_PDF()}`);
  return response.data;
};

const createQnaPdfHandler = async (
  data: ICreateQnaPdfRequest
): Promise<ICreateQnaPdfResponse> => {
  const response = await api.post(`${ENDPOINT.CREATE_QNA_PDF()}`, data);
  return response.data;
};

const deleteQnaPdfHandler = async (
  pdfId: string
): Promise<IDeleteQnaPdfResponse> => {
  const response = await api.delete(`${ENDPOINT.DELETE_QNA_PDF(pdfId)}`);
  return response.data;
};

const QnaPdfApis = {
  getQnaPdfsHandler,
  createQnaPdfHandler,
  deleteQnaPdfHandler,
};

export default QnaPdfApis;
