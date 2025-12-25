"use client";
import { useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../store/useAuthStore";
import { ILoginRequest, ILoginResponse } from "../interface/auth.interface";
import AuthApi from "../api/auth.api";
import UserHooks from "@/features/User/hooks/user.hooks";
import { errorToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuthDataDefine = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    setAccessToken,
    setUser,
    clearUser,
    clearAccessToken,
    setIsLoading,
    accessToken,
    isLoading,
    user,
  } = useAuthStore((auth) => auth);
  const refetchQuery = (callBack: () => any) =>
    queryClient.refetchQueries({ queryKey: callBack() });

  const login = async (data: ILoginRequest): Promise<ILoginResponse | any> => {
    try {
      const response = await AuthApi.loginHandler(data);
      // console.log("response - auth.hooks.ts -->", response);
      if (response.success) {
        // Use getState() directly in async functions to avoid closure issues
        // This ensures we always have access to the latest store state and functions
        setAccessToken(response.data.token);
        // setUser(response.data.user);
        refetchQuery(() => ["getMe-user"]);
        console.log("------------------push to dashboard------------");
        router.push("/dashboard");
      }
      return response;
    } catch (error: any) {
      console.log(error);
      // Handle Axios error structure

      errorToast({ error: error });
      throw error;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    clearUser();
    clearAccessToken();
    queryClient.clear();
  };

  const { data: userData, isFetching } = UserHooks.useGetUserQuery({
    queryKey: ["getMe-user"],
    params: {
      deviceInfo: typeof window !== "undefined" ? navigator.userAgent : "",
    },
    options: {
      enabled: !!accessToken && typeof window !== "undefined",
      onSuccess: (data) => {
        console.log("data", data);
        setUser(data.data);
        setIsLoading(false);
      },
      onError: (error) => {
        // console.log("error", error);
        errorToast({ error: error });
        setIsLoading(false);
      },
      retry: 2,
      retryDelay: 1000,
    },
  });

  useEffect(() => {
    if (isFetching && !!accessToken && typeof window !== "undefined") {
      setIsLoading(true);
    }
  }, [isFetching, accessToken, setIsLoading]);

  return {
    refetchQuery,
    login,
    logout,
    // setAccessToken,
    setUser,
    clearUser,
    clearAccessToken,
    setIsLoading,
    accessToken,
    isLoading,
    user,
  };
};

export default useAuthDataDefine;
