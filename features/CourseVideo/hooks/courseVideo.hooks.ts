import { AxiosError } from "axios";
import {
  IGetCourseVideosByPartIdRequest,
  IGetCourseVideosByPartIdResponse,
} from "../interface/courseVideo.interface";
import { QueryObserverOptions } from "@tanstack/react-query";
import { useApiQuery } from "@/lib/hooks/useApiQuery";
import CourseVideoApis from "../apis/courseVideo.apis";
import { QUERY_KEY } from "@/constants/constendData";

const useGetCourseVideosByPartId = ({
  queryKey = [],
  partId,
  options,
}: {
  queryKey?: (string | number)[];
  partId: string;
  options?: QueryObserverOptions<
    IGetCourseVideosByPartIdResponse,
    AxiosError<{ message: string; [key: string]: any }>
  >;
}) => {
  return useApiQuery<IGetCourseVideosByPartIdResponse, string>(
    [QUERY_KEY.COURSE_VIDEOS, partId, ...queryKey],
    async (partIdParam: string) => {
      return await CourseVideoApis.getCourseVideosByPartIdHandler(partIdParam);
    },
    partId,
    options
  );
};

const CourseVideoHooks = {
  useGetCourseVideosByPartId,
};

export default CourseVideoHooks;
